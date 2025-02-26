import React from 'react';
import styled from '@emotion/styled';
import { colFlex } from '@styles/flexStyles';
import InfoMain from '@components/user/info/info-main/InfoMain';
import InfoBenefit from '@components/user/info/info-benefit/InfoBenefit';

const Container = styled.div`
  width: 100%;
  box-sizing: border-box;
  ${colFlex()}
`;

function InfoMobile() {
  return (
    <Container>
      <InfoMain />
      <InfoBenefit />
    </Container>
  );
}

export default InfoMobile;
