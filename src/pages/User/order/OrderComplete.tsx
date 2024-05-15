import React, { useEffect } from 'react';
import useOrder from '@hooks/user/useOrder';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { orderBasketAtom, userOrderAtom } from '@recoils/atoms';
import { useSearchParams } from 'react-router-dom';
import styled from '@emotion/styled';
import AppLabel from '@components/common/label/AppLabel';
import OrderButton from '@components/user/order/OrderButton';
import OrderStatusBar from '@components/user/order/OrderStatusBar';
import ReloadSvg from '@resources/svg/ReloadSvg';

const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
  padding: 60px 0 80px;
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

const SubContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 20px;
  background: #f7f7f7;
  box-sizing: border-box;
  gap: 4px;
`;

const ContentTitleLabel = styled(AppLabel)`
  font-weight: bold;
  margin-bottom: 3px;
`;

const ProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 10px 0;
`;

function OrderComplete() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');

  const { fetchOrder } = useOrder();
  const setOrderBasket = useSetRecoilState(orderBasketAtom);
  const order = useRecoilValue(userOrderAtom);

  const dateConverter = (date: Date) => {
    const isAm = date.getHours() < 12;
    const ampm = isAm ? '오전' : '오후';
    const hour = isAm ? date.getHours() : date.getHours() - 12;

    return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 ${ampm} ${hour}시 ${date.getMinutes()}분`;
  };

  const resetRecoilState = () => {
    setOrderBasket([]);
  };

  useEffect(() => {
    resetRecoilState();
    fetchOrder(orderId);
  }, []);

  return (
    <Container>
      <Header>
        <AppLabel>주문 내역</AppLabel>
        <ReloadSvg onClick={() => window.location.reload()}>새로고침</ReloadSvg>
      </Header>
      <SubContainer>
        <ContentBox>
          <ContentTitleLabel size={17}>주문 번호: {orderId}번</ContentTitleLabel>
          <AppLabel size={13}>주문 일시: {dateConverter(new Date(order.createdAt))}</AppLabel>
          <AppLabel size={13}>입금자명: {order?.customerName}</AppLabel>
        </ContentBox>
        <ContentBox>
          <ContentTitleLabel size={17}>주문 상태</ContentTitleLabel>
          <OrderStatusBar status={order.status} />
        </ContentBox>
        <ContentBox>
          <ContentTitleLabel size={17}>주문 상품</ContentTitleLabel>
          {order?.orderProducts.map((orderProduct) => (
            <ProductContainer key={orderProduct.id}>
              <AppLabel size={13} style={{ fontWeight: 'bold' }}>
                {orderProduct.product.name} · {orderProduct.quantity}개
              </AppLabel>
              <AppLabel size={13}>{orderProduct.totalPrice.toLocaleString()}원</AppLabel>
            </ProductContainer>
          ))}
        </ContentBox>
        <ContentBox>
          <ContentTitleLabel size={17}>총 결제 금액</ContentTitleLabel>
          <AppLabel size={13}>{order.totalPrice.toLocaleString()}원</AppLabel>
        </ContentBox>
      </SubContainer>
      {order.status !== 'CANCELLED' && (
        <OrderButton
          showButton={true}
          buttonLabel={'주문내역 링크 복사'}
          onClick={() => {
            navigator.clipboard.writeText(window.location.href).then(() => {
              alert('주문내역 링크가 복사되었습니다.\n인터넷 브라우저에 붙여넣기하여 주문내역 확인이 가능합니다.');
            });
          }}
        />
      )}
    </Container>
  );
}

export default OrderComplete;
