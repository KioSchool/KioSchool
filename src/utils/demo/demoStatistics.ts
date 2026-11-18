import { DailyStatistics, OrderStatus, PopularProductItem } from '@@types/index';
import { DEMO_TABLE_COUNT } from '@constants/data/demo/demoSeed';
import { DEMO_CLOSING_STATS } from '@constants/data/demo/demoStats';
import { getPaymentMethodStatistics, PaymentMethodStatistics } from '@utils/paymentMethodStatistics';
import { findDemoProduct } from './demoBuilders';
import { DemoState } from './demoTypes';

const PERCENT = 100;
const ONE_DECIMAL = 10;

const round1 = (value: number) => Math.round(value * ONE_DECIMAL) / ONE_DECIMAL;

const byValueDesc = (a: PopularProductItem, b: PopularProductItem) => b.value - a.value;

export interface DemoClosingStatistics {
  statistics: DailyStatistics;
  paymentMethodStatistics: PaymentMethodStatistics;
}

export function getDemoClosingStatistics(state: DemoState, now: number): DemoClosingStatistics {
  const base = DEMO_CLOSING_STATS;
  const userOrder = state.orders.find((order) => order.id === state.guestOrderId && order.status !== OrderStatus.CANCELLED);
  const userItems = userOrder?.orderProducts ?? [];
  const userRevenue = userOrder?.totalPrice ?? 0;
  const userCount = Number(Boolean(userOrder));

  const totalOrders = base.orderCount + userCount;
  const totalRevenue = base.revenue + userRevenue;
  const totalSalesVolume = base.productCount + userItems.reduce((sum, item) => sum + item.quantity, 0);
  const quantityOf = (productId: number) =>
    (base.quantityByProduct.find((entry) => entry.productId === productId)?.quantity ?? 0) +
    userItems.filter((item) => item.productId === productId).reduce((sum, item) => sum + item.quantity, 0);
  const productIds = Array.from(new Set([...base.quantityByProduct.map((entry) => entry.productId), ...userItems.map((item) => item.productId)]));
  const toItem = (productId: number, value: number): PopularProductItem => ({ productId, name: findDemoProduct(productId)?.name ?? '', value });

  const paymentOrders = [
    ...base.paymentCounts.flatMap(({ paymentMethod, count }) => Array.from({ length: count }, () => ({ status: OrderStatus.SERVED, paymentMethod }))),
    ...[userOrder].filter((order) => order !== undefined).map((order) => ({ status: order.status, paymentMethod: order.paymentMethod })),
  ];

  return {
    statistics: {
      referenceDate: new Date(now).toISOString().slice(0, 10),
      totalSalesVolume,
      totalRevenue,
      averageOrderAmount: Math.round(totalRevenue / totalOrders),
      totalOrders,
      averageOrdersPerTable: round1(totalOrders / DEMO_TABLE_COUNT),
      tableTurnoverRate: base.tableTurnoverRate,
      averageStayTimeMinutes: base.averageStayMinutes,
      previousDayComparison: {
        revenueGrowthRate: round1(((totalRevenue - base.previousRevenue) / base.previousRevenue) * PERCENT),
        orderCountDifference: totalOrders - base.previousOrderCount,
      },
      salesByHour: base.hourly.map((entry) => {
        const isUserHour = entry.hour === base.userOrderHour;
        return { ...entry, orderCount: entry.orderCount + userCount * Number(isUserHour), revenue: entry.revenue + userRevenue * Number(isUserHour) };
      }),
      popularProducts: {
        byQuantity: productIds.map((productId) => toItem(productId, quantityOf(productId))).sort(byValueDesc),
        byRevenue: productIds.map((productId) => toItem(productId, quantityOf(productId) * (findDemoProduct(productId)?.price ?? 0))).sort(byValueDesc),
        byReorderRate: base.reorderRateByProduct.map((entry) => toItem(entry.productId, entry.value)),
      },
      isRealTime: false,
      lastUpdated: new Date(now).toISOString(),
    },
    paymentMethodStatistics: getPaymentMethodStatistics(paymentOrders),
  };
}
