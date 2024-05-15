import styled from '@emotion/styled';

const Container = styled.div`
  margin: 20px 0;
  padding: 20px;
  background: #f4f4f4;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const MainDescriptionContainer = styled.div`
  padding-bottom: 20px;
  width: 75%;
  font-weight: 800;
  font-size: 40px;
`;

const SubDescriptionContainer = styled.div`
  padding-bottom: 20px;
  width: 75%;
  font-weight: 400;
  font-size: 25px;
`;

const AddtionalDescriptionContainer = styled.div`
  padding-bottom: 20px;
  width: 75%;
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

function AccountInfo({ mainDescription, subDescription, additionalDescription, imageSrc, imageWidth, imageHeight }: InfoProps) {
  return (
    <Container>
      <MainDescriptionContainer>{mainDescription}</MainDescriptionContainer>
      <SubDescriptionContainer>{subDescription}</SubDescriptionContainer>
      <AddtionalDescriptionContainer>{additionalDescription}</AddtionalDescriptionContainer>
      <img src={imageSrc} width={imageWidth} height={imageHeight} alt="Info 설명"></img>
    </Container>
  );
}

export default AccountInfo;
