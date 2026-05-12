import c1KCoding from '@resources/image/donation/c1-k-coding.png';
import c2IPainting from '@resources/image/donation/c2-i-painting.png';
import c3OShipping from '@resources/image/donation/c3-o-shipping.png';
import c4IFlag from '@resources/image/donation/c4-i-flag.png';
import c5KCoffee from '@resources/image/donation/c5-k-coffee.png';
import c6TrioCheers from '@resources/image/donation/c6-trio-cheers.png';

export const MIN_AMOUNT = 1000;
export const DEFAULT_AMOUNT = 50000;

export const CUSTOM_AMOUNT_SENTINEL = 0;

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
    description: '이번 달 개선 작업 한 사이클',
    illustration: c2IPainting,
  },
  {
    amount: 100000,
    character: 'O',
    description: '다음 신기능 하나, 통째로',
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
