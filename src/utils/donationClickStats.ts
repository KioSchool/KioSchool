import { match } from 'ts-pattern';
import { DONATION_NOTE_MESSAGES } from '@constants/data/customerDonationCopy';
import { formatCurrency } from '@utils/formatNumber';

export type DonationClickAxis = 'amount' | 'method' | 'noteIndex';

export const DONATION_CLICK_AXIS_LABEL: Record<DonationClickAxis, string> = {
  amount: '금액',
  method: '송금 수단',
  noteIndex: '안내 문구',
};

export const DONATION_METHOD_LABEL: Record<string, string> = {
  toss: '토스',
  account: '계좌이체',
};

const UNRECORDED_LABEL = '미기록';
// 계좌이체는 손님이 뱅킹 앱에서 금액을 직접 입력해 amount가 null로 기록된다.
const UNKNOWN_AMOUNT_LABEL = '계좌이체 (금액 알 수 없음)';
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
  if (key === null && axis === 'amount') return UNKNOWN_AMOUNT_LABEL;
  if (key === null) return UNRECORDED_LABEL;
  return match(axis)
    .with('amount', () => formatCurrency(Number(key)))
    .with('method', () => resolveMethodLabel(key))
    .with('noteIndex', () => resolveNoteLabel(key))
    .exhaustive();
}
