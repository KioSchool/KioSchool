import styled from '@emotion/styled';
import { colFlex, rowFlex } from '@styles/flexStyles';

const Container = styled.div`
  width: 100%;
  height: 255px;
  ${colFlex({ align: 'center' })};
`;

const UpperContainer = styled.div`
  width: 100%;
  height: 50%;
  border-radius: 16px;
  ${rowFlex({ justify: 'space-between' })};
`;

const Image = styled.img`
  width: 40%;
  height: 100%;
  border-radius: 16px;
  object-fit: cover;
`;

const LowerContainer = styled.div`
  width: 100%;
  height: 50%;
  padding: 18px 0;
  box-sizing: border-box;
  ${colFlex({ justify: 'space-between' })};
`;

const Description = styled.div`
  font-size: 13px;
  font-weight: 400;
  font-family: 'LINESeedKR-Rg', 'sans-serif';
  word-break: keep-all;
`;

const CreatorContainer = styled.div`
  width: 50%;
  height: 100%;
  ${colFlex({ justify: 'end' })};
`;

const CreatorName = styled.div`
  font-size: 15px;
  font-weight: 700;
  font-family: 'LINESeedKR-Bd', 'sans-serif';
`;

const CreatorDescription = styled.div`
  font-size: 15px;
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
      <UpperContainer>
        <CreatorContainer>
          <CreatorName>{creatorName}</CreatorName>
          <CreatorDescription>{creatorDescription}</CreatorDescription>
        </CreatorContainer>
        <Image src={imageUrl} />
      </UpperContainer>
      <LowerContainer>
        <Description>{description}</Description>
      </LowerContainer>
    </Container>
  );
}

export default InfoCreatorsContent;
