import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import useAdminOrder from '@hooks/admin/useAdminOrder';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { ordersAtom } from '@recoils/atoms';
import AppContainer from '@components/common/container/AppContainer';
import ToggleOrderCard from '@components/admin/order/ToggleOrderCard';
import AppLabel from '@components/common/label/AppLabel';
import AppCheckBox from '@components/common/input/AppCheckBox';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { OrderStatus } from '@@types/index';

const Container = styled.div`
  gap: 24px;
  width: 100%;
`;

const ConditionContainer = styled.div`
  ${rowFlex({ justify: 'space-between' })}
`;

const DatePickerContainer = styled.div`
  gap: 24px;
  margin-bottom: 24px;
  ${rowFlex({ justify: 'center' })}
`;

const OrderStatusConditionContainer = styled.div`
  gap: 24px;
  ${rowFlex({ justify: 'center' })}
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
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    fetchOrders({ startDate: dateConverter(startDate), endDate: dateConverter(endDate) });
  }, [startDate, endDate]);

  return (
    <AppContainer useFlex={colFlex({ justify: 'center' })} useNavBackground={true} titleNavBarProps={{ title: '전체 주문 조회' }}>
      <Container className={'admin-order-history-container'}>
        <ConditionContainer className={'condition-container'}>
          <DatePickerContainer className={'date-picker-container'}>
            <ReactDatePicker selected={startDate} shouldCloseOnSelect dateFormat={'yyyy.MM.dd'} onChange={(date: Date) => setStartDate(date)} />
            {'~'}
            <ReactDatePicker selected={endDate} shouldCloseOnSelect dateFormat={'yyyy.MM.dd'} onChange={(date: Date) => setEndDate(date)} />
          </DatePickerContainer>
          <OrderStatusConditionContainer className={'order-status-condition-container'}>
            <AppCheckBox
              checked={showServedOrder}
              onChange={() => {
                setShowServedOrder((prev) => {
                  return !prev;
                });
              }}
              label={'서빙 완료 주문만 보기'}
            />
          </OrderStatusConditionContainer>
        </ConditionContainer>
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
