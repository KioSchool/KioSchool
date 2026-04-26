import styled from '@emotion/styled';
import { RiRefreshLine } from '@remixicon/react';
import { Workspace } from '@@types/index';
import NewCommonButton from '@components/common/button/NewCommonButton';
import OnboardingContainer from '@components/onboarding/OnboardingContainer';
import OnboardingHeader from '@components/onboarding/OnboardingHeader';
import { OnboardingColor } from '@resources/colors';
import { rowFlex } from '@styles/flexStyles';
import { getInitialOnboardingStep } from '@utils/onboarding';
import OnboardingProgress from './OnboardingProgress';
import OnboardingStepList from './OnboardingStepList';

const ActionsRow = styled.div`
  width: 100%;
  gap: 12px;
  ${rowFlex({ justify: 'space-between', align: 'center' })}
`;

const ProgressContainer = styled.div`
  flex: 1;
`;

const SkipButton = styled.button`
  padding: 0;
  border: none;
  background: transparent;
  color: ${OnboardingColor.MUTED_TEXT};
  font-size: 13px;
  font-weight: 500;
  line-height: 1.2;
  padding-top: 12px;
  padding-right: 6px;
  cursor: pointer;

  &:hover {
    color: ${OnboardingColor.BODY_TEXT};
    text-decoration: underline;
  }
`;

interface AdminWorkspaceOnboardingProps {
  workspace: Workspace;
  onRefreshStatus: () => void;
  onSkipOnboarding: () => void;
}

function AdminWorkspaceOnboarding({ workspace, onRefreshStatus, onSkipOnboarding }: AdminWorkspaceOnboardingProps) {
  const currentStep = getInitialOnboardingStep(workspace);

  return (
    <OnboardingContainer>
      <OnboardingHeader
        eyebrow="WORKSPACE ONBOARDING"
        title="온보딩이 완료될 때까지 이 화면에서 진행 상황을 안내합니다"
        description="온보딩이 완료되면 주점 상황을 한 눈에 파악할 수 있는 대시보드 화면을 확인할 수 있습니다."
        action={
          <SkipButton type="button" onClick={onSkipOnboarding}>
            건너뛰기
          </SkipButton>
        }
      />

      <ActionsRow>
        <ProgressContainer>
          <OnboardingProgress workspace={workspace} currentStep={currentStep} />
        </ProgressContainer>
        <NewCommonButton type="button" size="xs" icon={<RiRefreshLine size={16} />} gap={6} color="blue_gray" onClick={onRefreshStatus}>
          최신 상태 확인
        </NewCommonButton>
      </ActionsRow>
      <OnboardingStepList workspace={workspace} currentStep={currentStep} />
    </OnboardingContainer>
  );
}

export default AdminWorkspaceOnboarding;
