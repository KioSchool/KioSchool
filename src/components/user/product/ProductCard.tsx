import { useState } from 'react';
import { Product, ProductStatus } from '@@types/index';
import styled from '@emotion/styled';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { Color } from '@resources/colors';
import { match } from 'ts-pattern';
import { RiAddLine, RiSubtractLine } from '@remixicon/react';
import { css } from '@emotion/react';
import { userOrderBasketAtom } from '@jotai/user/atoms';
import { useSetAtom } from 'jotai';

const PRODUCT_IMAGE_SIZE = 110;

const ProductName = styled.div<{ isSoldOut: boolean }>`
  font-size: 18px;
  color: ${({ isSoldOut }) => (isSoldOut ? '#D1D5D8' : Color.BLACK)};
  line-height: 1.4;
`;

const ProductDescription = styled.div<{ isSoldOut: boolean }>`
  font-size: 14px;
  color: ${({ isSoldOut }) => (isSoldOut ? '#D1D5D8' : Color.GREY)};
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
  width: ${PRODUCT_IMAGE_SIZE}px;
  height: ${PRODUCT_IMAGE_SIZE}px;
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
  padding: 10px 10px 24px;
  ${rowFlex({ justify: 'space-between' })}
`;

const LabelContainer = styled.div`
  width: calc(100% - 130px);
  gap: 3px;
  ${colFlex({ justify: 'center', align: 'start' })}
`;

const Contents = styled.div`
  position: relative;
  width: ${PRODUCT_IMAGE_SIZE}px;
  height: ${PRODUCT_IMAGE_SIZE}px;
  ${rowFlex({ justify: 'flex-end' })}
`;

const StyledImage = styled.img`
  width: ${PRODUCT_IMAGE_SIZE}px;
  height: ${PRODUCT_IMAGE_SIZE}px;
  object-fit: cover;
  border-radius: 10px;
  border: 0.3px solid #939393;
  box-sizing: border-box;
`;

const ImageFallback = styled.div`
  width: ${PRODUCT_IMAGE_SIZE}px;
  height: ${PRODUCT_IMAGE_SIZE}px;
  border-radius: 10px;
  border: 0.3px solid #939393;
  background: ${Color.LIGHT_GREY};
  font-size: 11px;
  color: ${Color.GREY};
  padding: 8px;
  box-sizing: border-box;
  word-break: keep-all;
  text-align: center;
  ${rowFlex({ justify: 'center', align: 'center' })}
`;

const ButtonContainer = styled.div<{ isOpened: boolean }>`
  width: 100%;
  position: absolute;
  bottom: -10px;
  right: 0;
  background: ${({ isOpened }) => (isOpened ? Color.WHITE : '')};
  border-radius: ${({ isOpened }) => (isOpened ? '100px' : '')};
  box-shadow: ${({ isOpened }) => (isOpened ? '0.3px 2px 4px 0px rgba(0, 0, 0, 0.15)' : '')};
  ${({ isOpened }) => rowFlex({ justify: isOpened ? 'space-between' : 'end', align: 'center' })}
`;

const AddButton = styled(RiAddLine, {
  shouldForwardProp: (prop) => prop !== 'isOpened',
})<{ isOpened: boolean }>`
  width: 32px;
  height: 32px;
  padding: 4px;
  box-sizing: border-box;
  background: ${Color.WHITE};
  border-radius: 32px;
  color: ${Color.KIO_ORANGE};
  filter: ${({ isOpened }) => (isOpened ? '' : 'drop-shadow(0px 3px 6px rgba(0, 0, 0, 0.25))')};

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
  width: 32px;
  height: 32px;
  padding: 4px;
  box-sizing: border-box;
  border-radius: 32px;
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
  const [imgError, setImgError] = useState(false);

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
        {imgError ? <ImageFallback>{product.name}</ImageFallback> : <StyledImage src={product.imageUrl} alt={product.name} onError={() => setImgError(true)} />}
        {match(product.status)
          .with(ProductStatus.SOLD_OUT, () => (
            <SoldOutOverlay>
              <SoldOutText>품절</SoldOutText>
            </SoldOutOverlay>
          ))
          .otherwise(() => (
            <ButtonContainer isOpened={isOpened}>
              <RemoveButton onClick={handleRemoveProduct} isOpened={isOpened} />
              <QuantityLabel isOpened={isOpened}>{quantity}</QuantityLabel>
              <AddButton onClick={handleAddProduct} isOpened={isOpened} />
            </ButtonContainer>
          ))}
      </Contents>
    </Container>
  );
}

export default ProductCard;
