import useAdminTable from '@hooks/admin/useAdminTable';
import { useState } from 'react';

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

  const handleDecreaseTime = () => {
    if (currentExpectedEndAt && orderSessionId) {
      const currentEndDate = new Date(currentExpectedEndAt);
      const newEndDate = new Date(currentEndDate.getTime() - timeLimit * 60 * 1000);
      patchTableSession(orderSessionId, newEndDate.toISOString()).then((res) => {
        if (res) refetchTable();
      });
    }
  };
  const handleExtendTime = () => {
    if (currentExpectedEndAt && orderSessionId) {
      const currentEndDate = new Date(currentExpectedEndAt);
      const newEndDate = new Date(currentEndDate.getTime() + timeLimit * 60 * 1000);
      patchTableSession(orderSessionId, newEndDate.toISOString()).then((res) => {
        if (res) refetchTable();
      });
    }
  };
  const handleEndSession = () => {
    if (orderSessionId && tableNumber) {
      finishTableSession(orderSessionId, tableNumber).then((res) => {
        if (res) refetchTable();
      });
    }
  };

  const handleStartSession = () => {
    if (tableNumber) {
      startTableSession(tableNumber).then((res) => {
        if (res) refetchTable();
      });
    }
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedTimeLimit(Number(e.target.value));
  };

  return (
    <div>
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
    </div>
  );
}

export default TableSessionInfo;
