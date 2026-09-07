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
  holderName: '박지인(모임통장)',
} as const;
