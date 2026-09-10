export interface DonationCopy {
  id: string;
  headline: string;
  subLines: readonly string[];
  /** 주 버튼 문구. `{amount}`가 선택 금액(천 단위 콤마)으로 치환된다. 없으면 기본 문구를 쓴다. */
  ctaTemplate?: string;
  /** 금액별 비유 대상. 헤드라인·본문·CTA의 `{anchor}`를 치환한다. */
  amountAnchors?: Readonly<Record<number, string>>;
  /** 금액별 지속 기간. 본문의 `{duration}`을 치환한다. */
  amountDurations?: Readonly<Record<number, string>>;
}

export const DEFAULT_DONATION_CTA_TEMPLATE = '{amount}원 보내기';

const AMOUNT_PLACEHOLDER = /\{amount\}/g;
const ANCHOR_PLACEHOLDER = /\{anchor\}/g;
const DURATION_PLACEHOLDER = /\{duration\}/g;
const AMOUNT_MAP_FALLBACK = 1000;

function pickAmountValue(map: Readonly<Record<number, string>> | undefined, amount: number): string {
  return map?.[amount] ?? map?.[AMOUNT_MAP_FALLBACK] ?? '';
}

/** 헤드라인·본문·버튼 어디서든 `{amount}`·`{anchor}`·`{duration}`을 선택 금액 기준으로 치환한다. */
export function fillDonationAmount(text: string, amount: number, copy?: Pick<DonationCopy, 'amountAnchors' | 'amountDurations'>): string {
  return text
    .replace(AMOUNT_PLACEHOLDER, amount.toLocaleString())
    .replace(ANCHOR_PLACEHOLDER, pickAmountValue(copy?.amountAnchors, amount))
    .replace(DURATION_PLACEHOLDER, pickAmountValue(copy?.amountDurations, amount));
}

export function buildDonationCtaLabel(copy: DonationCopy, amount: number): string {
  return fillDonationAmount(copy.ctaTemplate ?? DEFAULT_DONATION_CTA_TEMPLATE, amount, copy);
}

/**
 * 노출되는 변형은 이 배열에만 담는다. 배열을 바꿔 배포하는 것만으로 문구를 교체한다 (백엔드 변경 없음).
 * 지금은 단일 변형(앵커링 — 일상 물건 값에 빗대 체감 비용을 낮춘다).
 */
export const CUSTOMER_DONATION_COPIES: readonly DonationCopy[] = [
  {
    id: 'anchor',
    headline: '{anchor} 값으로 응원하기',
    subLines: ['키오스쿨은 학생들이 만들어서 무료로 운영해요.', '{anchor} 값 <strong>{amount}원</strong>이면 서버가 <strong>{duration}</strong> 버텨요.'],
    amountAnchors: { 1000: '편의점 생수 한 병', 2000: '삼각김밥 한 개', 5000: '커피 한 잔' },
    amountDurations: { 1000: '하루', 2000: '사흘', 5000: '한 주' },
    ctaTemplate: '{amount}원 보내기',
  },
];

export const DONATION_AMOUNT_OPTIONS: readonly number[] = [1000, 2000, 5000];

export const DEFAULT_DONATION_AMOUNT = 2000;

// 오늘 후원자가 0명일 때 카운터 줄에 대신 노출한다.
export const DONATION_COUNT_EMPTY_TEXT = '오늘의 첫 응원을 기다리고 있어요';

// 헤드라인 아래 주황 슬롯에 노출한다. orderId로 3개를 균등 로테이션한다.
export const DONATION_NOTE_MESSAGES: readonly string[] = [
  '무료 주문 앱 키오스쿨이 멈추지 않고 돌아가도록\n작은 힘을 보태주세요.',
  '대학 축제를 더 편하게!\n키오스쿨을 만든 학생들에게 응원을 보내주세요.',
  '보내주신 마음은 \n전액 키오스쿨 서버 유지비로 소중하게 사용됩니다.',
];

export function donationNoteIndex(orderId: string | null): number {
  const numericId = Number(orderId);
  if (!Number.isFinite(numericId)) return 0;
  return Math.abs(Math.trunc(numericId)) % DONATION_NOTE_MESSAGES.length;
}

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
