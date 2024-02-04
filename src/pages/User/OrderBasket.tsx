import React from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from '@emotion/styled';
import AppBadge from '@components/common/badge/AppBadge';
import AppLabel from '@components/common/label/AppLabel';
import { useRecoilValue } from 'recoil';
import { orderBasketAtom, userWorkspaceAtom } from '@recoils/atoms';
import ProductCounterBadge from '@components/user/product/ProductCounterBadge';
import _ from 'lodash';
import AppButton from '@components/common/button/AppButton';

const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
`;

const Header = styled.div`
  background: white;
  position: sticky;
  top: 0;
  width: 100vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 25px;
  box-sizing: border-box;
  z-index: 100;
`;

const OrderBasketContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  align-items: center;
  gap: 14px;
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

function OrderBasket() {
  const workspace = useRecoilValue(userWorkspaceAtom);
  const orderBasket = useRecoilValue(orderBasketAtom);
  const productsMap = _.keyBy(workspace.products, 'id');
  const totalAmount = orderBasket.reduce((acc, cur) => {
    return acc + productsMap[cur.productId].price * cur.quantity;
  }, 0);

  const [searchParams] = useSearchParams();
  //const workspaceId = searchParams.get('workspaceId');
  const tableNo = searchParams.get('tableNo');

  return (
    <Container>
      <Header>
        <AppBadge background={'lightgray'} noBorder={true}>
          TABLE {tableNo}
        </AppBadge>
        <AppLabel size={'small'}>{workspace.name}</AppLabel>
      </Header>
      <OrderBasketContainer>
        {orderBasket.map((basket) => {
          const product = productsMap[basket.productId];
          return <ProductCounterBadge product={product} key={product.id} />;
        })}
      </OrderBasketContainer>
      {totalAmount > 0 && (
        <OrderButtonContainer>
          <OrderButtonSubContainer>
            <AppButton size={270}>{totalAmount.toLocaleString()}원 주문하기</AppButton>
          </OrderButtonSubContainer>
        </OrderButtonContainer>
      )}
    </Container>
  );
}

export default OrderBasket;
