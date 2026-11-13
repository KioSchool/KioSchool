import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import styled from '@emotion/styled';
import { PaymentMethod } from '@@types/index';
import { getPayButtonCaption, getPayButtonLabel } from '@constants/data/payMethods';
import OrderPayContent from './OrderPayContent';
import OrderPayFooter from './OrderPayFooter';

const Screen = styled.div`
  width: 390px;
  min-height: 844px;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

interface PayScreenProps {
  methods: PaymentMethod[];
  initial: PaymentMethod | null;
  isLoading?: boolean;
}

function PayScreen({ methods, initial, isLoading = false }: PayScreenProps) {
  const [selected, setSelected] = useState<PaymentMethod | null>(initial);
  return (
    <MemoryRouter>
      <Screen>
        <OrderPayContent totalAmount={27000} summaryText="닭꼬치 외 2개" methods={methods} selected={selected} onSelect={setSelected} isLoading={isLoading} />
        <OrderPayFooter fixed={false} label={getPayButtonLabel(selected, 27000)} caption={getPayButtonCaption(selected)} disabled={!selected} />
      </Screen>
    </MemoryRouter>
  );
}

const ALL = [PaymentMethod.TOSS, PaymentMethod.KAKAOPAY, PaymentMethod.BANK_TRANSFER];

const meta: Meta<typeof PayScreen> = {
  title: 'user/order/pay/OrderPayContent',
  component: PayScreen,
};

export default meta;
type Story = StoryObj<typeof PayScreen>;

export const TossSelected: Story = { args: { methods: ALL, initial: PaymentMethod.TOSS } };
export const KakaoPaySelected: Story = { args: { methods: ALL, initial: PaymentMethod.KAKAOPAY } };
export const BankTransferSelected: Story = { args: { methods: ALL, initial: PaymentMethod.BANK_TRANSFER } };
export const TossOnly: Story = { args: { methods: [PaymentMethod.TOSS, PaymentMethod.BANK_TRANSFER], initial: PaymentMethod.TOSS } };
export const KakaoPayOnly: Story = { args: { methods: [PaymentMethod.KAKAOPAY, PaymentMethod.BANK_TRANSFER], initial: PaymentMethod.KAKAOPAY } };
export const BankTransferOnly: Story = { args: { methods: [PaymentMethod.BANK_TRANSFER], initial: PaymentMethod.BANK_TRANSFER } };
export const NoAccount: Story = { args: { methods: [], initial: null } };
export const Loading: Story = { args: { methods: [], initial: null, isLoading: true } };
