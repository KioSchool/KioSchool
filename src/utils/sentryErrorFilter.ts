import axios from 'axios';
import { SENTRY_CONFIG } from '@constants/sentry';

// 응답 없음(네트워크 단절/타임아웃/CORS)일 때의 status 표현값.
const NETWORK_ERROR_STATUS = 0;
// 5xx 서버 에러의 최소 status.
const SERVER_ERROR_MIN_STATUS = 500;

/**
 * axios 요청 취소(CanceledError) 여부.
 * AbortController.abort()로 취소된 요청은 응답이 없어 status 0으로 떨어지므로,
 * isReportableError에서 네트워크 에러로 오분류되지 않도록 가장 먼저 판정한다.
 */
export function isAxiosCancel(error: unknown): boolean {
  return axios.isCancel(error) || (axios.isAxiosError(error) && error.code === 'ERR_CANCELED');
}

/**
 * 이 에러를 Sentry에 보고할지 결정하는 단일 판정 함수.
 * 인터셉터(reportToSentry 호출 여부)와 Sentry beforeSend(이벤트 드롭 여부)가 공유한다.
 *
 * - 취소 → false
 * - axios 에러가 아닌 일반 JS 에러(TypeError 등) → true (진짜 버그)
 * - 네트워크(status 0) / 5xx / 화이트리스트 4xx(415) → true
 * - 그 외 4xx(400·404·406·409·422 및 401·403·405 …) → false (예상된 비즈니스 에러)
 */
export function isReportableError(error: unknown): boolean {
  if (isAxiosCancel(error)) return false;
  if (!axios.isAxiosError(error)) return true;

  const status = error.response?.status ?? NETWORK_ERROR_STATUS;
  if (status === NETWORK_ERROR_STATUS) return true;
  if (status >= SERVER_ERROR_MIN_STATUS) return true;

  return SENTRY_CONFIG.SENTRY_REPORTED_4XX_STATUSES.includes(status);
}
