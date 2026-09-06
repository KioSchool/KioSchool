export interface DonationCopy {
  id: string;
  headline: string;
  subLines: readonly string[];
}

/**
 * A/B 토너먼트로 운영한다. 배열에 담긴 변형만 실제로 노출되며,
 * 배열을 교체해 배포하는 것만으로 라운드를 넘긴다 (백엔드 변경 없음).
 * 1라운드는 A(안전 기준선) vs B(명분 선행)로 시작한다.
 */
export const CUSTOMER_DONATION_COPIES: readonly DonationCopy[] = [
  {
    id: 'A',
    headline: '편하게 주문하셨나요?',
    subLines: ['그 주문 시스템, 대학생 팀이 만들었어요.', '주점은 무료로 쓰고 저희는 후원으로 굴러가요.'],
  },
  {
    id: 'B',
    headline: '주점한테는 돈을 안 받기로 했어요',
    subLines: ['대신 이렇게 손님들 후원으로 굴러가고 있어요.'],
  },
];

/** 다음 라운드 후보. CUSTOMER_DONATION_COPIES에 넣어 교체한다. */
export const DONATION_COPY_CANDIDATES: readonly DonationCopy[] = [
  {
    id: 'C',
    headline: '작년에 이게 없어서 고생했거든요',
    subLines: ['축제 때 주점 운영해보다 불편해서 직접 만들었어요.', '지금 80개 주점이 써요.'],
  },
  {
    id: 'D',
    headline: '이 화면 만드느라 축제를 못 갔어요',
    subLines: ['주점은 무료로 쓰고 있어요.', '저희는 후원으로 굴러가요.'],
  },
];

export const DONATION_AMOUNT_OPTIONS: readonly number[] = [1000, 2000, 5000];

export const DEFAULT_DONATION_AMOUNT = 1000;

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
