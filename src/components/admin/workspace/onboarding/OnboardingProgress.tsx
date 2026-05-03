import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Fragment } from 'react';
import { RiCheckLine } from '@remixicon/react';
import { match } from 'ts-pattern';
import { Workspace } from '@@types/index';
import { Color, OnboardingColor } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { ONBOARDING_STEP_DEFINITIONS, isOnboardingStepCompleted } from '@utils/onboarding';
import { OnboardingStep } from './onboardingData';

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
    labelColor: OnboardingColor.TITLE_TEXT,
    labelWeight: 700,
  },
  completed: {
    borderColor: Color.KIO_ORANGE,
    background: Color.KIO_ORANGE,
    color: Color.WHITE,
    labelColor: OnboardingColor.TITLE_TEXT,
    labelWeight: 700,
  },
  idle: {
    borderColor: OnboardingColor.STEP_IDLE_BORDER,
    background: OnboardingColor.STEP_INACTIVE_BG,
    color: OnboardingColor.EYEBROW_TEXT,
    labelColor: OnboardingColor.EYEBROW_TEXT,
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
  return match(variant)
    .with('filled', () => Color.KIO_ORANGE)
    .with('empty', () => OnboardingColor.CONNECTOR_IDLE)
    .exhaustive();
}

function renderStepCircleContent(variant: ProgressVariant, index: number) {
  if (variant === 'completed') {
    return <RiCheckLine size={16} />;
  }

  return index + 1;
}

const STEP_CIRCLE_SIZE = 30;

const Container = styled.ol`
  width: 100%;
  padding: 0 0 24px;
  margin: 0;
  list-style: none;
  ${rowFlex({ justify: 'space-between', align: 'flex-start' })}
`;

const StepItem = styled.li`
  flex: 0 0 ${STEP_CIRCLE_SIZE}px;
  position: relative;
  gap: 8px;
  ${colFlex({ justify: 'flex-start', align: 'center' })}
`;

const Connector = styled.div<{ variant: ConnectorVariant }>`
  flex: 1;
  height: 2px;
  margin-top: ${STEP_CIRCLE_SIZE / 2 - 1}px;
  background: ${({ variant }) => getConnectorColor(variant)};
`;

const StepCircle = styled.div<{ variant: ProgressVariant }>`
  width: ${STEP_CIRCLE_SIZE}px;
  height: ${STEP_CIRCLE_SIZE}px;
  border-radius: 50%;
  font-size: 13px;
  font-weight: 700;
  ${rowFlex({ justify: 'center', align: 'center' })}
  ${({ variant }) => getStepCircleStyles(variant)}
`;

const StepLabel = styled.span<{ variant: ProgressVariant }>`
  position: absolute;
  top: ${STEP_CIRCLE_SIZE + 8}px;
  font-size: 13px;
  white-space: nowrap;
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
              <StepCircle variant={progressVariant}>{renderStepCircleContent(progressVariant, index)}</StepCircle>
              <StepLabel variant={progressVariant}>{label}</StepLabel>
            </StepItem>
            {index < ONBOARDING_STEP_DEFINITIONS.length - 1 && <Connector variant={connectorVariant} />}
          </Fragment>
        );
      })}
    </Container>
  );
}

export default OnboardingProgress;
