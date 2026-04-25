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

// status code별 Sentry 전송 차단 목록.
// 401/403은 인터셉터에서 별도 분기로 먼저 처리되지만, 분기 누락 시 안전망으로 Set에도 둔다.
const IGNORED_STATUS_CODES: ReadonlySet<number> = new Set([400, 401, 403]);

// URL 부분 일치 시 Sentry 전송 차단. 폴링/헬스체크 등 의도된 실패 가능 endpoint 추가.
const IGNORED_URL_PATTERNS: readonly string[] = ['/actuator/health'];

export const SENTRY_CONFIG = {
  RATES_BY_ENV,
  CONSOLE_LEVELS: ['warn', 'error'] as const,
  IGNORED_STATUS_CODES,
  IGNORED_URL_PATTERNS,
} as const;

export type { SentryEnvironment };
