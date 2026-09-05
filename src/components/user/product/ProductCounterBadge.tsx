import { Product } from '@@types/index';
import styled from '@emotion/styled';
import AppLabel from '@components/common/label/AppLabel';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { RiAddLine, RiCloseCircleFill, RiSubtractLine } from '@remixicon/react';
import { Color } from '@resources/colors';
import { userOrderBasketAtom } from '@jotai/user/atoms';
import { useAtom } from 'jotai';
import { trackEvent } from '@utils/analytics';
import { GA_CURRENCY, GA_EVENT } from '@constants/analytics';
import { productToGaItem } from '@utils/orderBasket';

const Container = styled.div`
  width: 100%;
  height: 90px;
  box-sizing: border-box;
  border-radius: 28px;
  ${rowFlex({ justify: 'space-between', align: 'center' })}
`;

const ProductDetailsWrapper = styled.div`
  width: auto;
  gap: 10px;
  ${rowFlex({ justify: 'center', align: 'center' })}
`;

const ProductImage = styled.img`
  width: 70px;
  height: 70px;
  object-fit: cover;
  border-radius: 4px;
  border: 0.3px solid #939393;
`;

const ProductInfoContainer = styled.div`
  width: 130px;
  gap: 8px;
  ${colFlex({ justify: 'center', align: 'start' })}
`;

const ProductLabels = styled.div`
  gap: 2px;
  ${colFlex()}
`;

const StyledLabel = styled.div<{ size?: number }>`
  font-size: ${({ size }) => size || 13}px;
  font-weight: 600;
`;

const QuantityControl = styled.div`
  box-sizing: border-box;
  padding: 0 3px;
  width: 88px;
  height: 25px;
  border-radius: 4px;
  background: ${Color.LIGHT_GREY};
  ${rowFlex({ justify: 'space-between', align: 'center' })}
`;

const QuantityLabel = styled.div`
  font-size: 15px;
  font-weight: 400;
`;

const ProductActions = styled.div`
  height: 100%;
  ${colFlex({ justify: 'space-between', align: 'end' })}
`;

const DecreaseButton = styled(RiSubtractLine)`
  width: 16px;
  border-radius: 25px;

  & path {
    stroke: ${Color.BLACK};
  }
`;

const IncreaseButton = styled(RiAddLine)`
  width: 19px;
  height: 19px;
  border-radius: 25px;

  & path {
    stroke-width: 3.5;
    filter: none;
  }
`;

const DeleteProductButton = styled(RiCloseCircleFill)`
  color: #c2c2c2;
`;

interface ProductCounterBadgeProps {
  product: Product;
}

function ProductCounterBadge({ product }: ProductCounterBadgeProps) {
  const [orderBasket, setOrderBasket] = useAtom(userOrderBasketAtom);
  const quantity = orderBasket.find((basketProduct) => basketProduct.productId === product.id)?.quantity || 0;

  const plusQuantity = () => {
    trackEvent(GA_EVENT.ADD_TO_CART, { items: [{ ...productToGaItem(product), quantity: 1 }], value: product.price, currency: GA_CURRENCY });

    setOrderBasket((prev) =>
      prev.map((basketProduct) =>
        basketProduct.productId === product.id
          ? { ...basketProduct, quantity: basketProduct.quantity + 1, productPrice: basketProduct.productPrice + product.price }
          : basketProduct,
      ),
    );
  };

  const minusQuantity = () => {
    const isRemovingLastUnit = quantity === 1;

    if (isRemovingLastUnit && !confirm('정말로 삭제하시겠습니까?')) return;

    trackEvent(GA_EVENT.REMOVE_FROM_CART, { items: [{ ...productToGaItem(product), quantity: 1 }], value: product.price, currency: GA_CURRENCY });

    if (isRemovingLastUnit) {
      setOrderBasket((prev) => prev.filter((basketProduct) => basketProduct.productId !== product.id));
      return;
    }

    setOrderBasket((prev) =>
      prev.map((basketProduct) =>
        basketProduct.productId === product.id
          ? { ...basketProduct, quantity: basketProduct.quantity - 1, productPrice: basketProduct.productPrice - product.price }
          : basketProduct,
      ),
    );
  };

  const handleDeleteProduct = () => {
    if (!confirm('정말로 삭제하시겠습니까?')) return;

    trackEvent(GA_EVENT.REMOVE_FROM_CART, { items: [{ ...productToGaItem(product), quantity }], value: product.price * quantity, currency: GA_CURRENCY });
    setOrderBasket((prev) => prev.filter((basketProduct) => basketProduct.productId !== product.id));
  };

  return (
    <Container className="product-counter-badge-container">
      <ProductDetailsWrapper>
        <ProductImage src={product.imageUrl} alt={product.name} />
        <ProductInfoContainer>
          <ProductLabels>
            <StyledLabel size={15}>{product.name}</StyledLabel>
            <StyledLabel>{product.price.toLocaleString()}원</StyledLabel>
          </ProductLabels>
          <QuantityControl>
            <DecreaseButton onClick={() => minusQuantity()} />
            <QuantityLabel>{quantity}</QuantityLabel>
            <IncreaseButton onClick={() => plusQuantity()} />
          </QuantityControl>
        </ProductInfoContainer>
      </ProductDetailsWrapper>
      <ProductActions className="counter-container">
        <DeleteProductButton onClick={handleDeleteProduct} />
        <AppLabel color={Color.BLACK} size={15} style={{ paddingBottom: '15px' }}>
          {(product.price * quantity).toLocaleString()}원
        </AppLabel>
      </ProductActions>
    </Container>
  );
}

export default ProductCounterBadge;
