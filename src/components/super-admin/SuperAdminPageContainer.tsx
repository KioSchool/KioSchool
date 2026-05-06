import { ReactNode } from 'react';
import styled from '@emotion/styled';
import { colFlex } from '@styles/flexStyles';
import { mobileMediaQuery } from '@styles/globalStyles';

const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  gap: 24px;
  padding-top: 97px;
  padding-bottom: 32px;
  min-width: 0;
  ${colFlex()}

  ${mobileMediaQuery} {
    gap: 16px;
    padding-top: 76px;
    padding-bottom: 20px;
  }
`;

interface SuperAdminPageContainerProps {
  children: ReactNode;
}

function SuperAdminPageContainer({ children }: SuperAdminPageContainerProps) {
  return <Container>{children}</Container>;
}

export default SuperAdminPageContainer;
