import styled from '@emotion/styled';
import { Color } from '@resources/colors';

const ONBOARDING_PALETTE = {
  done: { fg: Color.GREY },
  pending: { fg: Color.KIO_ORANGE },
} as const;

type OnboardingState = keyof typeof ONBOARDING_PALETTE;

const Badge = styled.span<{ state: OnboardingState }>`
  font-size: 12px;
  font-weight: 600;
  color: ${({ state }) => ONBOARDING_PALETTE[state].fg};
`;

const STATE_LABEL: Record<OnboardingState, string> = {
  done: '완료',
  pending: '미완료',
};

interface OnboardingBadgeProps {
  done: boolean;
}

function OnboardingBadge({ done }: OnboardingBadgeProps) {
  const state: OnboardingState = done ? 'done' : 'pending';
  return <Badge state={state}>{STATE_LABEL[state]}</Badge>;
}

export default OnboardingBadge;
