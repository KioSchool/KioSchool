import { MouseEvent } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { match } from 'ts-pattern';
import { Table } from '@@types/index';
import { DEMO_TABLE_NUMBER } from '@constants/data/demo/demoSeed';
import { TABLE_LIST_GRID_TEMPLATE } from '@constants/layout';
import ProgressRing, { RING_SIZE_ROW_PX } from '@components/admin/order/table-manage/common/ProgressRing';
import StatusBadge from '@components/admin/order/table-manage/common/StatusBadge';
import { Color } from '@resources/colors';
import { colFlex } from '@styles/flexStyles';
import { getTableStatus, TABLE_STATUS, TableStatus } from '@utils/tableStatus';
import { formatSessionStartLabel, formatSessionTimeLabel, getElapsedPercent } from '@utils/tableTime';

const SELECTED_OUTLINE_PX = 2;
const STATUS_BAR_WIDTH_PX = 3;
const EMPTY_TABLE_HINT = '사용 시작 전 · 주문 불가';

const STATUS_BAR_COLOR: Record<TableStatus, string> = {
  [TABLE_STATUS.EMPTY]: 'transparent',
  [TABLE_STATUS.USING]: 'transparent',
  [TABLE_STATUS.WARNING]: Color.KIO_ORANGE,
  [TABLE_STATUS.EXCEEDED]: Color.RED,
};

const MAIN_TIME_COLOR: Record<TableStatus, string> = {
  [TABLE_STATUS.EMPTY]: Color.MUTED_GREY,
  [TABLE_STATUS.USING]: Color.GREY,
  [TABLE_STATUS.WARNING]: Color.GREY,
  [TABLE_STATUS.EXCEEDED]: Color.RED,
};

const TABLE_NUMBER_COLOR: Record<TableStatus, string> = {
  [TABLE_STATUS.EMPTY]: Color.MUTED_GREY,
  [TABLE_STATUS.USING]: Color.GREY,
  [TABLE_STATUS.WARNING]: Color.GREY,
  [TABLE_STATUS.EXCEEDED]: Color.GREY,
};

const selectedRowStyle = css`
  box-shadow: inset 0 0 0 ${SELECTED_OUTLINE_PX}px ${Color.KIO_ORANGE};
`;

const Row = styled.div<{ isSelected: boolean; status: TableStatus }>`
  position: relative;
  display: grid;
  grid-template-columns: ${TABLE_LIST_GRID_TEMPLATE};
  align-items: center;
  padding: 10px 12px;
  border-bottom: 1px solid ${Color.BORDER_GREY};
  background-color: ${Color.WHITE};
  cursor: pointer;
  text-align: center;
  transition: background-color 0.12s ease-in-out;
  ${({ isSelected }) => isSelected && selectedRowStyle}

  &:hover {
    background-color: ${Color.LIGHT_GREY};
  }

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: ${STATUS_BAR_WIDTH_PX}px;
    background-color: ${({ status }) => STATUS_BAR_COLOR[status]};
  }
`;

const TableNumber = styled.div<{ status: TableStatus }>`
  font-size: 20px;
  font-weight: 800;
  letter-spacing: -0.02em;
  font-variant-numeric: tabular-nums;
  color: ${({ status }) => TABLE_NUMBER_COLOR[status]};
`;

const UsageTimeCell = styled.div`
  gap: 3px;
  text-align: left;
  ${colFlex({ justify: 'center' })};
`;

const MainTimeText = styled.div<{ status: TableStatus }>`
  font-size: 15px;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  color: ${({ status }) => MAIN_TIME_COLOR[status]};
`;

const StartTimeText = styled.div`
  font-size: 11px;
  color: ${Color.MUTED_GREY};
`;

const CountText = styled.div`
  font-size: 13px;
  font-weight: 500;
  font-variant-numeric: tabular-nums;
  color: ${Color.MUTED_GREY};
`;

const AmountText = styled.div`
  font-size: 13px;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  color: ${Color.GREY};
`;

const BadgeCell = styled.div`
  display: flex;
  justify-content: center;
`;

const QuickStartButton = styled.button`
  padding: 5px 10px;
  border: none;
  border-radius: 999px;
  font-family: inherit;
  font-size: 11px;
  font-weight: 800;
  white-space: nowrap;
  color: ${Color.WHITE};
  background-color: ${Color.KIO_ORANGE};
  cursor: pointer;
  transition: background-color 0.12s ease-in-out;

  &:hover:not(:disabled) {
    background-color: ${Color.KIO_ORANGE_DARK};
  }
`;

function getSessionStartLabel(table: Table): string {
  if (!table.orderSession) return EMPTY_TABLE_HINT;
  return formatSessionStartLabel(table.orderSession) ?? '—';
}

function getOrderCountLabel(table: Table): string {
  if (!table.orderSession) return '—';
  return `${table.orderSession.orderCount}건`;
}

function getOrderAmountLabel(table: Table): string {
  if (!table.orderSession) return '—';
  return `${table.orderSession.totalOrderPrice.toLocaleString()}원`;
}

const getRingColor = (status: TableStatus) =>
  match(status)
    .with(TABLE_STATUS.EXCEEDED, () => Color.RED)
    .otherwise(() => Color.KIO_ORANGE);

const getFocusName = (tableNumber: number) => {
  if (tableNumber !== DEMO_TABLE_NUMBER) return undefined;
  return 'table-7';
};

interface DemoTableListItemProps {
  table: Table;
  isSelected: boolean;
  onSelect: (tableNumber: number) => void;
  onQuickStart: (tableNumber: number) => void;
}

function DemoTableListItem({ table, isSelected, onSelect, onQuickStart }: DemoTableListItemProps) {
  const status = getTableStatus(table);
  const session = table.orderSession;
  const isEmpty = status === TABLE_STATUS.EMPTY;

  const handleQuickStart = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onQuickStart(table.tableNumber);
  };

  return (
    <Row
      onClick={() => onSelect(table.tableNumber)}
      isSelected={isSelected}
      status={status}
      data-demo-table-row={table.tableNumber}
      data-demo-focus={getFocusName(table.tableNumber)}
    >
      <TableNumber status={status}>{table.tableNumber}</TableNumber>
      <ProgressRing size={RING_SIZE_ROW_PX} percent={getElapsedPercent(session)} fillColor={getRingColor(status)} holeColor={Color.WHITE} />
      <UsageTimeCell>
        <MainTimeText status={status}>{formatSessionTimeLabel(session)}</MainTimeText>
        <StartTimeText>{getSessionStartLabel(table)}</StartTimeText>
      </UsageTimeCell>
      <CountText>{getOrderCountLabel(table)}</CountText>
      <AmountText>{getOrderAmountLabel(table)}</AmountText>
      <BadgeCell>
        {isEmpty && (
          <QuickStartButton type="button" onClick={handleQuickStart}>
            사용 시작
          </QuickStartButton>
        )}
        {!isEmpty && <StatusBadge status={status} />}
      </BadgeCell>
    </Row>
  );
}

export default DemoTableListItem;
