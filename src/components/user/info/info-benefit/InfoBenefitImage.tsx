import React from 'react';
import styled from '@emotion/styled';
import infoBenefitDesktop from '@resources/image/infoBenefitDesktop.png';
import infoBenefitOrderCard1 from '@resources/image/infoBenefitOrderCard1.png';
import infoBenefitOrderCard2 from '@resources/image/infoBenefitOrderCard2.png';
import infoBenefitOrderCard3 from '@resources/image/infoBenefitOrderCard3.png';
import { rowFlex } from '@styles/flexStyles';

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  ${rowFlex({ justify: 'center' })};
`;

const DesktopImage = styled.img`
  width: 400px;
  height: 350px;
`;

const OrderCardImage = styled.img<{ top: string; left: string; time: string }>`
  position: absolute;
  width: 100px;
  height: 75px;
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  animation: floating ${(props) => props.time} infinite ease-in-out;

  @keyframes floating {
    0% {
      transform: translate(0, 0) rotate(0deg);
    }
    20% {
      transform: translate(10px, 10px) rotate(5deg);
    }
    40% {
      transform: translate(-10px, 15px) rotate(-5deg);
    }
    60% {
      transform: translate(-15px, -10px) rotate(0deg);
    }
    80% {
      transform: translate(10px, -15px) rotate(5deg);
    }
    100% {
      transform: translate(0, 0) rotate(0deg);
    }
  }
`;

function InfoBenefitImage() {
  return (
    <Container>
      <DesktopImage src={infoBenefitDesktop} />
      <OrderCardImage src={infoBenefitOrderCard1} top={'80px'} left={'-50px'} time={'8s'} />
      <OrderCardImage src={infoBenefitOrderCard2} top={'-30px'} left={'250px'} time={'10s'} />
      <OrderCardImage src={infoBenefitOrderCard3} top={'170px'} left={'400px'} time={'12s'} />
    </Container>
  );
}

export default InfoBenefitImage;
