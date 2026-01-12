import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import TableTimeButtons from './TableTimeButtons';
import { Table } from '@@types/index';
import { useTableSession } from '@hooks/admin/useTableSession';
import { useAtomValue } from 'jotai';
import { adminWorkspaceAtom } from 'src/jotai/admin/atoms';
import NumberInput from '@components/common/input/NumberInput';
import { formatMinutesToTime } from '@utils/FormatDate';

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
  background-color: #f0f5f8;
  font-size: 15px;
  font-weight: 600;
  border-bottom: 1px solid #ececec;
  ${colFlex({ justify: 'center', align: 'center' })};
`;

const Content = styled.div`
  width: 161px;
  padding: 50px 0 30px 0;
  gap: 29px;
  ${colFlex({ justify: 'start', align: 'center' })};
`;

const TimeInputWrapper = styled.div`
  width: 100%;
  ${colFlex({ justify: 'center', align: 'center' })};
`;

const ButtonsWrapper = styled.div`
  width: 100%;
  gap: 7px;
  ${rowFlex({ justify: 'space-between', align: 'center' })};
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
  const { selectedTimeLimit, setTimeLimit, handleDecrement, handleIncrement, handleDecreaseTime, handleIncreaseTime } = useTableSession({
    workspaceId,
    currentExpectedEndAt,
    orderSessionId,
    tableNumber,
    refetchTable,
  });

  const workspace = useAtomValue(adminWorkspaceAtom);
  const nowTable = tables.find((table) => table.tableNumber === tableNumber);
  const setting = workspace?.workspaceSetting;
  const defaultSessionTimeLimit = setting?.orderSessionTimeLimitMinutes ?? 60;
  const isDisabledSession = !nowTable?.orderSession || !setting?.useOrderSessionTimeLimit;

  const currentMinutes = isDisabledSession ? defaultSessionTimeLimit : Number(selectedTimeLimit);

  const handleValueChange = (value: number) => {
    if (isDisabledSession) return;

    setTimeLimit(value);
  };

  return (
    <Container>
      <Header>잔여시간</Header>
      <Content>
        <TimeInputWrapper>
          <NumberInput
            value={currentMinutes}
            formatter={formatMinutesToTime}
            onChange={handleValueChange}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
            disabled={isDisabledSession}
          />
        </TimeInputWrapper>
        <ButtonsWrapper>
          <TableTimeButtons handleDecreaseTime={handleDecreaseTime} handleIncreaseTime={handleIncreaseTime} disabled={isDisabledSession} />
        </ButtonsWrapper>
      </Content>
    </Container>
  );
}

export default TableSessionControler;
