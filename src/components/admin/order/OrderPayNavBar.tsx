import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { rowFlex } from '@styles/flexStyles';
import React, { useState } from 'react';

const Container = styled.div`
  width: 100%;
  height: auto;
  padding: 0 10px;
  box-sizing: border-box;
  gap: 8px;
  overflow-x: auto;
  white-space: nowrap;
  ${rowFlex({ justify: 'center', align: 'center' })}
  border-top: 10px solid ${Color.LIGHT_GREY};
  border-bottom: 1px solid ${Color.LIGHT_GREY};

  &::-webkit-scrollbar {
    display: none;
  }
`;

const CategoryLink = styled.div<{ isSelected: boolean }>`
  width: 50%;
  padding: 10px 10px;
  border-bottom: ${({ isSelected }) => (isSelected ? '3px solid black' : '3px solid transparent')};
  font-weight: ${({ isSelected }) => (isSelected ? '600' : '')};
  color: ${({ isSelected }) => (isSelected ? Color.BLACK : Color.GREY)};
  ${rowFlex({ justify: 'center', align: 'center' })}
`;

function OrderPayNavBar() {
  const [isTossPay, setIsTossPay] = useState<boolean>(false);

  return (
    <Container>
      <CategoryLink isSelected={isTossPay} onClick={() => setIsTossPay(true)}>
        토스결제
      </CategoryLink>
      <CategoryLink isSelected={!isTossPay} onClick={() => setIsTossPay(false)}>
        계좌결제
      </CategoryLink>
    </Container>
  );
}

export default OrderPayNavBar;
