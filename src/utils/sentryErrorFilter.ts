import axios from 'axios';
import { SENTRY_CONFIG } from '@constants/sentry';
import { getApiErrorCode, isAxiosCancel, isKnownApiErrorCode, isSecurityRejection } from './apiError';

/**
 * 이 에러를 Sentry에 보고할지 결정하는 단일 판정 함수.
 * 인터셉터(reportToSentry 호출 여부)와 Sentry beforeSend(이벤트 드롭 여부)가 공유한다.
 *
 * 판정은 HTTP status가 아니라 백엔드가 내려주는 `code`를 기준으로 한다.
 * status는 한 값에 성격이 다른 에러가 겹치기 때문이다.
 * (405 = 워크스페이스 접근 불가 / 카테고리 삭제 불가 / 잘못된 HTTP 메서드)
 *
 * - 취소 → false
 * - axios 에러가 아닌 일반 JS 에러(TypeError 등) → true (진짜 버그)
 * - Spring Security가 빈 바디로 거부한 401·403 → false (예상된 세션 만료)
 * - code 없음 → true (백엔드가 만들지 않은 응답: 네트워크 단절·프록시·게이트웨이)
 * - 백엔드 enum에 없는 code → true (프레임워크 생성 = 프론트 요청 자체가 잘못됨)
 * - REPORTED_ERROR_CODES에 있는 code → true (계약 위반·서버 장애)
 * - 그 외 비즈니스 code → false (예상된 비즈니스 에러)
 */
export function isReportableError(error: unknown): boolean {
  if (isAxiosCancel(error)) return false;
  if (!axios.isAxiosError(error)) return true;
  if (isSecurityRejection(error)) return false;

  const code = getApiErrorCode(error);
  if (!isKnownApiErrorCode(code)) return true;

  return SENTRY_CONFIG.REPORTED_ERROR_CODES.includes(code);
}
