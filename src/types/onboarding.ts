import { Workspace } from '.';

export const ONBOARDING_STEP = {
  INFO: 'info',
  TABLES: 'tables',
  MENU: 'menu',
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
  imageUrl: string;
}

export interface OnboardingTablesDraft {
  tableCount: number;
}

export interface OnboardingMenuDraft {
  categoryName: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

export interface OnboardingStepValidationMap {
  [ONBOARDING_STEP.INFO]: OnboardingInfoDraft;
  [ONBOARDING_STEP.TABLES]: OnboardingTablesDraft;
  [ONBOARDING_STEP.MENU]: OnboardingMenuDraft;
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
