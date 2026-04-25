import axios, { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import * as Sentry from '@sentry/react';
import { loadingManager } from './loadingManager';
import { SENTRY_CONFIG } from '@constants/sentry';

const TIMEOUT_BEFORE_SHOW_LOADING = 500;

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

  const handleRequestError = (error: AxiosError) => {
    if (axios.isCancel(error) || error.code === 'ERR_CANCELED') {
      return suppressUnhandled(error);
    }
    return Promise.reject(error);
  };

  const handleResponse = (response: AxiosResponse) => {
    cleanupRequest(response.config);
    return response;
  };

  const handleResponseError = (error: AxiosError) => {
    if (error.config) {
      cleanupRequest(error.config);
    }

    // [#1] 의도된 axios 요청 취소는 항상 무시 + unhandled 차단
    if (axios.isCancel(error) || error.code === 'ERR_CANCELED') {
      return suppressUnhandled(error);
    }

    const status = error.response?.status ?? 0;
    const url = error.config?.url ?? '';

    // [#3] 401/403: 글로벌 처리 후 호출자에게 reject 전달 + unhandled 차단
    if (status === 401 || status === 403) {
      handleAuthError();
      return suppressUnhandled(error);
    }

    // [#8] 헬스체크 등 의도된 폴링 endpoint는 Sentry 미전송
    const isIgnoredUrl = SENTRY_CONFIG.IGNORED_URL_PATTERNS.some((pattern) => url.includes(pattern));
    // [#2] 비즈니스 에러 status code도 Sentry 미전송
    const isIgnoredStatus = SENTRY_CONFIG.IGNORED_STATUS_CODES.has(status);

    if (!isIgnoredUrl && !isIgnoredStatus) {
      Sentry.captureException(error, {
        tags: {
          errorType: 'apiError',
          statusCode: status,
        },
        extra: {
          url,
          method: error.config?.method,
          responseData: error.response?.data,
        },
      });
    }

    return Promise.reject(error);
  };

  api.interceptors.request.use(handleRequestStart, handleRequestError);
  api.interceptors.response.use(handleResponse, handleResponseError);
}
