import c1KCoding from '@resources/image/donation/c1-k-coding.webp';
import c2IPainting from '@resources/image/donation/c2-i-painting.webp';
import c3OShipping from '@resources/image/donation/c3-o-shipping.webp';
import c4IFlag from '@resources/image/donation/c4-i-flag.webp';
import c5KCoffee from '@resources/image/donation/c5-k-coffee.webp';
import c6TrioCheers from '@resources/image/donation/c6-trio-cheers.webp';

export const MIN_AMOUNT = 1000;
export const DEFAULT_AMOUNT = 50000;

export const CUSTOM_AMOUNT_SENTINEL = 0;

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

export type PresetCharacter = 'K' | 'I' | 'O' | 'CUSTOM';

export interface PresetOption {
  amount: number;
  character: PresetCharacter;
  description: string;
  illustration: string;
}

export const PRESET_OPTIONS: readonly PresetOption[] = [
  {
    amount: 30000,
    character: 'K',
    description: '기능 하나 더 매끈하게',
    illustration: c1KCoding,
  },
  {
    amount: 50000,
    character: 'I',
    description: '키오스쿨을 더 예쁘게',
    illustration: c2IPainting,
  },
  {
    amount: 100000,
    character: 'O',
    description: '더 편리한 기능을 위해',
    illustration: c3OShipping,
  },
  {
    amount: CUSTOM_AMOUNT_SENTINEL,
    character: 'CUSTOM',
    description: '원하는 만큼 보내기',
    illustration: c4IFlag,
  },
] as const;

export const CUSTOM_RANDOM_ILLUSTRATIONS: readonly string[] = [c4IFlag, c5KCoffee, c6TrioCheers] as const;
