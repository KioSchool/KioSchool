import { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from '@emotion/styled';
import _ from 'lodash';
import { useAtomValue } from 'jotai';
import { OrderStatus } from '@@types/index';
import { adminOrdersAtom, adminProductsAtom } from '@jotai/admin/atoms';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import defaultProductImage from '@resources/image/defaultWorkspaceImage.png';
import OrderDetailModal from '@components/admin/order/realtime/modal/order-detail/OrderDetailModal';
import useNow from '@hooks/useNow';
import { GA_EVENT } from '@constants/analytics';
import { trackEvent } from '@utils/analytics';
import { buildProductQueues } from '@utils/productQueue';
import ProductTableWaitRow from './ProductTableWaitRow';

const VISIBLE_TABLE_COUNT = 3;

const ProductContainer = styled.div`
  width: 100%;
  flex-grow: 1;
  min-height: 0;
  overflow-y: auto;
  border-radius: 10px;
  box-sizing: border-box;
  gap: 8px;
  ${colFlex()};
`;

const ProductBlock = styled.div`
  padding-bottom: 8px;
  border-bottom: 1px solid ${Color.BORDER_GREY};
  ${colFlex({ align: 'stretch' })};

  &:last-of-type {
    border-bottom: none;
  }
`;

const ProductItem = styled.div`
  gap: 12px;
  ${rowFlex({ align: 'center' })};
`;

const ProductImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 8px;
  border: 1px solid #e8eef2;
`;

const ProductInfoContainer = styled.div`
  height: 50px;
  gap: 4px;
  min-width: 0;
  & > * {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 100%;
  }
  ${colFlex({ justify: 'center', align: 'flex-start' })};
`;

const ProductName = styled.div`
  font-size: 16px;
`;

const ProductCount = styled.div`
  font-size: 14px;
`;

const WaitList = styled.div`
  margin-top: 6px;
  ${colFlex({ align: 'stretch' })};
`;

const RestLabel = styled.div`
  padding: 2px 8px 0;
  font-size: 12px;
  color: ${Color.MUTED_GREY};
`;

// 외부 제어 사이드바는 열 때 넘긴 content를 그대로 들고 있어서, 주문은 prop이 아니라 아톰에서 읽어야 열린 동안에도 갱신된다
function OrderByProductList() {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const orders = useAtomValue(adminOrdersAtom);
  const products = useAtomValue(adminProductsAtom);
  const now = useNow();
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);

  const paidOrders = orders.filter((order) => order.status === OrderStatus.PAID);
  const productMap = _.keyBy(products, 'id');
  const queues = buildProductQueues(paidOrders, now);
  const selectedOrder = orders.find((order) => order.id === selectedOrderId);

  const handleOpenOrder = (orderId: number, rowIndex: number) => {
    setSelectedOrderId(orderId);
    trackEvent(GA_EVENT.PRODUCT_SUMMARY_ROW_OPEN, { workspace_id: workspaceId, location: `row_${rowIndex + 1}` });
  };

  const handleCloseModal = () => {
    setSelectedOrderId(null);
  };

  return (
    <ProductContainer>
      {queues.map((queue) => {
        const product = productMap[queue.productId];
        const restCount = queue.tables.length - VISIBLE_TABLE_COUNT;

        return (
          <ProductBlock key={queue.productId}>
            <ProductItem>
              <ProductImage src={product?.imageUrl || defaultProductImage} alt={product?.name || queue.productName} />
              <ProductInfoContainer>
                <ProductName>{product?.name || queue.productName}</ProductName>
                <ProductCount>{`${queue.remaining}개`}</ProductCount>
              </ProductInfoContainer>
            </ProductItem>
            <WaitList>
              {queue.tables.slice(0, VISIBLE_TABLE_COUNT).map((wait, rowIndex) => (
                <ProductTableWaitRow key={wait.tableNumber} wait={wait} onClick={(orderId) => handleOpenOrder(orderId, rowIndex)} />
              ))}
              {restCount > 0 && <RestLabel>{`외 ${restCount}곳`}</RestLabel>}
            </WaitList>
          </ProductBlock>
        );
      })}
      {selectedOrder && <OrderDetailModal order={selectedOrder} isModalOpen={true} closeModal={handleCloseModal} />}
    </ProductContainer>
  );
}

export default OrderByProductList;
