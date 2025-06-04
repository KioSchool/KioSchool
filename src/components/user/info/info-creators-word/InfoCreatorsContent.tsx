import styled from '@emotion/styled';
import { colFlex, rowFlex } from '@styles/flexStyles';

const Container = styled.div`
  width: 100%;
  height: 280px;
  gap: 55px;
  ${rowFlex({ align: 'center' })};
`;

const LeftContainer = styled.div`
  width: 30%;
  height: 100%;
  border-radius: 16px;
  ${rowFlex({ justify: 'center' })};
`;

const Image = styled.img`
  height: 100%;
  border-radius: 16px;
  object-fit: cover;
`;

const RightContainer = styled.div`
  width: 70%;
  height: 100%;
  padding: 18px 0;
  box-sizing: border-box;
  ${colFlex({ justify: 'space-between' })};
`;

const Description = styled.div`
  font-size: 18px;
  font-weight: 400;
  font-family: 'LINESeedKR-Rg', 'sans-serif';
  word-break: keep-all;
`;

const CreatorContainer = styled.div`
  width: 100%;
  ${colFlex()};
`;

const CreatorName = styled.div`
  font-size: 18px;
  font-weight: 700;
  font-family: 'LINESeedKR-Bd', 'sans-serif';
`;

const CreatorDescription = styled.div`
  font-size: 18px;
  font-weight: 400;
  font-family: 'LINESeedKR-Rg', 'sans-serif';
`;

interface InfoCreatorsContentProps {
  imageUrl: string;
  description: string;
  creatorName: string;
  creatorDescription: string;
}

function InfoCreatorsContent({ imageUrl, description, creatorName, creatorDescription }: InfoCreatorsContentProps) {
  return (
    <Container>
      <LeftContainer>
        <Image src={imageUrl} />
      </LeftContainer>
      <RightContainer>
        <Description>{description}</Description>
        <CreatorContainer>
          <CreatorName>{creatorName}</CreatorName>
          <CreatorDescription>{creatorDescription}</CreatorDescription>
        </CreatorContainer>
      </RightContainer>
    </Container>
  );
}

export default InfoCreatorsContent;
