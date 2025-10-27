import axios, { AxiosInstance } from 'axios';
import { setupApiInterceptors } from 'src/utils/apiInterceptors';
import { URLS } from '@constants/urls';

class UserApiManager {
  private controller: AbortController;

  private api: AxiosInstance;

  constructor() {
    this.controller = new AbortController();
    this.api = axios.create({
      baseURL: URLS.API.USER,
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
    setupApiInterceptors(this.api);
  }
}

export const userApiManager = new UserApiManager();
export const userApi = userApiManager.getApi();
