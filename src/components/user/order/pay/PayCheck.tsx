import styled from '@emotion/styled';
import { match } from 'ts-pattern';
import { RiCheckLine } from '@remixicon/react';
import { Color } from '@resources/colors';
import { rowFlex } from '@styles/flexStyles';

const getBorder = (checked: boolean) =>
  match(checked)
    .with(true, () => 'none')
    .otherwise(() => '1.5px solid #d1d5d8');

const getBackground = (checked: boolean, color: string) =>
  match(checked)
    .with(true, () => color)
    .otherwise(() => Color.WHITE);

const Circle = styled.span<{ checked: boolean; color: string }>`
  box-sizing: border-box;
  flex-shrink: 0;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  border: ${({ checked }) => getBorder(checked)};
  background: ${({ checked, color }) => getBackground(checked, color)};
  ${rowFlex({ justify: 'center', align: 'center' })}
`;

interface PayCheckProps {
  checked: boolean;
  color: string;
}

function PayCheck({ checked, color }: PayCheckProps) {
  return (
    <Circle checked={checked} color={color} aria-hidden="true">
      {checked && <RiCheckLine size={15} color={Color.WHITE} />}
    </Circle>
  );
}

export default PayCheck;
