import { Order } from '@@types/index';
import { colFlex, rowFlex } from '@styles/flexStyles';
import styled from '@emotion/styled';
import _ from 'lodash';
import AppLabel from '@components/common/label/AppLabel';
import { useAtomValue } from 'jotai';
import { adminProductsAtom } from 'src/jotai/admin/atoms';
import defaultProductImage from '@resources/image/defaultWorkspaceImage.png';
import RightSidebarModal from '@components/common/modal/RightSidebarModal';

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

interface OrderByProductModalProps {
  orders: Order[];
  isModalOpen: boolean;
  closeModal: () => void;
}

function OrderByProductModal({ orders, isModalOpen, closeModal }: OrderByProductModalProps) {
  const products = useAtomValue(adminProductsAtom);
  const productMap = _.keyBy(products, 'id');
  const productCounts: Record<number, number> = {};

  orders.forEach((order) => {
    order.orderProducts.forEach((orderProduct) => {
      const quantity = orderProduct.quantity - orderProduct.servedCount;
      if (quantity > 0) {
        const productId = orderProduct.productId;
        productCounts[productId] = (productCounts[productId] || 0) + quantity;
      }
    });
  });

  const sortedProducts = Object.entries(productCounts)
    .map(([productId, count]) => ({ productId, count }))
    .sort((a, b) => b.count - a.count);

  return (
    <RightSidebarModal isOpen={isModalOpen} onClose={closeModal} title="실시간 상품별 주문량" subtitle="*결제 완료 주문만 표시됩니다.">
      <ProductContainer>
        {sortedProducts.map(({ productId, count }) => {
          const product = productMap[productId];
          const productImageUrl = product?.imageUrl || defaultProductImage;
          const productName = product.name;

          if (count <= 0) return null;

          return (
            <ProductItem key={productId}>
              <ProductImage src={productImageUrl} alt={productName} />
              <ProductInfoContainer>
                <AppLabel size={16}>{productName}</AppLabel>
                <AppLabel size={14}>{count}개</AppLabel>
              </ProductInfoContainer>
            </ProductItem>
          );
        })}
      </ProductContainer>
    </RightSidebarModal>
  );
}

export default OrderByProductModal;
