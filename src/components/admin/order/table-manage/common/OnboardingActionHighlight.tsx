import { ReactNode } from 'react';
import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';

const pulseAnimation = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(255, 145, 66, 0.45); }
  70% { box-shadow: 0 0 0 10px rgba(255, 145, 66, 0); }
  100% { box-shadow: 0 0 0 0 rgba(255, 145, 66, 0); }
`;

const Container = styled('div', { shouldForwardProp: (prop) => prop !== 'active' })<{ active: boolean }>`
  border-radius: 40px;
  ${({ active }) =>
    active &&
    css`
      animation: ${pulseAnimation} 1.8s ease-out infinite;
    `}
`;

interface OnboardingActionHighlightProps {
  active: boolean;
  children: ReactNode;
}

function OnboardingActionHighlight({ active, children }: OnboardingActionHighlightProps) {
  return <Container active={active}>{children}</Container>;
}

export default OnboardingActionHighlight;
