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
    if (workspaceId) {
      const getTableOrders = () => {
        fetchTableOrders(orderSessionId)
          .then((response) => {
            setTableOrders(response.data);
          })
          .catch((error) => {
            console.error('Error fetching table orders:', error);
          });
      };
      getTableOrders();
      const intervalId = setInterval(getTableOrders, defaultInterval);

      return () => clearInterval(intervalId);
    }
  }, [workspaceId]);

  return <div>{tableOrders.map((order: Order) => order.orderNumber)}</div>;
}

export default TableOrderList;
