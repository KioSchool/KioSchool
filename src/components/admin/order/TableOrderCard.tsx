import { Table } from '@@types/index';
import HorizontalDivider from '@components/common/divider/HorizontalDivider';
import AppLabel from '@components/common/label/AppLabel';
import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';

const Container = styled.div`
  padding: 22px;
  width: 100%;
  box-sizing: border-box;
  background: #${Color.ORDER_GREY};
  gap: 7px;
  ${colFlex({ align: 'center' })}
`;

const Row = styled.div`
  width: 100%;
  padding: 0 5px;
  box-sizing: border-box;
  ${rowFlex({ justify: 'space-between' })}
`;

const OrderProductsContainer = styled.div`
  gap: 5px;
  width: 100%;
  ${colFlex()}
`;

function TableOrderCard({ id, customerName, createdAt, orderProducts, totalPrice }: Omit<Table, 'status' | 'cancelReason' | 'updatedAt' | 'tableNumber'>) {
  const dateConverter = (dateStr: string) => {
    const date = new Date(dateStr);

    const isAm = date.getHours() < 12;
    const hour = isAm ? date.getHours() : date.getHours() - 12;

    return `${hour}시 ${date.getMinutes()}분`;
  };

  return (
    <Container className={'table-order-card-container'}>
      <AppLabel size={16}>주문번호 {id}번</AppLabel>
      <Row className={'table-order-card-row'}>
        <AppLabel size={14}>입금자명: {customerName}</AppLabel>
        <AppLabel size={14}>{dateConverter(createdAt)}</AppLabel>
      </Row>
      <HorizontalDivider />
      <OrderProductsContainer className={'order-products-container'}>
        {orderProducts.map((it) => (
          <Row key={it.id} className={'order-product-row'}>
            <AppLabel size={16} style={{ fontWeight: 500 }}>
              {it.productName}
            </AppLabel>
            <AppLabel size={16} style={{ fontWeight: 500 }}>
              {it.quantity}개
            </AppLabel>
          </Row>
        ))}
      </OrderProductsContainer>
      <HorizontalDivider />
      <Row className={'table-order-card-row'}>
        <AppLabel size={16} style={{ fontWeight: 500 }}>
          총 주문 금액
        </AppLabel>
        <AppLabel size={16} style={{ fontWeight: 500 }}>
          {totalPrice.toLocaleString()}원
        </AppLabel>
      </Row>
    </Container>
  );
}

export default TableOrderCard;
