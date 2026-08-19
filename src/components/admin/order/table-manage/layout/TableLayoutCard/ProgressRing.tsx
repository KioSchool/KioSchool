import styled from '@emotion/styled';
import { Color } from '@resources/colors';

export const RING_SIZE_CARD_PX = 30;
export const RING_SIZE_ROW_PX = 22;

const THICKNESS_RATIO = 5;
const FULL_PERCENT = 100;

const Ring = styled.div<{ size: number; percent: number; fillColor: string }>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border-radius: 50%;
  flex-shrink: 0;
  position: relative;
  background: ${({ percent, fillColor }) => `conic-gradient(${fillColor} ${percent}%, ${Color.HEAVY_GREY} 0)`};
`;

const Hole = styled.div<{ size: number; holeColor: string }>`
  position: absolute;
  inset: ${({ size }) => Math.round(size / THICKNESS_RATIO)}px;
  border-radius: 50%;
  background-color: ${({ holeColor }) => holeColor};
`;

interface ProgressRingProps {
  percent: number;
  fillColor: string;
  holeColor: string;
  size?: number;
}

function ProgressRing({ percent, fillColor, holeColor, size = RING_SIZE_CARD_PX }: ProgressRingProps) {
  const clamped = Math.min(FULL_PERCENT, Math.max(0, percent));

  return (
    <Ring size={size} percent={clamped} fillColor={fillColor}>
      <Hole size={size} holeColor={holeColor} />
    </Ring>
  );
}

export default ProgressRing;
