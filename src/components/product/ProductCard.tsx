import { Product } from '@@types/index';
import styled from '@emotion/styled';
import AppLabel from '@components/common/label/AppLabel';
import React, { useState } from 'react';
import ProductDialog from '@components/product/ProductDialog';

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
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  if (!product) return <div></div>;

  return (
    <>
      {openDialog && <ProductDialog product={product} closeDialog={() => setOpenDialog(false)} />}
      <Container onClick={() => setOpenDialog(true)}>
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
    </>
  );
}

export default ProductCard;
