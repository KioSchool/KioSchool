import { Workspace } from '@@types/index';
import { ONBOARDING_STEP, OnboardingStep, OnboardingStepDefinition, StepActionItem } from '@components/admin/workspace/onboarding/onboardingData';
import { ROUTES_PATH_KR_MAP } from '@constants/data/urlMapData';
import { ADMIN_ROUTES } from '@constants/routes';

export const ONBOARDING_STEP_DEFINITIONS: OnboardingStepDefinition[] = [
  { step: ONBOARDING_STEP.INFO, label: '기본 정보' },
  { step: ONBOARDING_STEP.TABLES, label: '테이블 설정' },
  { step: ONBOARDING_STEP.MENU, label: '메뉴 등록' },
  { step: ONBOARDING_STEP.COMPLETE, label: '완료' },
];

function hasWorkspaceInfoCompleted(workspace: Workspace): boolean {
  const hasWorkspaceImage = workspace.images.some((image) => Boolean(image.url));

  return Boolean(workspace.name.trim()) && Boolean(workspace.description.trim()) && hasWorkspaceImage;
}

function getAdminWorkspaceRoute(pathTemplate: string, workspaceId: number, query?: Record<string, string>) {
  const path = pathTemplate.replace(':workspaceId', workspaceId.toString());

  if (!query) {
    return path;
  }

  return `${path}?${new URLSearchParams(query).toString()}`;
}

export function getOnboardingStepActions(workspaceId: number): Record<OnboardingStep, StepActionItem[]> {
  return {
    [ONBOARDING_STEP.INFO]: [
      {
        label: ROUTES_PATH_KR_MAP[ADMIN_ROUTES.WORKSPACE_EDIT],
        path: getAdminWorkspaceRoute(ADMIN_ROUTES.WORKSPACE_EDIT, workspaceId),
      },
    ],
    [ONBOARDING_STEP.TABLES]: [
      {
        label: ROUTES_PATH_KR_MAP[ADMIN_ROUTES.TABLE_REALTIME],
        path: getAdminWorkspaceRoute(ADMIN_ROUTES.TABLE_REALTIME, workspaceId, { tableNo: '1' }),
      },
    ],
    [ONBOARDING_STEP.MENU]: [
      {
        label: ROUTES_PATH_KR_MAP[ADMIN_ROUTES.PRODUCTS_CATEGORIES],
        path: getAdminWorkspaceRoute(ADMIN_ROUTES.PRODUCTS_CATEGORIES, workspaceId),
      },
      {
        label: ROUTES_PATH_KR_MAP[ADMIN_ROUTES.PRODUCTS],
        path: getAdminWorkspaceRoute(ADMIN_ROUTES.PRODUCTS, workspaceId),
      },
    ],
    [ONBOARDING_STEP.COMPLETE]: [],
  };
}

export function getIncompleteOnboardingSteps(workspace: Workspace): OnboardingStep[] {
  const incompleteSteps: OnboardingStep[] = [];

  if (!hasWorkspaceInfoCompleted(workspace)) {
    incompleteSteps.push(ONBOARDING_STEP.INFO);
  }

  if (workspace.tableCount < 2) {
    incompleteSteps.push(ONBOARDING_STEP.TABLES);
  }

  if (workspace.products.length === 0) {
    incompleteSteps.push(ONBOARDING_STEP.MENU);
  }

  return incompleteSteps;
}

export function getInitialOnboardingStep(workspace: Workspace): OnboardingStep {
  const [firstIncompleteStep] = getIncompleteOnboardingSteps(workspace);

  return firstIncompleteStep ?? ONBOARDING_STEP.COMPLETE;
}

export function isWorkspaceOnboardingCompleted(workspace: Workspace): boolean {
  return getInitialOnboardingStep(workspace) === ONBOARDING_STEP.COMPLETE;
}

export function isOnboardingStepCompleted(workspace: Workspace, step: OnboardingStep): boolean {
  switch (step) {
    case ONBOARDING_STEP.INFO:
      return hasWorkspaceInfoCompleted(workspace);
    case ONBOARDING_STEP.TABLES:
      return workspace.tableCount >= 2;
    case ONBOARDING_STEP.MENU:
      return workspace.products.length > 0;
    case ONBOARDING_STEP.COMPLETE:
      return isWorkspaceOnboardingCompleted(workspace);
  }
}
