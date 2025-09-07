import axios, { AxiosInstance } from 'axios';

const ENVIRONMENT = import.meta.env.VITE_ENVIRONMENT;

class SuperAdminApiManager {
  private controller: AbortController;

  private api: AxiosInstance;

  constructor() {
    this.controller = new AbortController();
    this.api = axios.create({
      baseURL: ENVIRONMENT == 'development' ? 'http://localhost:8080/super-admin' : 'https://api.kio-school.com/super-admin',
      withCredentials: true,
      signal: this.controller.signal,
      timeout: 30000,
    });

    this.setupInterceptors();
  }

  public renewController(): void {
    this.controller = new AbortController();
    this.api.defaults.signal = this.controller.signal;
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
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 403) {
          this.abort();
          window.dispatchEvent(new CustomEvent('adminAuthError'));
          this.renewController();
        }

        return Promise.reject(error);
      },
    );
  }
}

export const superAdminApiManager = new SuperAdminApiManager();
export const superAdminApi = superAdminApiManager.getApi();
