import axios, { AxiosError } from 'axios';
import { URLS } from '@constants/urls';
import { HEALTH_CHECK_PATH, NETWORK_PROBE_CACHE_MS, NETWORK_PROBE_TIMEOUT_MS } from '@constants/network';

/**
 * status 0 실패의 계층 추정 결과.
 * - offline: 브라우저가 오프라인. 기존 오프라인 토스트가 담당한다.
 * - host_unreachable: 온라인인데 단순 GET도 안 닿는다. DNS·TLS·서버 다운.
 * - blocked_request: 온라인이고 단순 GET은 닿는데 원래 요청만 죽었다.
 *   사전 요청(preflight)이 필요한 JSON POST만 막는 기업망 프록시의 전형이다.
 */
export type NetworkProbeResult = 'offline' | 'host_unreachable' | 'blocked_request';

/** 응답 자체가 없는 실패(status 0). 취소(ERR_CANCELED)와 타임아웃(ECONNABORTED)은 제외한다. */
export function isNetworkFailure(error: unknown): error is AxiosError {
  return axios.isAxiosError(error) && !error.response && error.code === AxiosError.ERR_NETWORK;
}

let cachedProbe: { at: number; result: NetworkProbeResult } | null = null;

/**
 * 인터셉터가 없는 전역 axios로 헬스체크를 친다.
 * 앱의 인스턴스를 쓰면 프로브 실패가 다시 인터셉터로 들어와 프로브를 부르는 순환이 생긴다.
 * 커스텀 헤더 없는 GET이라 사전 요청이 붙지 않는다는 점이 이 진단의 핵심이다.
 */
async function isApiHostReachable(): Promise<boolean> {
  try {
    await axios.get(`${URLS.API.USER}${HEALTH_CHECK_PATH}`, {
      withCredentials: true,
      timeout: NETWORK_PROBE_TIMEOUT_MS,
      validateStatus: () => true, // 어떤 status든 HTTP 응답이 왔다는 사실만 본다
    });
    return true;
  } catch {
    return false;
  }
}

export async function probeNetwork(): Promise<NetworkProbeResult> {
  if (!navigator.onLine) return 'offline';

  const now = Date.now();
  if (cachedProbe && now - cachedProbe.at < NETWORK_PROBE_CACHE_MS) return cachedProbe.result;

  const result: NetworkProbeResult = (await isApiHostReachable()) ? 'blocked_request' : 'host_unreachable';
  cachedProbe = { at: now, result };

  return result;
}
