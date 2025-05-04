import React from 'react';
import { Product } from '@@types/index';
import styled from '@emotion/styled';
import SwitchButton from '@components/common/button/SwitchButton';
import useAdminProducts from '@hooks/admin/useAdminProducts';
import { useParams } from 'react-router-dom';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { Color } from '@resources/colors';

const sellableStyle = `
  background: ${Color.WHITE};
`;

const unSellableStyle = `
  background: rgba(255, 255, 255, 0.7);
`;

const Container = styled.div<{ isSellable: boolean | null }>`
  width: 220px;
  height: 320px;
  padding: 25px 37px;
  border-radius: 13px;
  box-sizing: border-box;
  ${(props) => (props.isSellable ? sellableStyle : unSellableStyle)}
  ${colFlex({ justify: 'center', align: 'center' })}
`;

const SubContainer = styled.div`
  width: 100%;
  height: 100%;
  gap: 15px;
  ${colFlex({ justify: 'center', align: 'center' })};
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: 700;
`;

const Price = styled.div`
  font-size: 20px;
  font-weight: 500;
`;

const ContentContainer = styled.div`
  cursor: pointer;
  gap: 15px;
  ${colFlex({ justify: 'center', align: 'center' })};
`;

const TextContainer = styled.div<{ isSellable: boolean | null }>`
  height: 80px;
  color: ${(props) => (props.isSellable ? Color.BLACK : '#B2B2B2')};
  ${colFlex({ justify: 'center', align: 'center' })}
`;

const ImageContainer = styled.div<{ isSellable: boolean | null }>`
  width: 150px;
  height: 120px;
  filter: ${(props) => (props.isSellable ? 'none' : 'grayScale(50%)')};
  ${rowFlex({ justify: 'center', align: 'center' })}
`;

const Image = styled.img<{ isSellable: boolean | null }>`
  width: 125px;
  height: 125px;
  border-radius: 5px;
  border: 0.5px solid #e8e8e8;
  opacity: ${(props) => (props.isSellable ? 1 : 0.2)};
`;

const SwitchButtonContainer = styled.div`
  width: 100%;
  height: 40px;
  ${rowFlex({ justify: 'center', align: 'center' })}
`;

interface Props {
  product: Product;
  onClick?: () => void;
}

function ProductCard({ product, onClick }: Props) {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const { editProductSellable } = useAdminProducts(workspaceId);

  return (
    <Container isSellable={product.isSellable} className={'product-card-container'}>
      <SubContainer className={'product-card-sub-container'}>
        <ContentContainer onClick={onClick} className={'content-container'}>
          <TextContainer isSellable={product.isSellable} className={'text-container'}>
            <Title>{product.name}</Title>
            <Price>{product.price.toLocaleString()}원</Price>
          </TextContainer>
          <ImageContainer isSellable={product.isSellable} className={'image-container'}>
            <Image isSellable={product.isSellable} src={product.imageUrl} alt={product.name} />
          </ImageContainer>
        </ContentContainer>
        <SwitchButtonContainer>
          <SwitchButton
            checked={!!product.isSellable}
            onChange={() => {
              editProductSellable(product.id, !product.isSellable);
            }}
            checkedText="SHOW"
            uncheckedText="HIDE"
          />
        </SwitchButtonContainer>
      </SubContainer>
    </Container>
  );
}

export default ProductCard;
