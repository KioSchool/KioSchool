type AnalyticsParams = Record<string, string | number>;

export function trackEvent(name: string, params?: AnalyticsParams): void {
  const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
  if (!gtag) return;

  gtag('event', name, params ?? {});
}
