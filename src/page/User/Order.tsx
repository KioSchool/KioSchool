import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from '@emotion/styled';
import AppLabel from '../../component/common/label/AppLabel';
import useWorkspace from '../../hook/useWorkspace';
import { userWorkspaceAtom } from '../../recoil/atoms';
import { useRecoilValue } from 'recoil';
import AppBadge from '../../component/common/badge/AppBadge';
import ProductCard from '../../component/product/ProductCard';
import HorizontalDivider from '../../component/common/divider/HorizontalDivider';
import { Product } from '../../type';
import _ from 'lodash';

const Container = styled.div`
  width: 100vw;
  padding-top: 60px;
`;

const Header = styled.div`
  background: white;
  position: sticky;
  top: 0;
  width: 100vw;
  height: 110px;
  flex-basis: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid gray;
`;

const CategoryBadges = styled.div`
  width: 100vw;
  height: 50px;
  display: flex;
  gap: 8px;
  align-items: center;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

function Order() {
  const workspace = useRecoilValue(userWorkspaceAtom);
  const productsByCategory = _.groupBy<Product>(workspace.products, (product) => product.productCategory?.id);
  const categoryMap = _.keyBy(workspace.productCategories, 'id');

  const [searchParams] = useSearchParams();
  const workspaceId = searchParams.get('workspaceId');
  const tableNo = searchParams.get('tableNo');

  const { fetchWorkspace } = useWorkspace();

  useEffect(() => {
    fetchWorkspace(workspaceId);
  }, []);

  return (
    <Container>
      <Header>
        <AppLabel size={'medium'}>{workspace.name}</AppLabel>
        <AppLabel size={'small'} style={{ color: 'gray' }}>
          this is table {tableNo}
        </AppLabel>
        <CategoryBadges>
          {workspace.productCategories.map((category) => (
            <AppBadge key={`category${category.id}`}>{category.name}</AppBadge>
          ))}
        </CategoryBadges>
      </Header>
      {_.keys(productsByCategory).map((categoryId) => (
        <div key={`product_category${categoryId}`}>
          <AppLabel size={'large'}>{categoryMap[categoryId]?.name || '기본 메뉴'}</AppLabel>
          <HorizontalDivider />
          {productsByCategory[categoryId].map((product) => (
            <div key={`product${product.id}`}>
              <ProductCard product={product} />
              <HorizontalDivider />
            </div>
          ))}
        </div>
      ))}
    </Container>
  );
}

export default Order;
