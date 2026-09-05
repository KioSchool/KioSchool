import type { GaEventName } from '@constants/analytics';

let isInitialized = false;

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

  // `gtag('set', ...)` persists these fields for every subsequent event on
  // this page, not just this one — without it, ecommerce events fired later
  // on the same page fall back to `document.location.href`, which leaks the
  // real query string (including `tableHash`, an order-auth token) to GA4.
  window.gtag('set', { page_location: pageLocation, page_path: pagePath, page_title: document.title });

  window.gtag('event', 'page_view', {
    page_path: pagePath,
    page_location: pageLocation,
    page_title: document.title,
  });
}

export function trackEvent(eventName: GaEventName, params: Record<string, unknown>): void {
  if (!isInitialized) return;

  window.gtag('event', eventName, params);
}

export function setAnalyticsUser(userId: string | null, properties: Record<string, unknown>): void {
  if (!isInitialized) return;

  window.gtag('set', 'user_id', userId ?? undefined);
  window.gtag('set', 'user_properties', properties);
}
