import React from 'react';
import styled from '@emotion/styled';
import { colFlex } from '@styles/flexStyles';
import { jsx } from '@emotion/react';
import { lineSeedKrFont } from '@styles/fonts';
import { expandButtonStyle } from '@styles/buttonStyles';
import JSX = jsx.JSX;

const Container = styled.div`
  width: 350px;
  height: 350px;
  border-radius: 20px;
  box-shadow: 10px 10px 30px 0 rgba(10, 10, 10, 0.04);
  padding: 70px 40px;
  box-sizing: border-box;
  ${colFlex({ justify: 'center' })};
  ${expandButtonStyle({ scaleSize: '1.05' })};
  cursor: default;
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: 700;
  line-height: 56px;
  margin-top: 18px;
  font-family: 'LINESeedKR-Rg', 'sans-serif';
  ${lineSeedKrFont}
`;

const Description = styled.div`
  font-size: 16px;
  font-weight: 400;
  font-family: 'LINESeedKR-Rg', 'sans-serif';
  color: #5b5b5b;
  ${lineSeedKrFont}
`;

interface InfoServiceCardProps {
  svg: JSX.Element;
  title: string;
  description: string;
}

function InfoServiceCard({ svg, title, description }: InfoServiceCardProps) {
  return (
    <Container>
      {svg}
      <Title>{title}</Title>
      <Description>{description}</Description>
    </Container>
  );
}

export default InfoServiceCard;
