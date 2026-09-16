import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { Table, Workspace } from '@@types/index';
import { colFlex } from '@styles/flexStyles';
import { getOnboardingStepActions, isOnboardingStepCompleted } from '@utils/onboarding';
import OnboardingTableLayout from './OnboardingTableLayout';
import OnboardingStepCard from './step-list/OnboardingStepCard';
import { ONBOARDING_STEP, ONBOARDING_STEP_CARDS, OnboardingStep } from './onboardingData';

const Container = styled.div`
  width: 100%;
  gap: 10px;
  ${colFlex({ align: 'stretch' })}
`;

interface OnboardingStepListProps {
  workspace: Workspace;
  tables: Table[];
  currentStep: OnboardingStep;
}

function OnboardingStepList({ workspace, tables, currentStep }: OnboardingStepListProps) {
  const navigate = useNavigate();

  const stepActionsMap = getOnboardingStepActions(workspace.id);

  return (
    <Container>
      {ONBOARDING_STEP_CARDS.map((item) => {
        const completed = isOnboardingStepCompleted(workspace, item.step, tables);
        const active = item.step === currentStep;

        return (
          <OnboardingStepCard key={item.step} item={item} actions={stepActionsMap[item.step]} active={active} completed={completed} onActionClick={navigate}>
            {item.step === ONBOARDING_STEP.TABLES ? <OnboardingTableLayout workspace={workspace} tables={tables} /> : null}
          </OnboardingStepCard>
        );
      })}
    </Container>
  );
}

export default OnboardingStepList;
