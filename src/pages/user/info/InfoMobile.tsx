import React from 'react';
import styled from '@emotion/styled';
import { colFlex } from '@styles/flexStyles';
import InfoMain from '@components/user/info/info-main/InfoMain';
import InfoBenefit from '@components/user/info/info-benefit/InfoBenefit';
import InfoStatisticAndReview from '@components/user/info/info-statistic-and-review/InfoStatisticAndReview';

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
      <InfoStatisticAndReview />
    </Container>
  );
}

export default InfoMobile;
