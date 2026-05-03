import styled from '@emotion/styled';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import AppContainer from '@components/common/container/AppContainer';
import { colFlex, rowFlex } from '@styles/flexStyles';
import CustomSelect from '@components/common/select/CustomSelect';
import CustomDatePicker from '@components/common/date-picker/CustomDatePicker';
import StatCard from '@components/common/card/StatCard';
import ContentCard from '@components/common/card/ContentCard';
import RefreshSpinIcon from '@components/common/refresh/RefreshSpinIcon';
import HourlySalesChart from '@components/admin/order/statistic/HourlySalesChart';
import PopularProductsSection from '@components/admin/order/statistic/PopularProductsSection';
import { useAdminFetchDailyStatistics } from '@hooks/admin/useAdminFetchDailyStatistics';
import { formatMinutesToTime } from '@utils/formatDate';
import { Color } from '@resources/colors';

const Container = styled.div`
  width: 95%;
  flex: 1;
  gap: 20px;
  padding-top: 25px;
  ${colFlex({ align: 'center' })}
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

const StatCardRow = styled.div`
  width: 100%;
  gap: 12px;
  ${rowFlex()}

  & > * {
    flex: 1;
    width: auto;
  }
`;

const SectionRow = styled.div`
  width: 100%;
  gap: 12px;
  ${rowFlex()}

  & > *:first-of-type {
    flex: 7;
    min-width: 0;
  }

  & > *:last-of-type {
    flex: 3;
    min-width: 0;
  }
`;

const formatWithSign = (value: number, formatter?: (v: number) => string) => {
  const sign = value >= 0 ? '+' : '';
  const formatted = formatter ? formatter(value) : String(value);
  return `${sign}${formatted}`;
};

const getComparisonColor = (value: number) => (value >= 0 ? Color.RED : Color.BLUE);

const isValidDate = (dateStr: string) => !isNaN(new Date(dateStr).getTime());

function AdminOrderStatistics() {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const { selectedDate, setSelectedDate, statistics, isLoading, manualRefetch } = useAdminFetchDailyStatistics(workspaceId);

  const dateLabel = format(selectedDate, 'yyyy년 MM월 dd일');
  const comparison = statistics?.previousDayComparison;

  const orderDiff = Math.abs(comparison?.orderCountDifference ?? 0);
  const orderDiffDirection = (comparison?.orderCountDifference ?? 0) >= 0 ? '증가' : '감소';
  const comparisonValue = comparison ? formatWithSign(comparison.revenueGrowthRate, (v) => v.toFixed(1)) : '-';
  const comparisonDescription = comparison ? `전일 대비 ${orderDiff}건의 주문이 ${orderDiffDirection}했습니다.` : '비교 데이터가 없습니다.';
  const comparisonHighlight = comparison ? `${orderDiff}건` : undefined;
  const comparisonColor = comparison ? getComparisonColor(comparison.revenueGrowthRate) : undefined;

  return (
    <AppContainer useFlex={colFlex({ justify: 'start', align: 'center' })} customWidth={'1200px'}>
      <Container>
        <FilterContainer>
          <CustomSelect value={dateLabel} triggerLabel={dateLabel} highlightOnSelect={true} width="160px">
            <CustomDatePicker mode="single" selectedDate={selectedDate} onDateChange={setSelectedDate} />
          </CustomSelect>
          {statistics?.lastUpdated && isValidDate(statistics.lastUpdated) && (
            <UpdateInfo>
              <UpdateLabel>최종 업데이트 {format(new Date(statistics.lastUpdated), 'HH:mm')} · 5분마다 자동 갱신</UpdateLabel>
              <RefreshSpinIcon isLoading={isLoading} onClick={manualRefetch} />
            </UpdateInfo>
          )}
        </FilterContainer>

        {isLoading && !statistics && <UpdateLabel>로딩 중...</UpdateLabel>}

        {statistics && (
          <StatCardRow>
            <StatCard
              title="총 주문 건수"
              value={statistics.totalOrders.toLocaleString()}
              description={`총 판매된 상품 수량은 ${statistics.totalSalesVolume}개입니다.`}
              descriptionHighlight={`${statistics.totalSalesVolume}개`}
              unit="건"
            />
            <StatCard
              title="총 매출액"
              value={statistics.totalRevenue.toLocaleString()}
              description={`평균 주문 금액은 ${statistics.averageOrderAmount.toLocaleString()}원입니다.`}
              descriptionHighlight={`${statistics.averageOrderAmount.toLocaleString()}원`}
              unit="원"
            />
            <StatCard
              title="전일 대비 주문 증감률"
              value={comparisonValue}
              description={comparisonDescription}
              descriptionHighlight={comparisonHighlight}
              valueColor={comparisonColor}
              unit="%"
            />
            <StatCard
              title="테이블 회전율"
              value={statistics.tableTurnoverRate.toFixed(1)}
              description={`평균 테이블 이용 시간은 ${formatMinutesToTime(statistics.averageStayTimeMinutes)}입니다.`}
              descriptionHighlight={formatMinutesToTime(statistics.averageStayTimeMinutes)}
              unit="회전"
            />
          </StatCardRow>
        )}

        {statistics && (
          <SectionRow>
            <ContentCard title="시간대별 추이" showDivider={false}>
              <HourlySalesChart salesByHour={statistics.salesByHour} />
            </ContentCard>
            <PopularProductsSection popularProducts={statistics.popularProducts} />
          </SectionRow>
        )}
      </Container>
    </AppContainer>
  );
}

export default AdminOrderStatistics;
