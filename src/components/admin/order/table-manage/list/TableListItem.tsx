import { useSearchParams } from 'react-router-dom';
import styled from '@emotion/styled';

import ProgressRing, { RING_SIZE_ROW_PX } from '@components/admin/order/table-manage/common/ProgressRing';
import StatusBadge from '@components/admin/order/table-manage/common/StatusBadge';
import { TABLE_LIST_GRID_TEMPLATE } from '@constants/layout';
import { Color } from '@resources/colors';
import { colFlex } from '@styles/flexStyles';
import { getTableStatus, TABLE_STATUS, TableStatus } from '@utils/tableStatus';
import { formatSessionStartLabel, formatSessionTimeLabel, getElapsedPercent } from '@utils/tableTime';
import { SessionOrderStats } from '@hooks/admin/useTableOrderStats';
import { Table } from '@@types/index';

const SELECTED_OUTLINE_PX = 2;
const STATUS_BAR_WIDTH_PX = 3;
const EMPTY_TABLE_HINT = '사용 시작 전 · 주문 불가';

const STATUS_BAR_COLOR: Record<TableStatus, string> = {
  [TABLE_STATUS.EMPTY]: 'transparent',
  [TABLE_STATUS.USING]: 'transparent',
  [TABLE_STATUS.WARNING]: Color.KIO_ORANGE,
  [TABLE_STATUS.EXCEEDED]: Color.RED,
};

const Row = styled.div<{ isSelected: boolean; status: TableStatus }>`
  position: relative;
  display: grid;
  grid-template-columns: ${TABLE_LIST_GRID_TEMPLATE};
  align-items: center;
  padding: 10px 12px;
  border-bottom: 1px solid ${Color.BORDER_GREY};
  background-color: ${Color.WHITE};
  box-shadow: ${({ isSelected }) => (isSelected ? `inset 0 0 0 ${SELECTED_OUTLINE_PX}px ${Color.KIO_ORANGE}` : 'none')};
  cursor: pointer;
  text-align: center;
  transition: background-color 0.12s ease-in-out;

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
  color: ${({ status }) => (status === TABLE_STATUS.EMPTY ? Color.MUTED_GREY : Color.GREY)};
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
  color: ${({ status }) => {
    if (status === TABLE_STATUS.EXCEEDED) return Color.RED;
    if (status === TABLE_STATUS.EMPTY) return Color.MUTED_GREY;
    return Color.GREY;
  }};
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

  &:disabled {
    background-color: ${Color.HEAVY_GREY};
    cursor: default;
  }
`;

function getSessionStartLabel(table: Table): string {
  if (!table.orderSession) return EMPTY_TABLE_HINT;

  return formatSessionStartLabel(table.orderSession) ?? '—';
}

function getOrderCountLabel(orderStats: SessionOrderStats | null): string {
  if (!orderStats) return '—';

  return `${orderStats.count}건`;
}

function getOrderAmountLabel(orderStats: SessionOrderStats | null): string {
  if (!orderStats) return '—';

  return `${orderStats.amount.toLocaleString()}원`;
}

interface TableListItemProps {
  table: Table;
  orderStats: SessionOrderStats | null;
  isStarting?: boolean;
  onQuickStart?: (tableNumber: number) => void;
}

function TableListItem({ table, orderStats, isStarting = false, onQuickStart }: TableListItemProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedTableNo = searchParams.get('tableNo');
  const isSelected = selectedTableNo === String(table.tableNumber);
  const status = getTableStatus(table);
  const session = table.orderSession;
  const isEmpty = status === TABLE_STATUS.EMPTY;
  const showQuickStart = isEmpty && Boolean(onQuickStart);

  const handleQuickStart = (event: React.MouseEvent<HTMLButtonElement>) => {
    // 행 선택과 분리한다. 다른 테이블 상세를 보던 중에 시작만 눌러도 보던 화면이 유지돼야 한다.
    event.stopPropagation();
    onQuickStart?.(table.tableNumber);
  };

  const handleClickTable = (tableNumber: number) => {
    searchParams.set('tableNo', String(tableNumber));
    setSearchParams(searchParams, { replace: true });
  };

  return (
    <Row onClick={() => handleClickTable(table.tableNumber)} isSelected={isSelected} status={status}>
      <TableNumber status={status}>{table.tableNumber}</TableNumber>
      <ProgressRing
        size={RING_SIZE_ROW_PX}
        percent={getElapsedPercent(session)}
        fillColor={status === TABLE_STATUS.EXCEEDED ? Color.RED : Color.KIO_ORANGE}
        holeColor={Color.WHITE}
      />
      <UsageTimeCell>
        <MainTimeText status={status}>{formatSessionTimeLabel(session)}</MainTimeText>
        <StartTimeText>{getSessionStartLabel(table)}</StartTimeText>
      </UsageTimeCell>
      <CountText>{getOrderCountLabel(orderStats)}</CountText>
      <AmountText>{getOrderAmountLabel(orderStats)}</AmountText>
      <BadgeCell>
        {showQuickStart ? (
          <QuickStartButton type="button" onClick={handleQuickStart} disabled={isStarting}>
            {isStarting ? '시작 중' : '사용 시작'}
          </QuickStartButton>
        ) : (
          <StatusBadge status={status} />
        )}
      </BadgeCell>
    </Row>
  );
}

export default TableListItem;
