import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { Workspace } from '@@types/index';
import { colFlex } from '@styles/flexStyles';
import { getOnboardingStepActions, isOnboardingStepCompleted } from '@utils/onboarding';
import OnboardingStepCard from './step-list/OnboardingStepCard';
import { ONBOARDING_STEP_CARDS, OnboardingStep } from './onboardingData';

const Container = styled.div`
  width: 100%;
  gap: 10px;
  ${colFlex({ align: 'stretch' })}
`;

interface OnboardingStepListProps {
  workspace: Workspace;
  currentStep: OnboardingStep;
}

function OnboardingStepList({ workspace, currentStep }: OnboardingStepListProps) {
  const navigate = useNavigate();

  const stepActionsMap = getOnboardingStepActions(workspace.id);

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
