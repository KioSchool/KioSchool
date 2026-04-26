import styled from '@emotion/styled';
import { ReactNode } from 'react';
import { colFlex } from '@styles/flexStyles';

const Container = styled.div`
  width: 100%;
  max-width: 880px;
  padding: 12px 0 72px;
  box-sizing: border-box;
  gap: 22px;
  ${colFlex({ align: 'center' })}
`;

interface OnboardingContainerProps {
  children: ReactNode;
}

function OnboardingContainer({ children }: OnboardingContainerProps) {
  return <Container>{children}</Container>;
}

export default OnboardingContainer;
