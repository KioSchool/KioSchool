import { PaymentMethod } from '@@types/index';
import { Color } from '@resources/colors';
import tossLogo from '@resources/image/payment/toss.png';
import kakaoPayLogo from '@resources/image/payment/kakaopay.png';

export interface PayMethodStyle {
  label: string;
  color: string;
  background: string;
  checkColor: string;
  logo: string | null;
  logoBordered: boolean;
}

export const PAY_METHOD_STYLE: Record<PaymentMethod, PayMethodStyle> = {
  [PaymentMethod.TOSS]: { label: '토스', color: '#3182F6', background: '#EBF3FE', checkColor: '#3182F6', logo: tossLogo, logoBordered: true },
  [PaymentMethod.KAKAOPAY]: { label: '카카오페이', color: '#F2D200', background: '#FFF9D1', checkColor: '#3A1D1D', logo: kakaoPayLogo, logoBordered: false },
  [PaymentMethod.BANK_TRANSFER]: {
    label: '계좌이체',
    color: Color.KIO_ORANGE,
    background: Color.KIO_ORANGE_FAINT,
    checkColor: Color.KIO_ORANGE,
    logo: null,
    logoBordered: false,
  },
};

export const PAY_APP_AMOUNT_BADGE = '금액 자동 입력';

export const getPayButtonLabel = (method: PaymentMethod | null, amount: number) => {
  const won = `${amount.toLocaleString()}원`;
  if (method === PaymentMethod.TOSS || method === PaymentMethod.KAKAOPAY) return `${PAY_METHOD_STYLE[method].label}로 ${won} 보내기`;
  if (method === PaymentMethod.BANK_TRANSFER) return `${won} 주문하고 계좌 보기`;
  return `${won} 주문하기`;
};

export const getPayButtonCaption = (method: PaymentMethod | null) => {
  if (method === PaymentMethod.TOSS || method === PaymentMethod.KAKAOPAY) return `누르면 주문이 접수되고 ${PAY_METHOD_STYLE[method].label}가 열려요`;
  if (method === PaymentMethod.BANK_TRANSFER) return '누르면 주문이 접수되고 계좌 정보가 보여요';
  return null;
};

export const NO_ACCOUNT_MESSAGE = '주점이 아직 계좌를 등록하지 않았어요';
