import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/test';
import styled from '@emotion/styled';
import { Account, OrderProduct, PaymentMethod } from '@@types/index';
import { defaultAccountValue } from '@@types/defaultValues';
import { isPayApp } from '@utils/payMethods';
import OrderWaitHeader from './OrderWaitHeader';
import NotSentYetPanel from './NotSentYetPanel';
import BankAccountCard from './BankAccountCard';
import OrderItemsCard from './OrderItemsCard';

const Screen = styled.div`
  box-sizing: border-box;
  width: 390px;
  padding: 20px 20px 24px;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const Tip = styled.p`
  margin: 0;
  color: #9aa1a6;
  font-size: 12px;
  text-align: center;
`;

const account: Account = {
  ...defaultAccountValue,
  bank: { ...defaultAccountValue.bank, name: '신한은행', code: '088' },
  accountNumber: '110123456789',
  accountHolder: '홍길동',
};

const product = (id: number, productName: string, price: number): OrderProduct => ({
  id,
  productId: id,
  productName,
  productPrice: price,
  quantity: 1,
  totalPrice: price,
  isServed: false,
  servedCount: 0,
  createdAt: '',
  updatedAt: '',
});

const orderProducts = [product(1, '닭꼬치', 12000), product(2, '김치전', 10000), product(3, '콜라', 5000)];

// 대기 화면 본문. Figma '카카오페이 송금' 주문 대기 보드와 나란히 비교하는 용도
function WaitScreen({ method }: { method: PaymentMethod }) {
  return (
    <Screen>
      <OrderWaitHeader method={method} amount={27000} />
      {isPayApp(method) ? <NotSentYetPanel method={method} account={account} onReopen={() => {}} /> : <BankAccountCard account={account} />}
      <OrderItemsCard orderProducts={orderProducts} totalPrice={27000} />
      <Tip>이 화면을 닫지 말고 기다려 주세요</Tip>
    </Screen>
  );
}

const meta: Meta<typeof WaitScreen> = {
  title: 'user/order/wait/OrderWaitScreen',
  component: WaitScreen,
};

export default meta;
type Story = StoryObj<typeof WaitScreen>;

export const Toss: Story = { args: { method: PaymentMethod.TOSS } };
export const TossNotSentYetOpen: Story = {
  args: { method: PaymentMethod.TOSS },
  play: async ({ canvasElement }) => {
    await userEvent.click(within(canvasElement).getByText('아직 보내지 않았나요?'));
  },
};
export const KakaoPay: Story = { args: { method: PaymentMethod.KAKAOPAY } };
export const BankTransfer: Story = { args: { method: PaymentMethod.BANK_TRANSFER } };
