const ACQUISITION_CONTEXT_STORAGE_KEY = 'kioschool_acquisition_context';
const ACQUISITION_CONTEXT_MAX_LENGTH = 500;

function getReferrerOrigin(): string | null {
  if (!document.referrer) return null;

  try {
    const referrerOrigin = new URL(document.referrer).origin;
    if (referrerOrigin === window.location.origin) return null;
    return referrerOrigin;
  } catch {
    return null;
  }
}

function truncateAtSeparator(value: string): string {
  if (value.length <= ACQUISITION_CONTEXT_MAX_LENGTH) return value;

  const sliced = value.slice(0, ACQUISITION_CONTEXT_MAX_LENGTH);
  const lastSeparator = sliced.lastIndexOf('&');
  if (lastSeparator === -1) return sliced;
  return sliced.slice(0, lastSeparator);
}

export function captureAcquisitionContext(): void {
  try {
    if (localStorage.getItem(ACQUISITION_CONTEXT_STORAGE_KEY)) return;

    const params = new URLSearchParams(window.location.search);
    const entries: string[] = [];

    const source = params.get('utm_source');
    if (source) entries.push(`source=${source}`);

    const medium = params.get('utm_medium');
    if (medium) entries.push(`medium=${medium}`);

    const campaign = params.get('utm_campaign');
    if (campaign) entries.push(`campaign=${campaign}`);

    const referrerOrigin = getReferrerOrigin();
    if (referrerOrigin) entries.push(`ref=${referrerOrigin}`);

    if (entries.length === 0) return;

    entries.push(`landing=${window.location.pathname}`);
    localStorage.setItem(ACQUISITION_CONTEXT_STORAGE_KEY, truncateAtSeparator(entries.join('&')));
  } catch {
    // 시크릿 모드 등에서 localStorage 접근이 막혀도 회원가입은 막히면 안 된다
  }
}

export function readAcquisitionContext(): string | null {
  try {
    return localStorage.getItem(ACQUISITION_CONTEXT_STORAGE_KEY);
  } catch {
    return null;
  }
}
