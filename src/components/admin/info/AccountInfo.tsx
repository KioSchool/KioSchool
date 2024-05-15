import styled from '@emotion/styled';

const Container = styled.div`
  background: #f4f4f4;
  width: 100%;
  height: 650px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const MainTitleContainer = styled.div`
  padding-bottom: 20px;
  width: 75%;
  font-weight: 800;
  font-size: 40px;
`;

const SubTitleContainer = styled.div`
  padding-bottom: 20px;
  width: 75%;
  font-weight: 400;
  font-size: 20px;
`;

interface InfoProps {
  mainDescription: string;
  subDescription: string;
  imageSrc: string;
  imageWidth: string;
  imageHeight: string;
}

function AccountInfo({ mainDescription, subDescription, imageSrc, imageWidth, imageHeight }: InfoProps) {
  return (
    <Container>
      <MainTitleContainer>{mainDescription}</MainTitleContainer>
      <SubTitleContainer>{subDescription}</SubTitleContainer>
      <img src={imageSrc} width={imageWidth} height={imageHeight} alt="Info 설명"></img>
    </Container>
  );
}

export default AccountInfo;
