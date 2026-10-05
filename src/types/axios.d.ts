import 'axios';

declare module 'axios' {
  interface AxiosRequestConfig {
    skipGlobalLoading?: boolean;
    // access token 갱신 뒤 다시 보낸 요청. 또 401이 나면 갱신을 반복하지 않고 로그아웃한다.
    skipAuthRefresh?: boolean;
  }
}
