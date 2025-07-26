import styled from '@emotion/styled';
import useAdminTable from '@hooks/admin/useAdminTable';
import { Color } from '@resources/colors';
import { colFlex } from '@styles/flexStyles';
import { dateConverter } from '@utils/FormatDate';
import { useState } from 'react';
import TableTimeControler from './TableTimeControler';
import TableTimeButtons from './TableTimeButtons';

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
  timeLimit: number;
  workspaceId: string | undefined;
  orderSessionId: number | undefined;
  currentExpectedEndAt: string | undefined;
  tableNumber?: number;
  refetchTable: () => void;
}

function TableSessionControler({ timeLimit, workspaceId, orderSessionId, currentExpectedEndAt, tableNumber, refetchTable }: TableSessionControlerProps) {
  const [selectedTimeLimit, setSelectedTimeLimit] = useState<number>(timeLimit);
  const { updateSessionEndTime, finishTableSession, startTableSession } = useAdminTable(workspaceId);

  const handleApiAndRefetch = (apiCall: Promise<any>) => {
    apiCall.then((res) => {
      if (res) refetchTable();
    });
  };

  const handleDecreaseTime = () => {
    if (!currentExpectedEndAt || !orderSessionId) {
      alert('세션 ID가 없습니다. 세션을 시작해주세요.');
      return;
    }

    const timeToDecrease = Number(selectedTimeLimit);
    if (isNaN(timeToDecrease) || timeToDecrease <= 0) {
      alert('단축 시간을 올바르게 입력해주세요.');
      return;
    }

    const currentEndDate = new Date(currentExpectedEndAt);
    const newEndDate = new Date(currentEndDate.getTime() - timeToDecrease * 60 * 1000);
    const newEndDateString = dateConverter(newEndDate);

    handleApiAndRefetch(updateSessionEndTime(orderSessionId, newEndDateString));
  };

  const handleIncreaseTime = () => {
    if (!currentExpectedEndAt || !orderSessionId) {
      alert('세션 ID가 없습니다. 세션을 시작해주세요.');
      return;
    }

    const timeToExtend = Number(selectedTimeLimit);
    if (isNaN(timeToExtend) || timeToExtend <= 0) {
      alert('연장 시간을 올바르게 입력해주세요.');
      return;
    }

    const currentEndDate = new Date(currentExpectedEndAt);
    const newEndDate = new Date(currentEndDate.getTime() + timeToExtend * 60 * 1000);
    const newEndDateString = dateConverter(newEndDate);

    handleApiAndRefetch(updateSessionEndTime(orderSessionId, newEndDateString));
  };

  const handleEndSession = () => {
    if (!orderSessionId || !tableNumber) return;
    handleApiAndRefetch(finishTableSession(orderSessionId, tableNumber));
  };

  const handleStartSession = () => {
    if (!tableNumber) return;
    handleApiAndRefetch(startTableSession(tableNumber));
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const sanitizedValue = value.replace(/[^0-9]/g, '');

    setSelectedTimeLimit(parseInt(sanitizedValue, 10));
  };

  const handleIncrement = () => {
    setSelectedTimeLimit((prev) => (Number(prev) || 0) + 1);
  };

  const handleDecrement = () => {
    setSelectedTimeLimit((prev) => {
      const currentValue = Number(prev) || 0;
      return Math.max(0, currentValue - 1);
    });
  };

  return (
    <Container>
      <Header>상태 변경</Header>
      <Content>
        <TableTimeControler
          timeLimit={selectedTimeLimit}
          handleDecrement={handleDecrement}
          handleIncrement={handleIncrement}
          handleTimeChange={handleTimeChange}
        />
        <TableTimeButtons
          handleDecreaseTime={handleDecreaseTime}
          handleIncreaseTime={handleIncreaseTime}
          handleEndSession={handleEndSession}
          handleStartSession={handleStartSession}
          orderSessionId={orderSessionId}
        />
      </Content>
    </Container>
  );
}

export default TableSessionControler;
