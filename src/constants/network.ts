/**
 * 네트워크 계층 진단 상수.
 *
 * 다른 도메인 요청이 실패하면 브라우저는 원인(DNS·TLS·프록시 차단·CORS 사전 요청 실패)을
 * JS에 숨기고 status 0만 준다. 그래서 "온라인인가", "API 호스트에 단순 GET은 닿는가"를
 * 따로 재서 실패 계층을 추정한다. 재는 쪽은 utils/networkProbe.ts.
 */

/** 온라인이고 API 호스트도 닿는데 요청만 죽었을 때 인터셉터가 쏘는 window 이벤트. */
export const NETWORK_BLOCKED_EVENT = 'networkBlocked';

/** 커스텀 헤더 없는 단순 GET이라 사전 요청(preflight)이 붙지 않는다. useServerHealth와 프로브가 공유한다. */
export const HEALTH_CHECK_PATH = '/actuator/health';

/** 프로브 타임아웃. 헬스체크 GET은 평시 수백 ms 안에 끝나므로 2초를 넘기면 호스트 불통으로 본다. */
export const NETWORK_PROBE_TIMEOUT_MS = 2000;

/** 같은 실패가 연타로 들어올 때(버튼 반복 클릭) 프로브 결과를 재사용하는 시간. */
export const NETWORK_PROBE_CACHE_MS = 10000;
