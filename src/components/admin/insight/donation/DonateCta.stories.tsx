import type { Meta, StoryObj } from '@storybook/react';
import DonateCta from './DonateCta';

const meta: Meta<typeof DonateCta> = {
  title: 'Admin/Insight/Donation/DonateCta',
  component: DonateCta,
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
type Story = StoryObj<typeof DonateCta>;

export const Default50K: Story = {
  args: {
    amount: 50000,
    onClick: () => {},
  },
};

export const Underflow500: Story = {
  args: {
    amount: 500,
    onClick: () => {},
  },
};

export const ZeroAmount: Story = {
  args: {
    amount: 0,
    onClick: () => {},
  },
};

export const LargeAmount200K: Story = {
  args: {
    amount: 200000,
    onClick: () => {},
  },
};
