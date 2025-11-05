import { Order, OrderProduct, OrderStatus, Product } from '@@types/index';
import styled from '@emotion/styled';
import { colFlex, rowFlex } from '@styles/flexStyles';
import useAdminOrder from '@hooks/admin/useAdminOrder';
import { useParams } from 'react-router-dom';
import { useAtomValue } from 'jotai';
import { adminProductsAtom } from 'src/jotai/admin/atoms';
import _ from 'lodash';
import OrderModalProductList from './OrderModalProductsList';

const ModalContent = styled.div`
  color: #464a4d;
  gap: 10px;
  ${colFlex({ justify: 'start', align: 'start' })}
`;

const TitleContainer = styled.div`
  width: 100%;
  padding: 0 30px;
  box-sizing: border-box;
  ${rowFlex({ justify: 'space-between', align: 'end' })}
`;

const StatusLabelContainer = styled.div<{ isServed: boolean }>`
  width: 84px;
  height: 24px;
  border-radius: 8px;
  box-sizing: border-box;
  font-size: 12px;
  background-color: ${(props) => (props.isServed ? '#ff9142' : 'white')};
  border: ${(props) => (props.isServed ? '' : '1px solid #e8eef2')};
  color: ${(props) => (props.isServed ? '#ffffff' : '#464a4d')};
  ${rowFlex({ justify: 'center', align: 'center' })}
`;

const TotalLabelContainer = styled.div`
  padding: 2px 30px 0 30px;
  width: 100%;
  box-sizing: border-box;
  ${rowFlex({ justify: 'space-between', align: 'center' })}
`;

const MainLabel = styled.div`
  font-size: 16px;
  font-weight: 700;
`;

interface OrderModalMainContentsProps {
  order: Order;
}

function OrderModalMainContents({ order }: OrderModalMainContentsProps) {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const { updateOrderProductCount } = useAdminOrder(workspaceId);

  const products = useAtomValue(adminProductsAtom);
  const productMap: Record<number, Product> = _.keyBy(products, 'id');

  const isPaidStatus = order.status === OrderStatus.PAID;
  const isAllServed = order.orderProducts.every((orderProduct) => orderProduct.isServed);

  const handleIncrease = (orderProduct: OrderProduct) => {
    if (!orderProduct.isServed) updateOrderProductCount(orderProduct.id, orderProduct.servedCount + 1);
  };

  const handleDecrease = (orderProduct: OrderProduct) => {
    if (orderProduct.servedCount > 0) updateOrderProductCount(orderProduct.id, orderProduct.servedCount - 1);
  };

  return (
    <ModalContent>
      <TitleContainer>
        <MainLabel>{`주문 상품 ${order.orderProducts.length}개`}</MainLabel>
        {isPaidStatus && <StatusLabelContainer isServed={isAllServed}>{isAllServed ? '서빙 완료' : '서빙 미완료'}</StatusLabelContainer>}
      </TitleContainer>

      <OrderModalProductList
        orderProducts={order.orderProducts}
        productMap={productMap}
        isPaidStatus={isPaidStatus}
        onIncrease={handleIncrease}
        onDecrease={handleDecrease}
      />

      <TotalLabelContainer>
        <MainLabel>{'총 결제 금액'}</MainLabel>
        <MainLabel>{`${order.totalPrice.toLocaleString()}원`}</MainLabel>
      </TotalLabelContainer>
    </ModalContent>
  );
}

export default OrderModalMainContents;
