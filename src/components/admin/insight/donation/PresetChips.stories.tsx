import type { Meta, StoryObj } from '@storybook/react';
import PresetChips from './PresetChips';

const meta: Meta<typeof PresetChips> = {
  title: 'Admin/Insight/Donation/PresetChips',
  component: PresetChips,
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
type Story = StoryObj<typeof PresetChips>;

export const DefaultI50KSelected: Story = {
  args: {
    selectedAmount: 50000,
    onSelect: () => {},
  },
};

export const K30KSelected: Story = {
  args: {
    selectedAmount: 30000,
    onSelect: () => {},
  },
};

export const O100KSelected: Story = {
  args: {
    selectedAmount: 100000,
    onSelect: () => {},
  },
};
