import styled from '@emotion/styled';
import { useAtomValue } from 'jotai';
import { adminTablesAtom, adminWorkspaceAtom } from '@jotai/admin/atoms';
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
    title: '테이블 설정과 배치를 완료해주세요',
    description: '테이블을 2개 이상 추가한 뒤 모든 테이블의 배치를 저장해야 온보딩을 완료할 수 있습니다.',
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
  const tables = useAtomValue(adminTablesAtom);
  const copy =
    step === ONBOARDING_STEP.TABLES && workspace.tableCount >= 2
      ? {
          title: '테이블 배치를 완료해주세요',
          description: '상단에서 배치 보기를 선택한 뒤 ‘배치 편집’에서 모든 테이블을 배치하고 저장해주세요. 배치 저장까지 완료해야 다음 단계로 넘어갑니다.',
        }
      : STEP_HINT_COPY[step];

  if (!copy) return null;
  if (!workspace.isOnboarding) return null;
  if (isOnboardingStepCompleted(workspace, step, tables)) return null;

  return (
    <Banner width={width}>
      <Title>{copy.title}</Title>
      <Description>{copy.description}</Description>
    </Banner>
  );
}

export default OnboardingStepHint;
