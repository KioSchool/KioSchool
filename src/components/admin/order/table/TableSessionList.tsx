import { Table } from '@@types/index';
import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { formatRemainingTime } from '@utils/TableTime';
import { useSearchParams } from 'react-router-dom';

const ListContainer = styled.div`
  height: 600px;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  padding: 10px;
  font-weight: bold;
  background-color: ${Color.LIGHT_GREY};
  border-bottom: 1px solid black;
  text-align: center;
`;

const ListBody = styled.div`
  overflow-y: auto;
`;

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

interface TableSessionListProps {
  tables: Table[];
}

function TableSessionList({ tables }: TableSessionListProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedTableNo = searchParams.get('tableNo');

  const onClickTable = (tableNumber: number) => {
    searchParams.set('tableNo', String(tableNumber));
    setSearchParams(searchParams);
  };

  return (
    <ListContainer>
      <Header>
        <div>테이블 번호</div>
        <div>잔여 시간</div>
        <div>상태</div>
      </Header>
      <ListBody>
        {tables.length > 0 &&
          tables.map((table) => {
            const remainTime = formatRemainingTime(table.orderSession?.expectedEndAt);
            const isUsing = table.orderSession;
            return (
              <Row key={table.id} onClick={() => onClickTable(table.tableNumber)} isSelected={selectedTableNo === String(table.tableNumber)}>
                <div>{table.tableNumber}</div>
                <div>{remainTime}</div>
                <div>{isUsing ? '사용중' : '종료됨'}</div>
              </Row>
            );
          })}
      </ListBody>
    </ListContainer>
  );
}

export default TableSessionList;
