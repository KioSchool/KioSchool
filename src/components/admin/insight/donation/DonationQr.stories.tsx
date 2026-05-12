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

const SAMPLE_URL = 'https://toss.me/example?intent=donate';

export const Default50K: Story = {
  args: {
    tossAccountUrl: SAMPLE_URL,
    amount: 50000,
  },
};

export const Small3K: Story = {
  args: {
    tossAccountUrl: SAMPLE_URL,
    amount: 3000,
  },
};

export const Large100K: Story = {
  args: {
    tossAccountUrl: SAMPLE_URL,
    amount: 100000,
  },
};

export const UnderflowPlaceholder: Story = {
  args: {
    tossAccountUrl: SAMPLE_URL,
    amount: 500,
  },
};

export const MissingUrlPlaceholder: Story = {
  args: {
    tossAccountUrl: undefined,
    amount: 50000,
  },
};
