import React from 'react';
import { Product } from '@@types/index';
import styled from '@emotion/styled';
import AppLabel from '@components/common/label/AppLabel';
import SwitchButton from '@components/common/button/SwitchButton';
import useAdminProducts from '@hooks/admin/useAdminProducts';
import { useParams } from 'react-router-dom';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { css } from '@emotion/react';

interface Props {
  product: Product;
  onClick?: () => void;
}

const sellableStyle = css`
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0 4px 17px 0 rgba(0, 0, 0, 0.1);
`;

const unSellableStyle = css`
  background: rgba(255, 255, 255, 0.1);
  opacity: 50%;
  box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.1) inset;
`;

const Container = styled.div<{ isSellable: boolean | null }>`
  width: 220px;
  height: 320px;
  ${(props) => (props.isSellable ? sellableStyle : unSellableStyle)};
  border-radius: 16px;
  ${colFlex({ justify: 'center', align: 'center' })}
`;

const SubContainer = styled.div`
  width: 100%;
  height: 100%;
  gap: 10px;
  ${colFlex({ justify: 'center', align: 'center' })}
`;

const ContentContainer = styled.div`
  cursor: pointer;
  ${colFlex({ justify: 'center', align: 'center' })}
`;

const TextContainer = styled.div`
  height: 80px;
  ${colFlex({ justify: 'center', align: 'center' })}
`;

const ImageContainer = styled.div<{ isSellable: boolean | null }>`
  width: 150px;
  height: 120px;
  filter: ${(props) => (props.isSellable ? 'none' : 'grayScale(100%)')};
  ${rowFlex({ justify: 'center', align: 'center' })}
`;

function ProductCard({ product, onClick }: Props) {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const { editProductSellable } = useAdminProducts(workspaceId);

  return (
    <Container isSellable={product.isSellable} className={'product-card-container'}>
      <SubContainer className={'product-card-sub-container'}>
        <ContentContainer onClick={onClick} className={'content-container'}>
          <TextContainer className={'text-container'}>
            <AppLabel size={20}>{product.name}</AppLabel>
            <AppLabel size={20}>{product.price.toLocaleString()}원</AppLabel>
          </TextContainer>
          <ImageContainer isSellable={product.isSellable} className={'image-container'}>
            <img src={product.imageUrl} alt={product.name} width="150" height="120" style={{ borderRadius: '15px' }} />
          </ImageContainer>
        </ContentContainer>
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
