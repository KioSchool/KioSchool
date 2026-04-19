import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Fragment } from 'react';
import { RiCheckLine } from '@remixicon/react';
import { match } from 'ts-pattern';
import { Workspace } from '@@types/index';
import { OnboardingStep } from '@@types/onboarding';
import { Color } from '@resources/colors';
import { rowFlex } from '@styles/flexStyles';
import { ONBOARDING_STEP_DEFINITIONS, isOnboardingStepCompleted } from '@utils/onboarding';

type ProgressVariant = 'active' | 'completed' | 'idle';
type ConnectorVariant = 'filled' | 'empty';

interface ProgressVariantStyle {
  borderColor: string;
  background: string;
  color: string;
  labelColor: string;
  labelWeight: number;
}

const PROGRESS_VARIANT_STYLE_MAP: Record<ProgressVariant, ProgressVariantStyle> = {
  active: {
    borderColor: Color.KIO_ORANGE,
    background: Color.KIO_ORANGE,
    color: Color.WHITE,
    labelColor: '#25282b',
    labelWeight: 700,
  },
  completed: {
    borderColor: Color.KIO_ORANGE,
    background: Color.KIO_ORANGE,
    color: Color.WHITE,
    labelColor: '#25282b',
    labelWeight: 700,
  },
  idle: {
    borderColor: '#d7dde2',
    background: '#ffffff',
    color: '#8d959c',
    labelColor: '#8d959c',
    labelWeight: 500,
  },
};

function getStepCircleStyles(variant: ProgressVariant) {
  const style = PROGRESS_VARIANT_STYLE_MAP[variant];

  return css`
    border: 1px solid ${style.borderColor};
    background: ${style.background};
    color: ${style.color};
  `;
}

function getStepLabelStyles(variant: ProgressVariant) {
  const style = PROGRESS_VARIANT_STYLE_MAP[variant];

  return css`
    color: ${style.labelColor};
    font-weight: ${style.labelWeight};
  `;
}

function getConnectorColor(variant: ConnectorVariant) {
  if (variant === 'filled') {
    return Color.KIO_ORANGE;
  }

  return '#e8eef2';
}

function renderStepCircleContent(variant: ProgressVariant, index: number) {
  if (variant === 'completed') {
    return <RiCheckLine size={16} />;
  }

  return index + 1;
}

const Container = styled.ol`
  width: 100%;
  padding: 0;
  margin: 0;
  list-style: none;
  gap: 12px;
  ${rowFlex({ justify: 'space-between', align: 'center' })}
`;

const StepItem = styled.li`
  flex: 0 0 auto;
  ${rowFlex({ justify: 'center', align: 'center' })}
`;

const Connector = styled.div<{ variant: ConnectorVariant }>`
  flex: 1;
  height: 2px;
  background: ${({ variant }) => getConnectorColor(variant)};
`;

const StepContents = styled.div`
  min-width: 118px;
  gap: 8px;
  ${rowFlex({ justify: 'center', align: 'center' })}
`;

const StepCircle = styled.div<{ variant: ProgressVariant }>`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  font-size: 13px;
  font-weight: 700;
  ${rowFlex({ justify: 'center', align: 'center' })}
  ${({ variant }) => getStepCircleStyles(variant)}
`;

const StepLabel = styled.span<{ variant: ProgressVariant }>`
  font-size: 13px;
  ${({ variant }) => getStepLabelStyles(variant)}
`;

interface OnboardingProgressProps {
  workspace: Workspace;
  currentStep: OnboardingStep;
}

function OnboardingProgress({ workspace, currentStep }: OnboardingProgressProps) {
  const currentIndex = ONBOARDING_STEP_DEFINITIONS.findIndex(({ step }) => step === currentStep);

  return (
    <Container>
      {ONBOARDING_STEP_DEFINITIONS.map(({ step, label }, index) => {
        const completed = isOnboardingStepCompleted(workspace, step);
        const active = currentStep === step;
        const progressVariant = match({ active, completed })
          .with({ active: true }, () => 'active' as const)
          .with({ completed: true }, () => 'completed' as const)
          .otherwise(() => 'idle' as const);
        const connectorVariant = match(index < currentIndex)
          .with(true, () => 'filled' as const)
          .otherwise(() => 'empty' as const);

        return (
          <Fragment key={step}>
            <StepItem>
              <StepContents>
                <StepCircle variant={progressVariant}>{renderStepCircleContent(progressVariant, index)}</StepCircle>
                <StepLabel variant={progressVariant}>{label}</StepLabel>
              </StepContents>
            </StepItem>
            {index < ONBOARDING_STEP_DEFINITIONS.length - 1 && <Connector variant={connectorVariant} />}
          </Fragment>
        );
      })}
    </Container>
  );
}

export default OnboardingProgress;
