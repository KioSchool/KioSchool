import styled from '@emotion/styled';
import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from '@storybook/test';
import { Color } from '@resources/colors';
import PaymentMethodRatioSection from './PaymentMethodRatioSection';

const StoryContainer = styled.div`
  width: 100%;
  max-width: 1100px;
  box-sizing: border-box;
  padding: 16px;
  background-color: ${Color.LIGHT_GREY};
`;

const meta: Meta<typeof PaymentMethodRatioSection> = {
  title: 'Admin/Order/Statistic/PaymentMethodRatioSection',
  component: PaymentMethodRatioSection,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <StoryContainer>
        <Story />
      </StoryContainer>
    ),
  ],
  args: {
    statistics: { tossCount: 65, bankTransferCount: 35, unknownCount: 0, tossRatio: 65, bankTransferRatio: 35 },
    isLoading: false,
    hasError: false,
    onRetry: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof PaymentMethodRatioSection>;

export const Mixed: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('토스 65.0% · 65건')).toBeVisible();
    await expect(canvas.getByText('계좌 35.0% · 35건')).toBeVisible();
  },
};

export const TossOnly: Story = {
  args: { statistics: { tossCount: 10, bankTransferCount: 0, unknownCount: 0, tossRatio: 100, bankTransferRatio: 0 } },
};

export const BankTransferOnly: Story = {
  args: { statistics: { tossCount: 0, bankTransferCount: 10, unknownCount: 0, tossRatio: 0, bankTransferRatio: 100 } },
};

export const SmallRatio: Story = {
  args: { statistics: { tossCount: 1, bankTransferCount: 9999, unknownCount: 0, tossRatio: 0.01, bankTransferRatio: 99.99 } },
};

export const WithUnknown: Story = {
  args: { statistics: { tossCount: 3, bankTransferCount: 1, unknownCount: 2, tossRatio: 75, bankTransferRatio: 25 } },
};

export const UnknownOnly: Story = {
  args: { statistics: { tossCount: 0, bankTransferCount: 0, unknownCount: 12, tossRatio: 0, bankTransferRatio: 0 } },
};

export const Empty: Story = {
  args: { statistics: { tossCount: 0, bankTransferCount: 0, unknownCount: 0, tossRatio: 0, bankTransferRatio: 0 } },
};

export const Loading: Story = {
  args: { statistics: null, isLoading: true },
};

export const Error: Story = {
  args: { statistics: null, hasError: true },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: '재시도' }));
    await expect(args.onRetry).toHaveBeenCalledTimes(1);
  },
};

export const RefreshError: Story = {
  args: { hasError: true },
};

export const Refreshing: Story = {
  args: { isLoading: true },
};

export const Narrow: Story = {
  parameters: { viewport: { defaultViewport: 'iphone6' } },
  args: { statistics: { tossCount: 650000, bankTransferCount: 350000, unknownCount: 10000, tossRatio: 65, bankTransferRatio: 35 } },
};
