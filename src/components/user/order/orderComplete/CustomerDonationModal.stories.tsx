import type { Meta, StoryObj } from '@storybook/react';
import CustomerDonationModal from './CustomerDonationModal';

const meta: Meta<typeof CustomerDonationModal> = {
  title: 'user/order/CustomerDonationModal',
  component: CustomerDonationModal,
  parameters: { viewport: { defaultViewport: 'iphone12' } },
  args: { orderId: '1000', workspaceId: '1', eligible: true, initialTodayCount: 12 },
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

export const A_바텀시트: Story = {
  args: { shell: 'sheet', visual: 'plain' },
};

export const C_캐릭터: Story = {
  args: { shell: 'center', visual: 'character' },
};

export const D_게이지: Story = {
  args: { shell: 'center', visual: 'gauge' },
};

export const E_말풍선: Story = {
  args: { shell: 'center', visual: 'bubble' },
};

export const 추천_바텀시트_캐릭터: Story = {
  args: { shell: 'sheet', visual: 'character' },
};

export const 기준선_중앙_담백: Story = {
  args: { shell: 'center', visual: 'plain' },
};

export const 게이지_초반_2명: Story = {
  args: { shell: 'center', visual: 'gauge', initialTodayCount: 2 },
};

export const NotEligible: Story = {
  args: { eligible: false },
};
