import { useEffect, useState } from 'react';
import useAdminTable from '@hooks/admin/useAdminTable';
import { dateConverter } from '@utils/formatDate';

const SESSION_STORAGE_KEY = 'selectedTimeLimit';
const DEFAULT_TIME_LIMIT = 10;
const MINUTES_TO_MILLISECONDS = 60 * 1000;

/**
 * 시간 입력값을 검증하고 정제하는 함수
 *
 * @param {string} value - 사용자가 입력한 원본 문자열
 * @returns {string} 정제된 시간 값 (1-999 범위의 숫자 문자열 또는 빈 문자열)
 *
 * @description
 * 다음 규칙을 적용하여 입력값을 정제합니다:
 * 1. 숫자가 아닌 모든 문자 제거
 * 2. 앞에 오는 0들 제거 (예: "007" → "7")
 * 3. "0"만 입력된 경우 빈 문자열로 변환
 * 4. 최대 3자리까지만 허용 (999분 제한)
 * 5. 빈 문자열은 그대로 유지 (사용자가 모든 내용을 지운 경우)
 *
 * @example
 * sanitizeTimeInput("01") // "1"
 * sanitizeTimeInput("007") // "7"
 * sanitizeTimeInput("0") // ""
 * sanitizeTimeInput("abc123") // "123"
 * sanitizeTimeInput("1234") // "123"
 * sanitizeTimeInput("") // ""
 */
const sanitizeTimeInput = (value: string): string => {
  let sanitized = value.replace(/[^0-9]/g, '');

  if (sanitized === '') return '';

  sanitized = sanitized.replace(/^0+/, '');

  if (sanitized === '') return '';

  if (sanitized.length > 3) {
    sanitized = sanitized.slice(0, 3);
  }

  return sanitized;
};

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
    return DEFAULT_TIME_LIMIT.toString();
  });

  useEffect(() => {
    const existingValue = sessionStorage.getItem(SESSION_STORAGE_KEY);

    if (!existingValue) {
      sessionStorage.setItem(SESSION_STORAGE_KEY, selectedTimeLimit);
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem(SESSION_STORAGE_KEY, selectedTimeLimit);
  }, [selectedTimeLimit]);

  const { updateSessionEndTime, finishTableSession, startTableSession } = useAdminTable(workspaceId);

  const handleApiAndRefetch = (apiCall: Promise<any>) => {
    apiCall.then((res) => {
      if (res) refetchTable();
    });
  };

  const handleDecreaseTime = () => {
    if (!orderSessionId) {
      alert('세션 ID가 없습니다. 세션을 시작해주세요.');
      return;
    }

    if (!currentExpectedEndAt) {
      alert('현재 예상 종료 시간이 없습니다. 사용 종료 후 다시 시작해주세요.');
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
    if (!orderSessionId) {
      alert('세션 ID가 없습니다. 세션을 시작해주세요.');
      return;
    }

    if (!currentExpectedEndAt) {
      alert('현재 예상 종료 시간이 없습니다. 사용 종료 후 다시 시작해주세요.');
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
    const sanitizedValue = sanitizeTimeInput(e.target.value);
    setSelectedTimeLimit(sanitizedValue);
  };

  const handleIncrement = () => {
    setSelectedTimeLimit((prevTimeLimit) => {
      if (prevTimeLimit === '') {
        return DEFAULT_TIME_LIMIT.toString();
      }

      const currentValue = Number(prevTimeLimit);
      return (currentValue + 1).toString();
    });
  };

  const handleDecrement = () => {
    setSelectedTimeLimit((prevTimeLimit) => {
      if (prevTimeLimit === '') {
        return DEFAULT_TIME_LIMIT.toString();
      }

      const currentValue = Number(prevTimeLimit);
      return Math.max(1, currentValue - 1).toString();
    });
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
