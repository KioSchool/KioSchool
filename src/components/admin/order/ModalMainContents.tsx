import { Order } from '@@types/index';
import AppLabel from '@components/common/label/AppLabel';
import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';

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
  gap: 15px;
  overflow-y: auto;
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

const TotalLabelContainer = styled.div`
  ${rowFlex({ justify: 'space-between', align: 'center' })}
  width: 100%;
`;

interface ModalMainContentsProps {
  orderInfo: Order;
}

function ModalMainContents({ orderInfo }: ModalMainContentsProps) {
  return (
    <ModalContent>
      <AppLabel color={Color.BLACK} size={20} style={{ fontWeight: 700 }}>
        주문 내역
      </AppLabel>
      <HorizontalLine />
      <OrderProductContainer>
        {orderInfo.orderProducts.map((product, index) => (
          <ProductContainer>
            <AppLabel color={Color.BLACK} key={index} size={20}>
              {`${product.productName} x ${product.quantity}`}
            </AppLabel>
            <AppLabel color={Color.BLACK} key={index} size={20}>
              {`${product.productPrice.toLocaleString()}원`}
            </AppLabel>
          </ProductContainer>
        ))}
      </OrderProductContainer>
      <HorizontalLine />
      <TotalLabelContainer>
        <AppLabel color={Color.BLACK} size={20} style={{ fontWeight: 700 }}>
          {'상품 합계'}
        </AppLabel>
        <AppLabel color={Color.BLACK} size={20} style={{ fontWeight: 700 }}>{`${orderInfo.totalPrice.toLocaleString()}원`}</AppLabel>
      </TotalLabelContainer>
    </ModalContent>
  );
}

export default ModalMainContents;
