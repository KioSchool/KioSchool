import { Order, OrderProduct } from '@@types/index';
import useAdminOrder from '@hooks/admin/useAdminOrder';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { RiSearchLine } from '@remixicon/react';
import { Color } from '@resources/colors';
import useModal from '@hooks/useModal';
import OrderDetailModal from '../realtime/modal/order-detail/OrderDetailModal';
import { formatTime } from '@utils/FormatDate';

const defaultInterval = 5000;

const OrderListContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow-y: auto;
`;

const OrderHeader = styled.div`
  display: grid;
  grid-template-columns: 0.5fr 1.5fr 2fr 1fr 1fr 0.5fr;
  padding: 10px;
  font-weight: bold;
  background-color: ${Color.LIGHT_GREY};
  border-bottom: 1px solid black;
  text-align: center;
`;

const OrderRow = styled.div`
  display: grid;
  grid-template-columns: 0.5fr 1.5fr 2fr 1fr 1fr 0.5fr;
  padding: 10px;
  border-bottom: 1px solid ${Color.LIGHT_GREY};
  text-align: center;
  align-items: center;
`;

const OrderItem = styled.div`
  overflow-y: auto;
  flex-grow: 1;
`;

const OrderFallback = styled.div`
  text-align: center;
  padding: 20px;
  color: ${Color.GREY};
`;

const SearchIcon = styled(RiSearchLine)`
  color: ${Color.GREY};
  cursor: pointer;
`;

const formatProductNames = (orderProducts: OrderProduct[] | undefined) => {
  if (!orderProducts || orderProducts.length === 0) {
    return '상품 없음';
  }
  if (orderProducts.length === 1) {
    return orderProducts[0].productName;
  }
  return `${orderProducts[0].productName} 외 ${orderProducts.length - 1}개`;
};

interface TableOrderListProps {
  workspaceId: number | undefined | null;
  orderSessionId: number;
}

function TableOrderList({ workspaceId, orderSessionId }: TableOrderListProps) {
  const { isModalOpen, openModal, closeModal } = useModal();
  const { fetchTableOrders } = useAdminOrder(String(workspaceId));
  const [tableOrders, setTableOrders] = useState<Order[]>([]);

  useEffect(() => {
    const getTableOrders = () => {
      if (workspaceId && orderSessionId) {
        fetchTableOrders(orderSessionId)
          .then((response) => {
            setTableOrders(response.data);
          })
          .catch((error) => {
            console.error('Error fetching table orders:', error);
          });
      } else if (!orderSessionId) {
        setTableOrders([]);
      }
    };

    getTableOrders();

    const intervalId = setInterval(getTableOrders, defaultInterval);
    return () => clearInterval(intervalId);
  }, [workspaceId, orderSessionId]);

  const onClickOrder = () => {
    openModal();
  };

  return (
    <OrderListContainer>
      <OrderHeader>
        <div>번호</div>
        <div>주문시간</div>
        <div>상품명</div>
        <div>입금자명</div>
        <div>금액</div>
        <div />
      </OrderHeader>
      <OrderItem>
        {tableOrders.length > 0 ? (
          tableOrders.map((order: Order) => (
            <OrderRow key={order.id}>
              <div>{order.id}</div>
              <div>{formatTime(order.createdAt)}</div>
              <div>{formatProductNames(order.orderProducts)}</div>
              <div>{order.customerName}</div>
              <div>{`${order.totalPrice.toLocaleString()}원`}</div>
              <div>
                <SearchIcon onClick={onClickOrder} />
              </div>
              <OrderDetailModal order={order} isModalOpen={isModalOpen} closeModal={closeModal} />
            </OrderRow>
          ))
        ) : (
          <OrderFallback>주문 없음</OrderFallback>
        )}
      </OrderItem>
    </OrderListContainer>
  );
}

export default TableOrderList;
