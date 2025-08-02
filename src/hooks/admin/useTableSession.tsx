import { useState, useEffect } from 'react';
import useAdminTable from '@hooks/admin/useAdminTable';
import { dateConverter } from '@utils/FormatDate';

const SESSION_STORAGE_KEY = 'selectedTimeLimit';
const DEFAULT_TIME_LIMIT = 10;
const MINUTES_TO_MILLISECONDS = 60 * 1000;
const NUMBER_ONLY_REGEX = /[^0-9]/g;

interface UseTableSessionProps {
  workspaceId: string | undefined;
  currentExpectedEndAt: string | undefined;
  orderSessionId: number | undefined;
  tableNumber?: number;
  refetchTable: () => void;
}

export function useTableSession({ workspaceId, currentExpectedEndAt, orderSessionId, tableNumber, refetchTable }: UseTableSessionProps) {
  const [selectedTimeLimit, setSelectedTimeLimit] = useState<string>(() => {
    const storedTime = sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (storedTime) {
      return storedTime;
    }
    sessionStorage.setItem(SESSION_STORAGE_KEY, DEFAULT_TIME_LIMIT.toString());
    return DEFAULT_TIME_LIMIT.toString();
  });

  useEffect(() => {
    sessionStorage.setItem(SESSION_STORAGE_KEY, selectedTimeLimit.toString());
  }, [selectedTimeLimit]);

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
    const newEndDate = new Date(currentEndDate.getTime() - timeToDecrease * MINUTES_TO_MILLISECONDS);
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
    const newEndDate = new Date(currentEndDate.getTime() + timeToExtend * MINUTES_TO_MILLISECONDS);
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
    const sanitizedValue = value.replace(NUMBER_ONLY_REGEX, '');

    setSelectedTimeLimit(sanitizedValue);
  };

  const handleIncrement = () => {
    setSelectedTimeLimit((prevTimeLimit) => (Number(prevTimeLimit || '0') + 1).toString());
  };

  const handleDecrement = () => {
    setSelectedTimeLimit((prevTimeLimit) => Math.max(0, Number(prevTimeLimit) - 1).toString());
  };

  return {
    selectedTimeLimit,
    handleDecrement,
    handleIncrement,
    handleTimeChange,
    handleDecreaseTime,
    handleIncreaseTime,
    handleEndSession,
    handleStartSession,
  };
}
