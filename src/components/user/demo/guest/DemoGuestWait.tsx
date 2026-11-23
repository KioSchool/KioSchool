import styled from '@emotion/styled';
import { useAtomValue } from 'jotai';
import { PaymentMethod } from '@@types/index';
import { DEMO_TABLE_NUMBER, DEMO_WORKSPACE } from '@constants/data/demo/demoSeed';
import OrderItemsCard from '@components/user/order/wait/OrderItemsCard';
import OrderWaitHeader from '@components/user/order/wait/OrderWaitHeader';
import { demoStateAtom } from '@jotai/user/demoAtoms';
import { Color } from '@resources/colors';
import { colFlex } from '@styles/flexStyles';
import DemoGuestNavBar from './DemoGuestNavBar';

const Container = styled.div`
  box-sizing: border-box;
  width: 100%;
  min-height: 100%;
  padding-top: 50px;
  background: ${Color.WHITE};
`;

const SubContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding: 20px 20px 0;
  gap: 14px;
  ${colFlex({ align: 'stretch' })}
`;

const Tip = styled.p`
  margin: 0;
  padding: 12px 0 24px;
  color: ${Color.TEXT_HINT};
  font-size: 12px;
  text-align: center;
`;

function DemoGuestWait() {
  const { orders, guestOrderId } = useAtomValue(demoStateAtom);
  const order = orders.find((candidate) => candidate.id === guestOrderId);

  return (
    <Container>
      <DemoGuestNavBar showNavBar={true} workspaceName={DEMO_WORKSPACE.name} tableNo={DEMO_TABLE_NUMBER} />
      {order && (
        <SubContainer>
          <OrderWaitHeader method={order.paymentMethod ?? PaymentMethod.BANK_TRANSFER} amount={order.totalPrice} />
          <OrderItemsCard orderProducts={order.orderProducts} totalPrice={order.totalPrice} />
        </SubContainer>
      )}
      <Tip>이 화면을 닫지 말고 기다려 주세요</Tip>
    </Container>
  );
}

export default DemoGuestWait;
