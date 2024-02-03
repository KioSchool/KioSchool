import React from 'react';
import { Product } from '@@types/index';
import styled from '@emotion/styled';
import AppLabel from '@components/common/label/AppLabel';
import PlusButtonSvg from '@resources/svg/PlusButtonSvg';
import { orderBasketAtom } from '@recoils/atoms';
import { useRecoilState } from 'recoil';
import MinusButtonSvg from '@resources/svg/MinusButtonSvg';

interface ProductCounterBadgeProps {
  product: Product;
}

const Container = styled.div`
  display: flex;
  width: 330px;
  height: 60px;
  padding: 12px 24px;
  border: 1px solid black;
  box-sizing: border-box;
  border-radius: 28px;
  justify-content: space-between;
`;

const LabelContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const CounterContainer = styled.div`
  display: flex;
  width: 100px;
  justify-content: space-between;
  align-items: center;
`;

function ProductCounterBadge({ product }: ProductCounterBadgeProps) {
  const [orderBasket, setOrderBasket] = useRecoilState(orderBasketAtom);
  const quantity = orderBasket.find((basket) => basket.productId === product.id)?.quantity || 0;

  const plusQuantity = () => {
    setOrderBasket((prev) => {
      const index = prev.findIndex((basket) => basket.productId === product.id);
      return prev.map((basket, i) => {
        if (i === index) {
          return { ...basket, quantity: basket.quantity + 1 };
        }
        return basket;
      });
    });
  };

  const minusQuantity = () => {
    setOrderBasket((prev) => {
      const index = prev.findIndex((basket) => basket.productId === product.id);
      if (prev[index].quantity === 1) {
        return confirm('정말로 삭제하시겠습니까?') ? prev.filter((basket) => basket.productId !== product.id) : prev;
      }

      return prev.map((basket, i) => {
        if (i === index) {
          return { ...basket, quantity: basket.quantity - 1 };
        }
        return basket;
      });
    });
  };

  const handleCounterButtonClick = (type: 'plus' | 'minus') => {
    if (type === 'plus') plusQuantity();
    else minusQuantity();
  };

  return (
    <Container>
      <LabelContainer>
        <AppLabel size={13}>{product.name}</AppLabel>
        <AppLabel size={13}>{product.price.toLocaleString()}원</AppLabel>
      </LabelContainer>
      <CounterContainer>
        <MinusButtonSvg onClick={() => handleCounterButtonClick('minus')} />
        <AppLabel size={20}>{quantity}</AppLabel>
        <PlusButtonSvg onClick={() => handleCounterButtonClick('plus')} />
      </CounterContainer>
    </Container>
  );
}

export default ProductCounterBadge;
