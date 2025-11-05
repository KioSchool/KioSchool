import styled from '@emotion/styled';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { jsx } from '@emotion/react';
import { expandButtonStyle } from '@styles/buttonStyles';
import { Color } from '@resources/colors';
import { tabletMediaQuery } from '@styles/globalStyles';
import JSX = jsx.JSX;

const Container = styled.div`
  width: 350px;
  height: 350px;
  border-radius: 20px;
  box-shadow: 10px 10px 30px 0 rgba(10, 10, 10, 0.04);
  padding: 70px 40px;
  box-sizing: border-box;
  background: ${Color.WHITE};
  ${colFlex({ justify: 'center' })};
  ${expandButtonStyle({ scaleSize: '1.05' })};
  cursor: default;
  ${tabletMediaQuery} {
    width: 300px;
    height: 120px;
    padding: 10px 25px;
    ${rowFlex({ justify: 'space-between', align: 'center' })};
  }
`;

const SvgContainer = styled.div`
  width: 80px;
  height: 80px;
  ${colFlex({ align: 'center' })};
  ${tabletMediaQuery} {
    width: 40px;
    height: 40px;
  }
`;

const ContentContainer = styled.div`
  width: 100%;
  ${colFlex()};
  ${tabletMediaQuery} {
    width: 165px;
    ${colFlex({ align: 'flex-end', justify: 'start' })};
  }
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: 700;
  line-height: 56px;
  margin-top: 18px;
  ${tabletMediaQuery} {
    margin: 0;
    font-size: 15px;
    line-height: 35px;
    text-align: right;
  }
`;

const Description = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: #5b5b5b;
  word-break: keep-all;
  ${tabletMediaQuery} {
    font-size: 12px;
    text-align: right;
  }
`;

interface InfoServiceCardProps {
  svg: JSX.Element;
  title: string;
  description: string;
}

function InfoServiceCard({ svg, title, description }: InfoServiceCardProps) {
  return (
    <Container>
      <SvgContainer>{svg}</SvgContainer>
      <ContentContainer>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </ContentContainer>
    </Container>
  );
}

export default InfoServiceCard;
