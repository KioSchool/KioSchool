import axios from 'axios';
import { URLS } from '@constants/urls';
import { API_TIMEOUT_MS } from '@constants/network';

const REFRESH_PATH = '/refresh';

let pendingRefresh: Promise<boolean> | null = null;

/**
 * access token이 만료됐을 때 refresh token 쿠키로 다시 발급받는다. 성공 여부만 돌려준다.
 *
 * 인터셉터가 없는 전역 axios로 부른다. 앱 인스턴스를 쓰면 갱신 실패(401)가 다시 인터셉터로 들어와 갱신을 부르는 순환이 생긴다.
 * 한 화면에서 여러 요청이 동시에 401을 받아도 갱신은 한 번만 나가도록 진행 중인 요청을 공유한다.
 * 쿠키는 user·admin·super-admin 인스턴스가 함께 쓰므로 모듈 하나로 공유한다.
 */
export function refreshSession(): Promise<boolean> {
  pendingRefresh ??= axios
    .post(`${URLS.API.USER}${REFRESH_PATH}`, null, { withCredentials: true, timeout: API_TIMEOUT_MS })
    .then(() => true)
    .catch(() => false)
    .finally(() => {
      pendingRefresh = null;
    });

  return pendingRefresh;
}
