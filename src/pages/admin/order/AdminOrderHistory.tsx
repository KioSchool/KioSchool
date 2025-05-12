import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import 'react-datepicker/dist/react-datepicker.css';
import useAdminOrder from '@hooks/admin/useAdminOrder';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { ordersAtom } from '@recoils/atoms';
import AppContainer from '@components/common/container/AppContainer';
import ToggleOrderCard from '@components/admin/order/ToggleOrderCard';
import AppLabel from '@components/common/label/AppLabel';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { OrderStatus } from '@@types/index';
import { format } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import { tabletMediaQuery } from '@styles/globalStyles';
import OrderHistoryNavBarChildren from '@components/admin/order/OrderHistoryNavBarChildren';

const Container = styled.div`
  gap: 24px;
  width: 100%;
  ${colFlex({ align: 'center' })}
`;

const OrderCardContainer = styled.div`
  height: 500px;
  gap: 10px;
  overflow: auto;
  ${colFlex()}
`;

const TotalPriceContainer = styled.div`
  width: 100%;
  padding: 10px;
  ${rowFlex({ justify: 'flex-end' })}

  ${tabletMediaQuery} {
    width: 80%;
  }
`;

function AdminOrderHistory() {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showServedOrder, setShowServedOrder] = useState(false);
  const { fetchOrders } = useAdminOrder(workspaceId);
  const orders = showServedOrder ? useRecoilValue(ordersAtom).filter((order) => order.status === OrderStatus.SERVED) : useRecoilValue(ordersAtom);

  const totalOrderPrice = orders.reduce((acc, cur) => acc + cur.totalPrice, 0).toLocaleString();

  const dateConverter = (date: Date) => {
    const zonedDate = toZonedTime(date, 'Asia/Seoul');

    return format(zonedDate, "yyyy-MM-dd'T'HH:mm:ss.SSS");
  };

  useEffect(() => {
    fetchOrders({ startDate: dateConverter(startDate), endDate: dateConverter(endDate) });
  }, [startDate, endDate]);

  return (
    <AppContainer
      useFlex={colFlex({ justify: 'center' })}
      useNavBackground={true}
      titleNavBarProps={{
        title: '주문 통계',
        children: (
          <OrderHistoryNavBarChildren
            showServedOrder={showServedOrder}
            setShowServedOrder={setShowServedOrder}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
          />
        ),
      }}
      useScroll={true}
    >
      <Container className={'admin-order-history-container'}>
        <OrderCardContainer className={'order-card-container'}>
          {orders.map((order) => (
            <ToggleOrderCard key={order.id} order={order} />
          ))}
        </OrderCardContainer>
        <TotalPriceContainer className={'total-price-container'}>
          <AppLabel size={25}>총 주문 금액: {totalOrderPrice}원</AppLabel>
        </TotalPriceContainer>
      </Container>
    </AppContainer>
  );
}

export default AdminOrderHistory;
