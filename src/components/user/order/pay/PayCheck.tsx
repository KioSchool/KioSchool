import styled from '@emotion/styled';
import { RiCheckLine } from '@remixicon/react';
import { rowFlex } from '@styles/flexStyles';

const Circle = styled.span<{ checked: boolean; color: string }>`
  box-sizing: border-box;
  flex-shrink: 0;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  border: ${({ checked }) => (checked ? 'none' : '1.5px solid #d1d5d8')};
  background: ${({ checked, color }) => (checked ? color : '#ffffff')};
  ${rowFlex({ justify: 'center', align: 'center' })}
`;

interface PayCheckProps {
  checked: boolean;
  color: string;
}

// 송금 방법 카드 오른쪽 위 고름 표시
function PayCheck({ checked, color }: PayCheckProps) {
  return (
    <Circle checked={checked} color={color} aria-hidden="true">
      {checked && <RiCheckLine size={15} color="#ffffff" />}
    </Circle>
  );
}

export default PayCheck;
