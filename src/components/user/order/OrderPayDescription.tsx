import styled from '@emotion/styled';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { Color } from '@resources/colors';
import { userOrderAtom } from 'src/jotai/user/atoms';
import { useAtomValue } from 'jotai';

const Container = styled.div`
  width: 100%;
  gap: 8px;
  ${colFlex({ justify: 'center', align: 'center' })}
`;

const OrderInfoContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding: 0 10px;
  ${rowFlex({ justify: 'space-between', align: 'center' })};
`;

const StyledLabel = styled.div`
  font-size: 13px;
  font-weight: 600;
`;

const Description = styled.div`
  box-sizing: border-box;
  border-radius: 10px;
  margin-top: 20px;
  width: 100%;
  font-size: 13px;
  font-weight: 500;
  color: #898989;
  text-align: center;
  box-sizing: border-box;
  background: ${Color.LIGHT_GREY};
  padding: 20px 30px;
  word-break: keep-all;
  ${colFlex({ justify: 'center', align: 'center' })}
`;

function OrderPayDescription() {
  const order = useAtomValue(userOrderAtom);
  const totalPrice = order.totalPrice;
  const totalQuantity = order.orderProducts.length;

  return (
    <Container>
      <OrderInfoContainer>
        <StyledLabel>결제 금액</StyledLabel>
        <StyledLabel>{totalPrice.toLocaleString()}원</StyledLabel>
      </OrderInfoContainer>
      <OrderInfoContainer>
        <StyledLabel>상품 수량</StyledLabel>
        <StyledLabel>{totalQuantity}개</StyledLabel>
      </OrderInfoContainer>
      <Description>결제하기 버튼을 누른 후 송금을 꼭 완료해주셔야 주문 내역 페이지로 이동합니다.</Description>
    </Container>
  );
}

export default OrderPayDescription;
