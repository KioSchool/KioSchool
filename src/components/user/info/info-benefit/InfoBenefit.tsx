import styled from '@emotion/styled';
import InfoTitle from '@components/user/info/InfoTitle';
import { colFlex, rowFlex } from '@styles/flexStyles';
import InfoBenefitFeatureList from '@components/user/info/info-benefit/InfoBenefitFeatureList';
import InfoBenefitImage from '@components/user/info/info-benefit/InfoBenefitImage';
import { tabletMediaQuery } from '@styles/globalStyles';

const Container = styled.div`
  width: 100%;
  height: 100vh;
  ${colFlex({ align: 'center' })};
  ${tabletMediaQuery} {
    height: auto;
  }
`;

const SubContainer = styled.div`
  width: 1000px;
  height: 100%;
  padding-top: 120px;
  gap: 100px;
  ${colFlex()};
  ${tabletMediaQuery} {
    width: 320px;
    gap: 50px;
  }
`;

const ContentContainer = styled.div`
  width: 100%;
  height: 350px;
  gap: 20px;
  ${rowFlex({ justify: 'space-between' })};
  ${tabletMediaQuery} {
    ${colFlex()};
    flex-direction: column-reverse;
    height: auto;
    gap: 50px;
  }
`;

const FeatureContainer = styled.div`
  width: 50%;
  height: 100%;
  ${tabletMediaQuery} {
    width: auto;
    height: auto;
  }
`;

const ImageContainer = styled.div`
  width: 50%;
  height: 100%;
  ${tabletMediaQuery} {
    width: 100%;
    height: auto;
  }
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
