import { useSetRecoilState } from 'recoil';
import { orderBasketAtom } from '@recoils/atoms';
import { Product } from '@@types/index';
import styled from '@emotion/styled';
import AppLabel from '@components/common/label/AppLabel';
import { colFlex, rowFlex } from '@styles/flexStyles';
import PlusButtonSvg from '@resources/svg/PlusButtonSvg';
import MinusButtonSvg from '@resources/svg/MinusButtonSvg';

const Container = styled.div`
  max-width: 100vw;
  padding: 10px;
  display: grid;
  grid-template-columns: 2fr 1fr;
`;

const LabelContainer = styled.div`
  flex-basis: 0;
  gap: 3px;
  ${colFlex()}
`;

const ImageContainer = styled.div`
  ${rowFlex({ justify: 'flex-end' })}
`;

const StyledImage = styled.img`
  width: 90px;
  height: 90px;
  object-fit: cover;
  border: none;
  border-radius: 10px;
`;

const AddButton = styled(PlusButtonSvg)`
  cursor: pointer;
`;

const RemoveButton = styled(MinusButtonSvg)`
  cursor: pointer;
`;

const QuantityLabel = styled.span`
  margin: 0 10px;
  font-size: 18px;
`;

interface ProductCardProps {
  product: Product;
  quantity: number;
}

function ProductCard({ product, quantity }: ProductCardProps) {
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
        <AppLabel size={20}>{product.name}</AppLabel>
        <AppLabel size={13}>{product.description}</AppLabel>
        <AppLabel size={22} style={{ marginTop: 'auto' }}>
          {product.price.toLocaleString()}원
        </AppLabel>
      </LabelContainer>
      <ImageContainer className="image-container">
        <RemoveButton onClick={handleRemoveProduct} />
        <QuantityLabel>{quantity}</QuantityLabel>
        <AddButton onClick={handleAddProduct} />
        <StyledImage src={product.imageUrl} alt={product.name} />
      </ImageContainer>
    </Container>
  );
}

export default ProductCard;
