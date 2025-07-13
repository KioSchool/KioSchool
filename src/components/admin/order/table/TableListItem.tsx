import { Table } from '@@types/index';
import styled from '@emotion/styled';
import useFormattedTime from '@hooks/useFormattedTime';
import { Color } from '@resources/colors';
import { formatRemainingTime } from '@utils/FormatDate';
import { useSearchParams } from 'react-router-dom';

const Row = styled.div<{ isSelected: boolean }>`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  align-items: center;
  padding: 5px 10px;
  border-bottom: 1px solid #e0e0e0;
  cursor: pointer;
  text-align: center;
  height: 30px;
  color: ${({ isSelected }) => (isSelected ? Color.WHITE : Color.GREY)};
  background-color: ${({ isSelected }) => (isSelected ? Color.KIO_ORANGE : 'transparent')};

  &:hover {
    color: ${Color.WHITE};
    background-color: ${Color.KIO_ORANGE};
  }

  &:last-child {
    border-bottom: none;
  }
`;

const Text = styled.div``;

const StatusTag = styled.div<{ isUsing: boolean }>`
  color: ${({ isUsing }) => (isUsing ? '#0CAF60' : '#6A6A6A')};
  font-size: 15px;
  margin-left: 10px;
  padding: 5px 10px;
  border-radius: 13px;
  background-color: ${({ isUsing }) => (isUsing ? '#e7f7ef' : '#F5F5F5')};
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

  const onClickTable = (tableNumber: number) => {
    searchParams.set('tableNo', String(tableNumber));
    setSearchParams(searchParams);
  };

  return (
    <Row onClick={() => onClickTable(table.tableNumber)} isSelected={selectedTableNo === String(table.tableNumber)}>
      <Text>{table.tableNumber}</Text>
      <Text>{remainTime}</Text>
      <StatusTag isUsing={isUsing}>{isUsing ? '사용중' : '종료됨'}</StatusTag>
    </Row>
  );
}

export default TableListItem;
