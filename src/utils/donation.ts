import { DONATION_COUNT_EMPTY_TEXT } from '@constants/data/customerDonationCopy';

export const MIN_DONATION_AMOUNT = 1000;

// todayCount가 null이면(조회 실패·미해결) 아무것도 그리지 않는다 — 추측하지 않는다.
export function resolveDonationCountText(todayCount: number | null): string | null {
  if (todayCount == null) return null;
  if (todayCount === 0) return DONATION_COUNT_EMPTY_TEXT;
  return `오늘 ${todayCount}명이 응원해줬어요`;
}

// 감사 화면 카운트 문구. todayCount는 방금 본인 POST로 +1된 값 = 오늘 몇 번째 후원자인지.
// count가 null이면 숫자 강조 없이 suffix만 노출한다(오늘 첫 후원자).
export interface ThanksCountParts {
  prefix: string;
  count: number | null;
  suffix: string;
}

export function resolveThanksCount(todayCount: number | null): ThanksCountParts | null {
  if (todayCount == null) return null;
  if (todayCount <= 1) return { prefix: '오늘 ', count: null, suffix: '첫 번째 후원자님이에요' };
  return { prefix: '오늘 ', count: todayCount, suffix: '번째 후원자님이에요' };
}

const TOSS_BANK_NAME = '토스뱅크';
const TOSS_ACCOUNT_NO = '100127738116';

export function buildDonationTossUrl(amount?: number): string {
  const params = new URLSearchParams();
  params.set('bank', TOSS_BANK_NAME);
  params.set('accountNo', TOSS_ACCOUNT_NO);
  params.set('origin', 'qr');
  if (amount && amount > 0) {
    params.set('amount', String(amount));
  }
  return `supertoss://send?${params.toString()}`;
}

// 손님 계좌이체 폴백용. 토스 딥링크와 같은 계좌.
export const DONATION_ACCOUNT = {
  bankName: '토스뱅크',
  accountNo: '100127738116',
  holderName: '박지인(모임통장)',
  holderNote: '키오스쿨 운영팀 모임통장',
} as const;

const ACCOUNT_NO_GROUP_SIZE = 4;
const ACCOUNT_NO_GROUP_PATTERN = new RegExp(`(\\d{${ACCOUNT_NO_GROUP_SIZE}})(?=\\d)`, 'g');

// 표시용 하이픈 구분(4-4-4). 클립보드 복사는 반드시 원본 숫자를 그대로 써야 한다.
export function formatDonationAccountNo(accountNo: string): string {
  return accountNo.replace(ACCOUNT_NO_GROUP_PATTERN, '$1-');
}
