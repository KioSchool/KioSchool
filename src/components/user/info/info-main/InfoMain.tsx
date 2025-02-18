import React from 'react';
import styled from '@emotion/styled';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { Color } from '@resources/colors';
import infoMainPhoneImage from '@resources/image/infoMainPhoneImage.png';
import InfoMainDescription from '@components/user/info/info-main/InfoMainDescription';

const Container = styled.div`
  width: 100%;
  height: 100vh;
  user-select: none;
  ${rowFlex({ align: 'center', justify: 'center' })};
`;

const BackgroundContainer = styled.div`
  position: absolute;
  width: 100%;
  top: 25%;
  box-sizing: border-box;
  overflow: hidden;
`;

const BackgroundText = styled.div`
  font-size: 400px;
  font-weight: 700;
  width: max-content;
  box-sizing: border-box;
  white-space: nowrap;
  color: #00000008;
  animation: marquee 30s linear infinite;

  @keyframes marquee {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(-50%);
    }
  }
`;

const SubContainer = styled.div`
  height: 100%;
  width: 1000px;
  padding-top: 200px;
  box-sizing: border-box;
  z-index: 1;
  ${colFlex({ justify: 'start' })};
`;

const TitleContainer = styled.div`
  width: 100%;
  margin-bottom: 20px;
`;

const ContentContainer = styled.div`
  width: 100%;
  ${rowFlex({ justify: 'space-between' })};
`;

const DescriptionContainer = styled.div`
  width: 50%;
  height: 300px;
`;

const ImageContainer = styled.div`
  width: 50%;
`;

const Image = styled.img`
  width: 140%;
  height: auto;
`;

const MainTitle = styled.div<{ color?: string }>`
  font-size: 60px;
  font-weight: 700;
  color: ${(props) => props.color || Color.BLACK};
`;

function InfoMain() {
  return (
    <Container>
      <SubContainer>
        <TitleContainer>
          <MainTitle>스마트한 주점 운영의 시작,</MainTitle>
          <MainTitle color={Color.KIO_ORANGE}>키오스쿨</MainTitle>
        </TitleContainer>
        <ContentContainer>
          <DescriptionContainer>
            <InfoMainDescription />
          </DescriptionContainer>
          <ImageContainer>
            <Image src={infoMainPhoneImage} />
          </ImageContainer>
        </ContentContainer>
      </SubContainer>
      <BackgroundContainer>
        <BackgroundText>KIOSCHOOLKIOSCHOOLKIOSCHOOLKIOSCHOOL</BackgroundText>
      </BackgroundContainer>
    </Container>
  );
}

export default InfoMain;
