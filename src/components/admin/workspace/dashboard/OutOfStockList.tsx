import styled from '@emotion/styled';
import { match } from 'ts-pattern';
import DashboardCard from './DashboardCard';
import ProductCard from '@components/admin/product/ProductCard';
import { rowFlex } from '@styles/flexStyles';
import { EmptyText } from '@styles/dashboardStyles';
import { useAtomValue } from 'jotai';
import { adminDashboardAtom } from '@jotai/admin/atoms';

const ProductList = styled.div`
  overflow-x: auto;
  padding-bottom: 8px;
  width: 100%;
  ${rowFlex({ align: 'start' })}
`;

const ScaledProductWrapper = styled.div`
  transform: scale(0.85);
  transform-origin: top left;
  padding-top: 12px;
`;

function OutOfStockList() {
  const { outOfStockProducts } = useAtomValue(adminDashboardAtom);

  return (
    <DashboardCard title="품절된 상품" width={480} height={240} showDivider={false}>
      {match(outOfStockProducts.length)
        .with(0, () => <EmptyText>품절된 상품이 없습니다.</EmptyText>)
        .otherwise(() => (
          <ProductList>
            {outOfStockProducts.map((product) => (
              <ScaledProductWrapper key={product.id}>
                <ProductCard product={product} showStatusSelector={false} />
              </ScaledProductWrapper>
            ))}
          </ProductList>
        ))}
    </DashboardCard>
  );
}

export default OutOfStockList;
