import { PaymentMethod } from '@@types/index';

export const PAYMENT_METHOD_LABELS: Record<PaymentMethod, string> = {
  TOSS: '토스',
  BANK_TRANSFER: '계좌',
};

// null은 기록이 없는 주문이다(송금수단 저장 전 주문, 구버전 프론트에서 온 주문, 0원 주문).
export const getPaymentMethodLabel = (paymentMethod: PaymentMethod | null) => {
  if (!paymentMethod) return '—';
  return PAYMENT_METHOD_LABELS[paymentMethod];
};
