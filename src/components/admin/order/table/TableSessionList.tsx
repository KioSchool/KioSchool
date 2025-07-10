import { Table } from '@@types/index';
import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { rowFlex } from '@styles/flexStyles';
import TableSessionItem from './TableSessionItem';

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
  height: 100%;
`;

const FallbackMessage = styled.div`
  height: 100%;
  color: ${Color.GREY};
  ${rowFlex({ justify: 'center', align: 'center' })};
`;

interface TableSessionListProps {
  tables: Table[];
}

function TableSessionList({ tables }: TableSessionListProps) {
  return (
    <ListContainer>
      <Header>
        <div>테이블 번호</div>
        <div>잔여 시간</div>
        <div>상태</div>
      </Header>
      <ListBody>
        {tables.length > 0 ? (
          tables.map((table) => {
            const isUsing = table.orderSession !== null;
            const expectedEndAt = table.orderSession?.expectedEndAt || '';
            return <TableSessionItem expectedEndAt={expectedEndAt} isUsing={isUsing} table={table} />;
          })
        ) : (
          <FallbackMessage>테이블 정보가 없습니다.</FallbackMessage>
        )}
      </ListBody>
    </ListContainer>
  );
}

export default TableSessionList;
