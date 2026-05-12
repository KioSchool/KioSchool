import type { Meta, StoryObj } from '@storybook/react';
import DonationQr from './DonationQr';

const meta: Meta<typeof DonationQr> = {
  title: 'Admin/Insight/Donation/DonationQr',
  component: DonationQr,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ width: 360, padding: 16, background: '#fff' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof DonationQr>;

export const Default50K: Story = {
  args: { amount: 50000 },
};

export const Small3K: Story = {
  args: { amount: 3000 },
};

export const Large100K: Story = {
  args: { amount: 100000 },
};

export const CustomFreeAmount: Story = {
  args: { amount: 0 },
};

export const UnderflowPlaceholder: Story = {
  args: { amount: 500 },
};
