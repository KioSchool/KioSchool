import { Product } from '@@types/index';
import styled from '@emotion/styled';
import DashboardCard from './DashboardCard';
import ProductCard from '@components/admin/product/ProductCard';
import { rowFlex } from '@styles/flexStyles';
import { EmptyText } from '@styles/dashboardStyles';

const ProductList = styled.div`
  gap: 12px;
  overflow-x: auto;
  padding-bottom: 8px;
  width: 100%;

  ${rowFlex({ align: 'start' })}
`;

const ScaledProductWrapper = styled.div`
  transform: scale(0.85);
  transform-origin: top left;
  padding-top: 12px;
  padding-right: 20px;
`;

interface OutOfStockListProps {
  products: Product[];
}

function OutOfStockList({ products }: OutOfStockListProps) {
  return (
    <DashboardCard title="품절된 상품" width={480} height={272} showDivider={false}>
      {products.length === 0 ? (
        <EmptyText>품절된 상품이 없습니다.</EmptyText>
      ) : (
        <ProductList>
          {products.map((product) => (
            <ScaledProductWrapper key={product.id}>
              {/* todo: product card의 품절 상태 변경 이벤트를 dashboard에서도 가능하게? */}
              <ProductCard product={product} />
            </ScaledProductWrapper>
          ))}
        </ProductList>
      )}
    </DashboardCard>
  );
}

export default OutOfStockList;
