import React from 'react';
import styled from '@emotion/styled';
import InfoTitle from '@components/user/info/InfoTitle';
import { colFlex, rowFlex } from '@styles/flexStyles';
import InfoBenefitFeatureList from '@components/user/info/info-benefit/InfoBenefitFeatureList';
import InfoBenefitImage from '@components/user/info/info-benefit/InfoBenefitImage';

const Container = styled.div`
  width: 100%;
  height: 100vh;
  ${colFlex({ align: 'center' })};
`;

const SubContainer = styled.div`
  width: 1000px;
  height: 100%;
  padding-top: 120px;
  gap: 100px;
  ${colFlex()};
`;

const ContentContainer = styled.div`
  width: 100%;
  height: 350px;
  gap: 20px;
  ${rowFlex({ justify: 'space-between' })};
`;

const FeatureContainer = styled.div`
  width: 50%;
  height: 100%;
`;

const ImageContainer = styled.div`
  width: 50%;
  height: 100%;
`;

function InfoBenefit() {
  return (
    <Container>
      <SubContainer>
        <InfoTitle text={'What benefit will you get'} />
        <ContentContainer>
          <FeatureContainer>
            <InfoBenefitFeatureList />
          </FeatureContainer>
          <ImageContainer>
            <InfoBenefitImage />
          </ImageContainer>
        </ContentContainer>
      </SubContainer>
    </Container>
  );
}

export default InfoBenefit;
