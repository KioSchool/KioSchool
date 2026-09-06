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
