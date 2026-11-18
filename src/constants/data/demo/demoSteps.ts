export const DEMO_CHAPTERS = ['손님 맞이', '손님 주문', '주문 처리', '테이블 시간', '마감 정산'];

export type DemoDevice = 'guest' | 'admin';

export type DemoAdminPage = 'table' | 'orders' | 'stats';

export interface DemoStep {
  chapter: number;
  device: DemoDevice;
  adminPage: DemoAdminPage;
  guide: string;
}

export const DEMO_STEP = {
  START: 1,
  ORDER: 2,
  PAY: 3,
  PAYMENT_CHECK: 4,
  SERVE: 5,
  EXTEND: 6,
  END: 7,
  CLOSING: 8,
} as const;

export const DEMO_STEPS: DemoStep[] = [
  { chapter: 0, device: 'admin', adminPage: 'table', guide: "7번 테이블에 손님이 앉았어요. 운영진 화면에서 7번 테이블을 골라 '사용 시작'을 눌러 주세요" },
  { chapter: 1, device: 'guest', adminPage: 'table', guide: '이제 손님 폰에서 메뉴를 골라 담고 주문해 보세요' },
  { chapter: 1, device: 'guest', adminPage: 'table', guide: '송금 수단을 고르고 이름을 적어 보내 보세요. 실제로 돈이 나가지는 않아요' },
  { chapter: 2, device: 'admin', adminPage: 'orders', guide: '주문이 들어왔어요. 7번 테이블 주문의 ✓를 눌러 입금을 확인해 주세요' },
  { chapter: 2, device: 'admin', adminPage: 'orders', guide: '손님 폰이 주문 완료로 바뀌었어요. 주문을 열어 서빙 완료로 바꿔 보세요' },
  { chapter: 3, device: 'admin', adminPage: 'table', guide: '손님이 조금 더 있고 싶대요. 7번 테이블 이용 시간을 늘려 보세요' },
  { chapter: 3, device: 'admin', adminPage: 'table', guide: "손님이 나갔어요. '사용 종료'를 눌러 다음 손님을 받을 준비를 해 주세요" },
  { chapter: 4, device: 'admin', adminPage: 'stats', guide: '영업이 끝났어요. 오늘 매출과 시간대별 주문을 확인해 보세요' },
];

export const DEMO_FINISHED_STEP = DEMO_STEPS.length + 1;

export const getDemoStep = (step: number) => DEMO_STEPS[Math.min(Math.max(step, 1), DEMO_STEPS.length) - 1];
