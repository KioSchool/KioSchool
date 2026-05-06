import styled from '@emotion/styled';
import { Color } from '@resources/colors';

const ONBOARDING_PALETTE = {
  done: { bg: Color.GREEN_FAINT, fg: Color.GREEN },
  pending: { bg: Color.KIO_ORANGE_FAINT, fg: Color.KIO_ORANGE_DARK },
} as const;

type OnboardingState = keyof typeof ONBOARDING_PALETTE;

const Pill = styled.span<{ state: OnboardingState }>`
  padding: 2px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  background: ${({ state }) => ONBOARDING_PALETTE[state].bg};
  color: ${({ state }) => ONBOARDING_PALETTE[state].fg};
  white-space: nowrap;
`;

const STATE_LABEL: Record<OnboardingState, string> = {
  done: '온보딩 완료',
  pending: '온보딩 미완',
};

interface OnboardingBadgeProps {
  done: boolean;
}

function OnboardingBadge({ done }: OnboardingBadgeProps) {
  const state: OnboardingState = done ? 'done' : 'pending';
  return <Pill state={state}>{STATE_LABEL[state]}</Pill>;
}

export default OnboardingBadge;
