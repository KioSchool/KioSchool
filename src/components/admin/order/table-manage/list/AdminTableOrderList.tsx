import { Order, OrderProduct } from '@@types/index';
import useAdminOrder from '@hooks/admin/useAdminOrder';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { RiSearchLine, RiResetRightFill } from '@remixicon/react';
import { Color } from '@resources/colors';
import useModal from '@hooks/useModal';
import { formatKoreanTime } from '@utils/FormatDate';
import { colFlex, rowFlex } from '@styles/flexStyles';
import TableOrderDetailModal from '../modal/TableOrderDetailModal';

const defaultInterval = 5000;

const Container = styled.div`
  border: 1px solid #ececec;
  border-radius: 10px;
  overflow: hidden;
  ${colFlex({ justify: 'start', align: 'center' })}
  height: 100%;
`;

const Header = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 40px;
  padding: 5px 10px;
  color: ${Color.GREY};
  background-color: ${Color.LIGHT_GREY};
  font-size: 15px;
  font-weight: 600;
  border-bottom: 1px solid #ececec;
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 10px;
`;

const RefreshSection = styled.div`
  ${rowFlex({ align: 'center' })};
  gap: 10px;
  cursor: pointer;
  &:hover {
    color: ${Color.KIO_ORANGE};
  }
`;

const NowTimeLabel = styled.div``;

const RefreshIcon = styled(RiResetRightFill)`
  width: 20px;
  height: 20px;
`;

const HeaderTitle = styled.div`
  text-align: center;
`;

const OrderListContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  ${colFlex()};
`;

const OrderHeader = styled.div`
  display: grid;
  grid-template-columns: 0.5fr 1.2fr 1.8fr 1fr 1fr 1fr 0.5fr;
  padding: 10px;
  background-color: ${Color.LIGHT_GREY};
  border-bottom: 1px solid #ececec;
  text-align: center;
  font-size: 15px;
  font-weight: 600;
`;

const OrderRow = styled.div`
  display: grid;
  grid-template-columns: 0.5fr 1.2fr 1.8fr 1fr 1fr 1fr 0.5fr;
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

const HeaderCell = styled.div`
  color: ${Color.GREY};
`;

const OrderCell = styled.div`
  color: ${Color.GREY};
`;

const ActionCell = styled.div`
  ${rowFlex({ justify: 'center', align: 'center' })};
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

const ORDER_STATUS_MAP = {
  NOT_PAID: '주문 완료',
  PAID: '결제 완료',
  SERVED: '서빙 완료',
};

interface TableOrderListProps {
  workspaceId: number | undefined | null;
  orderSessionId: number;
}

function AdminTableOrderList({ workspaceId, orderSessionId }: TableOrderListProps) {
  const { isModalOpen, openModal, closeModal } = useModal();
  const { fetchOrderSession } = useAdminOrder(String(workspaceId));
  const [tableOrders, setTableOrders] = useState<Order[]>([]);

  const formattedNowTime = formatKoreanTime(new Date().toISOString()) || '시간 없음';

  const getTableOrders = () => {
    if (orderSessionId) {
      fetchOrderSession(orderSessionId)
        .then((response) => {
          setTableOrders(response.data);
        })
        .catch((error) => {
          console.error('Error fetching table orders:', error);
        });
    } else {
      setTableOrders([]);
    }
  };

  useEffect(() => {
    getTableOrders();

    const intervalId = setInterval(getTableOrders, defaultInterval);
    return () => clearInterval(intervalId);
  }, [workspaceId, orderSessionId]);

  return (
    <Container>
      <Header>
        <RefreshSection onClick={getTableOrders}>
          <NowTimeLabel>{formattedNowTime}</NowTimeLabel>
          <RefreshIcon />
        </RefreshSection>
        <HeaderTitle>주문 내역</HeaderTitle>
        <div />
      </Header>
      <OrderListContainer>
        <OrderHeader>
          <HeaderCell>번호</HeaderCell>
          <HeaderCell>시간</HeaderCell>
          <HeaderCell>상품명</HeaderCell>
          <HeaderCell>입금자명</HeaderCell>
          <HeaderCell>금액</HeaderCell>
          <HeaderCell>주문상태</HeaderCell>
          <HeaderCell>보기</HeaderCell>
        </OrderHeader>
        <OrderItem>
          {tableOrders.length > 0 ? (
            tableOrders.map((order: Order) => {
              const formattedStartTime = formatKoreanTime(order.createdAt) || '시간 없음';

              return (
                <OrderRow key={order.id}>
                  <OrderCell>{order.id}</OrderCell>
                  <OrderCell>{formattedStartTime}</OrderCell>
                  <OrderCell>{formatProductNames(order.orderProducts)}</OrderCell>
                  <OrderCell>{order.customerName}</OrderCell>
                  <OrderCell>{`${order.totalPrice.toLocaleString()}원`}</OrderCell>
                  <OrderCell>{ORDER_STATUS_MAP[order.status as keyof typeof ORDER_STATUS_MAP] || order.status}</OrderCell>
                  <ActionCell>
                    <SearchIcon onClick={openModal} />
                  </ActionCell>
                  <TableOrderDetailModal order={order} isModalOpen={isModalOpen} closeModal={closeModal} />
                </OrderRow>
              );
            })
          ) : (
            <OrderFallback>주문 없음</OrderFallback>
          )}
        </OrderItem>
      </OrderListContainer>
    </Container>
  );
}

export default AdminTableOrderList;
