import { ReactNode } from 'react';
import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';

const PULSE_RING_COLOR = '255, 145, 66';
const PULSE_RING_START_ALPHA = 0.7;
const PULSE_RING_SPREAD_PX = 14;
const PULSE_DURATION_S = 1.6;
const DEFAULT_HIGHLIGHT_RADIUS_PX = 40;

const pulseAnimation = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(${PULSE_RING_COLOR}, ${PULSE_RING_START_ALPHA}); }
  70% { box-shadow: 0 0 0 ${PULSE_RING_SPREAD_PX}px rgba(${PULSE_RING_COLOR}, 0); }
  100% { box-shadow: 0 0 0 0 rgba(${PULSE_RING_COLOR}, 0); }
`;

// 링(box-shadow)이 자식 모양을 따라가려면 래퍼가 자식과 같은 radius 여야 하고, inline 자식의 descender 여백이 없어야 한다
const Container = styled('div', { shouldForwardProp: (prop) => prop !== 'active' && prop !== 'borderRadius' })<{ active: boolean; borderRadius: number }>`
  display: flex;
  border-radius: ${({ borderRadius }) => borderRadius}px;
  ${({ active }) =>
    active &&
    css`
      animation: ${pulseAnimation} ${PULSE_DURATION_S}s ease-out infinite;
    `}
`;

interface OnboardingActionHighlightProps {
  active: boolean;
  borderRadius?: number;
  className?: string;
  children: ReactNode;
}

function OnboardingActionHighlight({ active, borderRadius = DEFAULT_HIGHLIGHT_RADIUS_PX, className, children }: OnboardingActionHighlightProps) {
  return (
    <Container active={active} borderRadius={borderRadius} className={className}>
      {children}
    </Container>
  );
}

export default OnboardingActionHighlight;
