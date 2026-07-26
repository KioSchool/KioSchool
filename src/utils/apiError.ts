import axios from 'axios';
import { API_ERROR_CODES, ApiErrorCode, SESSION_INVALID_ERROR_CODES, SESSION_REJECTED_STATUSES } from '@constants/errorCodes';
import type { ApiErrorBody } from '@@types/apiError';

const KNOWN_API_ERROR_CODES: readonly string[] = Object.values(API_ERROR_CODES);

/**
 * axios 요청 취소(CanceledError) 여부.
 * AbortController.abort()로 취소된 요청은 응답이 없어 에러 판정에서 네트워크 에러와
 * 구분되지 않으므로 가장 먼저 걸러낸다.
 */
export function isAxiosCancel(error: unknown): boolean {
  return axios.isCancel(error) || (axios.isAxiosError(error) && error.code === 'ERR_CANCELED');
}

/**
 * 응답 바디에서 백엔드 `code`를 꺼낸다.
 * 응답이 없거나(네트워크 단절) 백엔드가 만들지 않은 응답(프록시·게이트웨이)이면 undefined.
 */
export function getApiErrorCode(error: unknown): string | undefined {
  if (!axios.isAxiosError<ApiErrorBody>(error)) return undefined;

  const code = error.response?.data?.code;
  return typeof code === 'string' ? code : undefined;
}

/**
 * 백엔드 `ErrorCode` enum에 정의된 code인지.
 * false면 Spring MVC 프레임워크나 게이트웨이가 만든 code(415 → `UNSUPPORTED_MEDIA_TYPE` 등)다.
 */
export function isKnownApiErrorCode(code: string | undefined): code is ApiErrorCode {
  return code !== undefined && KNOWN_API_ERROR_CODES.includes(code);
}

/** 에러가 주어진 code 중 하나인지. 호출부의 HTTP status 분기를 대체한다. */
export function isApiErrorCode(error: unknown, ...codes: ApiErrorCode[]): boolean {
  const code = getApiErrorCode(error);
  return isKnownApiErrorCode(code) && codes.includes(code);
}

/** 백엔드가 내려준 사용자 노출용 메시지. 없으면 fallback을 쓴다. */
export function getApiErrorMessage(error: unknown, fallback: string): string {
  if (!axios.isAxiosError<ApiErrorBody>(error)) return fallback;

  const message = error.response?.data?.message;
  return typeof message === 'string' && message.length > 0 ? message : fallback;
}

/**
 * Spring Security가 `@RestControllerAdvice`를 우회해 빈 바디로 거부한 응답인지.
 * 쿠키 만료·토큰 부재 등 인증 정보가 아예 없을 때의 경로로, 예상된 세션 만료다.
 */
export function isSecurityRejection(error: unknown): boolean {
  if (getApiErrorCode(error) !== undefined) return false;
  if (!axios.isAxiosError(error)) return false;

  const status = error.response?.status;
  return status !== undefined && SESSION_REJECTED_STATUSES.includes(status);
}

/**
 * 세션이 무효가 되어 글로벌 로그아웃이 필요한 에러인지.
 *
 * 권한 부족(`NO_PERMISSION_TO_INVITE` 등)은 세션이 유효하므로 대상이 아니다.
 * 호출부가 백엔드 메시지를 그대로 노출하는 것이 맞다.
 */
export function requiresGlobalLogout(error: unknown): boolean {
  const code = getApiErrorCode(error);
  if (isKnownApiErrorCode(code)) return SESSION_INVALID_ERROR_CODES.includes(code);

  return isSecurityRejection(error);
}
