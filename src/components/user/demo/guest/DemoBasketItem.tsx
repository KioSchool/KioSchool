import styled from '@emotion/styled';
import { RiAddLine, RiCloseCircleFill, RiSubtractLine } from '@remixicon/react';
import { useSetAtom } from 'jotai';
import { Product } from '@@types/index';
import { demoStateAtom } from '@jotai/user/demoAtoms';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';

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

const PriceLabel = styled.div`
  color: ${Color.TEXT_SUBTLE};
  font-size: 13px;
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

const IconButton = styled.button`
  padding: 0;
  border: 0;
  background: none;
  line-height: 0;
  cursor: pointer;
`;

const DecreaseIcon = styled(RiSubtractLine)`
  width: 16px;
  border-radius: 25px;
  color: ${Color.TEXT_DEFAULT};
`;

const IncreaseIcon = styled(RiAddLine)`
  width: 19px;
  height: 19px;
  border-radius: 25px;
  color: ${Color.TEXT_DEFAULT};
`;

const DeleteIcon = styled(RiCloseCircleFill)`
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

interface DemoBasketItemProps {
  product: Product;
  quantity: number;
  onDeleteRequest: (productId: number) => void;
}

function DemoBasketItem({ product, quantity, onDeleteRequest }: DemoBasketItemProps) {
  const dispatch = useSetAtom(demoStateAtom);

  const handleDecrease = () => {
    if (quantity === 1) {
      onDeleteRequest(product.id);
      return;
    }
    dispatch({ type: 'BASKET_REMOVE', productId: product.id });
  };

  return (
    <Container>
      <ProductDetailsWrapper>
        <ProductImage src={product.imageUrl} alt={product.name} />
        <ProductInfoContainer>
          <ProductLabels>
            <ProductName>{product.name}</ProductName>
            <PriceLabel>{product.price.toLocaleString()}원</PriceLabel>
          </ProductLabels>
          <QuantityControl>
            <IconButton type="button" aria-label={`${product.name} 빼기`} onClick={handleDecrease}>
              <DecreaseIcon />
            </IconButton>
            <QuantityLabel>{quantity}</QuantityLabel>
            <IconButton type="button" aria-label={`${product.name} 더 담기`} onClick={() => dispatch({ type: 'BASKET_ADD', productId: product.id })}>
              <IncreaseIcon />
            </IconButton>
          </QuantityControl>
        </ProductInfoContainer>
      </ProductDetailsWrapper>
      <ProductActions>
        <IconButton type="button" aria-label={`${product.name} 삭제`} onClick={() => onDeleteRequest(product.id)}>
          <DeleteIcon />
        </IconButton>
        <LineTotal>{(product.price * quantity).toLocaleString()}원</LineTotal>
      </ProductActions>
    </Container>
  );
}

export default DemoBasketItem;
