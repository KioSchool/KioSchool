import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { rowFlex } from '@styles/flexStyles';
import React from 'react';

const StyledButton = styled.button`
  ${rowFlex({ justify: 'center', align: 'center' })}
  background: ${Color.KIO_ORANGE};
  color: ${Color.WHITE};
  border: none;
  border-radius: 40px;
  cursor: pointer;
  padding: 5px 25px;
  font-size: 16px;
  font-family: 'LINE Seed Sans KR', sans-serif;
  font-weight: 700;
  height: 37px;

  cursor: pointer;

  &:hover {
    background: #ff9d50;
  }
`;

interface OrderToggleButtonProps {
  toggleShowServedOrders: React.Dispatch<React.SetStateAction<boolean>>;
  label: string;
}

function OrderStatisticsToggleButton({ toggleShowServedOrders, label }: OrderToggleButtonProps) {
  return (
    <StyledButton
      onClick={() => {
        toggleShowServedOrders((prev: boolean) => !prev);
      }}
    >
      {label}
    </StyledButton>
  );
}

export default OrderStatisticsToggleButton;
