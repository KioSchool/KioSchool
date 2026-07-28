import { API_ERROR_CODES, ApiErrorCode } from '@constants/errorCodes';

type SentryEnvironment = 'local' | 'dev' | 'production';

const RATES_BY_ENV: Record<
  SentryEnvironment,
  {
    tracesSampleRate: number;
    replaysSessionSampleRate: number;
    replaysOnErrorSampleRate: number;
  }
> = {
  local: { tracesSampleRate: 0.3, replaysSessionSampleRate: 0.5, replaysOnErrorSampleRate: 1.0 },
  dev: { tracesSampleRate: 0.2, replaysSessionSampleRate: 0.2, replaysOnErrorSampleRate: 1.0 },
  production: { tracesSampleRate: 0.2, replaysSessionSampleRate: 0.2, replaysOnErrorSampleRate: 1.0 },
};

// URL 부분 일치 시 Sentry 전송 차단. 폴링/헬스체크 등 의도된 실패 가능 endpoint 추가.
const IGNORED_URL_PATTERNS: readonly string[] = ['/actuator/health'];

/**
 * 백엔드 `ErrorCode` 중에서도 Sentry로 계속 보고할 code.
 *
 * 나머지 비즈니스 code는 전부 예상된 에러이므로 미보고한다. 백엔드 enum에 없는
 * code(프레임워크·게이트웨이 생성)는 이 목록과 무관하게 항상 보고한다.
 * - INVALID_INPUT: 서버 검증을 통과하지 못한 페이로드 = 프론트의 계약 위반
 * - INTERNAL_ERROR / EMAIL_SEND_FAILURE: 5xx 서버 장애
 */
const REPORTED_ERROR_CODES: readonly ApiErrorCode[] = [API_ERROR_CODES.INVALID_INPUT, API_ERROR_CODES.INTERNAL_ERROR, API_ERROR_CODES.EMAIL_SEND_FAILURE];

export const SENTRY_CONFIG = {
  RATES_BY_ENV,
  CONSOLE_LEVELS: ['warn', 'error'] as const,
  IGNORED_URL_PATTERNS,
  REPORTED_ERROR_CODES,
} as const;

export type { SentryEnvironment };
