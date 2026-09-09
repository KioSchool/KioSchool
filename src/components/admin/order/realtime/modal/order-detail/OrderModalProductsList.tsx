import styled from '@emotion/styled';
import { OrderProduct, Product } from '@@types/index';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import OrderModalProductButtons from './OrderModalProductButtons';
import defaultProductImage from '@resources/image/defaultWorkspaceImage.png';
import { RiCheckboxCircleFill } from '@remixicon/react';

const OrderProductContainer = styled.div`
  width: 100%;
  height: 385px;
  padding: 2px 30px 10px 30px;
  gap: 8px;
  overflow-y: auto;
  border-bottom: 1px solid #e8eef2;
  box-sizing: border-box;
  ${colFlex({ justify: 'start' })}
`;

const ProductContainer = styled.div`
  width: 100%;
  gap: 12px;
  flex-shrink: 0;
  flex-wrap: wrap;
  ${rowFlex({ justify: 'space-between', align: 'center' })}
`;

const ProductLeftContainer = styled.div`
  flex: 1 1 220px;
  min-width: 0;
  gap: 12px;
  ${rowFlex({ align: 'center' })}
`;

const ProducDescription = styled.div`
  flex: 1;
  min-width: 0;
  height: 100%;
  gap: 4px;
  ${colFlex({ align: 'start' })}
`;

const ProductRightContainer = styled.div`
  margin-left: auto;
  gap: 10px;
  flex-shrink: 0;
  ${rowFlex()};
`;

const ProductImage = styled.img`
  width: 68px;
  height: 68px;
  flex-shrink: 0;
  border-radius: 8px;
  border: 1px solid #e8eef2;
  object-fit: cover;
  background-color: ${Color.LIGHT_GREY};
  user-select: none;
`;

const CheckIcon = styled(RiCheckboxCircleFill)`
  width: 15px;
  height: 15px;
  flex-shrink: 0;
  color: ${Color.KIO_ORANGE};
  ${rowFlex({ align: 'center' })}
`;

const ProductNameContainer = styled.div`
  width: 100%;
  min-width: 0;
  gap: 4px;
  user-select: none;
  ${rowFlex({ align: 'center' })}
`;

const ProductNameLabel = styled.div<{ isServed: boolean }>`
  min-width: 0;
  font-size: 15px;
  font-weight: 700;
  color: ${(props) => props.isServed && Color.KIO_ORANGE};
  user-select: none;
  overflow-wrap: anywhere;
`;

const ProductQuantityLabel = styled.div`
  max-width: 100%;
  font-size: 12px;
  user-select: none;
  overflow-wrap: anywhere;
`;

interface OrderModalProductListProps {
  orderProducts: OrderProduct[];
  productMap: Record<number, Product | undefined>;
  isPaidStatus: boolean;
  onIncrease: (orderProduct: OrderProduct) => void;
  onDecrease: (orderProduct: OrderProduct) => void;
}

function OrderModalProductList({ orderProducts, productMap, isPaidStatus, onIncrease, onDecrease }: OrderModalProductListProps) {
  return (
    <OrderProductContainer>
      {orderProducts.map((orderProduct) => {
        const product = productMap[orderProduct.productId];
        const productImageUrl = product?.imageUrl || defaultProductImage;

        return (
          <ProductContainer key={`${orderProduct.id}`}>
            <ProductLeftContainer>
              <ProductImage src={productImageUrl} alt={orderProduct.productName} />
              <ProducDescription>
                <ProductNameContainer>
                  <ProductNameLabel isServed={orderProduct.isServed}>{orderProduct.productName}</ProductNameLabel>
                  {orderProduct.isServed && <CheckIcon />}
                </ProductNameContainer>
                <ProductQuantityLabel>{`${orderProduct.quantity}개 · ${orderProduct.totalPrice.toLocaleString()}원`}</ProductQuantityLabel>
              </ProducDescription>
            </ProductLeftContainer>
            {isPaidStatus && (
              <ProductRightContainer>
                <OrderModalProductButtons
                  servedCount={orderProduct.servedCount}
                  quantity={orderProduct.quantity}
                  isServed={orderProduct.isServed}
                  onIncrease={() => onIncrease(orderProduct)}
                  onDecrease={() => onDecrease(orderProduct)}
                />
              </ProductRightContainer>
            )}
          </ProductContainer>
        );
      })}
    </OrderProductContainer>
  );
}

export default OrderModalProductList;
