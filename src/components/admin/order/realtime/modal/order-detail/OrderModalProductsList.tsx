import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { OrderProduct, Product } from '@@types/index';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import AppLabel from '@components/common/label/AppLabel';
import OrderModalProductButtons from './OrderModalProductButtons';

const OrderProductContainer = styled.div`
  width: 100%;
  height: 300px;
  padding: 10px 30px;
  gap: 15px;
  overflow-y: auto;
  border-bottom: 1px solid #e8eef2;
  box-sizing: border-box;
  ${colFlex({ justify: 'start' })}
`;

const ServedStyle = css`
  & * {
    color: ${Color.KIO_ORANGE};
  }
`;

const ProductContainer = styled.div<{ isServed: boolean }>`
  width: 100%;
  ${(props) => props.isServed && ServedStyle}
  ${rowFlex({ justify: 'space-between', align: 'center' })}
`;

const ProductLeftContainer = styled.div`
  gap: 12px;
  ${rowFlex({ align: 'center' })}
`;

const ProducDescription = styled.div`
  height: 100%;
  gap: 4px;
  ${colFlex({ align: 'start' })}
`;

const ProductRightContainer = styled.div`
  gap: 10px;
  ${rowFlex()};
`;

const ProductImage = styled.img`
  width: 68px;
  height: 68px;
  border-radius: 8px;
  border: 1px solid #e8eef2;
  object-fit: cover;
  background-color: ${Color.LIGHT_GREY};
  user-select: none;
`;

interface OrderModalProductListProps {
  orderProducts: OrderProduct[];
  productMap: Record<number, Product>;
  isPaidStatus: boolean;
  onIncrease: (orderProduct: OrderProduct) => void;
  onDecrease: (orderProduct: OrderProduct) => void;
}

function OrderModalProductList({ orderProducts, productMap, isPaidStatus, onIncrease, onDecrease }: OrderModalProductListProps) {
  return (
    <OrderProductContainer>
      {orderProducts.map((orderProduct, index) => {
        const product = productMap[orderProduct.productId];

        return (
          <ProductContainer key={`${orderProduct.id}-${index}`} isServed={orderProduct.isServed}>
            <ProductLeftContainer>
              <ProductImage src={product?.imageUrl} alt={orderProduct.productName} />
              <ProducDescription>
                <AppLabel size={14}>{orderProduct.productName}</AppLabel>
                <AppLabel size={12}>{`${orderProduct.quantity}개`}</AppLabel>
                <AppLabel size={12} style={{ fontWeight: 700 }}>
                  {`${orderProduct.totalPrice.toLocaleString()}원`}
                </AppLabel>
              </ProducDescription>
            </ProductLeftContainer>
            <ProductRightContainer>
              {isPaidStatus && (
                <OrderModalProductButtons
                  servedCount={orderProduct.servedCount}
                  quantity={orderProduct.quantity}
                  isServed={orderProduct.isServed}
                  onIncrease={() => onIncrease(orderProduct)}
                  onDecrease={() => onDecrease(orderProduct)}
                />
              )}
            </ProductRightContainer>
          </ProductContainer>
        );
      })}
    </OrderProductContainer>
  );
}

export default OrderModalProductList;
