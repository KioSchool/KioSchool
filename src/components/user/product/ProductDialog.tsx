import React from 'react';
import { Product } from '@@types/index';
import styled from '@emotion/styled';
import AppLabel from '@components/common/label/AppLabel';
import AppButton from '@components/common/button/AppButton';
import { useSetRecoilState } from 'recoil';
import { orderBasketAtom } from '@recoils/atoms';
import CloseSvg from '@resources/svg/CloseSvg';
import { colFlex, rowFlex } from '@styles/flexStyles';

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
  animation: fadeIn 0.2s;
  ${rowFlex({ justify: 'center', align: 'center' })};

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const ModalContainer = styled.div`
  position: relative;
  width: 250px;
  height: 270px;
  padding: 5px;
  background: white;
  border-radius: 16px;
  ${colFlex()}
`;

const CloseButtonContainer = styled.div`
  position: absolute;
  right: 15px;
  top: 10px;
  background: white;
  opacity: 0.7;
  border-radius: 4px;
  ${rowFlex()}
`;

const ProductImage = styled.img`
  object-fit: fill;
  border-radius: 16px 16px 0 0;
  height: 170px;
`;

const OrderButtonContainer = styled.div`
  margin-top: auto;
  ${rowFlex({ justify: 'center', align: 'center' })}
`;

function ProductDialog(props: ProductDialogProps) {
  const setOrderBasket = useSetRecoilState(orderBasketAtom);
  const dialogRef = React.useRef<HTMLDivElement>(null);

  const closeDialog = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target !== dialogRef.current) return;
    props.closeDialog();
  };

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
    <Container onClick={closeDialog} ref={dialogRef} className={'product-dialog-container'}>
      <ModalContainer className={'product-dialog'}>
        <CloseButtonContainer className={'close-button'}>
          <CloseSvg onClick={props.closeDialog} />
        </CloseButtonContainer>
        <ProductImage src={props.product.imageUrl} className={'product-image'} />
        <AppLabel size={'small'}>{props.product.name}</AppLabel>
        <AppLabel size={12}>{props.product.description}</AppLabel>
        <OrderButtonContainer className={'order-button'}>
          <AppButton size={270} onClick={addOrderBasket}>
            {props.product.price.toLocaleString()}원 담기
          </AppButton>
        </OrderButtonContainer>
      </ModalContainer>
    </Container>
  );
}

export default ProductDialog;
