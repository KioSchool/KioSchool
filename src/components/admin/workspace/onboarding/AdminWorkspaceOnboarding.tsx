import styled from '@emotion/styled';
import { RiRefreshLine } from '@remixicon/react';
import { Workspace } from '@@types/index';
import NewCommonButton from '@components/common/button/NewCommonButton';
import OnboardingHeader from '@components/onboarding/OnboardingHeader';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { getInitialOnboardingStep } from '@utils/onboarding';
import OnboardingProgress from './OnboardingProgress';
import OnboardingStepList from './OnboardingStepList';

const Container = styled.div`
  width: 100%;
  max-width: 880px;
  padding: 12px 0 72px;
  box-sizing: border-box;
  gap: 22px;
  ${colFlex({ align: 'center' })}
`;

const ActionsRow = styled.div`
  width: 100%;
  gap: 12px;
  ${rowFlex({ justify: 'space-between', align: 'flex-start' })}
`;

const ProgressContainer = styled.div`
  flex: 1;
`;

interface AdminWorkspaceOnboardingProps {
  workspace: Workspace;
  onRefreshStatus: () => void;
  onSkipOnboarding: () => void;
}

function AdminWorkspaceOnboarding({ workspace, onRefreshStatus, onSkipOnboarding }: AdminWorkspaceOnboardingProps) {
  const currentStep = getInitialOnboardingStep(workspace);

  return (
    <Container>
      <OnboardingHeader
        eyebrow="WORKSPACE ONBOARDING"
        title="온보딩이 완료될 때까지 이 화면에서 진행 상황을 안내합니다"
        description="온보딩이 완료되면 주점 상황을 한 눈에 파악할 수 있는 대시보드 화면을 확인할 수 있습니다."
        action={
          <NewCommonButton type="button" size="xs" onClick={onSkipOnboarding}>
            건너뛰기
          </NewCommonButton>
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
    </Container>
  );
}

export default AdminWorkspaceOnboarding;
