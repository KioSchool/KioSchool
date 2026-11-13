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
}

// Figma '카카오페이 송금' 손님 결제 기획 메모의 수단 색
export const PAY_METHOD_STYLE: Record<PaymentMethod, PayMethodStyle> = {
  [PaymentMethod.TOSS]: { label: '토스', color: '#3182F6', background: '#EBF3FE', checkColor: '#3182F6', logo: tossLogo },
  [PaymentMethod.KAKAOPAY]: { label: '카카오페이', color: '#F2D200', background: '#FFF9D1', checkColor: '#3A1D1D', logo: kakaoPayLogo },
  [PaymentMethod.BANK_TRANSFER]: { label: '계좌이체', color: '#FF9142', background: '#FFF3E7', checkColor: '#FF9142', logo: null },
};

export const PAY_APP_AMOUNT_BADGE = '금액 자동 입력';
