import styled from '@emotion/styled';
import { RiRefreshLine } from '@remixicon/react';
import { Workspace } from '@@types/index';
import NewCommonButton from '@components/common/button/NewCommonButton';
import { OnboardingColor } from '@resources/colors';
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

const Header = styled.div`
  width: 100%;
  gap: 8px;
  ${colFlex({ align: 'start' })}
`;

const Eyebrow = styled.div`
  color: ${OnboardingColor.EYEBROW_TEXT};
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.08em;
`;

const Title = styled.h1`
  margin: 0;
  color: ${OnboardingColor.TITLE_TEXT};
  font-size: 18px;
  line-height: 1.2;
`;

const Description = styled.p`
  margin: 0;
  color: ${OnboardingColor.BODY_TEXT};
  font-size: 14px;
  line-height: 1.7;
`;

const ActionsRow = styled.div`
  width: 100%;
  gap: 12px;
  ${rowFlex({ justify: 'space-between', align: 'center' })}
`;

const ProgressContainer = styled.div`
  flex: 1;
`;

interface AdminWorkspaceOnboardingProps {
  workspaceId: string;
  workspace: Workspace;
  onRefreshStatus: () => void;
}

function AdminWorkspaceOnboarding({ workspaceId, workspace, onRefreshStatus }: AdminWorkspaceOnboardingProps) {
  const currentStep = getInitialOnboardingStep(workspace);

  return (
    <Container>
      <Header>
        <Eyebrow>WORKSPACE ONBOARDING</Eyebrow>
        <Title>온보딩이 완료될 때까지 이 화면에서 진행 상황을 안내합니다</Title>
        <Description>온보딩이 완료되면 주점 상황을 한 눈에 파악할 수 있는 대시보드 화면을 확인할 수 있습니다.</Description>
      </Header>

      <ActionsRow>
        <ProgressContainer>
          <OnboardingProgress workspace={workspace} currentStep={currentStep} />
        </ProgressContainer>
        <NewCommonButton type="button" size="xs" icon={<RiRefreshLine size={16} />} gap={6} color="blue_gray" onClick={onRefreshStatus}>
          최신 상태 확인
        </NewCommonButton>
      </ActionsRow>
      <OnboardingStepList workspace={workspace} workspaceId={workspaceId} currentStep={currentStep} />
    </Container>
  );
}

export default AdminWorkspaceOnboarding;
