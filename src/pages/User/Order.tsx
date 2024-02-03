import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from '@emotion/styled';
import AppLabel from '@components/common/label/AppLabel';
import AppButton from '@components/common/button/AppButton';
import CategoryBadgesContainer from '@components/user/order/CategoryBadgesContainer';
import ProductCard from '@components/user/product/ProductCard';
import HorizontalDivider from '@components/common/divider/HorizontalDivider';
import useWorkspace from '@hooks/useWorkspace';
import { orderBasketAtom, userWorkspaceAtom } from '@recoils/atoms';
import { useRecoilValue } from 'recoil';
import { Product } from '@@types/index';
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
  z-index: 100;
`;

const ContentContainer = styled.div`
  padding: 30px;
`;

const OrderButtonContainer = styled.div`
  position: fixed;
  bottom: 50px;
  width: 100vw;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const OrderButtonSubContainer = styled.div`
  padding: 8px;
  border-radius: 20px;
  background: white;
  box-shadow: 0px 16px 32px 0px rgba(194, 191, 172, 0.6);
`;

const ProductContainer = styled.div`
  padding: 10px;
`;

function Order() {
  const workspace = useRecoilValue(userWorkspaceAtom);
  const productsByCategory = _.groupBy<Product>(workspace.products, (product) => product.productCategory?.id);
  const productsMap = _.keyBy(workspace.products, 'id');
  const categoryMap = _.keyBy(workspace.productCategories, 'id');

  const [searchParams] = useSearchParams();
  const workspaceId = searchParams.get('workspaceId');
  const tableNo = searchParams.get('tableNo');

  const { fetchWorkspace } = useWorkspace();
  const navigate = useNavigate();
  const orderBasket = useRecoilValue(orderBasketAtom);
  const totalAmount = orderBasket.reduce((acc, cur) => {
    return acc + productsMap[cur.productId].price * cur.quantity;
  }, 0);

  useEffect(() => {
    fetchWorkspace(workspaceId);
  }, []);

  return (
    <Container>
      <Header>
        <AppLabel size={'medium'}>{workspace.name}</AppLabel>
        <AppLabel size={'small'} style={{ color: 'gray' }}>
          {tableNo}번 테이블
        </AppLabel>
        <CategoryBadgesContainer workspace={workspace} productsByCategory={productsByCategory} />
      </Header>
      <ContentContainer>
        {_.keys(productsByCategory).map((categoryId) => (
          <div id={`product_category${categoryId}`} key={`product_category${categoryId}`}>
            <AppLabel size={22}>{categoryMap[categoryId]?.name || '기본 메뉴'}</AppLabel>
            {productsByCategory[categoryId].map((product) => (
              <ProductContainer key={`product${product.id}`}>
                <ProductCard product={product} />
                <HorizontalDivider />
              </ProductContainer>
            ))}
          </div>
        ))}
      </ContentContainer>
      {totalAmount > 0 && (
        <OrderButtonContainer>
          <OrderButtonSubContainer>
            <AppButton size={270} onClick={() => navigate(`/orderbasket?workspaceId=${workspaceId}&tableNo=${tableNo}`)}>
              {totalAmount.toLocaleString()}원 장바구니
            </AppButton>
          </OrderButtonSubContainer>
        </OrderButtonContainer>
      )}
    </Container>
  );
}

export default Order;
