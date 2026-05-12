import c1KCoding from '@resources/image/donation/c1-k-coding.png';
import c2IPainting from '@resources/image/donation/c2-i-painting.png';
import c3OShipping from '@resources/image/donation/c3-o-shipping.png';
import c4IFlag from '@resources/image/donation/c4-i-flag.png';
import c5KCoffee from '@resources/image/donation/c5-k-coffee.png';
import c6TrioCheers from '@resources/image/donation/c6-trio-cheers.png';

export const MIN_AMOUNT = 1000;
export const DEFAULT_AMOUNT = 50000;

export const UNDERFLOW_THRESHOLD = 10000;
export const OVERFLOW_THRESHOLD = 100000;

export interface PresetOption {
  amount: number;
  character: 'K' | 'I' | 'O';
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
] as const;

export const CUSTOM_MAIN_ILLUSTRATION = c4IFlag;
export const UNDERFLOW_ILLUSTRATION = c5KCoffee;
export const OVERFLOW_ILLUSTRATION = c6TrioCheers;

export const UNDERFLOW_COPY = '커피 한 잔도 진짜 큰 힘이에요';
export const OVERFLOW_COPY = '사장님 덕분에 이번 주 회식 가능합니다';
