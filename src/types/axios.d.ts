import 'axios';

declare module 'axios' {
  interface AxiosRequestConfig {
    skipGlobalLoading?: boolean;
  }
}
