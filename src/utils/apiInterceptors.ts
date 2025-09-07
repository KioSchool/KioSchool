import { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { loadingManager } from './loadingManager';

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
    }, 500);

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

  const handleRequestError = (error: AxiosError) => Promise.reject(error);

  const handleResponse = (response: AxiosResponse) => {
    cleanupRequest(response.config);
    return response;
  };

  const handleResponseError = (error: AxiosError) => {
    if (error.config) {
      cleanupRequest(error.config);
    }

    if (error.response?.status === 403) {
      handleAuthError();
    }

    return Promise.reject(error);
  };

  api.interceptors.request.use(handleRequestStart, handleRequestError);
  api.interceptors.response.use(handleResponse, handleResponseError);
}
