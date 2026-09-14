const ACQUISITION_CONTEXT_STORAGE_KEY = 'kioschool_acquisition_context';
const ACQUISITION_CONTEXT_MAX_LENGTH = 500;
const ACQUISITION_ENTRY_VALUE_MAX_LENGTH = 80;
const ACQUISITION_ENTRY_SEPARATOR = '&';
const ACQUISITION_KEY_VALUE_SEPARATOR = '=';

export const ACQUISITION_CONTEXT_KEYS = ['source', 'medium', 'campaign', 'ref', 'landing'] as const;

export type AcquisitionContextKey = typeof ACQUISITION_CONTEXT_KEYS[number];

export const ACQUISITION_CONTEXT_KEY_LABEL: Record<AcquisitionContextKey, string> = {
  source: 'UTM source',
  medium: 'UTM medium',
  campaign: 'UTM campaign',
  ref: '유입 사이트',
  landing: '첫 방문 경로',
};

function sanitizeEntryValue(value: string): string {
  return value.replace(/[^\w.\-/:]/g, '').slice(0, ACQUISITION_ENTRY_VALUE_MAX_LENGTH);
}

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

    const source = sanitizeEntryValue(params.get('utm_source') ?? '');
    if (source) entries.push(`source=${source}`);

    const medium = sanitizeEntryValue(params.get('utm_medium') ?? '');
    if (medium) entries.push(`medium=${medium}`);

    const campaign = sanitizeEntryValue(params.get('utm_campaign') ?? '');
    if (campaign) entries.push(`campaign=${campaign}`);

    const referrerOrigin = getReferrerOrigin();
    const sanitizedReferrerOrigin = referrerOrigin ? sanitizeEntryValue(referrerOrigin) : '';
    if (sanitizedReferrerOrigin) entries.push(`ref=${sanitizedReferrerOrigin}`);

    if (entries.length === 0) return;

    entries.push(`landing=${sanitizeEntryValue(window.location.pathname)}`);
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

function isAcquisitionContextKey(key: string): key is AcquisitionContextKey {
  return (ACQUISITION_CONTEXT_KEYS as readonly string[]).includes(key);
}

export function parseAcquisitionContext(context: string | null): Partial<Record<AcquisitionContextKey, string>> {
  if (!context) return {};

  const parsed: Partial<Record<AcquisitionContextKey, string>> = {};
  context.split(ACQUISITION_ENTRY_SEPARATOR).forEach((entry) => {
    const separatorIndex = entry.indexOf(ACQUISITION_KEY_VALUE_SEPARATOR);
    if (separatorIndex === -1) return;

    const key = entry.slice(0, separatorIndex);
    if (!isAcquisitionContextKey(key)) return;
    parsed[key] = entry.slice(separatorIndex + 1);
  });
  return parsed;
}
