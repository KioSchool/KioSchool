import styled from '@emotion/styled';
import { colFlex } from '@styles/flexStyles';
import { ReactNode } from 'react';

const ItemContainer = styled.div`
  width: 160px;
  height: 150px;
  ${colFlex({ justify: 'space-between', align: 'center' })}
`;

const ButtonContainer = styled.div`
  position: relative;
  width: 156px;
  height: 70px;
`;

const ItemLabel = styled.div`
  width: 156px;
  height: 43px;
  text-align: center;
  font-size: 24px;
  font-weight: 400;
`;

interface MyInfoContentItemProps {
  label: string;
  children: ReactNode;
}

function MyInfoItemContent({ label, children }: MyInfoContentItemProps) {
  return (
    <ItemContainer className={'my-info-item-container'}>
      <ButtonContainer className={'button-container'}>{children}</ButtonContainer>
      <ItemLabel className={'item-label'}>{label}</ItemLabel>
    </ItemContainer>
  );
}

export default MyInfoItemContent;
