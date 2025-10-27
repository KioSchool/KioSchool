import { Order, OrderProduct, OrderStatus, Product } from '@@types/index';
import AppLabel from '@components/common/label/AppLabel';
import styled from '@emotion/styled';
import { colFlex, rowFlex } from '@styles/flexStyles';
import useAdminOrder from '@hooks/admin/useAdminOrder';
import { useParams } from 'react-router-dom';
import { useAtomValue } from 'jotai';
import { adminProductsAtom } from 'src/jotai/admin/atoms';
import _ from 'lodash';
import OrderModalProductList from './OrderModalProductsList';

const ModalContent = styled.div`
  font-family: 'LINE Seed Sans KR', sans-serif;
  color: #464a4d;
  gap: 10px;
  ${colFlex({ justify: 'start', align: 'start' })}
`;

const TitleContainer = styled.div`
  width: 100%;
  gap: 10px;
  padding: 0 30px;
  box-sizing: border-box;
  ${rowFlex({ justify: 'start', align: 'end' })}
`;

const TotalLabelContainer = styled.div`
  padding: 2px 30px 0 30px;
  width: 100%;
  box-sizing: border-box;
  ${rowFlex({ justify: 'space-between', align: 'center' })}
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
        <AppLabel size={16} style={{ fontWeight: 700 }}>
          {`주문 상품 ${order.orderProducts.length}개`}
        </AppLabel>
        {isPaidStatus && <AppLabel size={12}>{isAllServed ? '모든 서빙 완료' : '결제 완료'}</AppLabel>}
      </TitleContainer>

      <OrderModalProductList
        orderProducts={order.orderProducts}
        productMap={productMap}
        isPaidStatus={isPaidStatus}
        onIncrease={handleIncrease}
        onDecrease={handleDecrease}
      />

      <TotalLabelContainer>
        <AppLabel size={16} style={{ fontWeight: 700 }}>
          {'총 결제 금액'}
        </AppLabel>
        <AppLabel size={16} style={{ fontWeight: 700 }}>
          {`${order.totalPrice.toLocaleString()}원`}
        </AppLabel>
      </TotalLabelContainer>
    </ModalContent>
  );
}

export default OrderModalMainContents;
