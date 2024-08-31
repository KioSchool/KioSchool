import { Product } from '@@types/index';
import styled from '@emotion/styled';
import AppLabel from '@components/common/label/AppLabel';
import React, { useState } from 'react';
import ProductDialog from '@components/user/product/ProductDialog';
import { colFlex } from '@styles/flexStyles';

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

const ImageContainer = styled.div``;

function ProductCard({ product }: ProductCardProps) {
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  if (!product) return <div></div>;

  return (
    <>
      {openDialog && <ProductDialog product={product} closeDialog={() => setOpenDialog(false)} />}
      <Container onClick={() => setOpenDialog(true)} className={'product-card-container'}>
        <LabelContainer className={'label-container'}>
          <AppLabel size={20}>{product.name}</AppLabel>
          <AppLabel size={13}>{product.description}</AppLabel>
          <AppLabel size={22} style={{ marginTop: 'auto' }}>
            {product.price.toLocaleString()}원
          </AppLabel>
        </LabelContainer>
        <ImageContainer className={'image-container'}>
          <img
            src={product.imageUrl}
            alt={product.name}
            style={{ float: 'right', width: '90px', height: '90px', objectFit: 'cover', border: 'none', borderRadius: '10px' }}
            className={'product-image'}
          />
        </ImageContainer>
      </Container>
    </>
  );
}

export default ProductCard;
