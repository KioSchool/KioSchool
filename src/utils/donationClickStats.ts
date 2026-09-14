import { match } from 'ts-pattern';
import { DONATION_NOTE_MESSAGES } from '@constants/data/customerDonationCopy';
import { formatCurrency } from '@utils/formatNumber';

export type DonationClickAxis = 'amount' | 'method' | 'variant' | 'noteIndex';

export const DONATION_CLICK_AXIS_LABEL: Record<DonationClickAxis, string> = {
  amount: '금액',
  method: '송금 수단',
  variant: '문구 변형',
  noteIndex: '안내 문구',
};

export const DONATION_METHOD_LABEL: Record<string, string> = {
  toss: '토스',
  account: '계좌이체',
};

const UNRECORDED_LABEL = '미기록';
const NOTE_LINE_BREAK = '\n';

function resolveNoteLabel(key: string): string {
  const index = Number(key);
  const message = DONATION_NOTE_MESSAGES[index];
  if (!message) return `문구 ${index + 1}`;
  return `문구 ${index + 1} · ${message.split(NOTE_LINE_BREAK)[0]}`;
}

function resolveMethodLabel(key: string): string {
  if (key in DONATION_METHOD_LABEL) return DONATION_METHOD_LABEL[key];
  return key;
}

export function resolveDonationClickBucketLabel(axis: DonationClickAxis, key: string | null): string {
  if (key === null) return UNRECORDED_LABEL;
  return match(axis)
    .with('amount', () => formatCurrency(Number(key)))
    .with('method', () => resolveMethodLabel(key))
    .with('noteIndex', () => resolveNoteLabel(key))
    .with('variant', () => key)
    .exhaustive();
}
