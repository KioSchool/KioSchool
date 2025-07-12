import { Table } from '@@types/index';
import styled from '@emotion/styled';
import useFormattedTime from '@hooks/useFormattedTime';
import { Color } from '@resources/colors';
import { formatRemainingTime } from '@utils/FormatDate';
import { useSearchParams } from 'react-router-dom';

const Row = styled.div<{ isSelected: boolean }>`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  padding: 10px;
  border-bottom: 1px solid #e0e0e0;
  cursor: pointer;
  text-align: center;
  background-color: ${({ isSelected }) => (isSelected ? Color.LIGHT_GREY : 'transparent')};

  &:hover {
    background-color: #f5f5f5;
  }
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
      <div>{table.tableNumber}</div>
      <div>{remainTime}</div>
      <div>{isUsing ? '사용중' : '종료됨'}</div>
    </Row>
  );
}

export default TableListItem;
