import { PaymentMethod } from '@@types/index';
import tossLogo from '@resources/image/payment/toss.png';
import kakaoPayLogo from '@resources/image/payment/kakaopay.png';

export interface PayMethodStyle {
  label: string;
  // 고른 카드의 테두리·글자 색
  color: string;
  // 고른 카드의 바탕
  background: string;
  // 고른 카드의 체크 원
  checkColor: string;
  // 계좌이체는 로고 대신 은행 아이콘
  logo: string | null;
  // 흰 바탕 로고(토스)만 테두리를 그린다
  logoBordered: boolean;
}

// Figma '카카오페이 송금' 손님 결제 기획 메모의 수단 색
export const PAY_METHOD_STYLE: Record<PaymentMethod, PayMethodStyle> = {
  [PaymentMethod.TOSS]: { label: '토스', color: '#3182F6', background: '#EBF3FE', checkColor: '#3182F6', logo: tossLogo, logoBordered: true },
  [PaymentMethod.KAKAOPAY]: { label: '카카오페이', color: '#F2D200', background: '#FFF9D1', checkColor: '#3A1D1D', logo: kakaoPayLogo, logoBordered: false },
  [PaymentMethod.BANK_TRANSFER]: { label: '계좌이체', color: '#FF9142', background: '#FFF3E7', checkColor: '#FF9142', logo: null, logoBordered: false },
};

export const PAY_APP_AMOUNT_BADGE = '금액 자동 입력';

// 주문 버튼 글과 그 아래 한 줄. Figma 손님 결제 보드 문구 그대로
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
