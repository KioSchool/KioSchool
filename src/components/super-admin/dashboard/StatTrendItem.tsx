import styled from '@emotion/styled';
import { RiArrowDownLine, RiArrowUpLine, RiSubtractLine } from '@remixicon/react';
import { Color } from '@resources/colors';
import { rowFlex } from '@styles/flexStyles';

type Direction = 'up' | 'down' | 'flat';

const DIRECTION_ICON: Record<Direction, typeof RiArrowUpLine> = {
  up: RiArrowUpLine,
  down: RiArrowDownLine,
  flat: RiSubtractLine,
};

const DIRECTION_SIGN: Record<Direction, string> = {
  up: '+',
  down: '−',
  flat: '',
};

function getDirection(delta: number): Direction {
  if (delta > 0) return 'up';
  if (delta < 0) return 'down';
  return 'flat';
}

const Item = styled.div`
  font-size: 12px;
  font-weight: 500;
  color: ${Color.GREY};
  gap: 2px;
  ${rowFlex({ align: 'center' })}
`;

interface StatTrendItemProps {
  label: string;
  delta: number;
}

function StatTrendItem({ label, delta }: StatTrendItemProps) {
  const direction = getDirection(delta);
  const Icon = DIRECTION_ICON[direction];
  return (
    <Item>
      <Icon size={12} />
      {label} {DIRECTION_SIGN[direction]}
      {Math.abs(delta)}
    </Item>
  );
}

export default StatTrendItem;
