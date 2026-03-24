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
              <StatCard
                title="총 주문 건수"
                value={statistics.totalOrders.toLocaleString()}
                description={`총 판매된 상품 수량은 ${statistics.totalSalesVolume}개입니다.`}
                descriptionHighlight={`${statistics.totalSalesVolume}개`}
                highlightRate={statistics.totalOrders}
                unit="건"
              />
              <StatCard
                title="총 매출액"
                value={statistics.totalRevenue.toLocaleString()}
                description={`평균 주문 금액은 ${statistics.averageOrderAmount.toLocaleString()}원입니다.`}
                descriptionHighlight={`${statistics.averageOrderAmount.toLocaleString()}원`}
                highlightRate={statistics.totalRevenue}
                unit="원"
              />
              <StatCard
                title="전일 대비 주문 증감률"
                value={
                  statistics.previousDayComparison
                    ? `${statistics.previousDayComparison.revenueGrowthRate >= 0 ? '+' : ''}${statistics.previousDayComparison.revenueGrowthRate.toFixed(1)}`
                    : '-'
                }
                description={
                  statistics.previousDayComparison
                    ? `전일 대비 주문 ${statistics.previousDayComparison.orderCountDifference >= 0 ? '+' : ''}${
                        statistics.previousDayComparison.orderCountDifference
                      }건`
                    : '비교 데이터가 없습니다.'
                }
                descriptionHighlight={
                  statistics.previousDayComparison
                    ? `${statistics.previousDayComparison.orderCountDifference >= 0 ? '+' : ''}${statistics.previousDayComparison.orderCountDifference}건`
                    : undefined
                }
                highlightRate={statistics.previousDayComparison ? Math.abs(statistics.previousDayComparison.revenueGrowthRate) : 0}
                valueColor={statistics.previousDayComparison ? (statistics.previousDayComparison.revenueGrowthRate >= 0 ? Color.RED : Color.BLUE) : undefined}
                unit="%"
              />
              <StatCard
                title="테이블 회전율"
                value={statistics.tableTurnoverRate.toFixed(1)}
                description={`평균 테이블 이용 시간 ${formatMinutesToTime(statistics.averageStayTimeMinutes)}입니다.`}
                descriptionHighlight={formatMinutesToTime(statistics.averageStayTimeMinutes)}
                highlightRate={statistics.tableTurnoverRate}
                unit="회전"
              />
            </StatCardRow>

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
