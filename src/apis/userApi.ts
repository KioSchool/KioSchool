import axios, { AxiosInstance } from 'axios';
import { setupApiInterceptors } from 'src/utils/apiInterceptors';
import { URLS } from '@constants/urls';
import { API_TIMEOUT_MS } from '@constants/network';

class UserApiManager {
  private controller: AbortController;

  private api: AxiosInstance;

  constructor() {
    this.controller = new AbortController();
    this.api = axios.create({
      baseURL: URLS.API.USER,
      withCredentials: true,
      timeout: API_TIMEOUT_MS,
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
    setupApiInterceptors(this.api);
  }
}

export const userApiManager = new UserApiManager();
export const userApi = userApiManager.getApi();
