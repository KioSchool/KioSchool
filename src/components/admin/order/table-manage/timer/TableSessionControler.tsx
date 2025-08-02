import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { colFlex } from '@styles/flexStyles';
import TableTimeControler from './TableTimeControler';
import TableTimeButtons from './TableTimeButtons';
import { Table } from '@@types/index';
import { useTableSession } from '@hooks/admin/useTableSession';

const Container = styled.div`
  border: 1px solid #ececec;
  border-radius: 10px;
  overflow: hidden;
  ${colFlex({ justify: 'start', align: 'center' })}
`;

const Header = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 40px;
  padding: 5px 10px;
  color: ${Color.GREY};
  background-color: ${Color.LIGHT_GREY};
  font-size: 15px;
  font-weight: 600;
  border-bottom: 1px solid #ececec;
  ${colFlex({ justify: 'center', align: 'center' })};
`;

const Content = styled.div`
  width: 90%;
  flex: 1;
  gap: 5px;
  ${colFlex({ justify: 'center', align: 'center' })};
`;

interface TableSessionControlerProps {
  tables: Table[];
  workspaceId: string | undefined;
  orderSessionId: number | undefined;
  currentExpectedEndAt: string | undefined;
  tableNumber?: number;
  refetchTable: () => void;
}

function TableSessionControler({ tables, workspaceId, orderSessionId, currentExpectedEndAt, tableNumber, refetchTable }: TableSessionControlerProps) {
  const {
    selectedTimeLimit,
    handleDecrement,
    handleIncrement,
    handleTimeChange,
    handleDecreaseTime,
    handleIncreaseTime,
    handleEndSession,
    handleStartSession,
  } = useTableSession({
    workspaceId,
    currentExpectedEndAt,
    orderSessionId,
    tableNumber,
    refetchTable,
  });

  const nowTable = tables.find((table) => table.tableNumber === tableNumber);
  const isTableUsing = nowTable?.orderSession;

  return (
    <Container>
      <Header>상태 변경</Header>
      <Content>
        <TableTimeControler
          timeLimit={selectedTimeLimit}
          handleDecrement={handleDecrement}
          handleIncrement={handleIncrement}
          handleTimeChange={handleTimeChange}
          disabled={!isTableUsing}
        />
        <TableTimeButtons
          handleDecreaseTime={handleDecreaseTime}
          handleIncreaseTime={handleIncreaseTime}
          handleEndSession={handleEndSession}
          handleStartSession={handleStartSession}
          orderSessionId={orderSessionId}
          disabled={!isTableUsing}
        />
      </Content>
    </Container>
  );
}

export default TableSessionControler;
