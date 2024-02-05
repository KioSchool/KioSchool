import React, { useRef } from 'react';
import { useRecoilValue } from 'recoil';
import { orderBasketAtom, userWorkspaceAtom } from '@recoils/atoms';
import _ from 'lodash';
import styled from '@emotion/styled';
import AppLabel from '@components/common/label/AppLabel';
import AppBadge from '@components/common/badge/AppBadge';
import OrderButton from '@components/user/order/OrderButton';
import AppInputWithLabel from '@components/common/input/AppInputWithLabel';
import useApi from '@hooks/useApi';
import { useSearchParams } from 'react-router-dom';

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

function OrderPay() {
  const customerNameRef = useRef<HTMLInputElement>(null);

  const workspace = useRecoilValue(userWorkspaceAtom);
  const orderBasket = useRecoilValue(orderBasketAtom);
  const productsMap = _.keyBy(workspace.products, 'id');
  const totalAmount = orderBasket.reduce((acc, cur) => {
    return acc + productsMap[cur.productId].price * cur.quantity;
  }, 0);

  const { userApi } = useApi();
  const [searchParams] = useSearchParams();
  const workspaceId = searchParams.get('workspaceId');
  const tableNo = searchParams.get('tableNo');

  const tossAccountUrl = workspace.owner.accountUrl;
  const accountName = /bank=(.*?)&/g.exec(tossAccountUrl)?.[1] || 'test';
  const accountNumber = /accountNo=(.*?)&/g.exec(tossAccountUrl)?.[1] || 'test';

  return (
    <Container>
      <Header>
        <AppLabel>주문 결제</AppLabel>
        <AppBadge>{totalAmount.toLocaleString()}원</AppBadge>
      </Header>
      <AppInputWithLabel titleLabel={'입금자명'} style={{ width: '80%' }} placeholder={'입금자명을 입력해주세요.'} ref={customerNameRef} />
      <AppLabel>{decodeURI(accountName)}</AppLabel>
      <br />
      <AppLabel>{accountNumber}</AppLabel>
      <OrderButton
        amount={totalAmount}
        buttonLabel={`Toss로 결제하기`}
        onClick={() => {
          userApi.post('/order', {
            workspaceId: workspaceId,
            tableNumber: tableNo,
            orderProducts: orderBasket,
            customerName: customerNameRef.current?.value,
          });
          window.open(tossAccountUrl);
        }}
      />
    </Container>
  );
}

export default OrderPay;