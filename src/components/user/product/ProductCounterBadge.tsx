import React from 'react';
import { Product } from '@@types/index';
import styled from '@emotion/styled';
import AppLabel from '@components/common/label/AppLabel';
import { orderBasketAtom } from '@recoils/atoms';
import { useRecoilState } from 'recoil';
import { colFlex, rowFlex } from '@styles/flexStyles';
import CloseSvg from '@resources/svg/CloseSvg';
import MinusIconSvg from '@resources/svg/MinusIconSvg';
import { Color } from '@resources/colors';
import PlusIconSvg from '@resources/svg/PlusIconSvg';

const Container = styled.div`
  width: 330px;
  height: auto;
  padding: 12px 24px;
  box-sizing: border-box;
  border-radius: 28px;
  ${rowFlex({ justify: 'space-between', align: 'center' })}
`;

const RightContainer = styled.div`
  height: 100%;
  ${colFlex({ justify: 'space-between', align: 'end' })}
`;

const CenterContainer = styled.div`
  ${colFlex({ justify: 'space-between', align: 'start' })}
`;

const StyledImage = styled.img`
  width: 90px;
  height: 90px;
  object-fit: cover;
  border: none;
  border-radius: 10px;
`;

const RemoveButton = styled(MinusIconSvg)`
  width: 15px;
  height: 15px;
  padding: 5px;
  & path {
    stroke: ${Color.BLACK};
  }
  border-radius: 25px;
`;

const AddButton = styled(PlusIconSvg)`
  width: 25px;
  height: 25px;
  background: ${Color.WHITE};
  border-radius: 25px;

  & path {
    stroke-width: 3.5;
    filter: none;
  }
`;

const RemoveProductButton = styled(CloseSvg)``;

interface ProductCounterBadgeProps {
  product: Product;
}

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
    <Container className={'product-counter-badge-container'}>
      <StyledImage src={product.imageUrl} alt={product.name} />
      <CenterContainer>
        <AppLabel size={13}>{product.name}</AppLabel>
        <AppLabel size={13}>{product.price.toLocaleString()}원</AppLabel>
        <RemoveButton onClick={() => handleCounterButtonClick('minus')} />
        <AppLabel size={20}>{quantity}</AppLabel>
        <AddButton onClick={() => handleCounterButtonClick('plus')} />
      </CenterContainer>
      <RightContainer className={'counter-container'}>
        <RemoveProductButton />
        <AppLabel size={13}>{(product.price * quantity).toLocaleString()}원</AppLabel>
      </RightContainer>
    </Container>
  );
}

export default ProductCounterBadge;
