import { GHOST_TYPE, Order, OrderProduct, OrderProductBase, OrderSession, OrderStatus, PaymentMethod, Table } from '@@types/index';
import { DEMO_PRODUCTS, DEMO_SESSION_ID_OFFSET, DEMO_TABLE_POSITIONS, DEMO_USAGE_MINUTES } from '@constants/data/demo/demoSeed';

const MS_PER_MINUTE = 60_000;
const ORDER_PRODUCT_ID_MULTIPLIER = 10;

export const minutesBefore = (now: number, minutes: number) => new Date(now - minutes * MS_PER_MINUTE).toISOString();

export const addMinutes = (iso: string, minutes: number) => new Date(new Date(iso).getTime() + minutes * MS_PER_MINUTE).toISOString();

export const findDemoProduct = (productId: number) => DEMO_PRODUCTS.find((product) => product.id === productId);

export function buildOrderProducts(orderId: number, items: { productId: number; quantity: number; isServed: boolean }[], createdAt: string): OrderProduct[] {
  return items.map((item, index) => {
    const product = findDemoProduct(item.productId);
    const price = product?.price ?? 0;
    return {
      id: orderId * ORDER_PRODUCT_ID_MULTIPLIER + index,
      productId: item.productId,
      productName: product?.name ?? '',
      productPrice: price,
      quantity: item.quantity,
      totalPrice: price * item.quantity,
      isServed: item.isServed,
      servedCount: Number(item.isServed) * item.quantity,
      createdAt,
      updatedAt: createdAt,
    };
  });
}

export const basketToItems = (basket: OrderProductBase[]) => basket.map((entry) => ({ productId: entry.productId, quantity: entry.quantity, isServed: false }));

export function buildSession(tableNumber: number, createdAt: string): OrderSession {
  return {
    id: DEMO_SESSION_ID_OFFSET + tableNumber,
    tableNumber,
    expectedEndAt: addMinutes(createdAt, DEMO_USAGE_MINUTES),
    endAt: null,
    usageTime: DEMO_USAGE_MINUTES,
    totalOrderPrice: 0,
    orderCount: 0,
    ghostType: GHOST_TYPE.NONE,
    createdAt,
    updatedAt: createdAt,
  };
}

export function buildTable(tableNumber: number, orderSession: OrderSession | null, createdAt: string): Table {
  return {
    id: tableNumber,
    tableNumber,
    tableHash: `demo-table-${tableNumber}`,
    orderSession,
    position: DEMO_TABLE_POSITIONS[tableNumber] ?? null,
    createdAt,
    updatedAt: createdAt,
  };
}

interface BuildOrderInput {
  id: number;
  orderNumber: number;
  tableNumber: number;
  customerName: string;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  createdAt: string;
  orderProducts: OrderProduct[];
  orderSession: OrderSession | null;
}

export function buildOrder({
  id,
  orderNumber,
  tableNumber,
  customerName,
  status,
  paymentMethod,
  createdAt,
  orderProducts,
  orderSession,
}: BuildOrderInput): Order {
  return {
    id,
    orderNumber,
    tableNumber,
    customerName,
    phoneNumber: '',
    status,
    paymentMethod,
    cancelReason: '',
    orderProducts,
    totalPrice: orderProducts.reduce((sum, product) => sum + product.totalPrice, 0),
    orderSession,
    createdAt,
    updatedAt: createdAt,
  };
}

export function withSessionTotals(tables: Table[], orders: Order[]): Table[] {
  return tables.map((table) => {
    if (!table.orderSession) return table;
    const sessionOrders = orders.filter(
      (order) => order.tableNumber === table.tableNumber && order.status !== OrderStatus.CANCELLED && order.orderSession?.id === table.orderSession?.id,
    );
    return {
      ...table,
      orderSession: {
        ...table.orderSession,
        orderCount: sessionOrders.length,
        totalOrderPrice: sessionOrders.reduce((sum, order) => sum + order.totalPrice, 0),
      },
    };
  });
}
