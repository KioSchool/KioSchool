import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { loadingManager } from 'src/utils/loadingManager';

const ENVIRONMENT = import.meta.env.VITE_ENVIRONMENT;

class UserApiManager {
  private controller: AbortController;

  private api: AxiosInstance;

  constructor() {
    this.controller = new AbortController();
    this.api = axios.create({
      baseURL: ENVIRONMENT == 'development' ? 'http://localhost:8080' : 'https://api.kio-school.com',
      withCredentials: true,
      timeout: 30000,
    });

    this.setupInterceptors();
  }

  public renewController(): void {
    this.controller = new AbortController();
  }

  public abort(): void {
    this.controller.abort();
  }

  public getApi(): AxiosInstance {
    return this.api;
  }

  public getController(): AbortController {
    return this.controller;
  }

  private setupInterceptors(): void {
    const pendingTimers = new Map<InternalAxiosRequestConfig, NodeJS.Timeout>();

    const requestHandler = (config: InternalAxiosRequestConfig) => {
      const timer = setTimeout(() => {
        loadingManager.increment();
      }, 500);

      pendingTimers.set(config, timer);
      config.signal = this.controller.signal;

      return config;
    };

    const responseHandler = (config: InternalAxiosRequestConfig) => {
      const timer = pendingTimers.get(config);

      if (timer) {
        clearTimeout(timer);
        pendingTimers.delete(config);
        loadingManager.decrement();
      }
    };

    this.api.interceptors.request.use(
      (config) => requestHandler(config),
      (error) => Promise.reject(error),
    );

    this.api.interceptors.response.use(
      (response) => {
        responseHandler(response.config);
        return response;
      },
      (error) => {
        if (error.config) {
          responseHandler(error.config);
        }
        return Promise.reject(error);
      },
    );
  }
}

export const userApiManager = new UserApiManager();
export const userApi = userApiManager.getApi();
