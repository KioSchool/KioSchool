import { useEffect, useState } from 'react';
import useOrder from '@hooks/user/useOrder';
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom';
import styled from '@emotion/styled';
import useWorkspace from '@hooks/user/useWorkspace';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { Color } from '@resources/colors';
import OrderStickyNavBar from '@components/user/order/OrderStickyNavBar';
import OrderStatusBar from '@components/user/order/OrderStatusBar';
import useRefresh from '@hooks/useRefresh';
import OrderButton from '@components/user/order/OrderButton';
import { userOrderBasketAtom, userWorkspaceAtom } from 'src/jotai/user/atoms';
import { useAtomValue } from 'jotai';
import { useResetAtom } from 'jotai/utils';
import useBlockPopState from '@hooks/useBlockPopState';
import { defaultUserOrderValue } from '@@types/defaultValues';
import HorizontalDivider from '@components/common/divider/HorizontalDivider';
import { Order, OrderStatus } from '@@types/index';

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 50px;
`;

const SubContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding: 20px 20px 120px 20px;
  gap: 15px;
  ${colFlex({ justify: 'center', align: 'start' })}
`;

const ContentsContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding: 12px 10px;
  gap: 20px;
  border-radius: 9px;
  border: 0.5px solid #939393;
  ${colFlex({ justify: 'center', align: 'start' })}
`;

const SubTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  padding-left: 10px;
`;

const ContentTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  padding-bottom: 8px;
`;

const InfoContainer = styled.div`
  width: 100%;
  padding: 0 10px;
  box-sizing: border-box;
  gap: 8px;
  ${colFlex()}
`;

const InfoRow = styled.div`
  width: 100%;
  ${rowFlex({ justify: 'space-between', align: 'center' })}
`;

const ContentText = styled.div`
  font-size: 13px;
  font-weight: 400;
  color: ${Color.GREY};
`;

const OrderStatusContainer = styled.div<{}>`
  box-sizing: border-box;
  width: 100%;
  padding: 7px 10px;
  gap: 10px;
  ${colFlex({ justify: 'space-between', align: 'start' })};
`;

const OrderProductContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  gap: 10px;
  padding: 0 10px;
  ${colFlex()}
`;

const OrderPriceContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding: 7px 10px;
  ${rowFlex({ justify: 'space-between', align: 'center' })};
`;

const OrderProductRow = styled.div`
  width: 100%;
  ${rowFlex({ justify: 'space-between' })}
`;

const OrderProductText = styled.div`
  font-size: 13px;
  color: ${Color.GREY};
  font-weight: 400;
`;

function OrderComplete() {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');
  const workspaceId = searchParams.get('workspaceId');
  const tableNo = searchParams.get('tableNo');

  const { fetchWorkspace } = useWorkspace();
  const { fetchOrder } = useOrder();
  const { allowPullToRefresh } = useRefresh();
  const resetOrderBasket = useResetAtom(userOrderBasketAtom);
  const [order, setOrder] = useState<Order>(defaultUserOrderValue);
  const workspace = useAtomValue(userWorkspaceAtom);

  const dateConverter = (date: Date) => {
    const isAm = date.getHours() < 12;
    const ampm = isAm ? '오전' : '오후';
    const hour = isAm ? date.getHours() : date.getHours() - 12;

    return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 ${ampm} ${hour}시 ${date.getMinutes()}분`;
  };

  useBlockPopState();

  const fetchIntervalTime = 60000;

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    const pollOrder = async () => {
      if (!orderId) {
        return;
      }

      const orderData = await fetchOrder(orderId);
      setOrder(orderData);

      if (intervalId && (orderData.status === OrderStatus.SERVED || orderData.status === OrderStatus.CANCELLED)) {
        clearInterval(intervalId);
      }
    };

    if (!orderId || !workspaceId) {
      alert('주문 정보가 없습니다. 다시 주문해주세요.');
      navigate(-1);
      return;
    }

    pollOrder();
    intervalId = setInterval(pollOrder, fetchIntervalTime);

    resetOrderBasket();
    fetchWorkspace(workspaceId);
    allowPullToRefresh();

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [orderId]);

  return (
    <Container className={'order-complete-container'}>
      <OrderStickyNavBar showNavBar={true} workspaceName={workspace.name} tableNo={order.tableNumber} useShareButton={true} useLeftArrow={false} />
      <SubContainer className={'order-complete-sub-container'}>
        <SubTitle>주문내역</SubTitle>
        <ContentsContainer>
          <InfoContainer>
            <ContentTitle>주문 정보</ContentTitle>
            <InfoRow>
              <ContentText>주문일시</ContentText>
              <ContentText>{dateConverter(new Date(order.createdAt))}</ContentText>
            </InfoRow>
            <InfoRow>
              <ContentText>주문번호</ContentText>
              <ContentText>{order.orderNumber}</ContentText>
            </InfoRow>
            <InfoRow>
              <ContentText>입금자명</ContentText>
              <ContentText>{order.customerName}</ContentText>
            </InfoRow>
          </InfoContainer>
          <HorizontalDivider />
          <OrderStatusContainer>
            <ContentTitle>주문 상태</ContentTitle>
            <OrderStatusBar status={order.status} />
          </OrderStatusContainer>
          <HorizontalDivider />
          <OrderProductContainer>
            <ContentTitle>상품 정보</ContentTitle>
            {order.orderProducts.map((orderProduct) => (
              <OrderProductRow key={orderProduct.id}>
                <OrderProductText>
                  {orderProduct.productName} · {orderProduct.quantity}개
                </OrderProductText>
                <OrderProductText>{orderProduct.totalPrice.toLocaleString()}원</OrderProductText>
              </OrderProductRow>
            ))}
          </OrderProductContainer>
          <HorizontalDivider />
          <OrderPriceContainer key={order.id}>
            <ContentTitle>결제 금액</ContentTitle>
            <ContentTitle>{order.totalPrice.toLocaleString()}원</ContentTitle>
          </OrderPriceContainer>
        </ContentsContainer>
      </SubContainer>
      <OrderButton
        showButton={true}
        buttonLabel={`더 주문하기`}
        onClick={() =>
          navigate({
            pathname: '/order',
            search: createSearchParams({
              workspaceId: workspaceId || '',
              tableNo: tableNo || '',
            }).toString(),
          })
        }
      />
    </Container>
  );
}

export default OrderComplete;
