import React, { useEffect } from 'react';
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom';
import styled from '@emotion/styled';
import { useRecoilState, useRecoilValue } from 'recoil';
import { orderBasketAtom, userWorkspaceAtom } from '@recoils/atoms';
import ProductCounterBadge from '@components/user/product/ProductCounterBadge';
import _ from 'lodash';
import OrderButton from '@components/user/order/OrderButton';
import { colFlex, rowFlex } from '@styles/flexStyles';
import OrderStickyNavBar from '@components/admin/order/OrderStickyNavBar';
import { Color } from '@resources/colors';
import AppLabel from '@components/common/label/AppLabel';

const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
  padding: 0 0 80px;
  box-sizing: border-box;
`;

const SubContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding: 0 20px;
  margin-top: 45px;
  gap: 20px;
  border-top: 10px solid ${Color.LIGHT_GREY};
  padding-top: 12px;
  ${colFlex({ justify: 'center', align: 'center' })}
`;

const OrderBasketContainer = styled.div`
  gap: 14px;
  border-radius: 15px;
  border: 1px solid ${Color.GREY};
  ${colFlex({ align: 'center' })}
`;

const Header = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding: 0 10px;
  ${rowFlex({ justify: 'space-between', align: 'center' })}
`;

const Button = styled.button`
  width: 80px;
  height: 20px;
  background: #c2c2c2;
  color: ${Color.WHITE};
  font-size: 12px;
  border: none;
  border-radius: 20px;
`;

function OrderBasket() {
  const workspace = useRecoilValue(userWorkspaceAtom);
  const [orderBasket, setOrderBasket] = useRecoilState(orderBasketAtom);
  const productsMap = _.keyBy(workspace.products, 'id');
  const totalAmount = orderBasket.reduce((acc, cur) => {
    return acc + productsMap[cur.productId].price * cur.quantity;
  }, 0);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const workspaceId = searchParams.get('workspaceId');
  const tableNo = searchParams.get('tableNo');

  const basketRef = React.useRef<HTMLDivElement>(null);

  if (orderBasket.length == 0) {
    navigate(-1);
  }

  useEffect(() => {
    basketRef.current?.scroll({ top: 0, behavior: 'smooth' });
  }, []);

  const flushOrderBasket = () => {
    setOrderBasket([]);
  };

  return (
    <Container className={'order-basket-container'}>
      <OrderStickyNavBar showNavBar={true} workspaceName={workspace.name} tableNo={tableNo} useShareButton={false} />
      <SubContainer>
        <Header>
          <AppLabel color={Color.BLACK} size={15}>
            장바구니
          </AppLabel>
          <Button onClick={flushOrderBasket}>전체 삭제 </Button>
        </Header>
        <OrderBasketContainer ref={basketRef} className={'order-basket-content'}>
          {orderBasket.map((basket) => {
            const product = productsMap[basket.productId];
            return <ProductCounterBadge product={product} key={product.id} />;
          })}
        </OrderBasketContainer>
        <OrderButton
          showButton={orderBasket.length > 0}
          buttonLabel={`${totalAmount.toLocaleString()}원 주문하기`}
          onClick={() =>
            navigate({
              pathname: '/order-pay',
              search: createSearchParams({
                workspaceId: workspaceId || '',
                tableNo: tableNo || '',
              }).toString(),
            })
          }
        />
      </SubContainer>
    </Container>
  );
}

export default OrderBasket;
