import { Order } from '@@types/index';

interface OrderCardProps {
  orderInfo: Order;
}

function OrderCard({ orderInfo }: OrderCardProps) {
  return <div>{orderInfo.tableNumber}</div>;
}

export default OrderCard;
