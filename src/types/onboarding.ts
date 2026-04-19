import { Workspace } from '.';

export const ONBOARDING_STEP = {
  INFO: 'info',
  TABLES: 'tables',
  CATEGORIES: 'categories',
  PRODUCTS: 'products',
  COMPLETE: 'complete',
} as const;

export type OnboardingStep = typeof ONBOARDING_STEP[keyof typeof ONBOARDING_STEP];

export interface OnboardingValidationResult {
  valid: boolean;
  error?: string;
}

export interface OnboardingInfoDraft {
  name: string;
  description: string;
  notice: string;
}

export interface OnboardingTablesDraft {
  tableCount: number;
}

export interface OnboardingCategoriesDraft {
  categories: string[];
}

export interface OnboardingProductDraft {
  name: string;
  description: string;
  price: number;
  productCategoryId: string;
  imageUrl: string;
}

export interface OnboardingStepValidationMap {
  [ONBOARDING_STEP.INFO]: OnboardingInfoDraft;
  [ONBOARDING_STEP.TABLES]: OnboardingTablesDraft;
  [ONBOARDING_STEP.CATEGORIES]: OnboardingCategoriesDraft;
  [ONBOARDING_STEP.PRODUCTS]: OnboardingProductDraft;
  [ONBOARDING_STEP.COMPLETE]: Record<string, never>;
}

export interface OnboardingStepDefinition {
  step: OnboardingStep;
  label: string;
}

export interface OnboardingWorkspaceStepStatus {
  step: OnboardingStep;
  completed: boolean;
}

export type OnboardingWorkspaceEvaluator = (workspace: Workspace) => boolean;
