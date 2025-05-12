import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import 'react-datepicker/dist/react-datepicker.css';
import useAdminOrder from '@hooks/admin/useAdminOrder';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { ordersAtom } from '@recoils/atoms';
import AppContainer from '@components/common/container/AppContainer';
import ToggleOrderCard from '@components/admin/order/ToggleOrderCard';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { OrderStatus } from '@@types/index';
import { format } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import { tabletMediaQuery } from '@styles/globalStyles';
import OrderHistoryNavBarChildren from '@components/admin/order/OrderHistoryNavBarChildren';
import { Color } from '@resources/colors';

const Container = styled.div`
  width: 100%;
  ${colFlex({ align: 'center' })}
`;

const OrderCardContainer = styled.div`
  height: 500px;
  gap: 10px;
  overflow: auto;
  ${colFlex()}
`;

const HeaderContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 45px;
  ${rowFlex({ justify: 'space-between', align: 'center' })};
  padding: 0 20px;
  border-radius: 7px 7px 0px 0px;
  background: ${Color.KIO_ORANGE};

  ${tabletMediaQuery} {
    width: 80%;
  }
`;

const HeaderLabel = styled.p`
  color: ${Color.WHITE};
  text-align: center;
  font-family: 'LINE Seed Sans KR';
  font-size: 20px;
  font-weight: 700;
  line-height: 140%;
  letter-spacing: -0.4px;
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
        <HeaderContainer className={'total-price-container'}>
          <HeaderLabel className={'total-price-label'}>{'총 매출액'}</HeaderLabel>
          <HeaderLabel className={'total-price-value'}>{totalOrderPrice} 원</HeaderLabel>
        </HeaderContainer>
        <OrderCardContainer className={'order-card-container'}>
          {orders.map((order) => (
            <ToggleOrderCard key={order.id} order={order} />
          ))}
        </OrderCardContainer>
      </Container>
    </AppContainer>
  );
}

export default AdminOrderHistory;
