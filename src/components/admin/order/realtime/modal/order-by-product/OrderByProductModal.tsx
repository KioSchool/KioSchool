import { Order } from '@@types/index';
import { colFlex, rowFlex } from '@styles/flexStyles';
import styled from '@emotion/styled';
import _ from 'lodash';
import { tabletMediaQuery } from '@styles/globalStyles';
import AppLabel from '@components/common/label/AppLabel';
import { Color } from '@resources/colors';
import { useAtomValue } from 'jotai';
import { adminProductsAtom } from 'src/jotai/admin/atoms';

const ModalContainer = styled.div`
  ${colFlex({ align: 'center' })};
  position: fixed;
  top: calc(50% - 275px);
  right: 150px;
  background-color: rgba(233, 233, 233, 0.8);
  border-radius: 10px;
  width: 240px;
  height: 550px;
  z-index: 1999;
  padding: 25px;
  box-sizing: border-box;
  gap: 40px;

  ${tabletMediaQuery} {
    right: 120px;
  }
`;

const HeaderContainer = styled.div`
  ${colFlex({ justify: 'center', align: 'center' })};
  width: 100%;
  gap: 3px;
`;

const ProductContainer = styled.div`
  ${colFlex()};
  width: 100%;
  height: 450px;
  overflow-y: auto;
  background: ${Color.LIGHT_GREY};
  border-radius: 10px;
  box-sizing: border-box;
  padding: 10px;
  gap: 12px;
`;

const ProductItem = styled.div`
  ${rowFlex({ align: 'center' })};
  gap: 20px;
`;

const ProductImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const ProductInfoContainer = styled.div`
  ${colFlex({ justify: 'center', align: 'flex-start' })};
  min-width: 0;
  & > * {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 100%;
  }
`;

interface OrderByProductModalProps {
  orders: Order[];
  isModalOpen: boolean;
}

function OrderByProductModal({ orders, isModalOpen }: OrderByProductModalProps) {
  const products = useAtomValue(adminProductsAtom);

  if (!isModalOpen) {
    return null;
  }

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
    <ModalContainer>
      <HeaderContainer>
        <AppLabel size={20} style={{ fontWeight: 700 }}>
          실시간 상품별 주문량
        </AppLabel>
        <AppLabel size={14}>*결제 완료 주문만 표시됩니다.</AppLabel>
      </HeaderContainer>
      <ProductContainer>
        {sortedProducts.map(({ productId, count }) => {
          const product = productMap[productId];

          if (!product || count <= 0) return null;

          return (
            <ProductItem key={productId}>
              <ProductImage src={product.imageUrl} alt={product.name} />
              <ProductInfoContainer>
                <AppLabel size={14} style={{ fontWeight: 700 }}>
                  {product.name}
                </AppLabel>
                <AppLabel size={14}>{count}개</AppLabel>
              </ProductInfoContainer>
            </ProductItem>
          );
        })}
      </ProductContainer>
    </ModalContainer>
  );
}

export default OrderByProductModal;
