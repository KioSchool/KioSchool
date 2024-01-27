import React, { useState } from 'react';
import { Product } from '../../type';
import styled from '@emotion/styled';
import AppLabel from '../common/label/AppLabel';
import AppButton from '../common/button/AppButton';
import { useSetRecoilState } from 'recoil';
import { orderBasketAtom } from '../../recoil/atoms';

interface ProductDialogProps {
  product: Product;
  closeDialog: () => void;
}

const Container = styled.div`
  z-index: 1000;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(238, 238, 238, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.div`
  width: 100%;
  height: 80%;
  padding: 15px;
  background: white;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
`;

const ProductImage = styled.img`
  padding: 20px;
  object-fit: contain;
  border-radius: 10px;
`;

const CounterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CounterButtonContainer = styled.div`
  display: flex;
`;

const OrderButtonContainer = styled.div`
  margin-top: auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function ProductDialog(props: ProductDialogProps) {
  const [count, setCount] = useState<number>(1);
  const setOrderBasket = useSetRecoilState(orderBasketAtom);

  const addOrderBasket = () => {
    const orderBasket = {
      productId: props.product.id,
      quantity: count,
    };
    setOrderBasket((prevState) => {
      const index = prevState.findIndex((it) => it.productId === orderBasket.productId);
      if (index === -1) return [...prevState, orderBasket];

      return prevState.map((it) => {
        if (it.productId === orderBasket.productId) return { ...it, quantity: it.quantity + orderBasket.quantity };

        return it;
      });
    });
    props.closeDialog();
  };

  return (
    <Container>
      <ModalContainer>
        <ProductImage src={props.product.imageUrl} />
        <AppLabel size={'large'}>{props.product.name}</AppLabel>
        <AppLabel size={'medium'}>{props.product.description}</AppLabel>
        <CounterContainer>
          <AppLabel size={'medium'}>수량</AppLabel>
          <CounterButtonContainer>
            <button disabled={count == 1} onClick={() => setCount((prevState) => prevState - 1)}>
              -
            </button>
            <AppLabel size={'medium'}>{count}개</AppLabel>
            <button onClick={() => setCount((prevState) => prevState + 1)}>+</button>
          </CounterButtonContainer>
        </CounterContainer>
        <OrderButtonContainer>
          <AppButton size={'medium'} onClick={addOrderBasket}>
            {props.product.price * count}원 담기
          </AppButton>
        </OrderButtonContainer>
      </ModalContainer>
    </Container>
  );
}

export default ProductDialog;
