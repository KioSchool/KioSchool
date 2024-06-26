import styled from '@emotion/styled';

const Container = styled.div`
  padding: 20px 0;
  width: 100vw;
  background: #f4f4f4;
  gap: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SubContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

const MainDescriptionContainer = styled.div`
  padding: 10px 0;
  font-weight: 800;
  font-size: 40px;
`;

const SubDescriptionContainer = styled.div`
  padding: 15px 0;
  font-weight: 400;
  font-size: 25px;
`;

const AdditionalDescriptionContainer = styled.div`
  padding-bottom: 15px;
  font-weight: 700;
  font-size: 20px;
`;

interface InfoProps {
  mainDescription: string;
  subDescription: string;
  additionalDescription?: JSX.Element;
  imageSrc: string;
  imageWidth: string;
  imageHeight: string;
}

function KioSchoolInfo({ mainDescription, subDescription, additionalDescription, imageSrc, imageWidth, imageHeight }: InfoProps) {
  return (
    <Container>
      <SubContainer>
        <MainDescriptionContainer>{mainDescription}</MainDescriptionContainer>
        <SubDescriptionContainer>{subDescription}</SubDescriptionContainer>
        <AdditionalDescriptionContainer>{additionalDescription}</AdditionalDescriptionContainer>
        <img src={imageSrc} width={imageWidth} height={imageHeight} alt="Info 설명" />
      </SubContainer>
    </Container>
  );
}

export default KioSchoolInfo;
