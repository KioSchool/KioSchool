import { Order } from '@@types/index';
import { colFlex, rowFlex } from '@styles/flexStyles';
import styled from '@emotion/styled';
import _ from 'lodash';
import { tabletMediaQuery } from '@styles/globalStyles';
import AppLabel from '@components/common/label/AppLabel';
import { Color } from '@resources/colors';
import { useAtomValue } from 'jotai';
import { adminProductsAtom } from 'src/jotai/admin/atoms';
import { RiCloseLine } from '@remixicon/react';

const SidebarContainer = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  width: 331px;
  height: 100vh;
  background-color: ${Color.WHITE};
  border-left: 1px solid #e8eef2;
  box-shadow: -4px 0 12px rgba(0, 0, 0, 0.05);
  z-index: 1999;
  padding: 46px 41px;
  box-sizing: border-box;
  gap: 15px;
  font-family: 'LINE Seed Sans KR', sans-serif;

  transform: translateX(${({ isOpen }) => (isOpen ? '0' : '100%')});
  transition: transform 0.3s ease-in-out;

  ${colFlex({ align: 'stretch' })};

  ${tabletMediaQuery} {
    width: 331px;
  }
`;

const SidebarHeader = styled.div`
  width: 100%;
  ${colFlex({ justify: 'center', align: 'center' })};
`;

const TitleContainer = styled.div`
  width: 100%;
  gap: 8px;
  ${colFlex({ justify: 'start', align: 'start' })};
`;

const CloseButton = styled.button`
  width: 100%;
  background: none;
  border: none;
  padding: 0;
  color: #464a4d;
  cursor: pointer;
  ${rowFlex({ justify: 'end', align: 'end' })}
`;

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
    <SidebarContainer isOpen={isModalOpen}>
      <SidebarHeader>
        <CloseButton onClick={closeModal}>
          <RiCloseLine size={24} />
        </CloseButton>

        <TitleContainer>
          <AppLabel size={18} style={{ fontWeight: 700 }}>
            실시간 상품별 주문량
          </AppLabel>
          <AppLabel size={16}>*결제 완료 주문만 표시됩니다.</AppLabel>
        </TitleContainer>
      </SidebarHeader>
      <ProductContainer>
        {sortedProducts.map(({ productId, count }) => {
          const product = productMap[productId];

          if (!product || count <= 0) return null;

          return (
            <ProductItem key={productId}>
              <ProductImage src={product.imageUrl} alt={product.name} />
              <ProductInfoContainer>
                <AppLabel size={16}>{product.name}</AppLabel>
                <AppLabel size={14}>{count}개</AppLabel>
              </ProductInfoContainer>
            </ProductItem>
          );
        })}
      </ProductContainer>
    </SidebarContainer>
  );
}

export default OrderByProductModal;
