import { Product, ProductStatus } from '@@types/index';
import styled from '@emotion/styled';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { Color } from '@resources/colors';
import { RiAddLine, RiSubtractLine } from '@remixicon/react';
import { css } from '@emotion/react';
import { userOrderBasketAtom } from '@jotai/user/atoms';
import { useSetAtom } from 'jotai';

const ProductName = styled.div<{ isSoldOut: boolean }>`
  font-size: 18px;
  color: ${({ isSoldOut }) => (isSoldOut ? '#D1D5D8' : Color.BLACK)};
  line-height: 1.4;
`;

const ProductDescription = styled.div<{ isSoldOut: boolean }>`
  font-size: 13px;
  color: ${({ isSoldOut }) => (isSoldOut ? '#D1D5D8' : Color.BLACK)};
  line-height: 1.4;
`;

const ProductPrice = styled.div<{ isSoldOut: boolean }>`
  font-size: 18px;
  font-weight: 500;
  color: ${({ isSoldOut }) => (isSoldOut ? '#D1D5D8' : Color.BLACK)};
  line-height: 1.4;
`;

const SoldOutOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 90px;
  height: 90px;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 10;
  ${rowFlex({ justify: 'center', align: 'center' })}
`;

const SoldOutText = styled.span`
  font-size: 18px;
  font-weight: 700;
  color: ${Color.WHITE};
`;

const Container = styled.div`
  width: auto;
  padding: 10px;
  ${rowFlex({ justify: 'space-between' })}
`;

const LabelContainer = styled.div`
  width: 60%;
  gap: 3px;
  ${colFlex({ justify: 'center', align: 'start' })}
`;

const Contents = styled.div`
  position: relative;
  width: 90px;
  ${rowFlex({ justify: 'flex-end' })}
`;

const StyledImage = styled.img`
  width: 90px;
  height: 90px;
  object-fit: cover;
  border-radius: 10px;
  border: 0.3px solid #939393;
`;

const ButtonContainer = styled.div<{ isOpened: boolean }>`
  width: 110px;
  position: absolute;
  top: 67px;
  right: -10px;
  background: ${({ isOpened }) => (isOpened ? Color.WHITE : '')};
  border-radius: ${({ isOpened }) => (isOpened ? '100px' : '')};
  box-shadow: ${({ isOpened }) => (isOpened ? '0.3px 2px 4px 0px rgba(0, 0, 0, 0.15)' : '')};
  ${({ isOpened }) => rowFlex({ justify: isOpened ? 'space-between' : 'end', align: 'center' })}
`;

const AddButton = styled(RiAddLine, {
  shouldForwardProp: (prop) => prop !== 'isOpened',
})<{ isOpened: boolean }>`
  width: 25px;
  height: 25px;
  background: ${Color.WHITE};
  border-radius: 25px;
  color: ${Color.KIO_ORANGE};
  filter: ${({ isOpened }) => (isOpened ? '' : 'drop-shadow(0.3px 2px 4px rgba(0, 0, 0, 0.15))')};

  & path {
    stroke-width: 3.5;
    filter: none;
  }
`;

const ToggleAnimation = (props: { isOpened: boolean }) => css`
  opacity: ${props.isOpened ? 1 : 0};
  transform: ${props.isOpened ? 'translateX(0)' : 'translateX(100%)'};
  transition: transform 0.3s ease, opacity 0.3s ease;
`;

const RemoveButton = styled(RiSubtractLine, {
  shouldForwardProp: (prop) => prop !== 'isOpened',
})<{ isOpened: boolean }>`
  width: 25px;
  height: 25px;
  border-radius: 25px;
  color: ${Color.KIO_ORANGE};
  ${({ isOpened }) => ToggleAnimation({ isOpened })}
`;

const QuantityLabel = styled.span<{ isOpened: boolean }>`
  margin: 0 10px;
  font-size: 18px;
  ${({ isOpened }) => ToggleAnimation({ isOpened })}
`;

interface ProductCardProps {
  product: Product;
  quantity: number;
}

function ProductCard({ product, quantity }: ProductCardProps) {
  const isSoldOut = product.status === ProductStatus.SOLD_OUT;
  const isOpened = quantity > 0;
  const setOrderBasket = useSetAtom(userOrderBasketAtom);

  const handleAddProduct = () => {
    setOrderBasket((prev) => {
      const existingItem = prev.find((basketProduct) => basketProduct.productId === product.id);

      if (existingItem) {
        return prev.map((basketProduct) =>
          basketProduct.productId === product.id
            ? { ...basketProduct, quantity: basketProduct.quantity + 1, productPrice: basketProduct.productPrice + product.price }
            : basketProduct,
        );
      }

      return [...prev, { productId: product.id, quantity: 1, productPrice: product.price }];
    });
  };

  const handleRemoveProduct = () => {
    setOrderBasket((prev) => {
      const existingItem = prev.find((basketProduct) => basketProduct.productId === product.id);

      if (existingItem && existingItem.quantity > 1) {
        return prev.map((basketProduct) =>
          basketProduct.productId === product.id
            ? { ...basketProduct, quantity: basketProduct.quantity - 1, productPrice: basketProduct.productPrice - product.price }
            : basketProduct,
        );
      }

      return prev.filter((basketProduct) => basketProduct.productId !== product.id);
    });
  };

  if (!product) return null;

  return (
    <Container className="product-card-container">
      <LabelContainer className="label-container">
        <ProductName isSoldOut={isSoldOut}>{product.name}</ProductName>
        <ProductDescription isSoldOut={isSoldOut}>{product.description}</ProductDescription>
        <ProductPrice isSoldOut={isSoldOut}>{product.price.toLocaleString()}원</ProductPrice>
      </LabelContainer>
      <Contents className="image-container">
        <StyledImage src={product.imageUrl} alt={product.name} />
        {isSoldOut && (
          <SoldOutOverlay>
            <SoldOutText>품절</SoldOutText>
          </SoldOutOverlay>
        )}
        {!isSoldOut && (
          <ButtonContainer isOpened={isOpened}>
            <RemoveButton onClick={handleRemoveProduct} isOpened={isOpened} />
            <QuantityLabel isOpened={isOpened}>{quantity}</QuantityLabel>
            <AddButton onClick={handleAddProduct} isOpened={isOpened} />
          </ButtonContainer>
        )}
      </Contents>
    </Container>
  );
}

export default ProductCard;
