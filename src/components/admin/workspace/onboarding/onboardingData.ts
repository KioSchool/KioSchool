export const ONBOARDING_STEP = {
  INFO: 'info',
  TABLES: 'tables',
  MENU: 'menu',
  COMPLETE: 'complete',
} as const;

export type OnboardingStep = typeof ONBOARDING_STEP[keyof typeof ONBOARDING_STEP];

export const ONBOARDING_STEP_CARDS: StepCardItem[] = [
  {
    step: ONBOARDING_STEP.INFO,
    stepNumber: 1,
    title: '주점 기본 정보',
    description: '주점명, 대표 사진, 주점 설명이 모두 등록되어야 이 단계가 완료됩니다.',
    hint: '공지사항은 선택값이지만, 주점명과 대표 사진, 설명은 꼭 채워야 기본 정보 단계가 완료됩니다.',
  },
  {
    step: ONBOARDING_STEP.TABLES,
    stepNumber: 2,
    title: '테이블 설정 및 배치',
    description: '테이블을 2개 이상 만든 뒤, 실제 주점 배치에 맞게 모든 테이블을 배치하고 저장해야 이 단계가 완료됩니다.',
    hint: '실시간 테이블 관리에서 테이블 수를 먼저 설정하고 아래 편집기에서 배치를 저장해주세요. 모든 테이블의 배치가 저장되어야 다음 단계로 넘어갑니다.',
  },
  {
    step: ONBOARDING_STEP.MENU,
    stepNumber: 3,
    title: '상품 등록',
    description: '카테고리를 확인하고 대표 상품 1개 이상을 등록하면 이 단계가 완료됩니다.',
    hint: '카테고리를 먼저 정리해두면 상품 등록이 더 쉬워집니다. 기본 카테고리를 사용해도 완료할 수 있습니다.',
  },
];

export interface OnboardingStepDefinition {
  step: OnboardingStep;
  label: string;
}

export interface StepActionItem {
  label: string;
  path: string;
}

export interface StepCardItem {
  step: OnboardingStep;
  stepNumber: number;
  title: string;
  description: string;
  hint: string;
}
