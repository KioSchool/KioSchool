import styled from '@emotion/styled';
import useAdminTable from '@hooks/admin/useAdminTable';
import { dateConverter } from '@utils/FormatDate';
import { useState } from 'react';

const Container = styled.div`
  border: 1px solid black;
`;

interface TableSessionInfoProps {
  timeLimit: number;
  workspaceId: string | undefined;
  orderSessionId: number | undefined;
  currentExpectedEndAt: string | undefined;
  tableNumber?: number;
  refetchTable: () => void;
}

function TableSessionInfo({ timeLimit, workspaceId, orderSessionId, currentExpectedEndAt, tableNumber, refetchTable }: TableSessionInfoProps) {
  const [selectedTimeLimit, setSelectedTimeLimit] = useState<number>(timeLimit);
  const { patchTableSession, finishTableSession, startTableSession } = useAdminTable(workspaceId);

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

    handleApiAndRefetch(patchTableSession(orderSessionId, newEndDateString));
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

    handleApiAndRefetch(patchTableSession(orderSessionId, newEndDateString));
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
      <div>
        <button onClick={handleDecrement}>-</button>
        <input type="number" value={selectedTimeLimit} onChange={handleTimeChange} />
        <span>분</span>
        <button onClick={handleIncrement}>+</button>
      </div>
      <button onClick={handleDecreaseTime}>감소</button>
      <button onClick={handleIncreaseTime}>연장</button>
      {orderSessionId ? <button onClick={handleEndSession}>사용종료</button> : <button onClick={handleStartSession}>사용시작</button>}
    </Container>
  );
}

export default TableSessionInfo;
