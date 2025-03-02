import { useSetRecoilState } from 'recoil';
import { orderBasketAtom } from '@recoils/atoms';
import { Product } from '@@types/index';
import styled from '@emotion/styled';
import AppLabel from '@components/common/label/AppLabel';
import { colFlex, rowFlex } from '@styles/flexStyles';
import PlusButtonSvg from '@resources/svg/PlusButtonSvg';
import MinusButtonSvg from '@resources/svg/MinusButtonSvg';
import { Color } from '@resources/colors';

const Container = styled.div`
  width: 100%;
  max-width: 100vw;
  padding: 10px;
  display: grid;
  grid-template-columns: 2fr 1fr;
`;

const LabelContainer = styled.div`
  flex-basis: 0;
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
  border: none;
  border-radius: 10px;
`;

const ButtonContainer = styled.div<{ isOpened: boolean }>`
  width: 100%;
  position: absolute;
  top: 67px;
  background: ${({ isOpened }) => (isOpened ? Color.WHITE : '')};
  border-radius: ${({ isOpened }) => (isOpened ? '30px' : '')};
  box-shadow: ${({ isOpened }) => (isOpened ? '0.3px 2px 4px 0px rgba(0, 0, 0, 0.15)' : '')};
  ${({ isOpened }) => rowFlex({ justify: isOpened ? 'space-between' : 'end' })}
`;

const AddButton = styled(PlusButtonSvg)``;

const RemoveButton = styled(MinusButtonSvg)<{ isOpened: boolean }>`
  opacity: ${({ isOpened }) => (isOpened ? 1 : 0)};
  transform: ${({ isOpened }) => (isOpened ? 'translateX(0)' : 'translateX(100%)')};
  transition: transform 0.3s ease, opacity 0.3s ease;
`;

const QuantityLabel = styled.span<{ isOpened: boolean }>`
  margin: 0 10px;
  font-size: 18px;
  opacity: ${({ isOpened }) => (isOpened ? 1 : 0)};
  transform: ${({ isOpened }) => (isOpened ? 'translateX(0)' : 'translateX(100%)')};
  transition: transform 0.3s ease, opacity 0.3s ease;
`;

interface ProductCardProps {
  product: Product;
  quantity: number;
}

function ProductCard({ product, quantity }: ProductCardProps) {
  const isOpened = quantity > 0;
  const setOrderBasket = useSetRecoilState(orderBasketAtom);

  const handleAddProduct = () => {
    setOrderBasket((prev) => {
      const existingItem = prev.find((prevProduct) => prevProduct.productId === product.id);

      if (existingItem) {
        return prev.map((prevProduct) => (prevProduct.productId === product.id ? { ...prevProduct, quantity: prevProduct.quantity + 1 } : prevProduct));
      }

      return [...prev, { productId: product.id, quantity: 1 }];
    });
  };

  const handleRemoveProduct = () => {
    setOrderBasket((prev) => {
      const existingItem = prev.find((prevProduct) => prevProduct.productId === product.id);

      if (existingItem && existingItem.quantity > 1) {
        return prev.map((prevProduct) => (prevProduct.productId === product.id ? { ...prevProduct, quantity: prevProduct.quantity - 1 } : prevProduct));
      }

      return prev.filter((prevProduct) => prevProduct.productId !== product.id);
    });
  };

  if (!product) return null;

  return (
    <Container className="product-card-container">
      <LabelContainer className="label-container">
        <AppLabel color={Color.BLACK} size={18}>
          {product.name}
        </AppLabel>
        <AppLabel color={Color.BLACK} size={13}>
          {product.description}
        </AppLabel>
        <AppLabel color={Color.BLACK} size={18}>
          {product.price.toLocaleString()}원
        </AppLabel>
      </LabelContainer>
      <Contents className="image-container">
        <StyledImage src={product.imageUrl} alt={product.name} />
        <ButtonContainer isOpened={isOpened}>
          <RemoveButton onClick={handleRemoveProduct} isOpened={isOpened} />
          <QuantityLabel isOpened={isOpened}>{quantity}</QuantityLabel>
          <AddButton onClick={handleAddProduct} />
        </ButtonContainer>
      </Contents>
    </Container>
  );
}

export default ProductCard;
