import React, { useEffect } from 'react';
import useOrder from '@hooks/user/useOrder';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { orderBasketAtom, userOrderAtom, userWorkspaceAtom } from '@recoils/atoms';
import { useSearchParams } from 'react-router-dom';
import styled from '@emotion/styled';
import useWorkspace from '@hooks/user/useWorkspace';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { Color } from '@resources/colors';
import OrderStickyNavBar from '@components/admin/order/OrderStickyNavBar';
import OrderStatusBar from '@components/user/order/OrderStatusBar';
import useRefresh from '@hooks/useRefresh';
import OrderAccountInfo from '@components/user/order/OrderAccountInfo';

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const SubContainer = styled.div`
  margin-top: 45px;
  gap: 20px;
  border-top: 10px solid ${Color.LIGHT_GREY};
  padding-top: 12px;
  ${colFlex({ justify: 'center', align: 'center' })}
`;

const SubTitleContainer = styled.div`
  width: 100%;
  padding: 0 40px;
  box-sizing: border-box;
  gap: 10px;
  ${colFlex()};
`;

const SubTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
`;

const ContentContainer = styled.div`
  width: 100%;
  gap: 6px;
  ${colFlex({ align: 'center' })}
`;

const ContentTitleContainer = styled.div`
  width: 300px;
  ${rowFlex({ justify: 'space-between' })}
`;

const ContentTitle = styled.div`
  font-size: 13px;
  font-weight: 500;
`;

const ContentBox = styled.div`
  width: 100%;
  padding: 20px 40px;
  box-sizing: border-box;
  background: ${Color.LIGHT_GREY};
  ${colFlex()}
`;

const ContentText = styled.div`
  font-size: 13px;
  font-weight: 500;
  color: #898989;
`;

const OrderProductContainer = styled.div`
  width: 100%;
  gap: 10px;
  ${colFlex()}
`;

const OrderProductRow = styled.div`
  width: 100%;
  ${rowFlex({ justify: 'space-between' })}
`;

const OrderProductText = styled.div`
  font-size: 13px;
  font-weight: 500;
`;

const DescriptionContainer = styled.div`
  padding: 20px 0;
  width: 320px;
  ${colFlex({ justify: 'center', align: 'center' })};
`;

const Description = styled.div`
  font-size: 13px;
  font-weight: 500;
  text-align: center;
  color: #898989;
  white-space: pre-wrap;
`;

function OrderComplete() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');
  const workspaceId = searchParams.get('workspaceId');

  const { fetchWorkspace } = useWorkspace();
  const { fetchOrder } = useOrder();
  const { allowPullToRefresh } = useRefresh();
  const resetOrderBasket = useResetRecoilState(orderBasketAtom);
  const order = useRecoilValue(userOrderAtom);
  const workspace = useRecoilValue(userWorkspaceAtom);

  const dateConverter = (date: Date) => {
    const isAm = date.getHours() < 12;
    const ampm = isAm ? '오전' : '오후';
    const hour = isAm ? date.getHours() : date.getHours() - 12;

    return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 ${ampm} ${hour}시 ${date.getMinutes()}분`;
  };

  useEffect(() => {
    resetOrderBasket();
    fetchOrder(orderId);
    fetchWorkspace(workspaceId);
    allowPullToRefresh();
  }, []);

  return (
    <Container className={'order-complete-container'}>
      <OrderStickyNavBar showNavBar={true} workspaceName={workspace.name} tableNo={order.tableNumber} useShareButton={true} />
      <SubContainer className={'order-complete-sub-container'}>
        <SubTitleContainer className={'order-complete-sub-title-container'}>
          <SubTitle>주문내역</SubTitle>
        </SubTitleContainer>
        <ContentContainer>
          <ContentTitleContainer>
            <ContentTitle>주문 정보</ContentTitle>
          </ContentTitleContainer>
          <ContentBox>
            <ContentText>주문일시 | {dateConverter(new Date(order.createdAt))}</ContentText>
            <ContentText>주문번호 | {order.id}</ContentText>
            <ContentText>입금자명 | {order.customerName}</ContentText>
          </ContentBox>

          <ContentTitleContainer>
            <ContentTitle>주문 상태</ContentTitle>
          </ContentTitleContainer>
          <ContentBox>
            <OrderStatusBar status={order.status} />
          </ContentBox>

          <ContentTitleContainer>
            <ContentTitle>상품 정보</ContentTitle>
          </ContentTitleContainer>
          <ContentBox>
            <OrderProductContainer>
              {order.orderProducts.map((orderProduct) => (
                <OrderProductRow key={orderProduct.id}>
                  <OrderProductText>
                    {orderProduct.productName} · {orderProduct.quantity}개
                  </OrderProductText>
                  <OrderProductText>{orderProduct.totalPrice.toLocaleString()}원</OrderProductText>
                </OrderProductRow>
              ))}
            </OrderProductContainer>
          </ContentBox>
          <ContentBox>
            <OrderProductContainer>
              <OrderProductRow key={order.id}>
                <OrderProductText>상품 합계</OrderProductText>
                <OrderProductText>{order.totalPrice.toLocaleString()}원</OrderProductText>
              </OrderProductRow>
            </OrderProductContainer>
          </ContentBox>
          <OrderAccountInfo />
          <DescriptionContainer>
            <Description>{'결제가 원활하게 진행되지 않았을 경우,\n상단의 계좌 정보를 통해 직접 계좌이체를 부탁드립니다.'}</Description>
          </DescriptionContainer>
        </ContentContainer>
      </SubContainer>
    </Container>
  );
}

export default OrderComplete;
