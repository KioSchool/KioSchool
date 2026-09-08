export const MIN_DONATION_AMOUNT = 1000;

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
  holderName: '박지인',
  holderNote: '키오스쿨 운영팀 모임통장',
} as const;

const ACCOUNT_NO_GROUP_SIZE = 4;
const ACCOUNT_NO_GROUP_PATTERN = new RegExp(`(\\d{${ACCOUNT_NO_GROUP_SIZE}})(?=\\d)`, 'g');

// 표시용 하이픈 구분(4-4-4). 클립보드 복사는 반드시 원본 숫자를 그대로 써야 한다.
export function formatDonationAccountNo(accountNo: string): string {
  return accountNo.replace(ACCOUNT_NO_GROUP_PATTERN, '$1-');
}
