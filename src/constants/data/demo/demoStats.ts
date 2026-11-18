import { PaymentMethod } from '@@types/index';

// 축제 하루를 마감한 통계(데모 주점 통계 화면 값). 체험에서 넣은 주문은 여기에 더해 보여 준다
export const DEMO_CLOSING_STATS = {
  orderCount: 85,
  revenue: 784500,
  productCount: 212,
  previousRevenue: 491500,
  previousOrderCount: 50,
  tableTurnoverRate: 3.6,
  averageStayMinutes: 72,
  userOrderHour: 20,
  hourly: [
    { hour: 18, orderCount: 21, revenue: 185500 },
    { hour: 19, orderCount: 6, revenue: 51000 },
    { hour: 20, orderCount: 10, revenue: 75500 },
    { hour: 21, orderCount: 16, revenue: 132500 },
    { hour: 22, orderCount: 18, revenue: 208500 },
    { hour: 23, orderCount: 14, revenue: 131500 },
  ],
  quantityByProduct: [
    { productId: 1, quantity: 52 },
    { productId: 5, quantity: 46 },
    { productId: 4, quantity: 41 },
    { productId: 3, quantity: 37 },
    { productId: 6, quantity: 36 },
  ],
  reorderRateByProduct: [
    { productId: 4, value: 38 },
    { productId: 1, value: 31 },
    { productId: 5, value: 27 },
    { productId: 3, value: 22 },
    { productId: 6, value: 18 },
  ],
  paymentCounts: [
    { paymentMethod: PaymentMethod.TOSS, count: 45 },
    { paymentMethod: PaymentMethod.KAKAOPAY, count: 22 },
    { paymentMethod: PaymentMethod.BANK_TRANSFER, count: 18 },
  ],
};
