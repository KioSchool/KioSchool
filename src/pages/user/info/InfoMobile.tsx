import React from 'react';
import styled from '@emotion/styled';
import { colFlex } from '@styles/flexStyles';
import InfoMain from '@components/user/info/info-main/InfoMain';
import InfoBenefit from '@components/user/info/info-benefit/InfoBenefit';
import InfoStatisticAndReview from '@components/user/info/info-statistic-and-review/InfoStatisticAndReview';
import InfoOurService from '@components/user/info/info-our-service/InfoOurService';
import InfoCreatorsWordsMobile from '@components/user/info/info-creators-word/InfoCreatorsWordsMobile';

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
      <InfoOurService />
      <InfoCreatorsWordsMobile />
    </Container>
  );
}

export default InfoMobile;
