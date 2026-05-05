import styled from '@emotion/styled';
import { useAtomValue } from 'jotai';
import { adminWorkspaceAtom } from '@jotai/admin/atoms';
import { OnboardingColor } from '@resources/colors';
import { colFlex } from '@styles/flexStyles';
import { isOnboardingStepCompleted } from '@utils/onboarding';
import { ONBOARDING_STEP, OnboardingStep } from './onboardingData';

interface StepHintCopy {
  title: string;
  description: string;
}

const STEP_HINT_COPY: Partial<Record<OnboardingStep, StepHintCopy>> = {
  [ONBOARDING_STEP.INFO]: {
    title: '주점 기본 정보를 입력해주세요',
    description: '주점명, 대표 사진, 주점 설명을 모두 등록한 뒤 ‘편집 완료’ 버튼을 눌러주세요.',
  },
  [ONBOARDING_STEP.TABLES]: {
    title: '테이블이 2개 이상 필요합니다',
    description: '온보딩을 완료하려면 우측 상단의 ‘테이블 설정’ 버튼에서 테이블을 추가해주세요.',
  },
  [ONBOARDING_STEP.MENU]: {
    title: '상품을 1개 이상 등록해주세요',
    description: '카테고리를 정리한 뒤 상품을 1개 이상 등록하면 온보딩을 완료할 수 있습니다.',
  },
};

const Banner = styled.div<{ width: string }>`
  width: ${({ width }) => width};
  padding: 14px 18px;
  margin-bottom: 12px;
  border: 1px solid ${OnboardingColor.STEP_ACTIVE_BORDER};
  background: ${OnboardingColor.STEP_PENDING_BG};
  border-radius: 10px;
  gap: 4px;
  box-sizing: border-box;
  ${colFlex({ align: 'flex-start' })}
`;

const Title = styled.span`
  font-size: 14px;
  font-weight: 700;
  color: ${OnboardingColor.TITLE_TEXT};
`;

const Description = styled.span`
  font-size: 13px;
  color: ${OnboardingColor.BODY_TEXT};
`;

interface OnboardingStepHintProps {
  step: OnboardingStep;
  width?: string;
}

function OnboardingStepHint({ step, width = '100%' }: OnboardingStepHintProps) {
  const workspace = useAtomValue(adminWorkspaceAtom);
  const copy = STEP_HINT_COPY[step];

  if (!copy) return null;
  if (!workspace.isOnboarding) return null;
  if (isOnboardingStepCompleted(workspace, step)) return null;

  return (
    <Banner width={width}>
      <Title>{copy.title}</Title>
      <Description>{copy.description}</Description>
    </Banner>
  );
}

export default OnboardingStepHint;
