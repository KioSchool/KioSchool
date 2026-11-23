import { Account, OrderStatus, PaymentMethod, Product, ProductCategory, ProductStatus, TablePosition, Workspace } from '@@types/index';
import {
  defaultAccountValue,
  defaultBankValue,
  defaultImageValue,
  defaultUserValue,
  defaultWorkspaceSetting,
  defaultWorkspaceValue,
} from '@@types/defaultValues';
import product1 from '@resources/image/demo/product-1.webp';
import product2 from '@resources/image/demo/product-2.webp';
import product3 from '@resources/image/demo/product-3.webp';
import product4 from '@resources/image/demo/product-4.webp';
import product5 from '@resources/image/demo/product-5.webp';
import product6 from '@resources/image/demo/product-6.webp';
import workspaceImage from '@resources/image/demo/workspace.webp';

export const DEMO_TABLE_NUMBER = 7;
export const DEMO_TABLE_COUNT = 8;
export const DEMO_USAGE_MINUTES = 90;
export const DEMO_USER_ORDER_ID = 300;
export const DEMO_SESSION_ID_OFFSET = 90;

const SEED_TIME = '2026-11-18T00:00:00.000Z';
// 송금 앱 주소가 있어야 토스·카카오페이가 송금 수단으로 보인다. 체험에서는 열지 않는다
const DEMO_PAY_APP_URL = '#demo';

export const DEMO_CATEGORIES: ProductCategory[] = [
  { id: 1, name: '음식', index: 0, createdAt: SEED_TIME, updatedAt: SEED_TIME },
  { id: 2, name: '음료', index: 1, createdAt: SEED_TIME, updatedAt: SEED_TIME },
];

const [FOOD, DRINK] = DEMO_CATEGORIES;

function createProduct(
  id: number,
  name: string,
  price: number,
  description: string,
  imageUrl: string,
  category: ProductCategory,
  status = ProductStatus.SELLING,
): Product {
  return { id, name, price, description, imageUrl, status, productCategory: category, createdAt: SEED_TIME, updatedAt: SEED_TIME };
}

export const DEMO_PRODUCTS: Product[] = [
  createProduct(3, '감자튀김', 4500, '케첩과 함께 드려요', product3, FOOD),
  createProduct(4, '어묵탕', 6000, '따끈한 어묵 국물', product4, FOOD),
  createProduct(1, '닭꼬치', 4000, '간장 양념 닭꼬치 2개', product1, FOOD),
  createProduct(2, '떡볶이', 5000, '국물 떡볶이 1인분', product2, FOOD, ProductStatus.SOLD_OUT),
  createProduct(5, '콜라', 2000, '캔 355ml', product5, DRINK),
  createProduct(6, '사이다', 2000, '캔 355ml', product6, DRINK),
];

export const DEMO_ACCOUNT: Account = {
  ...defaultAccountValue,
  bank: { ...defaultBankValue, id: 1, name: '토스뱅크', code: '092', tossName: '토스뱅크' },
  accountNumber: '1000-1234-5678',
  accountHolder: '컴공 학생회',
  tossAccountUrl: DEMO_PAY_APP_URL,
  kakaoPayAccountUrl: DEMO_PAY_APP_URL,
  id: 1,
};

export const DEMO_WORKSPACE: Workspace = {
  ...defaultWorkspaceValue,
  id: 1,
  name: '컴퓨터공학과 주점',
  description: '컴공 학생회 주점입니다. 닭꼬치와 떡볶이가 대표 메뉴예요.',
  notice: '주문 후 안내된 계좌로 송금해주세요. 입금이 확인되면 조리를 시작합니다.',
  owner: { ...defaultUserValue, name: '박지인', account: DEMO_ACCOUNT },
  products: DEMO_PRODUCTS,
  productCategories: DEMO_CATEGORIES,
  images: [{ ...defaultImageValue, id: 1, url: workspaceImage, createdAt: SEED_TIME, updatedAt: SEED_TIME }],
  tableCount: DEMO_TABLE_COUNT,
  isOnboarding: false,
  workspaceSetting: { ...defaultWorkspaceSetting, useOrderSessionTimeLimit: true, orderSessionTimeLimitMinutes: DEMO_USAGE_MINUTES },
  createdAt: SEED_TIME,
  updatedAt: SEED_TIME,
};

export const DEMO_TABLE_POSITIONS: Record<number, TablePosition> = {
  1: { x: 1, y: 0 },
  2: { x: 2, y: 0 },
  3: { x: 3, y: 0 },
  4: { x: 4, y: 0 },
  5: { x: 1, y: 2 },
  6: { x: 2, y: 2 },
  7: { x: 3, y: 2 },
  8: { x: 4, y: 2 },
};

