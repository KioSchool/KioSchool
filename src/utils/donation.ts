import { DONATION_COUNT_EMPTY_TEXT } from '@constants/data/customerDonationCopy';

export const MIN_DONATION_AMOUNT = 1000;

// todayCount가 null이면(조회 실패·미해결) 아무것도 그리지 않는다 — 추측하지 않는다.
export function resolveDonationCountText(todayCount: number | null): string | null {
  if (todayCount == null) return null;
  if (todayCount === 0) return DONATION_COUNT_EMPTY_TEXT;
  return `오늘 ${todayCount}명이 응원해줬어요`;
}

// 감사 화면 카운트 문구.
// 방금 후원(justDonated): rank는 그 POST 응답값 = 오늘 내 후원 순번. 그 시점의 사실이라 이후로 안 변한다.
// 재진입(recap): 순번은 더 이상 신뢰할 수 없다. 서수를 버리고 지금까지 오늘 함께한 총 후원자 수만 보여준다.
export interface ThanksCountParts {
  prefix: string;
  count: number | null;
  suffix: string;
}

export interface ThanksCountInput {
  justDonated: boolean;
  rank: number | null;
  todayCount: number | null;
}

export function resolveThanksCount({ justDonated, rank, todayCount }: ThanksCountInput): ThanksCountParts | null {
  if (justDonated) {
    if (rank == null) return null;
    if (rank <= 1) return { prefix: '오늘 ', count: null, suffix: '첫 번째 후원자님이에요' };
    return { prefix: '오늘 ', count: rank, suffix: '번째 후원자님이에요' };
  }
  if (todayCount == null || todayCount <= 0) return null;
  return { prefix: '오늘 ', count: todayCount, suffix: '명이 함께하고 있어요' };
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
