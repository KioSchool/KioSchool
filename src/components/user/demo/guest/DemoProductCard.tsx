import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { RiAddLine, RiSubtractLine } from '@remixicon/react';
import { useSetAtom } from 'jotai';
import { match } from 'ts-pattern';
import { Product, ProductStatus } from '@@types/index';
import { demoStateAtom } from '@jotai/user/demoAtoms';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';

const PRODUCT_IMAGE_SIZE = 110;

const getProductTextColor = (isSoldOut: boolean, color: string) =>
  match(isSoldOut)
    .with(true, () => Color.DISABLED_GREY)
    .otherwise(() => color);

const ProductName = styled.div<{ isSoldOut: boolean }>`
  font-size: 16px;
  font-weight: 700;
  color: ${({ isSoldOut }) => getProductTextColor(isSoldOut, Color.TEXT_STRONG)};
  line-height: 1.45;
`;

const ProductDescription = styled.div<{ isSoldOut: boolean }>`
  font-size: 13px;
  color: ${({ isSoldOut }) => getProductTextColor(isSoldOut, Color.TEXT_SUBTLE)};
  line-height: 1.45;
`;

const ProductPrice = styled.div<{ isSoldOut: boolean }>`
  padding-top: 4px;
  font-size: 15px;
  font-weight: 700;
  color: ${({ isSoldOut }) => getProductTextColor(isSoldOut, Color.TEXT_DEFAULT)};
  line-height: 1.45;
`;

const SoldOutOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: ${PRODUCT_IMAGE_SIZE}px;
  height: ${PRODUCT_IMAGE_SIZE}px;
  border-radius: 12px;
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
  padding: 16px 0 24px;
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
  border-radius: 12px;
  border: 1px solid ${Color.BORDER_GREY};
  box-sizing: border-box;
`;

const openedButtonContainerStyle = css`
  background: ${Color.WHITE};
  border-radius: 100px;
  box-shadow: 0.3px 2px 4px 0px rgba(0, 0, 0, 0.15);
  justify-content: space-between;
`;

const ButtonContainer = styled.div<{ isOpened: boolean }>`
  width: 100%;
  position: absolute;
  bottom: -10px;
  right: 0;
  ${rowFlex({ justify: 'end', align: 'center' })}
  ${({ isOpened }) => isOpened && openedButtonContainerStyle}
`;

const IconButton = styled.button`
  padding: 0;
  border: 0;
  background: none;
  line-height: 0;
  cursor: pointer;
`;

const closedAddButtonStyle = css`
  filter: drop-shadow(0px 3px 6px rgba(0, 0, 0, 0.25));
`;

const AddIcon = styled(RiAddLine, { shouldForwardProp: (prop) => prop !== 'isOpened' })<{ isOpened: boolean }>`
  width: 32px;
  height: 32px;
  padding: 4px;
  box-sizing: border-box;
  background: ${Color.WHITE};
  border-radius: 32px;
  color: ${Color.KIO_ORANGE};
  ${({ isOpened }) => !isOpened && closedAddButtonStyle}

  & path {
    stroke-width: 3.5;
    filter: none;
  }
`;

const hiddenToggleStyle = css`
  opacity: 0;
  transform: translateX(100%);
`;

const toggleStyle = css`
  opacity: 1;
  transform: translateX(0);
  transition: transform 0.3s ease, opacity 0.3s ease;
`;

const RemoveIcon = styled(RiSubtractLine, { shouldForwardProp: (prop) => prop !== 'isOpened' })<{ isOpened: boolean }>`
  width: 32px;
  height: 32px;
  padding: 4px;
  box-sizing: border-box;
  border-radius: 32px;
  color: ${Color.KIO_ORANGE};
  ${toggleStyle}
  ${({ isOpened }) => !isOpened && hiddenToggleStyle}
`;

const QuantityLabel = styled.span<{ isOpened: boolean }>`
  margin: 0 10px;
  font-size: 18px;
  ${toggleStyle}
  ${({ isOpened }) => !isOpened && hiddenToggleStyle}
`;

interface DemoProductCardProps {
  product: Product;
  quantity: number;
}

function DemoProductCard({ product, quantity }: DemoProductCardProps) {
  const dispatch = useSetAtom(demoStateAtom);
  const isSoldOut = product.status === ProductStatus.SOLD_OUT;
  const isOpened = quantity > 0;

  const handleAdd = () => {
    dispatch({ type: 'BASKET_ADD', productId: product.id });
  };

  const handleRemove = () => {
    if (quantity === 0) return;
    dispatch({ type: 'BASKET_REMOVE', productId: product.id });
  };

  return (
    <Container>
      <LabelContainer>
        <ProductName isSoldOut={isSoldOut}>{product.name}</ProductName>
        <ProductDescription isSoldOut={isSoldOut}>{product.description}</ProductDescription>
        <ProductPrice isSoldOut={isSoldOut}>{product.price.toLocaleString()}원</ProductPrice>
      </LabelContainer>
      <Contents>
        <StyledImage src={product.imageUrl} alt={product.name} />
        {match(isSoldOut)
          .with(true, () => (
            <SoldOutOverlay>
              <SoldOutText>품절</SoldOutText>
            </SoldOutOverlay>
          ))
          .otherwise(() => (
            <ButtonContainer isOpened={isOpened}>
              <IconButton type="button" aria-label={`${product.name} 빼기`} aria-hidden={!isOpened} tabIndex={Number(isOpened) - 1} onClick={handleRemove}>
                <RemoveIcon isOpened={isOpened} />
              </IconButton>
              <QuantityLabel isOpened={isOpened}>{quantity}</QuantityLabel>
              <IconButton type="button" aria-label={`${product.name} 더 담기`} onClick={handleAdd}>
                <AddIcon isOpened={isOpened} />
              </IconButton>
            </ButtonContainer>
          ))}
      </Contents>
    </Container>
  );
}

export default DemoProductCard;
