import { Product } from '../../type';
import styled from '@emotion/styled';
import AppLabel from '../common/label/AppLabel';

interface ProductCardProps {
  product: Product;
}

const Container = styled.div`
  max-width: 100vw;
  height: 150px;
  padding: 5px;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 2fr 1fr;
`;

const LabelContainer = styled.div`
  display: flex;
  flex-basis: 0;
  flex-direction: column;
`;

const ImageContainer = styled.div``;

function ProductCard({ product }: ProductCardProps) {
  if (!product) return <div></div>;

  return (
    <Container>
      <LabelContainer>
        <AppLabel size={'medium'}>{product.name}</AppLabel>
        <AppLabel size={'small'}>{product.description}</AppLabel>
        <AppLabel size={'small'}>{product.price}원</AppLabel>
      </LabelContainer>
      <ImageContainer>
        <img
          src={product.imageUrl}
          alt={product.name}
          style={{ float: 'right', maxWidth: '140px', maxHeight: '140px', objectFit: 'cover', border: 'none', borderRadius: '10px' }}
        />
      </ImageContainer>
    </Container>
  );
}

export default ProductCard;
