import { useRef, useState } from 'react';
import styled from '@emotion/styled';
import { useAtomValue, useSetAtom } from 'jotai';
import { PaymentMethod } from '@@types/index';
import { DEMO_ACCOUNT, DEMO_PRODUCTS, DEMO_TABLE_NUMBER, DEMO_WORKSPACE } from '@constants/data/demo/demoSeed';
import { getPayButtonCaption, getPayButtonLabel } from '@constants/data/payMethods';
import OrderPayContent from '@components/user/order/pay/OrderPayContent';
import OrderPayFooter from '@components/user/order/pay/OrderPayFooter';
import { demoStateAtom } from '@jotai/user/demoAtoms';
import { Color } from '@resources/colors';
import { calculateBasketTotalAmount, getBasketItemsWithProduct } from '@utils/orderBasket';
import { getAvailablePayMethods } from '@utils/payMethods';
import DemoGuestNavBar from './DemoGuestNavBar';
import DemoPhoneDialog from './DemoPhoneDialog';

const PRODUCTS_MAP = Object.fromEntries(DEMO_PRODUCTS.map((product) => [product.id, product]));
const PAY_METHODS = getAvailablePayMethods(DEMO_ACCOUNT);
const NAME_REQUIRED_LINES = ['송금자명을 입력해주세요.'];

const Container = styled.div`
  box-sizing: border-box;
  width: 100%;
  min-height: 100%;
  padding: 50px 0 150px;
  background: ${Color.WHITE};
`;

const getOrderSummaryText = (firstName: string | undefined, otherCount: number) => {
  if (!firstName) return '';
  if (otherCount <= 0) return firstName;
  return `${firstName} 외 ${otherCount}개`;
};

function DemoGuestPay() {
  const { basket } = useAtomValue(demoStateAtom);
  const dispatch = useSetAtom(demoStateAtom);
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);
  const [isNameAlertOpen, setIsNameAlertOpen] = useState(false);
  const customerNameRef = useRef<HTMLInputElement>(null);
  const basketItems = getBasketItemsWithProduct(basket, PRODUCTS_MAP);
  const totalAmount = calculateBasketTotalAmount(basket, PRODUCTS_MAP);
  const [firstItem] = basketItems;

  const handleMethodSelect = (method: PaymentMethod) => {
    setSelectedMethod(method);
    if (customerNameRef.current?.value) return;
    customerNameRef.current?.focus();
  };

  const handlePay = () => {
    if (!selectedMethod) return;
    const customerName = (customerNameRef.current?.value ?? '').trim();
    if (!customerName) {
      setIsNameAlertOpen(true);
      return;
    }
    dispatch({ type: 'ORDER_PLACE', paymentMethod: selectedMethod, customerName, now: Date.now() });
  };

  return (
    <Container>
      <DemoGuestNavBar
        showNavBar={true}
        workspaceName={DEMO_WORKSPACE.name}
        tableNo={DEMO_TABLE_NUMBER}
        onBack={() => dispatch({ type: 'GUEST_GO', screen: 'basket' })}
      />
      <OrderPayContent
        totalAmount={totalAmount}
        summaryText={getOrderSummaryText(firstItem?.product.name, basketItems.length - 1)}
        accountHolder={DEMO_ACCOUNT.accountHolder}
        methods={PAY_METHODS}
        selected={selectedMethod}
        onSelect={handleMethodSelect}
        customerNameRef={customerNameRef}
      />
      {basketItems.length > 0 && (
        <OrderPayFooter
          label={getPayButtonLabel(selectedMethod, totalAmount, PAY_METHODS.length > 0)}
          caption={getPayButtonCaption(selectedMethod)}
          disabled={!selectedMethod}
          onClick={handlePay}
        />
      )}
      {isNameAlertOpen && <DemoPhoneDialog lines={NAME_REQUIRED_LINES} buttons={[{ label: '확인', onClick: () => setIsNameAlertOpen(false) }]} />}
    </Container>
  );
}

export default DemoGuestPay;
