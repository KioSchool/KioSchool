import { css } from '@emotion/react';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { RiCheckLine } from '@remixicon/react';
import { Workspace } from '@@types/index';
import { ONBOARDING_STEP, OnboardingStep } from '@@types/onboarding';
import AppBadge from '@components/common/badge/AppBadge';
import NewCommonButton from '@components/common/button/NewCommonButton';
import { ROUTES_PATH_KR_MAP } from '@constants/data/urlMapData';
import { ADMIN_ROUTES } from '@constants/routes';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { isOnboardingStepCompleted } from '@utils/onboarding';

type StepCardVariant = 'active' | 'inactive';
type StepStatusVariant = 'completed' | 'pending';

interface StepActionItem {
  label: string;
  path: string;
}

interface StepStatusStyle {
  background: string;
  color: string;
  label: string;
}

interface StepCardStyle {
  padding: string;
  borderColor: string;
  background: string;
  opacity: number;
}

const STEP_CARD_STYLE_MAP: Record<StepCardVariant, StepCardStyle> = {
  active: {
    padding: '14px 16px',
    borderColor: '#ffd7b8',
    background: '#fffaf5',
    opacity: 1,
  },
  inactive: {
    padding: '12px 16px',
    borderColor: '#e8eef2',
    background: '#ffffff',
    opacity: 0.58,
  },
};

const STEP_STATUS_STYLE_MAP: Record<StepStatusVariant, StepStatusStyle> = {
  completed: {
    background: '#edf9f1',
    color: Color.GREEN,
    label: '완료됨',
  },
  pending: {
    background: '#fff3e7',
    color: Color.KIO_ORANGE,
    label: '설정 필요',
  },
};

function getStepCardStyles(variant: StepCardVariant) {
  const style = STEP_CARD_STYLE_MAP[variant];

  return css`
    padding: ${style.padding};
    border: 1px solid ${style.borderColor};
    background: ${style.background};
    opacity: ${style.opacity};
  `;
}

function getAdminWorkspaceRoute(pathTemplate: string, workspaceId: string, query?: Record<string, string>) {
  const path = pathTemplate.replace(':workspaceId', workspaceId);

  if (!query) {
    return path;
  }

  return `${path}?${new URLSearchParams(query).toString()}`;
}

function getStepActions(workspaceId: string): Record<OnboardingStep, StepActionItem[]> {
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

const Container = styled.div`
  width: 100%;
  gap: 10px;
  ${colFlex({ align: 'stretch' })}
`;

const StepCard = styled.div<{ variant: StepCardVariant }>`
  width: 100%;
  border-radius: 18px;
  box-sizing: border-box;
  gap: 10px;
  transition: opacity 0.2s ease, border-color 0.2s ease, background-color 0.2s ease, padding 0.2s ease;
  ${colFlex({ align: 'stretch' })}
  ${({ variant }) => getStepCardStyles(variant)}
`;

const StepMetaColumn = styled.div`
  width: 100%;
  gap: 8px;
  ${colFlex({ align: 'start' })}
`;

const StepHeader = styled.div`
  width: 100%;
  gap: 10px;
  ${rowFlex({ justify: 'space-between', align: 'start' })}
`;

const StepNumber = styled.div<{ variant: StepStatusVariant }>`
  padding: 5px 10px;
  border-radius: 999px;
  background: ${({ variant }) => STEP_STATUS_STYLE_MAP[variant].background};
  color: ${({ variant }) => STEP_STATUS_STYLE_MAP[variant].color};
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.04em;
  ${rowFlex({ justify: 'center', align: 'center' })}
`;

const StepTitle = styled.div`
  color: #25282b;
  font-size: 17px;
  font-weight: 700;
  line-height: 1.3;
  padding-left: 4px;
`;

const StepBodyColumn = styled.div`
  width: 100%;
  gap: 6px;
  padding-left: 4px;
  ${colFlex({ align: 'start' })}
`;

const StepDescriptionColumn = styled.div`
  width: 100%;
  gap: 4px;
  ${colFlex({ align: 'start' })}
`;

const StepDescription = styled.div`
  color: #4f565b;
  font-size: 13px;
  line-height: 1.55;
`;

const StepHint = styled.div`
  color: #7b858c;
  font-size: 12px;
  line-height: 1.5;
`;

const StepActions = styled.div`
  width: 100%;
  flex-wrap: wrap;
  gap: 6px;
  padding-top: 6px;
  ${rowFlex({ justify: 'start', align: 'center' })}
`;

interface StepCardItem {
  step: OnboardingStep;
  stepNumber: number;
  title: string;
  description: string;
  hint: string;
}

interface OnboardingStepListProps {
  workspace: Workspace;
  workspaceId: string;
  currentStep: OnboardingStep;
}

function OnboardingStepList({ workspace, workspaceId, currentStep }: OnboardingStepListProps) {
  const navigate = useNavigate();

  const stepCards: StepCardItem[] = useMemo(
    () => [
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
    ],
    [],
  );

  const stepActionsMap = useMemo(() => getStepActions(workspaceId), [workspaceId]);

  const renderStepBody = (active: boolean, item: StepCardItem) => {
    if (!active) {
      return null;
    }

    return (
      <StepBodyColumn>
        <StepDescriptionColumn>
          <StepDescription>{item.description}</StepDescription>
          <StepHint>{item.hint}</StepHint>
        </StepDescriptionColumn>

        <StepActions>
          {stepActionsMap[item.step].map((action) => (
            <NewCommonButton key={action.path} type="button" size="xs" color={'kio_orange'} onClick={() => navigate(action.path)}>
              {action.label}
            </NewCommonButton>
          ))}
        </StepActions>
      </StepBodyColumn>
    );
  };

  return (
    <Container>
      {stepCards.map((item) => {
        const completed = isOnboardingStepCompleted(workspace, item.step);
        const active = item.step === currentStep;
        let cardVariant: StepCardVariant = 'inactive';
        let statusVariant: StepStatusVariant = 'pending';

        if (active) {
          cardVariant = 'active';
        }

        if (completed) {
          statusVariant = 'completed';
        }

        const statusStyle = STEP_STATUS_STYLE_MAP[statusVariant];

        return (
          <StepCard key={item.step} variant={cardVariant}>
            <StepMetaColumn>
              <StepHeader>
                <StepNumber variant={statusVariant}>STEP {item.stepNumber}</StepNumber>
                <AppBadge
                  noBorder
                  icon={completed ? <RiCheckLine size={14} /> : undefined}
                  customSize={{ height: 24, font: 11, paddingX: 9 }}
                  customColors={{
                    background: statusStyle.background,
                    color: statusStyle.color,
                    border: 'none',
                  }}
                >
                  {statusStyle.label}
                </AppBadge>
              </StepHeader>
              <StepTitle>{item.title}</StepTitle>
            </StepMetaColumn>
            {renderStepBody(active, item)}
          </StepCard>
        );
      })}
    </Container>
  );
}

export default OnboardingStepList;
