import { Product } from '@@types/index';
import styled from '@emotion/styled';
import AppLabel from '@components/common/label/AppLabel';
import { colFlex, rowFlex } from '@styles/flexStyles';

interface ProductCardProps {
  product: Product;
}

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
  display: flex;
  ${rowFlex({ justify: 'flex-end' })}
`;

const StyledImage = styled.img`
  width: 90px;
  height: 90px;
  object-fit: cover;
  border: none;
  border-radius: 10px;
`;

function ProductCard({ product }: ProductCardProps) {
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
        <StyledImage src={product.imageUrl} alt={product.name} />
      </ImageContainer>
    </Container>
  );
}

export default ProductCard;
