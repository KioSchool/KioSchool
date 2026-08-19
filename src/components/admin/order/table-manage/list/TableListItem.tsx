import { useSearchParams } from 'react-router-dom';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

import ProgressRing, { RING_SIZE_ROW_PX } from '@components/admin/order/table-manage/layout/TableLayoutCard/ProgressRing';
import StatusBadge from '@components/admin/order/table-manage/common/StatusBadge/StatusBadge';
import {
  TABLE_LIST_AMOUNT_COL_PX,
  TABLE_LIST_NUMBER_COL_PX,
  TABLE_LIST_ORDER_COL_PX,
  TABLE_LIST_RING_COL_PX,
  TABLE_LIST_STATUS_COL_PX,
} from '@constants/layout';
import { Color } from '@resources/colors';
import { colFlex } from '@styles/flexStyles';
import { getTableStatus, TABLE_STATUS, TableStatus } from '@utils/tableStatus';
import { formatLongDuration, formatStartTime, getElapsedMs, getElapsedPercent, getTotalMs } from '@utils/tableTime';
import { OrderSession, Table } from '@@types/index';

const pulse = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0.6; }
  100% { opacity: 1; }
`;

const SELECTED_OUTLINE_PX = 2;

const STATUS_ROW_BACKGROUND: Record<TableStatus, string> = {
  [TABLE_STATUS.EMPTY]: Color.LIGHT_GREY,
  [TABLE_STATUS.USING]: Color.WHITE,
  [TABLE_STATUS.WARNING]: Color.KIO_ORANGE_FAINT,
  [TABLE_STATUS.EXCEEDED]: Color.LIGHT_RED,
};

const STATUS_TEXT_COLOR: Record<TableStatus, string> = {
  [TABLE_STATUS.EMPTY]: Color.GREY,
  [TABLE_STATUS.USING]: Color.BLACK,
  [TABLE_STATUS.WARNING]: Color.BLACK,
  [TABLE_STATUS.EXCEEDED]: Color.RED,
};

const Row = styled.div<{ isSelected: boolean; status: TableStatus }>`
  display: grid;
  grid-template-columns: ${TABLE_LIST_NUMBER_COL_PX}px ${TABLE_LIST_RING_COL_PX}px 1fr ${TABLE_LIST_ORDER_COL_PX}px ${TABLE_LIST_AMOUNT_COL_PX}px ${TABLE_LIST_STATUS_COL_PX}px;
  align-items: center;
  padding: 8px 10px;
  border-bottom: 1px solid #e0e0e0;
  background-color: ${({ status }) => STATUS_ROW_BACKGROUND[status]};
  box-shadow: ${({ isSelected }) => (isSelected ? `inset 0 0 0 ${SELECTED_OUTLINE_PX}px ${Color.KIO_ORANGE}` : 'none')};
  color: ${({ status }) => STATUS_TEXT_COLOR[status]};
  cursor: pointer;
  text-align: center;
  ${({ status }) => (status === TABLE_STATUS.EXCEEDED ? `animation: ${pulse} 2s infinite;` : '')}
`;

const TableNumber = styled.div`
  font-size: 18px;
  font-weight: 700;
`;

const UsageTimeCell = styled.div`
  gap: 2px;
  text-align: left;

  ${colFlex({ justify: 'center' })};
`;

const MainTimeText = styled.div`
  font-size: 14px;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  color: ${Color.GREY};
`;

const StartTimeText = styled.div`
  font-size: 11px;
  color: ${Color.GREY};
`;

const Text = styled.div``;

function getUsageTimeLabel(session: OrderSession | null): string {
  if (!session) return '미사용';
  if (!session.expectedEndAt) return '사용중';

  return `${formatLongDuration(getElapsedMs(session))} / ${formatLongDuration(getTotalMs(session))}`;
}

function getStartTimeLabel(session: OrderSession | null): string {
  if (!session) return '—';

  return formatStartTime(session);
}

function getOrderCountLabel(session: OrderSession | null): string {
  if (!session) return '—';

  return `${session.orderCount}건`;
}

function getOrderAmountLabel(session: OrderSession | null): string {
  if (!session) return '—';

  return `${session.totalOrderPrice.toLocaleString()}원`;
}

interface TableSessionItemProps {
  table: Table;
}

function TableListItem({ table }: TableSessionItemProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedTableNo = searchParams.get('tableNo');
  const isSelected = selectedTableNo === String(table.tableNumber);
  const status = getTableStatus(table);
  const session = table.orderSession;

  const onClickTable = (tableNumber: number) => {
    searchParams.set('tableNo', String(tableNumber));
    setSearchParams(searchParams, { replace: true });
  };

  return (
    <Row onClick={() => onClickTable(table.tableNumber)} isSelected={isSelected} status={status}>
      <TableNumber>{table.tableNumber}</TableNumber>
      <ProgressRing
        size={RING_SIZE_ROW_PX}
        percent={getElapsedPercent(session)}
        fillColor={status === TABLE_STATUS.EXCEEDED ? Color.RED : Color.KIO_ORANGE}
        holeColor={STATUS_ROW_BACKGROUND[status]}
      />
      <UsageTimeCell>
        <MainTimeText>{getUsageTimeLabel(session)}</MainTimeText>
        <StartTimeText>{getStartTimeLabel(session)}</StartTimeText>
      </UsageTimeCell>
      <Text>{getOrderCountLabel(session)}</Text>
      <Text>{getOrderAmountLabel(session)}</Text>
      <StatusBadge status={status} />
    </Row>
  );
}

export default TableListItem;
