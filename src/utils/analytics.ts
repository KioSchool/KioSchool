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
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer.push(args);
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

  window.gtag('event', 'page_view', {
    page_path: pagePath,
    page_location: `${window.location.origin}${pagePath}`,
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
