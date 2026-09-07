import type { Meta, StoryObj } from '@storybook/react';
import CustomerDonationCard from './CustomerDonationCard';

const meta: Meta<typeof CustomerDonationCard> = {
  title: 'user/order/CustomerDonationCard',
  component: CustomerDonationCard,
  decorators: [
    (Story) => {
      localStorage.removeItem('customerDonationDismissedAt');
      return (
        <div style={{ width: 320, padding: 16, background: '#f7f7f7' }}>
          <Story />
        </div>
      );
    },
  ],
};

export default meta;
type Story = StoryObj<typeof CustomerDonationCard>;

// orderId 짝수 → 변형 A (편하게 주문하셨나요?)
export const VariantA: Story = {
  args: { orderId: '1000', workspaceId: '1', eligible: true },
};

// orderId 홀수 → 변형 B (주점한테는 돈을 안 받기로 했어요)
export const VariantB: Story = {
  args: { orderId: '1001', workspaceId: '1', eligible: true },
};

// 취소 주문 등 노출 대상이 아닌 경우 — 아무것도 렌더되지 않아야 한다
export const NotEligible: Story = {
  args: { orderId: '1000', workspaceId: '1', eligible: false },
};
