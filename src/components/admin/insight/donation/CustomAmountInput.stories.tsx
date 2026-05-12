import type { Meta, StoryObj } from '@storybook/react';
import CustomAmountInput from './CustomAmountInput';

const meta: Meta<typeof CustomAmountInput> = {
  title: 'Admin/Insight/Donation/CustomAmountInput',
  component: CustomAmountInput,
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
type Story = StoryObj<typeof CustomAmountInput>;

export const Collapsed: Story = {
  args: {
    expanded: false,
    customInput: '',
    amount: 50000,
    onToggle: () => {},
    onCustomChange: () => {},
  },
};

export const ExpandedEmpty: Story = {
  args: {
    expanded: true,
    customInput: '',
    amount: 50000,
    onToggle: () => {},
    onCustomChange: () => {},
  },
};

export const UnderflowHelperVisible: Story = {
  args: {
    expanded: true,
    customInput: '5000',
    amount: 5000,
    onToggle: () => {},
    onCustomChange: () => {},
  },
};

export const NormalRangeNoHelper: Story = {
  args: {
    expanded: true,
    customInput: '40000',
    amount: 40000,
    onToggle: () => {},
    onCustomChange: () => {},
  },
};

export const OverflowHelperVisible: Story = {
  args: {
    expanded: true,
    customInput: '150000',
    amount: 150000,
    onToggle: () => {},
    onCustomChange: () => {},
  },
};
