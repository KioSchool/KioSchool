import React from 'react';
import { Product } from '@@types/index';
import styled from '@emotion/styled';
import AppLabel from '@components/common/label/AppLabel';
import SwitchButton from '@components/common/button/SwitchButton';
import useProducts from '@hooks/useProducts';
import { useParams } from 'react-router-dom';

interface Props {
  product: Product;
}

const Container = styled.div<{ isSellable: boolean | null }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 320px;
  border-radius: 16px;
  background: ${(props) => (props.isSellable ? 'rgba(255, 255, 255, 0.20)' : 'rgba(0, 0, 0, 0.40)')};
  box-shadow: 0px 4px 17px 0px rgba(0, 0, 0, 0.1);
  cursor: pointer;
`;

const SubContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  gap: 10px;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80px;
`;

function ProductCard({ product }: Props) {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const { editProductSellable } = useProducts(workspaceId);

  return (
    <Container isSellable={product.isSellable}>
      <SubContainer>
        <TextContainer>
          <AppLabel size={20}>{product.name}</AppLabel>
          <AppLabel size={20}>{product.price.toLocaleString()}원</AppLabel>
        </TextContainer>
        <img src={product.imageUrl} alt={product.name} width="150" height="120" style={{ borderRadius: '15px' }} />
        <SwitchButton
          checked={!!product.isSellable}
          onChange={() => {
            editProductSellable(product.id, !product.isSellable);
          }}
          checkedText="ON"
          uncheckedText="HIDE"
        />
      </SubContainer>
    </Container>
  );
}

export default ProductCard;