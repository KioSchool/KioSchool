import { useState } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { format } from 'date-fns';
import { useAtomValue, useSetAtom } from 'jotai';
import { match } from 'ts-pattern';
import ContentCard from '@components/common/card/ContentCard';
import StatCard from '@components/common/card/StatCard';
import CustomDatePicker from '@components/common/date-picker/CustomDatePicker';
import RefreshSpinIcon from '@components/common/refresh/RefreshSpinIcon';
import CustomSelect from '@components/common/select/CustomSelect';
import HourlySalesChart from '@components/admin/order/statistic/HourlySalesChart';
import PaymentMethodRatioSection from '@components/admin/order/statistic/PaymentMethodRatioSection';
import PopularProductsSection from '@components/admin/order/statistic/PopularProductsSection';
import { ORDER_STATISTICS_SUMMARY_CARD_HEIGHT } from '@constants/layout';
import { STATISTICS_POLLING_MINUTES } from '@hooks/admin/useAdminFetchDailyStatistics';
import { demoStateAtom } from '@jotai/user/demoAtoms';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { getDemoClosingStatistics } from '@utils/demo/demoStatistics';
import { formatMinutesToTime } from '@utils/formatDate';

const mobileContainerStyle = css`
  width: 100%;
  gap: 12px;
  padding-top: 0;
`;

const Container = styled.div<{ isMobile: boolean }>`
  width: 95%;
  flex: 1;
  gap: 20px;
  padding-top: 25px;
  ${colFlex({ align: 'center' })}
  ${({ isMobile }) => isMobile && mobileContainerStyle}
`;

const FilterContainer = styled.div`
  width: 100%;
  gap: 10px;
  padding-bottom: 10px;
  ${rowFlex({ justify: 'space-between', align: 'center' })};
`;

const UpdateInfo = styled.div`
  gap: 6px;
  ${rowFlex({ align: 'center' })}
`;

const UpdateLabel = styled.span`
  font-size: 12px;
  color: #939393;
`;

const StatCardGrid = styled.div<{ isMobile: boolean }>`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(${({ isMobile }) => (isMobile ? 2 : 4)}, minmax(0, 1fr));
  gap: ${({ isMobile }) => (isMobile ? 8 : 12)}px;

  & > * {
    min-width: 0;
    width: 100%;
  }
`;

const SectionRow = styled.div<{ isMobile: boolean }>`
  width: 100%;
  display: grid;
  grid-template-columns: ${({ isMobile }) => (isMobile ? 'minmax(0, 1fr)' : 'minmax(0, 7fr) minmax(0, 3fr)')};
  gap: 12px;

  & > * {
    min-width: 0;
  }
`;

const getComparisonColor = (value: number) =>
  match(value >= 0)
    .with(true, () => Color.RED)
    .otherwise(() => Color.BLUE);

const formatWithSign = (value: number) => {
  if (value >= 0) return `+${value.toFixed(1)}`;
  return value.toFixed(1);
};

const getDirectionLabel = (difference: number) => {
  if (difference >= 0) return '증가';
  return '감소';
};

interface DemoAdminStatsPageProps {
  isMobile?: boolean;
}

function DemoAdminStatsPage({ isMobile = false }: DemoAdminStatsPageProps) {
  const state = useAtomValue(demoStateAtom);
  const dispatch = useSetAtom(demoStateAtom);
  const [now] = useState(() => Date.now());
  const { statistics, paymentMethodStatistics } = getDemoClosingStatistics(state, now);
  const comparison = statistics.previousDayComparison ?? { revenueGrowthRate: 0, orderCountDifference: 0 };
  const orderDiff = Math.abs(comparison.orderCountDifference);
  const dateLabel = format(new Date(now), 'yyyy년 MM월 dd일');
  const stayLabel = formatMinutesToTime(statistics.averageStayTimeMinutes);

  return (
    <Container isMobile={isMobile} data-demo-region>
      <FilterContainer>
        <CustomSelect value={dateLabel} triggerLabel={dateLabel} highlightOnSelect={true} width="160px">
          <CustomDatePicker mode="single" selectedDate={new Date(now)} onDateChange={() => dispatch({ type: 'UNSUPPORTED' })} />
        </CustomSelect>
        {!isMobile && (
          <UpdateInfo>
            <UpdateLabel>
              {`최종 업데이트 ${format(new Date(now), 'HH:mm')} · `}
              {STATISTICS_POLLING_MINUTES}분마다 자동 갱신
            </UpdateLabel>
            <RefreshSpinIcon isLoading={false} onClick={() => undefined} />
          </UpdateInfo>
        )}
      </FilterContainer>
      <SectionRow isMobile={isMobile}>
        <StatCardGrid isMobile={isMobile}>
          <StatCard
            title="총 주문 건수"
            height={ORDER_STATISTICS_SUMMARY_CARD_HEIGHT}
            value={statistics.totalOrders.toLocaleString()}
            description={`판매된 상품 ${statistics.totalSalesVolume.toLocaleString()}개`}
            descriptionHighlight={`${statistics.totalSalesVolume.toLocaleString()}개`}
            unit="건"
          />
          <StatCard
            title="총 매출액"
            height={ORDER_STATISTICS_SUMMARY_CARD_HEIGHT}
            value={statistics.totalRevenue.toLocaleString()}
            description={`평균 주문 금액 ${statistics.averageOrderAmount.toLocaleString()}원`}
            descriptionHighlight={`${statistics.averageOrderAmount.toLocaleString()}원`}
            unit="원"
          />
          <StatCard
            title="전일 대비 매출 증감률"
            height={ORDER_STATISTICS_SUMMARY_CARD_HEIGHT}
            value={formatWithSign(comparison.revenueGrowthRate)}
            description={`전일 대비 주문 ${orderDiff}건 ${getDirectionLabel(comparison.orderCountDifference)}`}
            descriptionHighlight={`${orderDiff}건`}
            valueColor={getComparisonColor(comparison.revenueGrowthRate)}
            unit="%"
          />
          <StatCard
            title="테이블 회전율"
            height={ORDER_STATISTICS_SUMMARY_CARD_HEIGHT}
            value={statistics.tableTurnoverRate.toFixed(1)}
            description={`평균 이용 시간 ${stayLabel}`}
            descriptionHighlight={stayLabel}
            unit="회전"
          />
        </StatCardGrid>
        <PaymentMethodRatioSection statistics={paymentMethodStatistics} isLoading={false} hasError={false} onRetry={() => undefined} />
      </SectionRow>
      <SectionRow isMobile={isMobile}>
        <ContentCard title="시간대별 추이" showDivider={false}>
          <HourlySalesChart salesByHour={statistics.salesByHour} isMobile={isMobile} />
        </ContentCard>
        <PopularProductsSection popularProducts={statistics.popularProducts} />
      </SectionRow>
    </Container>
  );
}

export default DemoAdminStatsPage;
