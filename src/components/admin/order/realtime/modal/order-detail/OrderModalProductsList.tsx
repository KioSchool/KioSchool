import styled from '@emotion/styled';
import { OrderProduct, Product } from '@@types/index';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import OrderModalProductButtons from './OrderModalProductButtons';
import defaultProductImage from '@resources/image/defaultWorkspaceImage.png';
import { RiCheckboxCircleFill } from '@remixicon/react';

const OrderProductContainer = styled.div`
  width: 100%;
  height: 300px;
  padding: 2px 30px 10px 30px;
  gap: 8px;
  overflow-y: auto;
  border-bottom: 1px solid #e8eef2;
  box-sizing: border-box;
  ${colFlex({ justify: 'start' })}
`;

const ProductContainer = styled.div`
  width: 100%;
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

const CheckIcon = styled(RiCheckboxCircleFill)`
  width: 15px;
  height: 15px;
  color: ${Color.KIO_ORANGE};
  ${rowFlex({ align: 'center' })}
`;

const ProductNameContainer = styled.div`
  gap: 4px;
  ${rowFlex({ justify: 'center', align: 'center' })}
`;

const ProductNameLabel = styled.div<{ isServed: boolean }>`
  font-family: 'LINE Seed Sans KR', sans-serif;
  font-size: 15px;
  font-weight: 700;
  color: ${(props) => props.isServed && Color.KIO_ORANGE};
  ${rowFlex({ justify: 'center' })}
`;

const ProductQuantityLabel = styled.div`
  font-family: 'LINE Seed Sans KR', sans-serif;
  font-size: 12px;
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
      {orderProducts.map((orderProduct) => {
        const product = productMap[orderProduct.productId];
        const productImageUrl = product?.imageUrl ? product.imageUrl : defaultProductImage;

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
