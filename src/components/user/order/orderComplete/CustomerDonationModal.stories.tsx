import type { Meta, StoryObj } from '@storybook/react';
import CustomerDonationModal from './CustomerDonationModal';

const meta: Meta<typeof CustomerDonationModal> = {
  title: 'user/order/CustomerDonationModal',
  component: CustomerDonationModal,
  decorators: [
    (Story) => {
      localStorage.removeItem('customerDonationDismissedAt');
      if (!document.getElementById('kioschool-modal-root')) {
        const root = document.createElement('div');
        root.id = 'kioschool-modal-root';
        document.body.appendChild(root);
      }
      return <Story />;
    },
  ],
};

export default meta;
type Story = StoryObj<typeof CustomerDonationModal>;

export const VariantA: Story = {
  args: { orderId: '1000', workspaceId: '1', eligible: true },
};

export const VariantB: Story = {
  args: { orderId: '1001', workspaceId: '1', eligible: true },
};

export const NotEligible: Story = {
  args: { orderId: '1000', workspaceId: '1', eligible: false },
};
