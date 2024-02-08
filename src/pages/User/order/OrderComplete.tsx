import React, { useEffect } from 'react';
import useOrder from '@hooks/useOrder';
import { useRecoilValue } from 'recoil';
import { userOrderAtom } from '@recoils/atoms';
import { useSearchParams } from 'react-router-dom';

function OrderComplete() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');

  const { fetchOrder } = useOrder();
  const order = useRecoilValue(userOrderAtom);

  useEffect(() => {
    fetchOrder(orderId);
  }, []);

  return (
    <div>
      <div>{order.id}</div>
      <div>{order.status}</div>
      <div>{order.totalPrice.toLocaleString()}원</div>
    </div>
  );
}

export default OrderComplete;
