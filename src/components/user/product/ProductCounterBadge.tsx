import styled from '@emotion/styled';
import { RiAddLine, RiCloseCircleFill, RiSubtractLine } from '@remixicon/react';
import { useAtom } from 'jotai';
import { Product } from '@@types/index';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { Color } from '@resources/colors';
import { userOrderBasketAtom } from '@jotai/user/atoms';
import { trackEvent } from '@utils/analytics';
import { GA_CURRENCY, GA_EVENT } from '@constants/analytics';
import { productToGaItem } from '@utils/orderBasket';

const Container = styled.div`
  width: 100%;
  min-height: 96px;
  padding: 14px 0;
  gap: 12px;
  box-sizing: border-box;
  border-radius: 28px;
  ${rowFlex({ justify: 'space-between', align: 'center' })}
`;

const ProductDetailsWrapper = styled.div`
  flex: 1;
  min-width: 0;
  gap: 12px;
  ${rowFlex({ justify: 'center', align: 'center' })}
`;

const ProductImage = styled.img`
  width: 68px;
  height: 68px;
  flex-shrink: 0;
  object-fit: cover;
  border-radius: 12px;
  border: 1px solid ${Color.BORDER_GREY};
  box-sizing: border-box;
`;

const ProductInfoContainer = styled.div`
  flex: 1;
  min-width: 0;
  gap: 8px;
  ${colFlex({ justify: 'center', align: 'start' })}
`;

const ProductLabels = styled.div`
  width: 100%;
  min-width: 0;
  gap: 2px;
  ${colFlex()}
`;

const PriceLabel = styled.div<{ size?: number }>`
  color: ${Color.TEXT_SUBTLE};
  font-size: ${({ size }) => size || 13}px;
  white-space: nowrap;
`;

const ProductName = styled.div`
  color: ${Color.TEXT_STRONG};
  font-size: 15px;
  font-weight: 700;
  overflow-wrap: anywhere;
`;

const QuantityControl = styled.div`
  box-sizing: border-box;
  padding: 0 6px;
  width: 92px;
  max-width: 100%;
  height: 30px;
  border-radius: 10px;
  border: 1px solid ${Color.BORDER_GREY};
  background: ${Color.WHITE};
  ${rowFlex({ justify: 'space-between', align: 'center' })}
`;

const QuantityLabel = styled.div`
  color: ${Color.TEXT_STRONG};
  font-size: 14px;
  font-weight: 700;
`;

const ProductActions = styled.div`
  align-self: stretch;
  flex-shrink: 0;
  white-space: nowrap;
  ${colFlex({ justify: 'space-between', align: 'end' })}
`;

const DecreaseButton = styled(RiSubtractLine)`
  width: 16px;
  border-radius: 25px;

  color: ${Color.TEXT_DEFAULT};
`;

const IncreaseButton = styled(RiAddLine)`
  width: 19px;
  height: 19px;
  border-radius: 25px;

  color: ${Color.TEXT_DEFAULT};
`;

const DeleteProductButton = styled(RiCloseCircleFill)`
  width: 20px;
  height: 20px;
  color: ${Color.DISABLED_GREY};
`;

const LineTotal = styled.div`
  color: ${Color.TEXT_STRONG};
  font-size: 15px;
  font-weight: 700;
  padding-bottom: 4px;
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
            <ProductName>{product.name}</ProductName>
            <PriceLabel>{product.price.toLocaleString()}원</PriceLabel>
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
        <LineTotal>{(product.price * quantity).toLocaleString()}원</LineTotal>
      </ProductActions>
    </Container>
  );
}

export default ProductCounterBadge;
