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
  width: 100%;
  height: auto;
  box-sizing: border-box;
  border-radius: 28px;
  ${rowFlex({ justify: 'space-between', align: 'center' })}
`;

const ProductDetailsWrapper = styled.div`
  width: auto;
  gap: 10px;
  ${rowFlex()}
`;

const ProductImage = styled.img`
  width: 90px;
  height: 90px;
  object-fit: cover;
  border: none;
  border-radius: 10px;
`;

const ProductInfoContainer = styled.div`
  width: 130px;
  height: 90px;
  gap: 5px;
  ${colFlex({ justify: 'space-between', align: 'start' })}
`;

const ProductLabels = styled.div`
  gap: 5px;
  ${colFlex()}
`;

const QuantityControl = styled.div`
  width: 50%;
  border: 1px solid ${Color.GREY};
  border-radius: 7px;
  ${rowFlex({ justify: 'space-between', align: 'center' })}
`;

const ProductActions = styled.div`
  width: auto;
  height: 90px;
  ${colFlex({ justify: 'space-between', align: 'end' })}
`;

const DecreaseButton = styled(MinusIconSvg)`
  width: 12px;
  height: 12px;
  padding: 5px;
  border-radius: 25px;

  & path {
    stroke: ${Color.BLACK};
  }
`;

const IncreaseButton = styled(PlusIconSvg)`
  width: 19px;
  height: 19px;
  background: ${Color.WHITE};
  border-radius: 25px;

  & path {
    stroke-width: 3.5;
    filter: none;
  }
`;

const DeleteProductButton = styled(CloseSvg)``;

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

  const handleDeleteProduct = () => {
    if (confirm('정말로 삭제하시겠습니까?')) {
      setOrderBasket((prev) => prev.filter((basket) => basket.productId !== product.id));
    }
  };

  return (
    <Container className="product-counter-badge-container">
      <ProductDetailsWrapper>
        <ProductImage src={product.imageUrl} alt={product.name} />
        <ProductInfoContainer>
          <ProductLabels>
            <AppLabel color={Color.BLACK} size={13}>
              {product.name}
            </AppLabel>
            <AppLabel color={Color.BLACK} size={13}>
              {product.price.toLocaleString()}원
            </AppLabel>
          </ProductLabels>
          <QuantityControl>
            <DecreaseButton onClick={() => minusQuantity()} />
            <AppLabel color={Color.BLACK} size={15}>
              {quantity}
            </AppLabel>
            <IncreaseButton onClick={() => plusQuantity()} />
          </QuantityControl>
        </ProductInfoContainer>
      </ProductDetailsWrapper>
      <ProductActions className="counter-container">
        <DeleteProductButton onClick={handleDeleteProduct} />
        <AppLabel color={Color.BLACK} size={15}>
          {(product.price * quantity).toLocaleString()}원
        </AppLabel>
      </ProductActions>
    </Container>
  );
}

export default ProductCounterBadge;
