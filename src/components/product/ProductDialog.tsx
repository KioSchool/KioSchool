import React from 'react';
import { Product } from '@@types/index';
import styled from '@emotion/styled';
import AppLabel from '@components/common/label/AppLabel';
import AppButton from '@components/common/button/AppButton';
import { useSetRecoilState } from 'recoil';
import { orderBasketAtom } from '@recoils/atoms';
import CloseSvg from '@resources/svg/CloseSvg';

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
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.div`
  position: relative;
  width: 250px;
  height: 270px;
  padding: 5px;
  background: white;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
`;

const CloseButtonContainer = styled.div`
  display: flex;
  position: absolute;
  right: 15px;
  top: 10px;
  background: white;
  opacity: 0.7;
  border-radius: 4px;
`;

const ProductImage = styled.img`
  object-fit: fill;
  border-radius: 16px 16px 0 0;
  height: 170px;
`;

const OrderButtonContainer = styled.div`
  margin-top: auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function ProductDialog(props: ProductDialogProps) {
  const setOrderBasket = useSetRecoilState(orderBasketAtom);

  const addOrderBasket = () => {
    const orderBasket = {
      productId: props.product.id,
      quantity: 1,
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
        <CloseButtonContainer>
          <CloseSvg onClick={props.closeDialog} />
        </CloseButtonContainer>
        <ProductImage src={props.product.imageUrl} />
        <AppLabel size={'small'}>{props.product.name}</AppLabel>
        <AppLabel size={12}>{props.product.description}</AppLabel>
        <OrderButtonContainer>
          <AppButton size={270} onClick={addOrderBasket}>
            {props.product.price.toLocaleString()}원 담기
          </AppButton>
        </OrderButtonContainer>
      </ModalContainer>
    </Container>
  );
}

export default ProductDialog;
