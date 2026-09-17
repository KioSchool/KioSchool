import { useEffect, useState } from 'react';
import useAdminTable from '@hooks/admin/useAdminTable';
import useConfirm from '@hooks/useConfirm';
import { dateConverter } from '@utils/formatDate';
import { API_ERROR_CODES } from '@constants/errorCodes';
import { GA_EVENT, TABLE_SESSION_ACTION, TableSessionAction } from '@constants/analytics';
import { TableView } from '@jotai/admin/atoms';
import { isApiErrorCode } from '@utils/apiError';
import { trackEvent } from '@utils/analytics';

function isEmptyOrderSessionError(error: unknown): boolean {
  return isApiErrorCode(error, API_ERROR_CODES.EMPTY_ORDER_SESSION);
}

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
  /** 조작이 일어난 실제 뷰. 저장된 선호가 아니라 페이지에서 파생한 값을 받는다. */
  viewMode: TableView;
  isMobile: boolean;
}

export function useTableSession({ workspaceId, currentExpectedEndAt, orderSessionId, tableNumber, refetchTable, viewMode, isMobile }: UseTableSessionProps) {
  const [selectedTimeLimit, setSelectedTimeLimit] = useState<string>(() => {
    const storedTime = sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (storedTime) {
      return storedTime;
    }
    return DEFAULT_TIME_LIMIT.toString();
  });

  useEffect(() => {
    sessionStorage.setItem(SESSION_STORAGE_KEY, selectedTimeLimit);
  }, [selectedTimeLimit]);

  const { updateSessionEndTime, finishTableSession, startTableSession } = useAdminTable(workspaceId);
  const { ConfirmModal: EndSessionConfirmModal, confirm: confirmEndSession } = useConfirm({
    title: '세션을 종료하시겠습니까?',
    description: '종료 후 되돌릴 수 없습니다.',
    okText: '종료',
    cancelText: '취소',
  });
  const { ConfirmModal: EmptySessionConfirmModal, confirm: confirmEmptySession } = useConfirm({
    title: '주문 내역이 없는 세션입니다.',
    description: '주문 타임라인에 어떻게 저장하시겠습니까?',
    okText: '유효한 세션으로 저장',
    cancelText: '무효한 세션으로 저장',
  });

  // 조작을 "시도"가 아니라 "성공"에만 집계한다. 사용 시작·시간 변경은 실패해도 화면에 아무
  // 변화가 없어(useAdminTable에서 에러를 삼킨다), 시도 기준이면 서버가 죽은 시간대가
  // 활발한 사용으로 잡힌다. 빈 세션 모달에서 사용자가 빠져나간 경우도 여기서 함께 걸러진다.
  const trackSessionAction = (action: TableSessionAction) => {
    trackEvent(GA_EVENT.TABLE_SESSION_ACTION, {
      action,
      view_mode: viewMode,
      workspace_id: workspaceId,
      is_mobile: isMobile,
      table_number: tableNumber,
    });
  };

  const handleApiAndRefetch = (apiCall: Promise<unknown>, onSuccess?: () => void) => {
    apiCall
      .then((res) => {
        if (!res) return;

        refetchTable();
        onSuccess?.();
      })
      .catch((error) => {
        console.error('API 호출 실패:', error);
        alert('작업을 처리하는 중 오류가 발생했습니다.');
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

    handleApiAndRefetch(updateSessionEndTime(orderSessionId, newEndDateString), () => trackSessionAction(TABLE_SESSION_ACTION.REDUCE));
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

    handleApiAndRefetch(updateSessionEndTime(orderSessionId, newEndDateString), () => trackSessionAction(TABLE_SESSION_ACTION.EXTEND));
  };

  const endSessionWithEmptyCheck = async (sessionId: number, table: number) => {
    try {
      return await finishTableSession(sessionId, table);
    } catch (error) {
      if (!isEmptyOrderSessionError(error)) throw error;

      const result = await confirmEmptySession();
      if (result === null) return;

      const isGhost = !Boolean(result);
      return finishTableSession(sessionId, table, isGhost);
    }
  };

  const handleEndSession = async () => {
    if (!orderSessionId || !tableNumber) return;

    const confirmed = await confirmEndSession();
    if (!confirmed) return;

    handleApiAndRefetch(endSessionWithEmptyCheck(orderSessionId, tableNumber), () => trackSessionAction(TABLE_SESSION_ACTION.END));
  };

  const handleStartSession = () => {
    if (!tableNumber) return;
    handleApiAndRefetch(startTableSession(tableNumber), () => trackSessionAction(TABLE_SESSION_ACTION.START));
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

  const setTimeLimit = (value: number) => {
    setSelectedTimeLimit(String(value));
  };

  return {
    selectedTimeLimit,
    setTimeLimit,
    handleDecrement,
    handleIncrement,
    handleTimeChange,
    handleDecreaseTime,
    handleIncreaseTime,
    handleEndSession,
    handleStartSession,
    EndSessionConfirmModal,
    EmptySessionConfirmModal,
  };
}
