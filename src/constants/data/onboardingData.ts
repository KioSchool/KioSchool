import { ONBOARDING_STEP, OnboardingStep } from '@@types/index';

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
    title: '테이블 설정',
    description: '실시간 테이블 관리 화면에서 테이블 수를 정하고 주문 시스템 준비를 합니다. 최소 2개 테이블을 설정해야 이 단계가 완료됩니다.',
    hint: '테이블 설정 이후 주문 QR 코드 생성과 실시간 테이블 현황 확인이 가능해집니다.',
  },
  {
    step: ONBOARDING_STEP.MENU,
    stepNumber: 3,
    title: '메뉴 등록',
    description: '새 상품 카테고리를 만든 뒤 그 카테고리에 대표 상품 1개를 등록하면 이 단계가 완료됩니다.',
    hint: '예: 안주 카테고리를 만든 뒤 대표 메뉴를 추가합니다. 카테고리만 만들고 상품이 없으면 아직 완료되지 않습니다.',
  },
];
