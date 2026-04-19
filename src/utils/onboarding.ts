import { ONBOARDING_STEP, OnboardingStep, OnboardingStepDefinition, OnboardingStepValidationMap, OnboardingValidationResult } from '@@types/onboarding';
import { Workspace } from '@@types/index';

export const ONBOARDING_STEP_DEFINITIONS: OnboardingStepDefinition[] = [
  { step: ONBOARDING_STEP.INFO, label: '기본 정보' },
  { step: ONBOARDING_STEP.TABLES, label: '테이블 설정' },
  { step: ONBOARDING_STEP.CATEGORIES, label: '카테고리 생성' },
  { step: ONBOARDING_STEP.PRODUCTS, label: '대표 상품 등록' },
  { step: ONBOARDING_STEP.COMPLETE, label: '완료' },
];

function hasWorkspaceInfoCompleted(workspace: Workspace): boolean {
  const hasWorkspaceImage = workspace.images.some((image) => Boolean(image.url));

  return Boolean(workspace.name.trim()) && Boolean(workspace.description.trim()) && hasWorkspaceImage;
}

export function needsWorkspaceOnboarding(workspace: Workspace): boolean {
  return !hasWorkspaceInfoCompleted(workspace) || workspace.tableCount < 2 || workspace.products.length === 0 || workspace.productCategories.length === 0;
}

export function getIncompleteOnboardingSteps(workspace: Workspace): OnboardingStep[] {
  const incompleteSteps: OnboardingStep[] = [];

  if (!hasWorkspaceInfoCompleted(workspace)) {
    incompleteSteps.push(ONBOARDING_STEP.INFO);
  }

  if (workspace.tableCount < 2) {
    incompleteSteps.push(ONBOARDING_STEP.TABLES);
  }

  if (workspace.productCategories.length === 0) {
    incompleteSteps.push(ONBOARDING_STEP.CATEGORIES);
  }

  if (workspace.products.length === 0) {
    incompleteSteps.push(ONBOARDING_STEP.PRODUCTS);
  }

  return incompleteSteps;
}

export function getInitialOnboardingStep(workspace: Workspace): OnboardingStep {
  const [firstIncompleteStep] = getIncompleteOnboardingSteps(workspace);

  return firstIncompleteStep ?? ONBOARDING_STEP.COMPLETE;
}

export function isOnboardingStepCompleted(workspace: Workspace, step: OnboardingStep): boolean {
  switch (step) {
    case ONBOARDING_STEP.INFO:
      return hasWorkspaceInfoCompleted(workspace);
    case ONBOARDING_STEP.TABLES:
      return workspace.tableCount >= 2;
    case ONBOARDING_STEP.CATEGORIES:
      return workspace.productCategories.length > 0;
    case ONBOARDING_STEP.PRODUCTS:
      return workspace.products.length > 0;
    case ONBOARDING_STEP.COMPLETE:
      return !needsWorkspaceOnboarding(workspace);
  }
}

export function validateOnboardingStep(step: OnboardingStep, data: OnboardingStepValidationMap[OnboardingStep]): OnboardingValidationResult {
  switch (step) {
    case ONBOARDING_STEP.INFO:
      return (data as OnboardingStepValidationMap[typeof ONBOARDING_STEP.INFO]).name.trim()
        ? { valid: true }
        : { valid: false, error: '주점 이름을 입력해주세요.' };
    case ONBOARDING_STEP.TABLES:
      if ((data as OnboardingStepValidationMap[typeof ONBOARDING_STEP.TABLES]).tableCount < 2) {
        return { valid: false, error: '최소 2개 테이블이 필요합니다.' };
      }

      if ((data as OnboardingStepValidationMap[typeof ONBOARDING_STEP.TABLES]).tableCount > 50) {
        return { valid: false, error: '테이블 수는 50개 이하로 설정해주세요.' };
      }

      return { valid: true };
    case ONBOARDING_STEP.CATEGORIES:
      return (data as OnboardingStepValidationMap[typeof ONBOARDING_STEP.CATEGORIES]).categories.length > 0
        ? { valid: true }
        : { valid: false, error: '최소 1개 카테고리를 등록해주세요.' };
    case ONBOARDING_STEP.PRODUCTS:
      if (
        !(data as OnboardingStepValidationMap[typeof ONBOARDING_STEP.PRODUCTS]).productCategoryId ||
        (data as OnboardingStepValidationMap[typeof ONBOARDING_STEP.PRODUCTS]).productCategoryId === 'null'
      ) {
        return { valid: false, error: '카테고리를 선택해주세요.' };
      }

      if (
        !(data as OnboardingStepValidationMap[typeof ONBOARDING_STEP.PRODUCTS]).name.trim() ||
        !(data as OnboardingStepValidationMap[typeof ONBOARDING_STEP.PRODUCTS]).description.trim()
      ) {
        return { valid: false, error: '상품 이름과 설명을 입력해주세요.' };
      }

      if ((data as OnboardingStepValidationMap[typeof ONBOARDING_STEP.PRODUCTS]).price < 0) {
        return { valid: false, error: '가격은 음수가 될 수 없습니다.' };
      }

      if (!(data as OnboardingStepValidationMap[typeof ONBOARDING_STEP.PRODUCTS]).imageUrl) {
        return { valid: false, error: '상품 이미지를 등록해주세요.' };
      }

      if ((data as OnboardingStepValidationMap[typeof ONBOARDING_STEP.PRODUCTS]).name.length > 12) {
        return { valid: false, error: '상품 이름은 12자 이하로 입력해주세요.' };
      }

      if ((data as OnboardingStepValidationMap[typeof ONBOARDING_STEP.PRODUCTS]).description.length > 30) {
        return { valid: false, error: '상품 설명은 30자 이하로 입력해주세요.' };
      }

      return { valid: true };
    case ONBOARDING_STEP.COMPLETE:
      return { valid: true };
  }
}
