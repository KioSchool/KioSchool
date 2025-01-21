import { Order, OrderStatus } from '@@types/index';
import AppLabel from '@components/common/label/AppLabel';
import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import MinusButtonSvg from '@resources/svg/MinusButtonSvg';
import PlusButtonSvg from '@resources/svg/PlusButtonSvg';
import { expandButtonStyle } from '@styles/buttonStyles';
import { colFlex, rowFlex } from '@styles/flexStyles';
import CheckSvg from '@resources/svg/CheckSvg';
import useAdminOrder from '@hooks/admin/useAdminOrder';
import { useParams } from 'react-router-dom';

const HorizontalLine = styled.hr`
  width: 100%;
  border: 0.3px solid #eeecec;
`;

const ModalContent = styled.div`
  ${colFlex({ justify: 'space-between', align: 'start' })}
  gap: 10px;
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
  ${rowFlex({ justify: 'start', align: 'center' })}
  width: 100%;
  gap: 10px;
`;

const ProductContainer = styled.div`
  ${rowFlex({ justify: 'space-between', align: 'center' })}
  width: 100%;

  &:hover {
    & * {
      color: ${Color.KIO_ORANGE};
    }
  }
`;

const ProductRightContainer = styled.div`
  ${rowFlex({ align: 'center' })}
  gap: 10px;
`;

const TotalLabelContainer = styled.div`
  ${rowFlex({ justify: 'space-between', align: 'center' })}
  width: 100%;
`;

const ProductLeftContainer = styled.div`
  ${rowFlex()};
  gap: 10px;
`;

const ButtonContainer = styled.div`
  ${rowFlex({ justify: 'space-between' })}
  width: 120px;
  padding-right: 2px;
`;

const PlusIcon = styled(PlusButtonSvg)`
  ${expandButtonStyle};
`;

const MinusIcon = styled(MinusButtonSvg)`
  ${expandButtonStyle};
`;

interface ModalMainContentsProps {
  orderInfo: Order;
}

function ModalMainContents({ orderInfo }: ModalMainContentsProps) {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const { updateOrderProductCount } = useAdminOrder(workspaceId);

  const isPaidStatus = orderInfo.status === OrderStatus.PAID;
  const isAllServed = orderInfo.orderProducts.every((product) => product.isServed === true);

  const handleIncrease = (productId: number, prevServedCount: number) => {
    updateOrderProductCount(productId, prevServedCount + 1);
  };

  const handleDecrease = (productId: number, prevServedCount: number) => {
    updateOrderProductCount(productId, prevServedCount - 1);
  };

  return (
    <ModalContent>
      <TitleContainer>
        <AppLabel color={Color.BLACK} size={20} style={{ fontWeight: 700 }}>
          주문 내역
        </AppLabel>
        {isPaidStatus && (
          <AppLabel color={Color.GREY} size={20}>
            {isAllServed ? '모든 서빙 완료' : '서빙 미완료'}
          </AppLabel>
        )}
      </TitleContainer>
      <HorizontalLine />
      <OrderProductContainer>
        {orderInfo.orderProducts.map((product) => (
          <ProductContainer key={product.id}>
            <ProductRightContainer>
              <AppLabel color={Color.BLACK} size={20}>
                {`${product.productName}`}
              </AppLabel>
              {product.isServed && <CheckSvg />}
            </ProductRightContainer>
            <ProductLeftContainer>
              <AppLabel color={Color.BLACK} size={20}>
                {`${product.productPrice.toLocaleString()}원`}
              </AppLabel>
              {isPaidStatus && (
                <ButtonContainer>
                  <MinusIcon
                    onClick={() => {
                      if (product.servedCount > 0) handleDecrease(product.id, product.servedCount);
                    }}
                  />
                  <AppLabel color={Color.BLACK} size={20}>
                    {`${product.servedCount} / ${product.quantity}`}
                  </AppLabel>
                  <PlusIcon
                    onClick={() => {
                      if (!product.isServed) handleIncrease(product.id, product.servedCount);
                    }}
                  />
                </ButtonContainer>
              )}
            </ProductLeftContainer>
          </ProductContainer>
        ))}
      </OrderProductContainer>
      <HorizontalLine />
      <TotalLabelContainer>
        <AppLabel color={Color.BLACK} size={20} style={{ fontWeight: 700 }}>
          {'상품 합계'}
        </AppLabel>
        <AppLabel color={Color.BLACK} size={20} style={{ fontWeight: 700 }}>
          {`${orderInfo.totalPrice.toLocaleString()}원`}
        </AppLabel>
      </TotalLabelContainer>
    </ModalContent>
  );
}

export default ModalMainContents;
