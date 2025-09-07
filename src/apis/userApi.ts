import axios, { AxiosInstance } from 'axios';

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
      (error) => Promise.reject(error),
    );
  }
}

export const userApiManager = new UserApiManager();
export const userApi = userApiManager.getApi();
