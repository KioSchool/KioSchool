import styled from '@emotion/styled';
import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from '@storybook/test';
import StatCard from '@components/common/card/StatCard';
import { Color } from '@resources/colors';
import { rowFlex } from '@styles/flexStyles';
import TossPaymentRatioCard from './TossPaymentRatioCard';

const StoryContainer = styled.div<{ wide: boolean }>`
  width: 100%;
  max-width: ${({ wide }) => (wide ? '1200px' : '260px')};
  box-sizing: border-box;
  padding: 16px;
  background-color: ${Color.LIGHT_GREY};
`;

const SummaryRow = styled.div`
  width: 100%;
  gap: 12px;
  flex-wrap: wrap;
  ${rowFlex()}

  & > * {
    flex: 1;
    width: auto;
  }
`;

const meta: Meta<typeof TossPaymentRatioCard> = {
  title: 'Admin/Order/Statistic/TossPaymentRatioCard',
  component: TossPaymentRatioCard,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story, context) => (
      <StoryContainer wide={context.parameters.wide === true}>
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
type Story = StoryObj<typeof TossPaymentRatioCard>;

export const Mixed: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('65.0', { exact: false })).toBeVisible();
    await expect(canvas.getByText('토스 65건')).toBeVisible();
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
    await userEvent.click(canvas.getByRole('button', { name: '조회 실패 · 재시도' }));
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

export const InSummaryRow: Story = {
  parameters: { wide: true },
  render: function SummaryRowStory(args) {
    return (
      <SummaryRow>
        <StatCard title="총 주문 건수" value="100" unit="건" description="총 판매된 상품 수량은 250개입니다." descriptionHighlight="250개" />
        <StatCard title="총 매출액" value="1,500,000" unit="원" description="평균 주문 금액은 15,000원입니다." descriptionHighlight="15,000원" />
        <StatCard title="전일 대비 주문 증감률" value="+12.0" unit="%" description="전일 대비 10건의 주문이 증가했습니다." descriptionHighlight="10건" />
        <StatCard title="테이블 회전율" value="3.5" unit="회전" description="평균 테이블 이용 시간은 45분입니다." descriptionHighlight="45분" />
        <TossPaymentRatioCard {...args} />
      </SummaryRow>
    );
  },
};
