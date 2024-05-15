import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from '@emotion/styled';
import AppBadge from '@components/common/badge/AppBadge';
import AppLabel from '@components/common/label/AppLabel';
import { useRecoilValue } from 'recoil';
import { orderBasketAtom, userWorkspaceAtom } from '@recoils/atoms';
import ProductCounterBadge from '@components/user/product/ProductCounterBadge';
import _ from 'lodash';
import OrderButton from '@components/user/order/OrderButton';

const Container = styled.div`
  width: 100vw;
  min-height: 80vh;
  padding: 0 0 80px;
  box-sizing: border-box;
  animation: moveInFromBottom 0.3s;

  @keyframes moveInFromBottom {
    from {
      opacity: 0;
      transform: translateY(100%);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
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

function OrderBasket() {
  const workspace = useRecoilValue(userWorkspaceAtom);
  const orderBasket = useRecoilValue(orderBasketAtom);
  const productsMap = _.keyBy(workspace.products, 'id');
  const totalAmount = orderBasket.reduce((acc, cur) => {
    return acc + productsMap[cur.productId].price * cur.quantity;
  }, 0);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const workspaceId = searchParams.get('workspaceId');
  const tableNo = searchParams.get('tableNo');

  const basketRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    basketRef.current?.scroll({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <Container>
      <Header>
        <AppBadge background={'lightgray'} noBorder={true}>
          TABLE {tableNo}
        </AppBadge>
        <AppLabel size={'small'}>{workspace.name}</AppLabel>
      </Header>
      <OrderBasketContainer ref={basketRef}>
        {orderBasket.map((basket) => {
          const product = productsMap[basket.productId];
          return <ProductCounterBadge product={product} key={product.id} />;
        })}
      </OrderBasketContainer>
      <OrderButton
        showButton={orderBasket.length > 0}
        buttonLabel={`${totalAmount.toLocaleString()}원 주문하기`}
        onClick={() => navigate(`/order-pay?workspaceId=${workspaceId}&tableNo=${tableNo}`)}
      />
    </Container>
  );
}

export default OrderBasket;
