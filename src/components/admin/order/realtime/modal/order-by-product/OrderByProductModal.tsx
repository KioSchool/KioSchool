import { Order } from '@@types/index';
import { colFlex, rowFlex } from '@styles/flexStyles';
import styled from '@emotion/styled';
import _ from 'lodash';
import { useRecoilValue } from 'recoil';
import { productsAtom } from '@recoils/atoms';
import { tabletMediaQuery } from '@styles/globalStyles';
import AppLabel from '@components/common/label/AppLabel';
import { Color } from '@resources/colors';

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
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  word-break: break-all;
`;

interface OrderByProductModalProps {
  orders: Order[];
  isModalOpen: boolean;
}

function OrderByProductModal({ orders, isModalOpen }: OrderByProductModalProps) {
  const products = useRecoilValue(productsAtom);

  if (!isModalOpen) {
    return null;
  }

  const productCountMap = new Map(
    [
      ...orders
        .reduce((acc, order) => {
          order.orderProducts.forEach((orderProduct) => {
            const productId = orderProduct.productId;
            const quantity = orderProduct.quantity - orderProduct.servedCount;

            acc.set(productId, (acc.get(productId) || 0) + quantity);
          });
          return acc;
        }, new Map<number, number>())
        .entries(),
    ].sort((a, b) => b[1] - a[1]),
  );

  const productMap = _.keyBy(products, (product) => product.id);

  return (
    <ModalContainer>
      <HeaderContainer>
        <AppLabel size={20} style={{ fontWeight: 700 }}>
          실시간 상품별 주문량
        </AppLabel>
        <AppLabel size={14}>*결제 완료 주문만 표시됩니다.</AppLabel>
      </HeaderContainer>
      <ProductContainer>
        {[...productCountMap.keys()].map((productId) => {
          const product = productMap[productId];
          const count = productCountMap.get(Number(productId)) || 0;

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
