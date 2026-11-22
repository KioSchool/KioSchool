import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import ProductShot from '@components/user/landing/ProductShot';
import ordersBoard from '@resources/image/landing/orders-board.webp';
import phoneMenuCart from '@resources/image/landing/phone-menu-cart.webp';
import { mobileMediaQuery } from '@styles/globalStyles';

const ORDERS_BOARD_RATIO = 2320 / 1360;
const PHONE_RATIO = 780 / 1688;

const Container = styled(motion.div)`
  position: relative;
  flex: 1;
  height: 600px;

  ${mobileMediaQuery} {
    flex: none;
    height: auto;
    padding: 0 0 247px;
  }
`;

const Laptop = styled.div`
  position: absolute;
  top: 24px;
  right: 40px;
  width: 100%;

  ${mobileMediaQuery} {
    position: static;
  }
`;

const Phone = styled.div`
  position: absolute;
  top: 150px;
  right: 0;
  width: 204px;

  ${mobileMediaQuery} {
    top: auto;
    bottom: 0;
    width: 140px;
  }
`;

function HeroVisual() {
  return (
    <Container initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ type: 'spring', stiffness: 80, damping: 20, delay: 0.2 }}>
      <Laptop>
        <ProductShot src={ordersBoard} alt="운영진 실시간 주문 화면" ratio={ORDERS_BOARD_RATIO} />
      </Laptop>
      <Phone>
        <ProductShot src={phoneMenuCart} alt="손님 주문 화면" ratio={PHONE_RATIO} shape="phone" />
      </Phone>
    </Container>
  );
}

export default HeroVisual;
