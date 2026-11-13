import { match } from 'ts-pattern';
import { Order, OrderStatus, PaymentMethod } from '@@types/index';

const PERCENTAGE_TOTAL = 100;

export interface PaymentMethodStatistics {
  tossCount: number;
  kakaoPayCount: number;
  bankTransferCount: number;
  unknownCount: number;
  tossRatio: number;
  kakaoPayRatio: number;
  bankTransferRatio: number;
}

export function getPaymentMethodStatistics(orders: Pick<Order, 'status' | 'paymentMethod'>[]): PaymentMethodStatistics {
  let tossCount = 0;
  let kakaoPayCount = 0;
  let bankTransferCount = 0;
  let unknownCount = 0;

  orders.forEach((order) => {
    if (order.status !== OrderStatus.PAID && order.status !== OrderStatus.SERVED) return;

    match(order.paymentMethod)
      .with(PaymentMethod.TOSS, () => {
        tossCount += 1;
      })
      .with(PaymentMethod.KAKAOPAY, () => {
        kakaoPayCount += 1;
      })
      .with(PaymentMethod.BANK_TRANSFER, () => {
        bankTransferCount += 1;
      })
      .otherwise(() => {
        unknownCount += 1;
      });
  });

  const recordedCount = tossCount + kakaoPayCount + bankTransferCount;
  const toRatio = (count: number) => (recordedCount > 0 ? (count / recordedCount) * PERCENTAGE_TOTAL : 0);

  return {
    tossCount,
    kakaoPayCount,
    bankTransferCount,
    unknownCount,
    tossRatio: toRatio(tossCount),
    kakaoPayRatio: toRatio(kakaoPayCount),
    bankTransferRatio: toRatio(bankTransferCount),
  };
}
