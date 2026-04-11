import { Color } from '@resources/colors';
import { ProductStatus } from '@@types/index';

interface StatusOption {
  label: string;
  value: ProductStatus;
  color: string;
}

export const STATUS_OPTIONS: StatusOption[] = [
  { label: '판매 중', value: ProductStatus.SELLING, color: Color.KIO_ORANGE },
  { label: '품절', value: ProductStatus.SOLD_OUT, color: Color.GREY },
  { label: '숨김', value: ProductStatus.HIDDEN, color: '#e8eef2' },
];

export const MAX_PRODUCT_IMAGE_SIZE = 1024 * 1024 * 5;

export const DROPDOWN_EVENT_KEY = 'admin-product-selector-dropdown';
