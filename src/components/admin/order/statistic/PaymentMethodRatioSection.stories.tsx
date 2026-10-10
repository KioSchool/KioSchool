import styled from '@emotion/styled';
import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from '@storybook/test';
import StatCard from '@components/common/card/StatCard';
import ContentCard from '@components/common/card/ContentCard';
import { Color } from '@resources/colors';
import { colFlex } from '@styles/flexStyles';
import { mobileMediaQuery } from '@styles/globalStyles';
import PaymentMethodRatioSection from './PaymentMethodRatioSection';

const StoryContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  box-sizing: border-box;
  padding: 16px;
  background-color: ${Color.LIGHT_GREY};
`;

const LayoutPreview = styled.div`
  ${colFlex()}
`;

const LayoutRow = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: minmax(0, 7fr) minmax(0, 3fr);
  gap: 12px;
  margin-bottom: 12px;

  & > * {
    min-width: 0;
  }

  ${mobileMediaQuery} {
    grid-template-columns: 1fr;
  }
`;

const StatCardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
  width: 100%;

  & > * {
    min-width: 0;
    width: 100%;
  }

  ${mobileMediaQuery} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const ComparisonArea = styled.div`
  height: 60px;
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

export const InStatisticsLayout: Story = {
  render: function StatisticsLayoutStory(args) {
    return (
      <LayoutPreview>
        <LayoutRow>
          <StatCardGrid>
            <StatCard title="총 주문 건수" value="248" description="판매된 상품 631개" descriptionHighlight="631개" unit="건" compact />
            <StatCard title="총 매출액" value="4,862,000" description="평균 주문 금액 19,605원" descriptionHighlight="19,605원" unit="원" compact />
            <StatCard title="전일 대비 매출 증감률" value="+12.4" description="전일 대비 주문 18건 증가" descriptionHighlight="18건" unit="%" compact />
            <StatCard title="테이블 회전율" value="3.2" description="평균 테이블 이용 시간 43분" descriptionHighlight="43분" unit="회전" compact />
          </StatCardGrid>
          <PaymentMethodRatioSection {...args} />
        </LayoutRow>
        <LayoutRow>
          <ContentCard title="시간대별 추이">
            <ComparisonArea />
          </ContentCard>
          <ContentCard title="상품별 순위">
            <ComparisonArea />
          </ContentCard>
        </LayoutRow>
      </LayoutPreview>
    );
  },
};
