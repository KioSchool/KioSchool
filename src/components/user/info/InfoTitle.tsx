import { colFlex } from '@styles/flexStyles';
import styled from '@emotion/styled';
import { lineSeedKrFont } from '@styles/fonts';
import { tabletMediaQuery } from '@styles/globalStyles';

interface InfoTitleProps {
  text: string;
}

const Container = styled.div`
  width: 100%;
  gap: 20px;
  ${colFlex({ align: 'center', justify: 'center' })};
`;

const TextContainer = styled.div`
  width: 100%;
  font-size: 36px;
  white-space: pre-line;
  font-family: 'LINESeedKR-Rg', 'sans-serif';
  font-weight: 700;
  text-align: center;
  ${lineSeedKrFont};
  ${tabletMediaQuery} {
    font-size: 18px;
  }
`;

const HorizontalLine = styled.hr`
  width: 50px;
  height: 2px;
  background-color: #000000;
  border: none;
`;

function InfoTitle({ text }: InfoTitleProps) {
  return (
    <Container>
      <TextContainer>{text}</TextContainer>
      <HorizontalLine />
    </Container>
  );
}

export default InfoTitle;
