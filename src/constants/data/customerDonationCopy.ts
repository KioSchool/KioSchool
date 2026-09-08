export interface DonationCopy {
  id: string;
  headline: string;
  subLines: readonly string[];
  /** 주 버튼 문구. `{amount}`가 선택 금액(천 단위 콤마)으로 치환된다. 없으면 기본 문구를 쓴다. */
  ctaTemplate?: string;
  /** 금액별 비유 대상. 헤드라인·본문·CTA의 `{anchor}`를 치환한다. */
  amountAnchors?: Readonly<Record<number, string>>;
}

export const DEFAULT_DONATION_CTA_TEMPLATE = '토스로 {amount}원 보내기';

const AMOUNT_PLACEHOLDER = /\{amount\}/g;
const ANCHOR_PLACEHOLDER = /\{anchor\}/g;
const ANCHOR_FALLBACK_AMOUNT = 1000;

/** 헤드라인·본문·버튼 어디서든 `{amount}`를 선택 금액으로, `{anchor}`를 금액별 비유로 치환한다. */
export function fillDonationAmount(text: string, amount: number, amountAnchors?: Readonly<Record<number, string>>): string {
  const anchor = amountAnchors?.[amount] ?? amountAnchors?.[ANCHOR_FALLBACK_AMOUNT] ?? '';
  return text.replace(AMOUNT_PLACEHOLDER, amount.toLocaleString()).replace(ANCHOR_PLACEHOLDER, anchor);
}

export function buildDonationCtaLabel(copy: DonationCopy, amount: number): string {
  return fillDonationAmount(copy.ctaTemplate ?? DEFAULT_DONATION_CTA_TEMPLATE, amount, copy.amountAnchors);
}

/**
 * 노출되는 변형은 이 배열에만 담는다. 배열을 바꿔 배포하는 것만으로 문구를 교체한다 (백엔드 변경 없음).
 * 지금은 단일 변형(앵커링 — 일상 물건 값에 빗대 체감 비용을 낮춘다).
 */
export const CUSTOMER_DONATION_COPIES: readonly DonationCopy[] = [
  {
    id: 'anchor',
    headline: '{anchor} 값이면 돼요',
    subLines: ['키오스쿨은 학생들이 만들어서 무료로 운영해요.', '{anchor} 값 {amount}원이면 다음 축제까지 서버가 버텨요.'],
    amountAnchors: { 1000: '편의점 생수 한 병', 2000: '삼각김밥 한 개', 5000: '커피 한 잔' },
    ctaTemplate: '{anchor} 값({amount}원) 보내기',
  },
];

export const DONATION_AMOUNT_OPTIONS: readonly number[] = [1000, 2000, 5000];

export const DEFAULT_DONATION_AMOUNT = 1000;

// 오늘 후원자가 0명일 때 카운터 줄에 대신 노출한다.
export const DONATION_COUNT_EMPTY_TEXT = '오늘의 첫 응원을 기다리고 있어요';

// 손님이 주점 팁으로 오해하면 주점 신뢰 사고로 번진다. 문구 변형과 무관하게 항상 노출한다.
export const DONATION_DESTINATION_NOTE = '주점이 아니라, 이 주문 앱을 만든 키오스쿨로 가요';

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
