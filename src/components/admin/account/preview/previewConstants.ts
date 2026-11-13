import { OrderProduct } from '@@types/index';

export const SCREEN_WIDTH = 390;
export const SCREEN_HEIGHT = 844;
export const PHONE_INNER_WIDTH = 207;
export const PHONE_INNER_HEIGHT = 447;
export const PREVIEW_SCALE = PHONE_INNER_WIDTH / SCREEN_WIDTH;

export const LABEL_ROW_HEIGHT = 32;
export const COLUMN_GAP = 10;
export const PHONE_COLUMN_HEIGHT = 501;
const PHONE_FRAME_INSET = 6;
// 결제 화면(390px 기준)에서 송금 방법 카드 묶음의 가운데 높이
const METHOD_LIST_CENTER_Y = 248;
const BUBBLE_HALF_HEIGHT = 16;
export const BUBBLE_TOP = LABEL_ROW_HEIGHT + COLUMN_GAP + PHONE_FRAME_INSET + Math.round(METHOD_LIST_CENTER_Y * PREVIEW_SCALE) - BUBBLE_HALF_HEIGHT;

export const SAMPLE_AMOUNT = 27000;
export const SAMPLE_SUMMARY = '닭꼬치 외 2개';

const sampleProduct = (id: number, productName: string, price: number): OrderProduct => ({
  id,
  productId: id,
  productName,
  productPrice: price,
  quantity: 1,
  totalPrice: price,
  isServed: false,
  servedCount: 0,
  createdAt: '',
  updatedAt: '',
});

export const SAMPLE_PRODUCTS = [sampleProduct(1, '닭꼬치', 12000), sampleProduct(2, '김치전', 10000), sampleProduct(3, '콜라', 5000)];
