export interface DonationCopy {
  id: string;
  headline: string;
  subLines: readonly string[];
}

/**
 * 노출되는 변형은 이 배열에만 담는다. 배열을 바꿔 배포하는 것만으로 문구를 교체한다 (백엔드 변경 없음).
 * 지금은 단일 변형(A, 담백·서버비 어필). 문구 확정 후 두 번째 변형을 추가해 A/B를 시작한다.
 */
export const CUSTOMER_DONATION_COPIES: readonly DonationCopy[] = [
  {
    id: 'A',
    headline: '편하게 주문하셨나요?',
    subLines: ['이 주문 시스템, 학생들이 만들어서 운영해요.', '서버비가 매달 나가서 1,000원씩 받고 있어요.'],
  },
];

/** 문구 후보. 확정되면 CUSTOMER_DONATION_COPIES에 넣는다. */
export const DONATION_COPY_CANDIDATES: readonly DonationCopy[] = [
  {
    id: 'B',
    headline: '편하게 주문하셨나요?',
    subLines: ['서버비는 만든 학생들이 나눠 내고 있어요.', '1,000원이면 하루치가 나와요.'],
  },
  {
    id: 'C',
    headline: '편하게 주문하셨나요?',
    subLines: ['주점은 무료로 쓰고, 서버비만 후원으로 받아요.', '1,000원부터 가능해요.'],
  },
  {
    id: 'D',
    headline: '편하게 주문하셨나요?',
    subLines: ['학생들이 만들어서 무료로 풀었어요.', '서버비는 손님 후원으로 충당하고 있어요.'],
  },
];

export const DONATION_AMOUNT_OPTIONS: readonly number[] = [1000, 2000, 5000];

export const DEFAULT_DONATION_AMOUNT = 1000;

// 오늘 카운트가 이 값 미만이면 카운터 줄을 숨긴다.
export const DONATION_COUNT_DISPLAY_MIN = 1;

// 손님이 주점 팁으로 오해하면 주점 신뢰 사고로 번진다. 문구 변형과 무관하게 항상 노출한다.
export const DONATION_DESTINATION_NOTE = '주점이 아니라 키오스쿨로 가요';

/**
 * orderId 기반 결정적 배정. 리렌더에 흔들리지 않고 저장소가 필요 없으며,
 * orderId가 전역 시퀀스라 변형 간 균등 분배된다.
 */
export function pickCopyVariant(orderId: string | null): DonationCopy {
  const numericId = Number(orderId);
  if (!Number.isFinite(numericId)) return CUSTOMER_DONATION_COPIES[0];
  const index = Math.abs(Math.trunc(numericId)) % CUSTOMER_DONATION_COPIES.length;
  return CUSTOMER_DONATION_COPIES[index];
}
