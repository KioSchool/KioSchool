import styled from '@emotion/styled';
import { useAtomValue, useSetAtom } from 'jotai';
import { DEMO_TABLE_NUMBER, DEMO_WORKSPACE } from '@constants/data/demo/demoSeed';
import OrderStatusBar from '@components/user/order/OrderStatusBar';
import { OrderCard, OrderCardDivider, OrderCardTitle, OrderItemName, OrderItemQuantity } from '@components/user/order/orderCardStyles';
import { demoStateAtom } from '@jotai/user/demoAtoms';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { dateConverter } from '@utils/formatDate';
import DemoGuestNavBar from './DemoGuestNavBar';
import DemoOrderButton from './DemoOrderButton';

const Container = styled.div`
  width: 100%;
  min-height: 100%;
  padding-top: 50px;
`;

const SubContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding: 20px 20px 130px;
  gap: 12px;
  ${colFlex({ justify: 'center', align: 'start' })}
`;

const ContentsContainer = styled(OrderCard)`
  padding: 18px 20px;
  gap: 16px;
`;

const TitleRow = styled.div`
  width: 100%;
  ${rowFlex({ justify: 'space-between', align: 'center' })}
`;

const SubTitle = styled.div`
  color: ${Color.TEXT_STRONG};
  font-size: 20px;
  font-weight: 700;
  line-height: 1.45;
`;

const TotalValue = styled.div`
  color: ${Color.TEXT_STRONG};
  font-size: 17px;
  font-weight: 700;
`;

const InfoContainer = styled.div`
  width: 100%;
  box-sizing: border-box;
  gap: 10px;
  ${colFlex()}
`;

const InfoRow = styled.div`
  width: 100%;
  ${rowFlex({ justify: 'space-between', align: 'center' })}
`;

const ContentText = styled.div`
  font-size: 14px;
  color: ${Color.TEXT_SUBTLE};
`;

const ValueText = styled.div`
  font-size: 14px;
  color: ${Color.TEXT_DEFAULT};
`;

const OrderStatusContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  gap: 12px;
  ${colFlex({ justify: 'space-between', align: 'start' })};
`;

const OrderProductContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  gap: 10px;
  ${colFlex()}
`;

const OrderPriceContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  ${rowFlex({ justify: 'space-between', align: 'center' })};
`;

const OrderProductRow = styled.div`
  width: 100%;
  ${rowFlex({ justify: 'space-between' })}
`;

const OrderProductText = styled.div`
  font-size: 14px;
  color: ${Color.TEXT_DEFAULT};
`;

function DemoGuestComplete() {
  const { orders, guestOrderId } = useAtomValue(demoStateAtom);
  const dispatch = useSetAtom(demoStateAtom);
  const order = orders.find((candidate) => candidate.id === guestOrderId);

  return (
    <Container>
      <DemoGuestNavBar showNavBar={true} workspaceName={DEMO_WORKSPACE.name} tableNo={DEMO_TABLE_NUMBER} />
      {order && (
        <SubContainer>
          <TitleRow>
            <SubTitle>주문내역</SubTitle>
          </TitleRow>
          <ContentsContainer>
            <InfoContainer>
              <OrderCardTitle>주문 정보</OrderCardTitle>
              <InfoRow>
                <ContentText>주문일시</ContentText>
                <ValueText>{dateConverter(new Date(order.createdAt))}</ValueText>
              </InfoRow>
              <InfoRow>
                <ContentText>주문번호</ContentText>
                <ValueText>{order.orderNumber}</ValueText>
              </InfoRow>
              <InfoRow>
                <ContentText>입금자명</ContentText>
                <ValueText>{order.customerName}</ValueText>
              </InfoRow>
            </InfoContainer>
            <OrderCardDivider />
            <OrderStatusContainer>
              <OrderCardTitle>주문 상태</OrderCardTitle>
              <OrderStatusBar status={order.status} />
            </OrderStatusContainer>
            <OrderCardDivider />
            <OrderProductContainer>
              <OrderCardTitle>상품 정보</OrderCardTitle>
              {order.orderProducts.map((orderProduct) => (
                <OrderProductRow key={orderProduct.id}>
                  <OrderItemName>
                    {orderProduct.productName}
                    <OrderItemQuantity>{orderProduct.quantity}개</OrderItemQuantity>
                  </OrderItemName>
                  <OrderProductText>{orderProduct.totalPrice.toLocaleString()}원</OrderProductText>
                </OrderProductRow>
              ))}
            </OrderProductContainer>
            <OrderCardDivider />
            <OrderPriceContainer>
              <OrderCardTitle>합계</OrderCardTitle>
              <TotalValue>{order.totalPrice.toLocaleString()}원</TotalValue>
            </OrderPriceContainer>
          </ContentsContainer>
        </SubContainer>
      )}
      <DemoOrderButton showButton={true} buttonLabel="더 주문하기" onClick={() => dispatch({ type: 'GUEST_GO', screen: 'menu' })} />
    </Container>
  );
}

export default DemoGuestComplete;
