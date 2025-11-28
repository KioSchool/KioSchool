import { Product, ProductStatus } from '@@types/index';
import styled from '@emotion/styled';
import useAdminProducts from '@hooks/admin/useAdminProducts';
import { useParams } from 'react-router-dom';
import { colFlex } from '@styles/flexStyles';
import { Color } from '@resources/colors';
import SelectWithProductStatus from '@components/admin/product/SelectWithProductStatus';

const sellableStyle = `
  background: ${Color.WHITE};
`;

const unSellableStyle = `
  background: rgba(255, 255, 255, 0.7);
`;

const Container = styled.div<{ isSellable: boolean | null }>`
  width: 180px;
  height: 228px;
  flex-shrink: 0;
  padding: 12px;
  border-radius: 16px;
  border: 1px solid #e8eef2;
  box-sizing: border-box;
  ${(props) => (props.isSellable ? sellableStyle : unSellableStyle)}
  ${colFlex({ justify: 'space-between', align: 'center' })}
`;

const Title = styled.div`
  line-height: 24px;
  font-size: 16px;
  font-weight: 700;
`;

const Price = styled.div`
  line-height: 24px;
  font-size: 12px;
  font-weight: 500;
`;

const ContentContainer = styled.div`
  cursor: pointer;
  width: 100%;
  ${colFlex({ justify: 'center', align: 'center' })};
`;

const TextContainer = styled.div<{ isSellable: boolean | null }>`
  color: ${(props) => (props.isSellable ? '#464a4d' : '#B2B2B2')};
  padding-bottom: 12px;
  ${colFlex({ justify: 'center', align: 'center' })}
`;

const Image = styled.img<{ isSellable: boolean | null }>`
  width: 100px;
  height: 100px;
  border-radius: 6px;
  border: 1px solid #e8eef2;
  opacity: ${(props) => (props.isSellable ? 1 : 0.4)};
`;

const SelectorWrapper = styled.div`
  width: 100%;
  ${colFlex({ justify: 'center', align: 'center' })}
`;

interface ProductCardProps {
  product: Product;
  onClick?: () => void;
}

function ProductCard({ product, onClick }: ProductCardProps) {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const { editProductSellable } = useAdminProducts(workspaceId);

  // TODO : 품절 처리 api 연동 이후 삭제되어야 하는 로직
  const getCurrentStatus = (): ProductStatus => {
    if (product.isSellable) return 'SELLING';
    return 'HIDDEN';
  };

  const handleStatusChange = (newStatus: ProductStatus) => {
    if (newStatus === 'SELLING') {
      editProductSellable(product.id, true);
    } else {
      // TODO : 품절 처리 api 연동 이후 삭제되어야 하는 로직
      // 현재는 판매 불가 상태로 처리
      editProductSellable(product.id, false);
    }
  };

  return (
    <Container isSellable={product.isSellable} className={'product-card-container'}>
      <ContentContainer onClick={onClick} className={'content-container'}>
        <TextContainer isSellable={product.isSellable} className={'text-container'}>
          <Title>{product.name}</Title>
          <Price>{product.price.toLocaleString()}원</Price>
        </TextContainer>
        <Image isSellable={product.isSellable} src={product.imageUrl} alt={product.name} />
      </ContentContainer>

      <SelectorWrapper onClick={(e) => e.stopPropagation()}>
        <SelectWithProductStatus currentStatus={getCurrentStatus()} onStatusChange={handleStatusChange} />
      </SelectorWrapper>
    </Container>
  );
}

export default ProductCard;
