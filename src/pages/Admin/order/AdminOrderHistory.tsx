import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import useAdminOrder from '@hooks/useAdminOrder';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { ordersAtom } from '@recoils/atoms';

const Container = styled.div`
  padding: 50px;
  gap: 24px;
  width: 100%;
`;

function AdminOrderHistory() {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const { fetchOrders } = useAdminOrder(workspaceId);
  const orders = useRecoilValue(ordersAtom);

  useEffect(() => {
    fetchOrders({ startDate: startDate.toISOString().split('T')[0], endDate: endDate.toISOString().split('T')[0] });
  }, [startDate, endDate]);

  return (
    <Container>
      <ReactDatePicker selected={startDate} shouldCloseOnSelect dateFormat={'yyyy.MM.dd'} onChange={(date: Date) => setStartDate(date)} />
      <ReactDatePicker selected={endDate} shouldCloseOnSelect dateFormat={'yyyy.MM.dd'} onChange={(date: Date) => setEndDate(date)} />
      <div>
        {orders.map((it) => (
          <div key={it.id}>
            {it.id} - {it.totalPrice.toLocaleString()}원 - {it.status} - {it.createdAt}
          </div>
        ))}
      </div>
    </Container>
  );
}

export default AdminOrderHistory;
