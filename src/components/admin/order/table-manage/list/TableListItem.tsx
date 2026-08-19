import { useSearchParams } from 'react-router-dom';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

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

const SELECTED_STYLE = { background: Color.KIO_ORANGE, color: Color.WHITE };

const STATUS_STYLES: Record<TableStatus, { background: string; color: string }> = {
  [TABLE_STATUS.EXCEEDED]: { background: Color.RED, color: Color.WHITE },
  [TABLE_STATUS.WARNING]: { background: Color.LIGHT_RED, color: Color.GREY },
  [TABLE_STATUS.USING]: { background: 'transparent', color: Color.GREY },
  [TABLE_STATUS.EMPTY]: { background: 'transparent', color: Color.GREY },
};

const getRowStyle = (isSelected: boolean, status: TableStatus) => {
  if (isSelected) return SELECTED_STYLE;
  return STATUS_STYLES[status];
};

const Row = styled.div<{ isSelected: boolean; status: TableStatus }>`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  align-items: center;
  padding: 5px 10px;
  border-bottom: 1px solid #e0e0e0;
  cursor: pointer;
  text-align: center;
  height: 30px;

  ${({ isSelected, status }) => {
    const style = getRowStyle(isSelected, status);
    return `
      color: ${style.color};
      background-color: ${style.background};
      ${status === TABLE_STATUS.EXCEEDED && !isSelected ? `animation: ${pulse} 2s infinite;` : ''}
    `;
  }}

  &:hover {
    color: ${Color.WHITE};
    background-color: ${Color.KIO_ORANGE};
  }
`;

const Text = styled.div``;

const StatusTag = styled.div<{ isUsing: boolean }>`
  color: ${({ isUsing }) => (isUsing ? Color.GREEN : Color.GREY)};
  font-size: 15px;
  margin-left: 10px;
  padding: 5px 10px;
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
      <Text>{remainTime}</Text>
      <StatusTag isUsing={isUsing}>{isUsing ? '사용중' : '종료됨'}</StatusTag>
    </Row>
  );
}

export default TableListItem;
