import { Order, OrderStatus, Product, ProductStatus } from '@@types/index';

const MS_PER_MINUTE = 60_000;
const FIXTURE_TIMESTAMP = '2026-10-17T18:00:00';

function toLocalIsoString(date: Date) {
  const offsetMs = date.getTimezoneOffset() * MS_PER_MINUTE;
  return new Date(date.getTime() - offsetMs).toISOString().replace('Z', '');
}

function createFixtureProduct(id: number, name: string, price: number): Product {
  return {
    id,
    name,
    description: '',
    price,
    status: ProductStatus.SELLING,
    imageUrl: '',
    createdAt: FIXTURE_TIMESTAMP,
    updatedAt: FIXTURE_TIMESTAMP,
    productCategory: null,
  };
}

export const FIXTURE_PRODUCTS: Product[] = [
  createFixtureProduct(9001, '닭꼬치', 4000),
  createFixtureProduct(9002, '김치전', 12000),
  createFixtureProduct(9003, '모둠 감자튀김', 9000),
  createFixtureProduct(9004, '하이볼', 6000),
  createFixtureProduct(9005, '산낙지', 12000),
  createFixtureProduct(9006, '생수 500ml', 1000),
];

interface FixtureOrderProduct {
  productId: number;
  productName: string;
  quantity: number;
  servedCount?: number;
}

interface FixtureOrderOptions {
  id: number;
  status: OrderStatus;
  minutesAgo: number;
  tableNumber: number;
  customerName?: string;
  products: FixtureOrderProduct[];
}

const FIXTURE_UNIT_PRICE = 5000;

/** 스토리 전용. createdAt은 렌더 시점 기준 minutesAgo분 전의 로컬 시각(Z 없음)이라 경과 시간이 실제로 흐른다. */
export function createFixtureOrder({ id, status, minutesAgo, tableNumber, customerName = '김두연', products }: FixtureOrderOptions): Order {
  const createdAt = toLocalIsoString(new Date(Date.now() - minutesAgo * MS_PER_MINUTE));
  const orderProducts = products.map((product, index) => {
    const servedCount = product.servedCount ?? 0;
    return {
      id: id * 100 + index,
      productId: product.productId,
      productName: product.productName,
      productPrice: FIXTURE_UNIT_PRICE,
      quantity: product.quantity,
      servedCount,
      isServed: servedCount === product.quantity,
      totalPrice: FIXTURE_UNIT_PRICE * product.quantity,
      createdAt,
      updatedAt: createdAt,
    };
  });

  return {
    id,
    tableNumber,
    phoneNumber: '',
    customerName,
    orderProducts,
    totalPrice: orderProducts.reduce((sum, product) => sum + product.totalPrice, 0),
    status,
    paymentMethod: null,
    cancelReason: '',
    orderNumber: id,
    orderSession: null,
    createdAt,
    updatedAt: createdAt,
  };
}
