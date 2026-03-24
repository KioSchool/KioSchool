import styled from '@emotion/styled';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import AppContainer from '@components/common/container/AppContainer';
import { colFlex, rowFlex } from '@styles/flexStyles';
import CustomSelect from '@components/common/select/CustomSelect';
import CustomDatePicker from '@components/common/date-picker/CustomDatePicker';
import StatCard from '@components/common/card/StatCard';
import HourlySalesChart from '@components/admin/order/statistic/HourlySalesChart';
import PopularProductsSection from '@components/admin/order/statistic/PopularProductsSection';
import { useAdminFetchDailyStatistics } from '@hooks/admin/useAdminFetchDailyStatistics';
import { formatMinutesToTime } from '@utils/formatDate';
import { Color } from '@resources/colors';

const Container = styled.div`
  width: 100%;
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

const ComparisonContainer = styled.div`
  width: 100%;
  gap: 12px;
  ${rowFlex()}
`;

const ComparisonCard = styled.div`
  flex: 1;
  padding: 14px 21px;
  box-shadow: 0px 4px 20px rgba(92, 92, 92, 0.05);
  border-radius: 16px;
  background-color: #fff;
  border: 1px solid #eaeaea;
  box-sizing: border-box;
  gap: 4px;
  ${colFlex({ align: 'start' })}
`;

const ComparisonTitle = styled.div`
  font-size: 14px;
  color: #464a4d;
  font-weight: 700;
`;

const ComparisonValue = styled.div<{ isPositive: boolean }>`
  font-size: 22px;
  font-weight: 700;
  color: ${({ isPositive }) => (isPositive ? Color.GREEN : Color.RED)};
`;

const SectionTitle = styled.div`
  width: 100%;
  font-size: 18px;
  font-weight: 700;
  color: #464a4d;
`;

function AdminOrderStatistics() {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const { selectedDate, setSelectedDate, statistics, isLoading } = useAdminFetchDailyStatistics(workspaceId);

  const dateLabel = format(selectedDate, 'yyyy년 MM월 dd일');

  return (
    <AppContainer useFlex={colFlex({ justify: 'start' })} customWidth={'1200px'}>
      <Container>
        <FilterContainer>
          <CustomSelect value={dateLabel} triggerLabel={dateLabel} highlightOnSelect={true} width="160px">
            <CustomDatePicker mode="single" selectedDate={selectedDate} onDateChange={setSelectedDate} />
          </CustomSelect>
          {statistics?.lastUpdated && !isNaN(new Date(statistics.lastUpdated).getTime()) && (
            <UpdateLabel>
              {statistics.isRealTime ? '실시간' : '최종 업데이트'} {format(new Date(statistics.lastUpdated), 'HH:mm')}
            </UpdateLabel>
          )}
        </FilterContainer>

        {isLoading && !statistics && <UpdateLabel>로딩 중...</UpdateLabel>}

        {statistics && (
          <>
            <StatCardRow>
              <StatCard title="총 매출액" value={statistics.totalRevenue.toLocaleString()} unit="원" />
              <StatCard title="총 판매량" value={statistics.totalSalesVolume} unit="개" />
              <StatCard title="총 주문 건수" value={statistics.totalOrders} unit="건" />
            </StatCardRow>

            <StatCardRow>
              <StatCard title="평균 주문 금액" value={statistics.averageOrderAmount.toLocaleString()} unit="원" />
              <StatCard title="테이블 회전율" value={statistics.tableTurnoverRate.toFixed(1)} unit="회전" />
              <StatCard title="평균 체류 시간" value={formatMinutesToTime(statistics.averageStayTimeMinutes)} />
            </StatCardRow>

            {statistics.previousDayComparison && (
              <ComparisonContainer>
                <ComparisonCard>
                  <ComparisonTitle>전일 대비 매출 증감률</ComparisonTitle>
                  <ComparisonValue isPositive={statistics.previousDayComparison.revenueGrowthRate >= 0}>
                    {statistics.previousDayComparison.revenueGrowthRate >= 0 ? '+' : ''}
                    {statistics.previousDayComparison.revenueGrowthRate.toFixed(1)}%
                  </ComparisonValue>
                </ComparisonCard>
                <ComparisonCard>
                  <ComparisonTitle>전일 대비 주문 건수 차이</ComparisonTitle>
                  <ComparisonValue isPositive={statistics.previousDayComparison.orderCountDifference >= 0}>
                    {statistics.previousDayComparison.orderCountDifference >= 0 ? '+' : ''}
                    {statistics.previousDayComparison.orderCountDifference}건
                  </ComparisonValue>
                </ComparisonCard>
              </ComparisonContainer>
            )}

            <SectionTitle>시간대별 매출</SectionTitle>
            <HourlySalesChart salesByHour={statistics.salesByHour} />

            <PopularProductsSection popularProducts={statistics.popularProducts} />
          </>
        )}
      </Container>
    </AppContainer>
  );
}

export default AdminOrderStatistics;
