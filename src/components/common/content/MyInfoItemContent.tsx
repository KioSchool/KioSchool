import styled from '@emotion/styled';
import { ReactNode } from 'react';

const ItemContainer = styled.div`
  width: 160px;
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const ButtonContainer = styled.div`
  position: relative;
  width: 156px;
  height: 70px;
`;

const ItmeLabel = styled.div`
  width: 156px;
  height: 43px;
  text-align: center;
  font-size: 24px;
  font-weight: 400;
`;

interface MyInfoContentItmeProps {
  label: string;
  children: ReactNode;
}

function MyInfoItemContent({ label, children }: MyInfoContentItmeProps) {
  return (
    <ItemContainer>
      <ButtonContainer>{children}</ButtonContainer>
      <ItmeLabel>{label}</ItmeLabel>
    </ItemContainer>
  );
}

export default MyInfoItemContent;
