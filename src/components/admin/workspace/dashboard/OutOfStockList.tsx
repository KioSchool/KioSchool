import styled from '@emotion/styled';
import { match } from 'ts-pattern';
import DashboardCard from './DashboardCard';
import ProductCard from '@components/admin/product/ProductCard';
import { rowFlex } from '@styles/flexStyles';
import { ActionButton, EmptyText } from '@styles/dashboardStyles';
import { useAtomValue } from 'jotai';
import { adminDashboardAtom } from '@jotai/admin/atoms';
import { useNavigate } from 'react-router-dom';
import { ADMIN_ROUTES } from '@constants/routes';

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
  const navigate = useNavigate();
  const { outOfStockProducts } = useAtomValue(adminDashboardAtom);

  const handleNavigate = () => {
    navigate(ADMIN_ROUTES.PRODUCTS);
  };

  const rightAction = <ActionButton onClick={handleNavigate}>상품 관리 페이지로 이동 {'>'}</ActionButton>;
  return (
    <DashboardCard title="품절된 상품" width={480} height={240} rightAction={rightAction} showDivider={false}>
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
