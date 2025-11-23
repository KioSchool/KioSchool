import { Product } from '@@types/index';
import styled from '@emotion/styled';
// import useAdminProducts from '@hooks/admin/useAdminProducts';
// import { useParams } from 'react-router-dom';
import { colFlex } from '@styles/flexStyles';
import { Color } from '@resources/colors';

const sellableStyle = `
  background: ${Color.WHITE};
`;

const unSellableStyle = `
  background: rgba(255, 255, 255, 0.7);
`;

const Container = styled.div<{ isSellable: boolean | null }>`
  width: 180px;
  height: 228px;
  padding: 16px;
  border-radius: 16px;
  border: 1px solid #e8eef2;
  box-sizing: border-box;
  ${(props) => (props.isSellable ? sellableStyle : unSellableStyle)}
  ${colFlex({ justify: 'start', align: 'center' })}
`;

const Title = styled.div`
  color: #464a4d;
  line-height: 24px;
  font-size: 16px;
  font-weight: 700;
`;

const Price = styled.div`
  color: #464a4d;
  line-height: 24px;
  font-size: 12px;
  font-weight: 500;
`;

const ContentContainer = styled.div`
  cursor: pointer;
  ${colFlex({ justify: 'center', align: 'center' })};
`;

const TextContainer = styled.div<{ isSellable: boolean | null }>`
  color: ${(props) => (props.isSellable ? Color.BLACK : '#B2B2B2')};
  padding-bottom: 12px;
  ${colFlex({ justify: 'center', align: 'center' })}
`;

const Image = styled.img<{ isSellable: boolean | null }>`
  width: 100px;
  height: 100px;
  border-radius: 6px;
  border: 1px solid #e8eef2;
  opacity: ${(props) => (props.isSellable ? 1 : 0.2)};
`;

interface Props {
  product: Product;
  onClick?: () => void;
}

function ProductCard({ product, onClick }: Props) {
  // const { workspaceId } = useParams<{ workspaceId: string }>();
  // const { editProductSellable } = useAdminProducts(workspaceId);

  return (
    <Container isSellable={product.isSellable} className={'product-card-container'}>
      <ContentContainer onClick={onClick} className={'content-container'}>
        <TextContainer isSellable={product.isSellable} className={'text-container'}>
          <Title>{product.name}</Title>
          <Price>{product.price.toLocaleString()}원</Price>
        </TextContainer>
        <Image isSellable={product.isSellable} src={product.imageUrl} alt={product.name} />
      </ContentContainer>
      {/* <SwitchButtonContainer>
        <SwitchButton
          checked={!!product.isSellable}
          onChange={() => {
            editProductSellable(product.id, !product.isSellable);
          }}
          checkedText="SHOW"
          uncheckedText="HIDE"
        />
      </SwitchButtonContainer> */}
    </Container>
  );
}

export default ProductCard;
