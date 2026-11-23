import { PaymentMethod } from '@@types/index';

// 축제 하루를 마감한 통계(랜딩 '자동 정산' 그림과 같은 값). 체험에서 넣은 주문은 여기에 더해 보여 준다
export const DEMO_CLOSING_STATS = {
  orderCount: 120,
  revenue: 1010000,
  productCount: 282,
  previousRevenue: 733500,
  previousOrderCount: 89,
  tableTurnoverRate: 3.5,
  averageStayMinutes: 71,
  userOrderHour: 20,
  hourly: [
    { hour: 18, orderCount: 17, revenue: 167000 },
    { hour: 19, orderCount: 21, revenue: 131500 },
    { hour: 20, orderCount: 33, revenue: 275500 },
    { hour: 21, orderCount: 26, revenue: 252500 },
    { hour: 22, orderCount: 19, revenue: 157500 },
    { hour: 23, orderCount: 4, revenue: 26000 },
  ],
  quantityByProduct: [
    { productId: 1, quantity: 98 },
    { productId: 5, quantity: 71 },
    { productId: 4, quantity: 40 },
    { productId: 6, quantity: 37 },
    { productId: 3, quantity: 36 },
  ],
  reorderRateByProduct: [
    { productId: 4, value: 38 },
    { productId: 1, value: 31 },
    { productId: 5, value: 27 },
    { productId: 3, value: 22 },
    { productId: 6, value: 18 },
  ],
  paymentCounts: [
    { paymentMethod: PaymentMethod.TOSS, count: 62 },
    { paymentMethod: PaymentMethod.KAKAOPAY, count: 31 },
    { paymentMethod: PaymentMethod.BANK_TRANSFER, count: 27 },
  ],
};
