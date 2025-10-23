import { Order, OrderProduct, OrderStatus, Product } from '@@types/index';
import AppLabel from '@components/common/label/AppLabel';
import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { RiAddLine, RiSubtractLine } from '@remixicon/react';
import { colFlex, rowFlex } from '@styles/flexStyles';
import useAdminOrder from '@hooks/admin/useAdminOrder';
import { useParams } from 'react-router-dom';
import { css } from '@emotion/react';
import { useAtomValue } from 'jotai';
import { adminProductsAtom } from 'src/jotai/admin/atoms';
import _ from 'lodash';

const ModalContent = styled.div`
  font-family: 'LINE Seed Sans KR', sans-serif;
  color: #464a4d;
  gap: 10px;
  ${colFlex({ justify: 'start', align: 'start' })}
`;

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

const TitleContainer = styled.div`
  width: 100%;
  gap: 10px;
  padding: 0 30px;
  box-sizing: border-box;
  ${rowFlex({ justify: 'start', align: 'end' })}
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

const TotalLabelContainer = styled.div`
  padding: 10px 30px 0 30px;
  width: 100%;
  box-sizing: border-box;
  ${rowFlex({ justify: 'space-between', align: 'center' })}
`;

const ProductRightContainer = styled.div`
  gap: 10px;
  ${rowFlex()};
`;

const ButtonContainer = styled.div`
  width: 84px;
  padding-right: 4px;
  ${rowFlex({ justify: 'space-between', align: 'center' })}
`;

const iconStyle = (disabled: boolean) => css`
  width: 18px;
  cursor: ${disabled ? 'not-allowed' : 'pointer'};
  opacity: ${disabled ? 0.4 : 1};
  color: ${disabled ? `${Color.GREY} !important` : 'inherit'};
`;

const PlusIcon = styled(RiAddLine)<{ disabled: boolean }>`
  ${(props) => iconStyle(props.disabled)}
`;

const MinusIcon = styled(RiSubtractLine)<{ disabled: boolean }>`
  ${(props) => iconStyle(props.disabled)}
`;

const ProductImage = styled.img`
  width: 68px;
  height: 68px;
  border-radius: 8px;
  border: 1px solid #e8eef2;
  object-fit: cover;
  background-color: ${Color.LIGHT_GREY};
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
    const isIncreaseDisabled = orderProduct.isServed || orderProduct.servedCount >= orderProduct.quantity;

    if (!isIncreaseDisabled) {
      updateOrderProductCount(orderProduct.id, orderProduct.servedCount + 1);
    }
  };

  const handleDecrease = (orderProduct: OrderProduct) => {
    const isDecreaseDisabled = orderProduct.servedCount === 0;

    if (!isDecreaseDisabled) {
      updateOrderProductCount(orderProduct.id, orderProduct.servedCount - 1);
    }
  };

  return (
    <ModalContent>
      <TitleContainer>
        <AppLabel size={16} style={{ fontWeight: 700 }}>
          {`주문 상품 ${order.orderProducts.length}개`}
        </AppLabel>
        {isPaidStatus && <AppLabel size={12}>{isAllServed ? '모든 서빙 완료' : '결제 완료'}</AppLabel>}
      </TitleContainer>
      <OrderProductContainer>
        {order.orderProducts.map((orderProduct, index) => {
          const isDecreaseDisabled = orderProduct.servedCount === 0;
          const isIncreaseDisabled = orderProduct.isServed || orderProduct.servedCount >= orderProduct.quantity;

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
                  <ButtonContainer>
                    <MinusIcon
                      disabled={isDecreaseDisabled}
                      onClick={() => {
                        handleDecrease(orderProduct);
                      }}
                    />
                    <AppLabel size={12}>{`${orderProduct.servedCount} / ${orderProduct.quantity}`}</AppLabel>
                    <PlusIcon
                      disabled={isIncreaseDisabled}
                      onClick={() => {
                        handleIncrease(orderProduct);
                      }}
                    />
                  </ButtonContainer>
                )}
              </ProductRightContainer>
            </ProductContainer>
          );
        })}
      </OrderProductContainer>
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
