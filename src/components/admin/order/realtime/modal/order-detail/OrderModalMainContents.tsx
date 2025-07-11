import { Order, OrderProduct, OrderStatus } from '@@types/index';
import AppLabel from '@components/common/label/AppLabel';
import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { RiAddCircleFill, RiCheckLine, RiIndeterminateCircleLine } from '@remixicon/react';
import { expandButtonStyle } from '@styles/buttonStyles';
import { colFlex, rowFlex } from '@styles/flexStyles';
import useAdminOrder from '@hooks/admin/useAdminOrder';
import { useParams } from 'react-router-dom';
import { css } from '@emotion/react';

const HorizontalLine = styled.hr`
  width: 100%;
  border: 1px solid #eeecec;
`;

const ModalContent = styled.div`
  ${colFlex({ justify: 'space-between', align: 'start' })}
  gap: 10px;
  padding: 10px 40px;
`;

const OrderProductContainer = styled.div`
  ${colFlex({ justify: 'start' })}
  width: 100%;
  height: 300px;
  padding: 2px 0;
  gap: 15px;
  overflow-y: auto;
`;

const TitleContainer = styled.div`
  ${rowFlex({ justify: 'space-between', align: 'center' })}
  width: 100%;
  gap: 10px;
`;

const ServedStyle = css`
  & * {
    color: ${Color.KIO_ORANGE};
  }
`;

const ProductContainer = styled.div<{ isServed: boolean }>`
  ${rowFlex({ justify: 'space-between', align: 'center' })}
  width: 100%;
  ${(props) => props.isServed && ServedStyle}
`;

const ProductLeftContainer = styled.div`
  ${rowFlex({ align: 'center' })}
  gap: 10px;
`;

const TotalLabelContainer = styled.div`
  ${rowFlex({ justify: 'space-between', align: 'center' })}
  width: 100%;
`;

const ProductRightContainer = styled.div`
  ${rowFlex()};
  gap: 10px;
`;

const ButtonContainer = styled.div`
  ${rowFlex({ justify: 'space-between' })}
  width: 120px;
  padding-right: 2px;
`;

const PlusIcon = styled(RiAddCircleFill)`
  ${expandButtonStyle};
`;

const MinusIcon = styled(RiIndeterminateCircleLine)`
  ${expandButtonStyle};
`;

interface OrderModalMainContentsProps {
  order: Order;
}

function OrderModalMainContents({ order }: OrderModalMainContentsProps) {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const { updateOrderProductCount } = useAdminOrder(workspaceId);

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
        <AppLabel color={Color.BLACK} size={20} style={{ fontWeight: 700 }}>
          주문 내역
        </AppLabel>
        {isPaidStatus && (
          <AppLabel color={isAllServed ? Color.KIO_ORANGE : Color.GREY} size={20} style={{ fontWeight: 700 }}>
            {isAllServed ? '모든 서빙 완료' : '서빙 미완료'}
          </AppLabel>
        )}
      </TitleContainer>
      <HorizontalLine />
      <OrderProductContainer>
        {order.orderProducts.map((orderProduct) => (
          <ProductContainer key={orderProduct.id} isServed={orderProduct.isServed}>
            <ProductLeftContainer>
              <AppLabel color={Color.BLACK} size={20}>
                {isPaidStatus ? `${orderProduct.productName}` : `${orderProduct.productName} - ${orderProduct.quantity}개`}
              </AppLabel>
              {orderProduct.isServed && <RiCheckLine />}
            </ProductLeftContainer>
            <ProductRightContainer>
              <AppLabel color={Color.BLACK} size={20}>
                {`${orderProduct.totalPrice.toLocaleString()}원`}
              </AppLabel>
              {isPaidStatus && (
                <ButtonContainer>
                  <MinusIcon
                    onClick={() => {
                      handleDecrease(orderProduct);
                    }}
                  />
                  <AppLabel color={Color.BLACK} size={20}>
                    {`${orderProduct.servedCount} / ${orderProduct.quantity}`}
                  </AppLabel>
                  <PlusIcon
                    onClick={() => {
                      handleIncrease(orderProduct);
                    }}
                  />
                </ButtonContainer>
              )}
            </ProductRightContainer>
          </ProductContainer>
        ))}
      </OrderProductContainer>
      <HorizontalLine />
      <TotalLabelContainer>
        <AppLabel color={Color.BLACK} size={20} style={{ fontWeight: 700 }}>
          {'상품 합계'}
        </AppLabel>
        <AppLabel color={Color.BLACK} size={20} style={{ fontWeight: 700 }}>
          {`${order.totalPrice.toLocaleString()}원`}
        </AppLabel>
      </TotalLabelContainer>
    </ModalContent>
  );
}

export default OrderModalMainContents;
