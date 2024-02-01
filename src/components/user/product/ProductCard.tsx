import { Product } from '@@types/index';
import styled from '@emotion/styled';
import AppLabel from '@components/common/label/AppLabel';
import React, { useState } from 'react';
import ProductDialog from '@components/user/product/ProductDialog';

interface ProductCardProps {
  product: Product;
}

const Container = styled.div`
  max-width: 100vw;
  height: 90px;
  padding: 10px;
  display: grid;
  grid-template-columns: 2fr 1fr;
`;

const LabelContainer = styled.div`
  display: flex;
  flex-basis: 0;
  flex-direction: column;
  gap: 3px;
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
          <AppLabel size={20}>{product.name}</AppLabel>
          <AppLabel size={13}>{product.description}</AppLabel>
          <AppLabel size={22} style={{ marginTop: 'auto' }}>
            {product.price.toLocaleString()}원
          </AppLabel>
        </LabelContainer>
        <ImageContainer>
          <img
            src={product.imageUrl}
            alt={product.name}
            style={{ float: 'right', width: '90px', height: '90px', objectFit: 'cover', border: 'none', borderRadius: '10px' }}
          />
        </ImageContainer>
      </Container>
    </>
  );
}

export default ProductCard;