export interface DemoSeedSession {
  tableNumber: number;
  startedMinutesAgo: number;
}

// 시각은 장면(20:40) 기준 몇 분 전. 체험을 연 시각에 맞춰 옮긴다
export const DEMO_SEED_SESSIONS: DemoSeedSession[] = [
  { tableNumber: 1, startedMinutesAgo: 62 },
  { tableNumber: 2, startedMinutesAgo: 38 },
  { tableNumber: 3, startedMinutesAgo: 78 },
  { tableNumber: 5, startedMinutesAgo: 22 },
  { tableNumber: 6, startedMinutesAgo: 45 },
];

export interface DemoSeedOrderItem {
  productId: number;
  quantity: number;
  isServed: boolean;
}

export interface DemoSeedOrder {
  id: number;
  tableNumber: number;
  customerName: string;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  minutesAgo: number;
  items: DemoSeedOrderItem[];
}

const item = (productId: number, quantity: number, isServed = false): DemoSeedOrderItem => ({ productId, quantity, isServed });

export const DEMO_SEED_ORDERS: DemoSeedOrder[] = [
  {
    id: 251,
    tableNumber: 2,
    customerName: '정지원',
    status: OrderStatus.NOT_PAID,
    paymentMethod: PaymentMethod.TOSS,
    minutesAgo: 15,
    items: [item(1, 1), item(5, 1), item(6, 1)],
  },
  { id: 257, tableNumber: 5, customerName: '이성종', status: OrderStatus.NOT_PAID, paymentMethod: PaymentMethod.TOSS, minutesAgo: 8, items: [item(3, 1)] },
  {
    id: 259,
    tableNumber: 6,
    customerName: '정지원',
    status: OrderStatus.PAID,
    paymentMethod: PaymentMethod.BANK_TRANSFER,
    minutesAgo: 19,
    items: [item(5, 1)],
  },
  { id: 249, tableNumber: 1, customerName: '박지인', status: OrderStatus.PAID, paymentMethod: PaymentMethod.TOSS, minutesAgo: 17, items: [item(3, 2)] },
  { id: 256, tableNumber: 5, customerName: '이성종', status: OrderStatus.PAID, paymentMethod: PaymentMethod.TOSS, minutesAgo: 16, items: [item(1, 1)] },
  {
    id: 255,
    tableNumber: 3,
    customerName: '서아영',
    status: OrderStatus.PAID,
    paymentMethod: PaymentMethod.TOSS,
    minutesAgo: 15,
    items: [item(4, 1), item(5, 2)],
  },
  {
    id: 252,
    tableNumber: 3,
    customerName: '서아영',
    status: OrderStatus.SERVED,
    paymentMethod: PaymentMethod.TOSS,
    minutesAgo: 72,
    items: [item(4, 2, true), item(3, 1, true)],
  },
  { id: 247, tableNumber: 1, customerName: '박지인', status: OrderStatus.SERVED, paymentMethod: PaymentMethod.TOSS, minutesAgo: 57, items: [item(5, 4, true)] },
  { id: 253, tableNumber: 3, customerName: '서아영', status: OrderStatus.SERVED, paymentMethod: PaymentMethod.TOSS, minutesAgo: 54, items: [item(1, 2, true)] },
  {
    id: 258,
    tableNumber: 6,
    customerName: '정지원',
    status: OrderStatus.SERVED,
    paymentMethod: PaymentMethod.BANK_TRANSFER,
    minutesAgo: 41,
    items: [item(3, 1, true)],
  },
  {
    id: 248,
    tableNumber: 1,
    customerName: '박지인',
    status: OrderStatus.SERVED,
    paymentMethod: PaymentMethod.BANK_TRANSFER,
    minutesAgo: 39,
    items: [item(1, 2, true), item(4, 2, true)],
  },
  {
    id: 254,
    tableNumber: 3,
    customerName: '서아영',
    status: OrderStatus.SERVED,
    paymentMethod: PaymentMethod.BANK_TRANSFER,
    minutesAgo: 36,
    items: [item(5, 2, true)],
  },
  {
    id: 250,
    tableNumber: 2,
    customerName: '정지원',
    status: OrderStatus.SERVED,
    paymentMethod: PaymentMethod.BANK_TRANSFER,
    minutesAgo: 33,
    items: [item(6, 1, true), item(1, 1, true)],
  },
];
