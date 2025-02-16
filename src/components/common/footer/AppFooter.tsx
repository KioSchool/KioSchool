import React from 'react';
import styled from '@emotion/styled';
import AppLabel from '@components/common/label/AppLabel';
import { colFlex } from '@styles/flexStyles';

const FixedContainer = styled.div`
  z-index: 1001;
  width: 100%;
  bottom: 0;
  left: 0;
  right: 0;
  position: fixed;
  padding: 15px 24px;
  box-sizing: border-box;
  ${colFlex({ justify: 'center', align: 'center' })}
`;

const NonFixedContainer = styled.div`
  width: 100%;
  padding: 15px 24px;
  box-sizing: border-box;
  ${colFlex({ justify: 'center', align: 'center' })}
`;

interface AppFooterProps {
  fixed?: boolean;
}

function AppFooter({ fixed = true }: AppFooterProps) {
  if (!fixed)
    return (
      <NonFixedContainer className={'app-footer'}>
        <AppLabel size={16}>©KioSchool All rights reserved.</AppLabel>
      </NonFixedContainer>
    );

  return (
    <FixedContainer className={'app-footer'}>
      <AppLabel size={16}>©KioSchool All rights reserved.</AppLabel>
    </FixedContainer>
  );
}

export default AppFooter;
