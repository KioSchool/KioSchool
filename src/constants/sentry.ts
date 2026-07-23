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

// 인증/인가 실패 status. Sentry 미보고 대상이며, 401/403은 글로벌 로그아웃 이벤트도 발행한다.
const AUTH_STATUSES: readonly number[] = [401, 403, 405];

// AUTH_STATUSES 중 글로벌 로그아웃 이벤트를 발행할 status. 405는 access-guard 자리에서
// 로컬 처리하므로 제외 (master PR #452).
const AUTH_LOGOUT_STATUSES: readonly number[] = [401, 403];

// 4xx 중에서도 Sentry로 계속 보고할 status. API가 절대 직접 던지지 않아 프레임워크 생성
// (= 프론트 요청 버그) 신호인 415만 유지. 나머지 4xx는 예상된 비즈니스 에러로 미보고.
const SENTRY_REPORTED_4XX_STATUSES: readonly number[] = [415];

export const SENTRY_CONFIG = {
  RATES_BY_ENV,
  CONSOLE_LEVELS: ['warn', 'error'] as const,
  IGNORED_URL_PATTERNS,
  AUTH_STATUSES,
  AUTH_LOGOUT_STATUSES,
  SENTRY_REPORTED_4XX_STATUSES,
} as const;

export type { SentryEnvironment };
