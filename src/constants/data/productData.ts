export type ProductStatus = 'SELLING' | 'SOLD_OUT' | 'HIDDEN';

interface StatusOption {
  label: string;
  value: ProductStatus;
  color: string;
}

export const STATUS_OPTIONS: StatusOption[] = [
  { label: '판매 중', value: 'SELLING', color: '#ff9142' },
  { label: '품절', value: 'SOLD_OUT', color: '#5c5c5c' },
  { label: '숨김', value: 'HIDDEN', color: '#e8eef2' },
];
