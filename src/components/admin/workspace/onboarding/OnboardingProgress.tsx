import styled from '@emotion/styled';
import { Fragment } from 'react';
import { Workspace } from '@@types/index';
import { OnboardingStep } from '@@types/onboarding';
import { Color } from '@resources/colors';
import { rowFlex } from '@styles/flexStyles';
import { ONBOARDING_STEP_DEFINITIONS, isOnboardingStepCompleted } from '@utils/onboarding';

const Container = styled.ol`
  width: 100%;
  padding: 0;
  margin: 0;
  list-style: none;
  ${rowFlex({ justify: 'space-between', align: 'center' })}
  gap: 12px;
`;

const StepItem = styled.li`
  flex: 0 0 auto;
  ${rowFlex({ justify: 'center', align: 'center' })}
`;

const Connector = styled.div<{ active: boolean }>`
  flex: 1;
  height: 2px;
  background: ${({ active }) => (active ? Color.KIO_ORANGE : '#e8eef2')};
`;

const StepButton = styled.button<{ active: boolean; completed: boolean; clickable: boolean }>`
  padding: 0;
  border: none;
  background: transparent;
  min-width: 118px;
  cursor: ${({ clickable }) => (clickable ? 'pointer' : 'default')};
  gap: 8px;
  ${rowFlex({ justify: 'center', align: 'center' })}
`;

const StepCircle = styled.div<{ active: boolean; completed: boolean }>`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 1px solid ${({ active, completed }) => (active || completed ? Color.KIO_ORANGE : '#d7dde2')};
  background: ${({ active, completed }) => (active || completed ? Color.KIO_ORANGE : '#ffffff')};
  color: ${({ active, completed }) => (active || completed ? Color.WHITE : '#8d959c')};
  font-size: 13px;
  font-weight: 700;
  ${rowFlex({ justify: 'center', align: 'center' })}
`;

const StepLabel = styled.span<{ active: boolean; completed: boolean }>`
  color: ${({ active, completed }) => (active || completed ? '#25282b' : '#8d959c')};
  font-size: 13px;
  font-weight: ${({ active, completed }) => (active || completed ? 700 : 500)};
`;

interface OnboardingProgressProps {
  workspace: Workspace;
  currentStep: OnboardingStep;
  onStepClick: (step: OnboardingStep) => void;
}

function OnboardingProgress({ workspace, currentStep, onStepClick }: OnboardingProgressProps) {
  const currentIndex = ONBOARDING_STEP_DEFINITIONS.findIndex(({ step }) => step === currentStep);

  return (
    <Container>
      {ONBOARDING_STEP_DEFINITIONS.map(({ step, label }, index) => {
        const completed = isOnboardingStepCompleted(workspace, step) || step === currentStep;
        const active = currentStep === step;
        const clickable = index < currentIndex && completed;

        return (
          <Fragment key={step}>
            <StepItem>
              <StepButton type="button" active={active} completed={completed} clickable={clickable} onClick={() => clickable && onStepClick(step)}>
                <StepCircle active={active} completed={completed}>
                  {completed && !active ? '✓' : index + 1}
                </StepCircle>
                <StepLabel active={active} completed={completed}>
                  {label}
                </StepLabel>
              </StepButton>
            </StepItem>
            {index < ONBOARDING_STEP_DEFINITIONS.length - 1 && <Connector active={index < currentIndex} />}
          </Fragment>
        );
      })}
    </Container>
  );
}

export default OnboardingProgress;
