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
  currentExpectedEndAt: string;
  tableNumber?: number;
  refetchTable: () => void;
}

function TableSessionInfo({ timeLimit, workspaceId, orderSessionId, currentExpectedEndAt, tableNumber, refetchTable }: TableSessionInfoProps) {
  const [selectedTimeLimit, setSelectedTimeLimit] = useState(timeLimit);
  const { patchTableSession, finishTableSession, startTableSession } = useAdminTable(workspaceId);

  const handleApiAndRefetch = (apiCall: Promise<any>) => {
    apiCall.then((res) => {
      if (res) refetchTable();
    });
  };

  const handleDecreaseTime = () => {
    if (!currentExpectedEndAt || !orderSessionId) return;

    const currentEndDate = new Date(currentExpectedEndAt);
    const newEndDate = new Date(currentEndDate.getTime() - selectedTimeLimit * 60 * 1000);
    const newEndDateString = dateConverter(newEndDate);
    const isExpired = newEndDate.getTime() < new Date().getTime();

    if (isExpired) {
      if (!tableNumber) return;
      handleApiAndRefetch(finishTableSession(orderSessionId, tableNumber));
    } else {
      handleApiAndRefetch(patchTableSession(orderSessionId, newEndDateString));
    }
  };

  const handleExtendTime = () => {
    if (!currentExpectedEndAt || !orderSessionId) return;

    const currentEndDate = new Date(currentExpectedEndAt);
    const newEndDate = new Date(currentEndDate.getTime() + selectedTimeLimit * 60 * 1000);
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
    setSelectedTimeLimit(Number(e.target.value));
  };

  return (
    <Container>
      <div>
        <button onClick={() => setSelectedTimeLimit((prev) => prev - 1)}>-</button>
        <input type="number" value={selectedTimeLimit} onChange={handleTimeChange} />
        <span>분</span>
        <button onClick={() => setSelectedTimeLimit((prev) => prev + 1)}>+</button>
      </div>
      <button onClick={handleDecreaseTime}>감소</button>
      <button onClick={handleExtendTime}>연장</button>
      <button onClick={handleEndSession}>사용종료</button>
      <button onClick={handleStartSession}>사용시작</button>
    </Container>
  );
}

export default TableSessionInfo;
