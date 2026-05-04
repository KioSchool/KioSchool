import styled from '@emotion/styled';
import { css, keyframes } from '@emotion/react';
import { useEffect, useState } from 'react';
import { RiRefreshLine } from '@remixicon/react';
import { rowFlex } from '@styles/flexStyles';
import { expandButtonStyle } from '@styles/buttonStyles';

const SPIN_DURATION = '0.8s';

const spinAnimation = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const Wrapper = styled.div<{ shouldAnimate: boolean }>`
  ${rowFlex({ justify: 'center', align: 'center' })}
  ${({ shouldAnimate }) =>
    shouldAnimate &&
    css`
      animation: ${spinAnimation} ${SPIN_DURATION} linear;
    `}
`;

const Icon = styled(RiRefreshLine)`
  cursor: pointer;
  ${expandButtonStyle}
`;

interface RefreshSpinIconProps {
  isLoading: boolean;
  onClick?: () => void;
  size?: number;
  color?: string;
}

function RefreshSpinIcon({ isLoading, onClick, size = 16, color = '#5d6368' }: RefreshSpinIconProps) {
  const [spinCount, setSpinCount] = useState(0);

  useEffect(() => {
    if (isLoading) setSpinCount((count) => count + 1);
  }, [isLoading]);

  return (
    <Wrapper key={spinCount} shouldAnimate={spinCount > 0}>
      <Icon size={size} color={color} onClick={onClick} />
    </Wrapper>
  );
}

export default RefreshSpinIcon;
