import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from '@emotion/styled';
import { format } from 'date-fns';
import { colFlex, rowFlex } from '@styles/flexStyles';
import AppContainer from '@components/common/container/AppContainer';
import CustomSelect from '@components/common/select/CustomSelect';
import CustomDatePicker from '@components/common/date-picker/CustomDatePicker';
import CustomCheckbox from '@components/common/checkbox/CustomCheckbox';
import StatCard from '@components/common/card/StatCard';
import TimelineGrid from '@components/admin/order/timeline/TimelineGrid';
import SessionDetailModal from '@components/admin/order/timeline/SessionDetailModal';
import { useAdminFetchTableSessionTimeline } from '@hooks/admin/useAdminFetchTableSessionTimeline';
import useAdminProducts from '@hooks/admin/useAdminProducts';
import useModal from '@hooks/useModal';
import { OrderSessionWithOrder } from '@@types/index';
import { formatMinutesToTime } from '@utils/formatDate';
import { TIMELINE_COLORS } from '@components/admin/order/timeline/timelineConstants';
import { RiRefreshLine } from '@remixicon/react';
import { expandButtonStyle } from '@styles/buttonStyles';

const FilterContainer = styled.div`
  width: 100%;
  margin-bottom: 20px;
  ${rowFlex({ justify: 'space-between', align: 'center' })};
`;

const FilterLeft = styled.div`
  gap: 20px;
  ${rowFlex({ align: 'center' })}
`;

const UpdateInfo = styled.div`
  gap: 6px;
  ${rowFlex({ align: 'center' })}
`;

const UpdateLabel = styled.span`
  font-size: 12px;
  color: ${TIMELINE_COLORS.TEXT_PRIMARY};
`;

const RefreshIcon = styled(RiRefreshLine)`
  width: 16px;
  height: 16px;
  color: ${TIMELINE_COLORS.TEXT_PRIMARY};
  ${expandButtonStyle}
`;

const StatCardRow = styled.div`
  width: 100%;
  gap: 12px;
  margin-bottom: 20px;
  ${rowFlex()}

  & > * {
    flex: 1;
    width: auto;
  }
`;

function AdminOrderTimeline() {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const { selectedDate, setSelectedDate, filters, setFilters, filteredSessions, summaryStats, priceRange, currentTime, isLoading, tableCount, manualRefetch } =
    useAdminFetchTableSessionTimeline(workspaceId);
  const { fetchProducts } = useAdminProducts(workspaceId);

  const [selectedSession, setSelectedSession] = useState<OrderSessionWithOrder | null>(null);
  const { isModalOpen, openModal, closeModal } = useModal();

  useEffect(() => {
    fetchProducts();
  }, [workspaceId]);

  const handleSessionClick = useCallback(
    (session: OrderSessionWithOrder) => {
      setSelectedSession(session);
      openModal();
    },
    [openModal],
  );

  const handleCloseModal = useCallback(() => {
    closeModal();
    setSelectedSession(null);
  }, [closeModal]);

  const dateLabel = format(selectedDate, 'yyyy년 MM월 dd일');

  return (
    <AppContainer useFlex={colFlex({ justify: 'start' })} customWidth={'1200px'}>
      <>
        <FilterContainer>
          <FilterLeft>
            <CustomSelect value={dateLabel} triggerLabel={dateLabel} highlightOnSelect={true} width="160px">
              <CustomDatePicker mode="single" selectedDate={selectedDate} onDateChange={setSelectedDate} />
            </CustomSelect>
            <CustomCheckbox
              checked={filters.showValidSessionsOnly}
              onChange={(checked) => setFilters((prev) => ({ ...prev, showValidSessionsOnly: checked }))}
              label="30분 이상 세션만 보기"
            />
            <CustomCheckbox
              checked={filters.hasOrders}
              onChange={(checked) => setFilters((prev) => ({ ...prev, hasOrders: checked }))}
              label="주문 내역 존재 세션만 보기"
            />
          </FilterLeft>
          <UpdateInfo>
            <UpdateLabel>최종 업데이트 {format(currentTime, 'HH:mm')}</UpdateLabel>
            <RefreshIcon onClick={manualRefetch} />
          </UpdateInfo>
        </FilterContainer>

        <StatCardRow>
          <StatCard title="총 주문 건 수" value={summaryStats.totalOrderCount} unit="건" height={100} />
          <StatCard title="총 매출액" value={summaryStats.totalRevenue.toLocaleString()} unit="원" height={100} />
          <StatCard title="테이블 회전율" value={summaryStats.tableTurnoverRate.toFixed(1)} unit="회전" height={100} />
          <StatCard title="테이블 이용 시간" value={formatMinutesToTime(summaryStats.averageDurationMinutes)} height={100} />
        </StatCardRow>

        <TimelineGrid
          sessions={filteredSessions}
          tableCount={tableCount}
          selectedDate={selectedDate}
          currentTime={currentTime}
          minPrice={priceRange.min}
          maxPrice={priceRange.max}
          isLoading={isLoading}
          onSessionClick={handleSessionClick}
        />

        {selectedSession && <SessionDetailModal session={selectedSession} currentTime={currentTime} isModalOpen={isModalOpen} closeModal={handleCloseModal} />}
      </>
    </AppContainer>
  );
}

export default AdminOrderTimeline;
