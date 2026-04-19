import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { OnboardingStep, Workspace } from '@@types/index';
import { ONBOARDING_STEP_CARDS } from '@constants/data/onboardingData';
import { colFlex } from '@styles/flexStyles';
import { getOnboardingStepActions, isOnboardingStepCompleted } from '@utils/onboarding';
import OnboardingStepCard from './step-list/OnboardingStepCard';

const Container = styled.div`
  width: 100%;
  gap: 10px;
  ${colFlex({ align: 'stretch' })}
`;

interface OnboardingStepListProps {
  workspace: Workspace;
  workspaceId: string;
  currentStep: OnboardingStep;
}

function OnboardingStepList({ workspace, workspaceId, currentStep }: OnboardingStepListProps) {
  const navigate = useNavigate();

  const stepActionsMap = getOnboardingStepActions(workspaceId);

  return (
    <Container>
      {ONBOARDING_STEP_CARDS.map((item) => {
        const completed = isOnboardingStepCompleted(workspace, item.step);
        const active = item.step === currentStep;

        return (
          <OnboardingStepCard key={item.step} item={item} actions={stepActionsMap[item.step]} active={active} completed={completed} onActionClick={navigate} />
        );
      })}
    </Container>
  );
}

export default OnboardingStepList;
