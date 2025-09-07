import axios, { AxiosInstance } from 'axios';
import { setupApiInterceptors } from 'src/utils/apiInterceptors';

const ENVIRONMENT = import.meta.env.VITE_ENVIRONMENT;

class AdminApiManager {
  private controller: AbortController;

  private api: AxiosInstance;

  constructor() {
    this.controller = new AbortController();
    this.api = axios.create({
      baseURL: ENVIRONMENT == 'development' ? 'http://localhost:8080/admin' : 'https://api.kio-school.com/admin',
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
    setupApiInterceptors(this.api, () => this.controller, {
      authErrorEvent: 'adminAuthError',
      onAuthError: () => {
        this.abort();
        this.renewController();
      },
    });
  }
}

export default AdminApiManager;

export const adminApiManager = new AdminApiManager();
export const adminApi = adminApiManager.getApi();
