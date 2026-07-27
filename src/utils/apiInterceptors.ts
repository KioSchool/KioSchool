import { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import * as Sentry from '@sentry/react';
import { match } from 'ts-pattern';
import { SENTRY_CONFIG } from '@constants/sentry';
import { getApiErrorCode, isAxiosCancel, requiresGlobalLogout } from './apiError';
import { loadingManager } from './loadingManager';
import { isReportableError } from './sentryErrorFilter';

const TIMEOUT_BEFORE_SHOW_LOADING = 500;

type ErrorCategory = 'cancel' | 'ignored-url' | 'expected' | 'normal';

function categorize(error: AxiosError): ErrorCategory {
  if (isAxiosCancel(error)) return 'cancel';

  const url = error.config?.url ?? '';
  if (SENTRY_CONFIG.IGNORED_URL_PATTERNS.some((pattern) => url.includes(pattern))) return 'ignored-url';

  // 예상된 비즈니스 에러 및 세션 만료 → Sentry 미전송.
  if (!isReportableError(error)) return 'expected';

  return 'normal';
}

/**
 * Promise.reject를 호출자에게 전달하되, 인터셉터에서 한 번 catch를 부착해
 * unhandled rejection으로 분류되지 않게 한다.
 *
 * (Promise.reject 직후 동기적으로 .catch를 부착하므로 microtask 종료 시점에
 * 핸들러가 이미 부착된 상태 → 브라우저가 unhandled로 분류하지 않음.
 * 호출자가 추가 .catch를 부착해도 정상 동작.)
 */
function suppressUnhandled<T>(error: T): Promise<never> {
  const rejection = Promise.reject<never>(error);
  rejection.catch(() => {});
  return rejection;
}

function reportToSentry(error: AxiosError) {
  Sentry.captureException(error, {
    tags: {
      errorType: 'apiError',
      errorCode: getApiErrorCode(error) ?? 'NO_CODE',
      statusCode: error.response?.status ?? 0,
    },
    extra: {
      url: error.config?.url ?? '',
      method: error.config?.method,
      responseData: error.response?.data,
    },
  });
}

/**
 * 공통 인터셉터 설정 함수
 * @param api - axios 인스턴스
 * @param options - 인터셉터 옵션
 */
export function setupApiInterceptors(
  api: AxiosInstance,
  options: {
    authErrorEvent?: string;
    onAuthError?: () => void;
  } = {},
) {
  const pendingTimers = new Map<InternalAxiosRequestConfig, NodeJS.Timeout>();

  const handleRequestStart = (config: InternalAxiosRequestConfig) => {
    const timerId = setTimeout(() => {
      loadingManager.increment();
      pendingTimers.delete(config);
    }, TIMEOUT_BEFORE_SHOW_LOADING);

    pendingTimers.set(config, timerId);

    return config;
  };

  const cleanupRequest = (config: InternalAxiosRequestConfig) => {
    const timerId = pendingTimers.get(config);

    if (timerId) {
      clearTimeout(timerId);
      pendingTimers.delete(config);
    } else {
      loadingManager.decrement();
    }
  };

  const handleAuthError = () => {
    if (options.onAuthError && options.authErrorEvent) {
      options.onAuthError();
      window.dispatchEvent(new CustomEvent(options.authErrorEvent));
    }
  };

  const handleRequestError = (error: AxiosError): Promise<never> => {
    if (isAxiosCancel(error)) {
      return suppressUnhandled(error);
    }
    return Promise.reject(error);
  };

  const handleResponse = (response: AxiosResponse) => {
    cleanupRequest(response.config);
    return response;
  };

  const handleResponseError = (error: AxiosError): Promise<never> => {
    if (error.config) cleanupRequest(error.config);

    // 로그아웃은 Sentry 보고 여부와 독립된 판단이므로 분류 전에 처리한다.
    if (requiresGlobalLogout(error)) handleAuthError();

    return (
      match(categorize(error))
        .with('cancel', () => suppressUnhandled(error))
        .with('ignored-url', () => suppressUnhandled(error))
        // 예상된 에러: Sentry 미보고, 호출자에겐 reject 전달(UI가 메시지 표시).
        .with('expected', () => suppressUnhandled(error))
        .with('normal', () => {
          reportToSentry(error);
          return Promise.reject<never>(error);
        })
        .exhaustive()
    );
  };

  api.interceptors.request.use(handleRequestStart, handleRequestError);
  api.interceptors.response.use(handleResponse, handleResponseError);
}
