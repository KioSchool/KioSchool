import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { RiCheckLine } from '@remixicon/react';
import { match } from 'ts-pattern';
import AppBadge from '@components/common/badge/AppBadge';
import NewCommonButton from '@components/common/button/NewCommonButton';
import { StepActionItem, StepCardItem } from '@components/admin/workspace/onboarding/onboardingData';
import { Color, OnboardingColor } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';

type StepCardVariant = 'active' | 'inactive';
type StepStatusVariant = 'completed' | 'pending';

interface StepStatusStyle {
  background: string;
  color: string;
  label: string;
}

interface StepCardStyle {
  padding: string;
  borderColor: string;
  background: string;
  opacity: number;
}

const STEP_CARD_STYLE_MAP: Record<StepCardVariant, StepCardStyle> = {
  active: {
    padding: '14px 16px',
    borderColor: OnboardingColor.STEP_ACTIVE_BORDER,
    background: OnboardingColor.STEP_ACTIVE_BG,
    opacity: 1,
  },
  inactive: {
    padding: '12px 16px',
    borderColor: OnboardingColor.STEP_INACTIVE_BORDER,
    background: OnboardingColor.STEP_INACTIVE_BG,
    opacity: 0.58,
  },
};

const STEP_STATUS_STYLE_MAP: Record<StepStatusVariant, StepStatusStyle> = {
  completed: {
    background: OnboardingColor.STEP_COMPLETED_BG,
    color: Color.GREEN,
    label: '완료됨',
  },
  pending: {
    background: OnboardingColor.STEP_PENDING_BG,
    color: Color.KIO_ORANGE,
    label: '설정 필요',
  },
};

function getStepCardStyles(variant: StepCardVariant) {
  const style = STEP_CARD_STYLE_MAP[variant];

  return css`
    padding: ${style.padding};
    border: 1px solid ${style.borderColor};
    background: ${style.background};
    opacity: ${style.opacity};
  `;
}

const Container = styled.div<{ variant: StepCardVariant }>`
  width: 100%;
  border-radius: 18px;
  box-sizing: border-box;
  gap: 10px;
  transition: opacity 0.2s ease, border-color 0.2s ease, background-color 0.2s ease, padding 0.2s ease;
  ${colFlex({ align: 'stretch' })}
  ${({ variant }) => getStepCardStyles(variant)}
`;

const StepMetaColumn = styled.div`
  width: 100%;
  gap: 8px;
  ${colFlex({ align: 'start' })}
`;

const StepHeader = styled.div`
  width: 100%;
  gap: 10px;
  ${rowFlex({ justify: 'space-between', align: 'start' })}
`;

const StepNumber = styled.div<{ variant: StepStatusVariant }>`
  padding: 5px 10px;
  border-radius: 999px;
  background: ${({ variant }) => STEP_STATUS_STYLE_MAP[variant].background};
  color: ${({ variant }) => STEP_STATUS_STYLE_MAP[variant].color};
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.04em;
  ${rowFlex({ justify: 'center', align: 'center' })}
`;

const StepTitle = styled.div`
  color: ${OnboardingColor.TITLE_TEXT};
  font-size: 17px;
  font-weight: 700;
  line-height: 1.3;
  padding-left: 4px;
`;

const StepBodyColumn = styled.div`
  width: 100%;
  gap: 6px;
  padding-left: 4px;
  ${colFlex({ align: 'start' })}
`;

const StepDescriptionColumn = styled.div`
  width: 100%;
  gap: 4px;
  ${colFlex({ align: 'start' })}
`;

const StepDescription = styled.div`
  color: ${OnboardingColor.BODY_TEXT};
  font-size: 13px;
  line-height: 1.55;
`;

const StepHint = styled.div`
  color: ${OnboardingColor.MUTED_TEXT};
  font-size: 12px;
  line-height: 1.5;
`;

const StepActions = styled.div`
  width: 100%;
  flex-wrap: wrap;
  gap: 6px;
  padding-top: 6px;
  ${rowFlex({ justify: 'start', align: 'center' })}
`;

interface OnboardingStepCardProps {
  item: StepCardItem;
  actions: StepActionItem[];
  active: boolean;
  completed: boolean;
  onActionClick: (path: string) => void;
}

function OnboardingStepCard({ item, actions, active, completed, onActionClick }: OnboardingStepCardProps) {
  const cardVariant = match(active)
    .with(true, () => 'active' as const)
    .otherwise(() => 'inactive' as const);
  const statusVariant = match(completed)
    .with(true, () => 'completed' as const)
    .otherwise(() => 'pending' as const);
  const statusStyle = STEP_STATUS_STYLE_MAP[statusVariant];

  return (
    <Container variant={cardVariant}>
      <StepMetaColumn>
        <StepHeader>
          <StepNumber variant={statusVariant}>STEP {item.stepNumber}</StepNumber>
          <AppBadge
            noBorder
            icon={completed ? <RiCheckLine size={14} /> : undefined}
            customSize={{ height: 24, font: 11, paddingX: 9 }}
            customColors={{
              background: statusStyle.background,
              color: statusStyle.color,
              border: 'none',
            }}
          >
            {statusStyle.label}
          </AppBadge>
        </StepHeader>
        <StepTitle>{item.title}</StepTitle>
      </StepMetaColumn>

      {active ? (
        <StepBodyColumn>
          <StepDescriptionColumn>
            <StepDescription>{item.description}</StepDescription>
            <StepHint>{item.hint}</StepHint>
          </StepDescriptionColumn>

          <StepActions>
            {actions.map((action) => (
              <NewCommonButton key={action.path} type="button" size="xs" color="kio_orange" onClick={() => onActionClick(action.path)}>
                {action.label}
              </NewCommonButton>
            ))}
          </StepActions>
        </StepBodyColumn>
      ) : null}
    </Container>
  );
}

export default OnboardingStepCard;
