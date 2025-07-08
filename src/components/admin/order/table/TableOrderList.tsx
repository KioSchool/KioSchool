import { Order } from '@@types/index';
import useAdminOrder from '@hooks/admin/useAdminOrder';
import { useEffect, useState } from 'react';

const defaultInterval = 5000;

interface TableOrderListProps {
  workspaceId: number | undefined | null;
  orderSessionId: number;
}

function TableOrderList({ workspaceId, orderSessionId }: TableOrderListProps) {
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

  return <div>{tableOrders.length ? tableOrders.map((order: Order) => order.orderNumber) : '주문 없음'}</div>;
}

export default TableOrderList;
