import { useSearchParams } from 'react-router-dom';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

import ProgressRing, { RING_SIZE_ROW_PX } from '@components/admin/order/table-manage/layout/TableLayoutCard/ProgressRing';
import { TABLE_LIST_NUMBER_COL_PX, TABLE_LIST_RING_COL_PX, TABLE_LIST_STATUS_COL_PX } from '@constants/layout';
import useFormattedTime from '@hooks/useFormattedTime';
import { Color } from '@resources/colors';
import { formatRemainingTime } from '@utils/formatDate';
import { getTableStatus, TABLE_STATUS, TableStatus } from '@utils/tableStatus';
import { Table } from '@@types/index';

const pulse = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0.6; }
  100% { opacity: 1; }
`;

const FULL_PERCENT = 100;

const STATUS_ROW_BACKGROUND: Record<TableStatus, string> = {
  [TABLE_STATUS.EMPTY]: 'transparent',
  [TABLE_STATUS.USING]: 'transparent',
  [TABLE_STATUS.WARNING]: Color.KIO_ORANGE_FAINT,
  [TABLE_STATUS.EXCEEDED]: Color.LIGHT_RED,
};

const STATUS_TEXT_COLOR: Record<TableStatus, string> = {
  [TABLE_STATUS.EMPTY]: Color.GREY,
  [TABLE_STATUS.USING]: Color.BLACK,
  [TABLE_STATUS.WARNING]: Color.BLACK,
  [TABLE_STATUS.EXCEEDED]: Color.RED,
};

const getRowHoleColor = (isSelected: boolean, status: TableStatus): string => {
  if (isSelected) return Color.KIO_ORANGE_FAINT;

  const background = STATUS_ROW_BACKGROUND[status];
  return background === 'transparent' ? Color.WHITE : background;
};

const getElapsedPercent = (table: Table): number => {
  const session = table.orderSession;
  if (!session) return 0;
  if (!session.expectedEndAt) return 0;

  const start = new Date(session.createdAt).getTime();
  const end = new Date(session.expectedEndAt).getTime();
  const total = end - start;
  if (total <= 0) return FULL_PERCENT;

  const elapsed = Date.now() - start;
  return Math.min(FULL_PERCENT, (elapsed / total) * FULL_PERCENT);
};

const Row = styled.div<{ isSelected: boolean; status: TableStatus }>`
  display: grid;
  grid-template-columns: ${TABLE_LIST_NUMBER_COL_PX}px ${TABLE_LIST_RING_COL_PX}px 1fr ${TABLE_LIST_STATUS_COL_PX}px;
  align-items: center;
  padding: 5px 10px;
  border-bottom: 1px solid #e0e0e0;
  border-left: 3px solid ${({ isSelected }) => (isSelected ? Color.KIO_ORANGE : 'transparent')};
  background-color: ${({ isSelected, status }) => (isSelected ? Color.KIO_ORANGE_FAINT : STATUS_ROW_BACKGROUND[status])};
  color: ${({ status }) => STATUS_TEXT_COLOR[status]};
  cursor: pointer;
  text-align: center;
  height: 36px;
  ${({ status }) => (status === TABLE_STATUS.EXCEEDED ? `animation: ${pulse} 2s infinite;` : '')}
`;

const Text = styled.div``;

const StatusTag = styled.div<{ isUsing: boolean }>`
  color: ${({ isUsing }) => (isUsing ? Color.GREEN : Color.GREY)};
  font-size: 12px;
  padding: 4px 6px;
  border-radius: 13px;
  background-color: ${({ isUsing }) => (isUsing ? '#e7f7ef' : Color.LIGHT_GREY)};
`;

interface TableSessionItemProps {
  expectedEndAt: string | undefined;
  isUsing: boolean;
  table: Table;
}

function TableListItem({ expectedEndAt, isUsing, table }: TableSessionItemProps) {
  const remainTime = useFormattedTime<string>({ date: expectedEndAt, formatter: formatRemainingTime });
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedTableNo = searchParams.get('tableNo');
  const isSelected = selectedTableNo === String(table.tableNumber);
  const status = getTableStatus(table);

  const onClickTable = (tableNumber: number) => {
    searchParams.set('tableNo', String(tableNumber));
    setSearchParams(searchParams, { replace: true });
  };

  return (
    <Row onClick={() => onClickTable(table.tableNumber)} isSelected={isSelected} status={status}>
      <Text>{table.tableNumber}</Text>
      <ProgressRing
        size={RING_SIZE_ROW_PX}
        percent={getElapsedPercent(table)}
        fillColor={status === TABLE_STATUS.EXCEEDED ? Color.RED : Color.KIO_ORANGE}
        holeColor={getRowHoleColor(isSelected, status)}
      />
      <Text>{remainTime}</Text>
      <StatusTag isUsing={isUsing}>{isUsing ? '사용중' : '종료됨'}</StatusTag>
    </Row>
  );
}

export default TableListItem;
