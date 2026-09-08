import type { GaEventName } from '@constants/analytics';
import { normalizePagePath } from '@utils/analyticsPath';

let isInitialized = false;

function currentPageParams(): { page_path: string; page_location: string } {
  const pagePath = normalizePagePath(window.location.pathname);
  return { page_path: pagePath, page_location: `${window.location.origin}${pagePath}` };
}

/** `App.tsx` 마운트 이전, `src/index.tsx`에서 앱 시작 시 1회만 호출한다. */
export function initAnalytics(gaId: string, environment: ImportMetaEnv['VITE_ENVIRONMENT']): void {
  if (!gaId) return;

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  // gtag.js only recognizes dataLayer entries pushed as an `arguments` object
  // (Object.prototype.toString.call === "[object Arguments]"), never a plain
  // Array — this is Google's own documented snippet form, not incidental.
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments);
  };

  window.gtag('js', new Date());

  const configParams: Record<string, unknown> = { send_page_view: false };
  if (environment !== 'production') {
    configParams.debug_mode = true;
  }
  window.gtag('config', gaId, configParams);

  isInitialized = true;
}

/**
 * 향상된 측정의 history 기반 page_view와 중복 집계되지 않도록,
 * GA4 콘솔에서 "브라우저 방문 기록 이벤트를 토대로 한 페이지 변경사항"을 꺼야 한다.
 */
export function trackPageView(pagePath: string): void {
  if (!isInitialized) return;

  const pageLocation = `${window.location.origin}${pagePath}`;

  // 이 `set`은 우리 자체 이벤트가 의존하는 값이 아니라(각 이벤트가 스스로 현재 위치를
  // 다시 계산해 붙인다 — 아래 trackEvent 참고), gtag.js가 내부적으로 자동 생성하는
  // 향상된 측정 이벤트(scroll, 아웃바운드 클릭 등)를 위한 최선의 보정이다. 이게 없으면
  // 그런 이벤트들은 여전히 실제 URL(tableHash 포함)로 떨어진다.
  window.gtag('set', { page_location: pageLocation, page_path: pagePath, page_title: document.title });

  window.gtag('event', 'page_view', {
    page_path: pagePath,
    page_location: pageLocation,
    page_title: document.title,
  });
}

/**
 * 부모(App)의 `useAnalytics` effect가 자식 페이지 컴포넌트의 effect보다 늦게 실행되므로
 * (React는 effect를 자식→부모 순으로 실행한다), 이전에 `gtag('set', ...)`으로 지속시킨
 * page_location에 의존할 수 없다. 매 이벤트마다 `window.location`에서 직접 다시 계산해
 * 순서와 무관하게 항상 현재 페이지 위치가 실리도록 한다. 동시에 `set`도 함께 갱신해,
 * gtag.js가 자체적으로 만들어내는 향상된 측정 이벤트도 최대한 이 값을 물려받게 한다.
 */
export function trackEvent(eventName: GaEventName, params: Record<string, unknown>): void {
  if (!isInitialized) return;

  const pageParams = currentPageParams();

  window.gtag('set', pageParams);

  window.gtag('event', eventName, {
    ...params,
    ...pageParams,
  });
}

export function setAnalyticsUser(userId: string | null, properties: Record<string, unknown>): void {
  if (!isInitialized) return;

  window.gtag('set', 'user_id', userId);
  window.gtag('set', 'user_properties', properties);
}
