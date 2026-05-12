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

const SAMPLE_URL = 'https://toss.me/example?intent=donate';

export const Collapsed: Story = {
  args: {
    expanded: false,
    tossAccountUrl: SAMPLE_URL,
    onToggle: () => {},
  },
};

export const ExpandedWithQr: Story = {
  args: {
    expanded: true,
    tossAccountUrl: SAMPLE_URL,
    onToggle: () => {},
  },
};

export const MissingUrl: Story = {
  args: {
    expanded: true,
    tossAccountUrl: undefined,
    onToggle: () => {},
  },
};
