import { useState } from 'react';
import { Order, OrderStatus } from '@@types/index';
import AppLabel from '@components/common/label/AppLabel';
import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import MinusButtonSvg from '@resources/svg/MinusButtonSvg';
import PlusButtonSvg from '@resources/svg/PlusButtonSvg';
import { expandButtonStyle } from '@styles/buttonStyles';
import { colFlex, rowFlex } from '@styles/flexStyles';
import CheckSvg from '@resources/svg/CheckSvg';

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
  const isPaidStatus = orderInfo.status === OrderStatus.PAID;

  const [servedQuantities, setServedQuantities] = useState(orderInfo.orderProducts.map((product) => ({ id: product.id, served: 0 })));

  const isAllServed = servedQuantities.every((servedProduct) => {
    const matchingOrderProduct = orderInfo.orderProducts.find((product) => product.id === servedProduct.id);

    return servedProduct.served === matchingOrderProduct?.quantity;
  });

  const handleIncrease = (id: number) => {
    setServedQuantities((prev) =>
      prev.map((item) => {
        if (item.id !== id) {
          return item;
        }

        const maxQuantity = orderInfo.orderProducts.find((product) => product.id === id)?.quantity || 0;

        return {
          ...item,
          served: Math.min(item.served + 1, maxQuantity),
        };
      }),
    );
  };

  const handleDecrease = (id: number) => {
    setServedQuantities((prev) =>
      prev.map((item) => {
        if (item.id !== id) {
          return item;
        }

        return {
          ...item,
          served: Math.max(item.served - 1, 0),
        };
      }),
    );
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
        {orderInfo.orderProducts.map((product) => {
          const servedQuantity = servedQuantities.find((item) => item.id === product.id)?.served || 0;
          const isProductFullyServed = servedQuantity === product.quantity;
          return (
            <ProductContainer key={product.id}>
              <ProductRightContainer>
                <AppLabel color={Color.BLACK} size={20}>
                  {`${product.productName}`}
                </AppLabel>
                {isProductFullyServed && <CheckSvg />}
              </ProductRightContainer>
              <ProductLeftContainer>
                <AppLabel color={Color.BLACK} size={20}>
                  {`${product.productPrice.toLocaleString()}원`}
                </AppLabel>
                {isPaidStatus && (
                  <ButtonContainer>
                    <MinusIcon onClick={() => handleDecrease(product.id)} />
                    <AppLabel color={Color.BLACK} size={20}>
                      {`${servedQuantity} / ${product.quantity}`}
                    </AppLabel>
                    <PlusIcon onClick={() => handleIncrease(product.id)} />
                  </ButtonContainer>
                )}
              </ProductLeftContainer>
            </ProductContainer>
          );
        })}
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
