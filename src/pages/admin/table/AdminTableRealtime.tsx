import AdminTableList from '@components/admin/order/table-manage/list/AdminTableList';
import TableLayoutView from '@components/admin/order/table-manage/layout/TableLayoutView/TableLayoutView';
import TableLayoutEditor from '@components/admin/order/table-manage/layout/edit/TableLayoutEditor/TableLayoutEditor';
import TableDetailPanel from '@components/admin/order/table-manage/detail/TableDetailPanel/TableDetailPanel';
import TableSettingsSidebar from '@components/admin/order/table-manage/setting/TableSettingsSidebar';
import ViewToggle from '@components/admin/order/table-manage/ViewToggle/ViewToggle';
import TableFilterBar from '@components/admin/order/table-manage/TableFilterBar/TableFilterBar';
import TableRefreshButton from '@components/admin/order/table-manage/TableRefreshButton/TableRefreshButton';
import AppContainer from '@components/common/container/AppContainer';
import RightSidebarModal from '@components/common/modal/RightSidebarModal';
import styled from '@emotion/styled';
import { css, keyframes } from '@emotion/react';
import useAdminWorkspace from '@hooks/admin/useAdminWorkspace';
import useAdminTableLayout, { parseConflictIndex, TablePositionUpdate } from '@hooks/admin/useAdminTableLayout';
import useTableFilter, { TABLE_FILTER } from '@hooks/admin/useTableFilter';
import useTableFlash from '@hooks/admin/useTableFlash';
import useTableOrderStats from '@hooks/admin/useTableOrderStats';
import useTableOrdersWebsocket from '@hooks/admin/useTableOrdersWebsocket';
import useClockTick from '@hooks/common/useClockTick';
import useQueryParam from '@hooks/common/useQueryParam';
import { tableNoQueryParamConfig } from '@hooks/common/queryParamConfigs';
import useIsMobile from '@hooks/useIsMobile';
import useTableOrders from '@hooks/admin/useTableOrders';
import { Color } from '@resources/colors';
import { colFlex, JustifyType, rowFlex } from '@styles/flexStyles';
import { mobileMediaQuery } from '@styles/globalStyles';
import { TABLE_CLOCK_TICK_MS, TABLE_DETAIL_COLUMN_PX, TABLE_POLL_INTERVAL_MS, TABLE_VIEW_HEIGHT_PX } from '@constants/layout';
import { getApiErrorMessage } from '@utils/apiError';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useLocation, useParams } from 'react-router-dom';
import { useAtomValue, useSetAtom } from 'jotai';
import { adminTablesAtom, adminTableViewModeAtom, adminWorkspaceAtom, TABLE_VIEW } from '@jotai/admin/atoms';
import { externalSidebarAtom } from '@jotai/atoms';
import { Order, RIGHT_SIDEBAR_ACTION, Table, TablePosition } from '@@types/index';
import NewCommonButton from '@components/common/button/NewCommonButton';
import { RiSettings3Fill } from '@remixicon/react';
import { ONBOARDING_STEP } from '@components/admin/workspace/onboarding/onboardingData';
import { isOnboardingStepCompleted } from '@utils/onboarding';
import OnboardingStepHint from '@components/admin/workspace/onboarding/OnboardingStepHint';

const Container = styled.div`
  width: 95%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr ${TABLE_DETAIL_COLUMN_PX}px;
  gap: 10px;

  ${mobileMediaQuery} {
    grid-template-columns: 1fr 2fr;
  }
`;

const EditorArea = styled.div`
  width: 95%;
`;

const SettingIcon = styled(RiSettings3Fill)`
  margin-right: 10px;
  color: ${Color.WHITE};
`;

const TopBar = styled.div`
  width: 95%;
  padding-top: 12px;
  padding-bottom: 24px;
  gap: 12px;

  ${colFlex()};
`;

const TopBarRow = styled.div<{ justify?: JustifyType }>`
  ${({ justify }) => rowFlex({ justify: justify ?? 'space-between', align: 'center' })};
`;

const TopBarActions = styled.div`
  gap: 8px;

  ${rowFlex({ align: 'center' })};
`;

const buttonPulseAnimation = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(255, 145, 66, 0.45); }
  70% { box-shadow: 0 0 0 10px rgba(255, 145, 66, 0); }
  100% { box-shadow: 0 0 0 0 rgba(255, 145, 66, 0); }
`;

const ButtonHighlightWrapper = styled.div<{ animate: boolean }>`
  border-radius: 40px;
  ${({ animate }) =>
    animate &&
    css`
      animation: ${buttonPulseAnimation} 1.8s ease-out infinite;
    `}
`;

const FallbackContainer = styled.div`
  height: ${TABLE_VIEW_HEIGHT_PX}px;
  box-sizing: border-box;
  border: 1px dashed ${Color.HEAVY_GREY};
  border-radius: 16px;
  padding: 0 24px;
  font-size: 14px;
  line-height: 1.6;
  text-align: center;
  color: ${Color.GREY};
  ${colFlex({ justify: 'center', align: 'center' })};
`;

function AdminTableRealtime() {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const { value: tableNo, setValue: setTableNo } = useQueryParam(tableNoQueryParamConfig);
  const { fetchWorkspaceTables } = useAdminWorkspace();
  const { updateTablePositions } = useAdminTableLayout(workspaceId);
  const workspace = useAtomValue(adminWorkspaceAtom);
  const storedViewMode = useAtomValue(adminTableViewModeAtom);
  const isMobile = useIsMobile();
  const viewMode = isMobile ? TABLE_VIEW.LIST : storedViewMode;

  const location = useLocation();
  const setExternalSidebar = useSetAtom(externalSidebarAtom);

  // 잔여 시간·상태색은 렌더 시점의 현재 시각으로 계산된다. 폴링이 멈춘 동안(편집 중·응답 지연)에도 표기가 굳지 않게 주기적으로 다시 그린다.
  useClockTick(TABLE_CLOCK_TICK_MS);

  const tables = useAtomValue(adminTablesAtom);
  const setAdminTables = useSetAtom(adminTablesAtom);
  const selectedTable = tables.find((t) => t.tableNumber === Number(tableNo));
  const { orders, totalOrderAmount, fetchOrders } = useTableOrders(workspaceId, selectedTable?.orderSession?.id);
  const { filterType, setFilterType, counts, filteredTables } = useTableFilter(tables);
  const { flashingTableNumbers, flashTable } = useTableFlash();
  const { statsBySessionId, applyOrder, refresh: refreshOrderStats } = useTableOrderStats(workspaceId);

  // 배치 뷰에서 필터는 카드를 지우지 않고 흐리게만 한다. 지우면 홀의 공간 맥락이 깨진다. null이면 필터 없음.
  const visibleTableNumbers = filterType === TABLE_FILTER.ALL ? null : new Set(filteredTables.map((table) => table.tableNumber));

  const [noticedTableNo, setNoticedTableNo] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSavingLayout, setIsSavingLayout] = useState(false);
  const [conflictedPosition, setConflictedPosition] = useState<TablePosition | null>(null);

  const fetchTables = () => {
    fetchWorkspaceTables(workspaceId);
  };

  const handleOrderCreated = (order: Order) => {
    applyOrder(order);
    flashTable(order.tableNumber);
    fetchTables();
    if (order.tableNumber === selectedTable?.tableNumber) fetchOrders();
  };

  const handleOrderUpdated = (order: Order) => {
    applyOrder(order);
    if (order.tableNumber === selectedTable?.tableNumber) fetchOrders();
  };

  const handleManualRefresh = () => {
    fetchTables();
    refreshOrderStats();
  };

  useTableOrdersWebsocket(workspaceId, { onOrderCreated: handleOrderCreated, onOrderUpdated: handleOrderUpdated });

  useEffect(() => {
    fetchTables();
  }, [workspace.tableCount]);

  useEffect(() => {
    if (isEditing) return undefined;

    const timer = setInterval(() => {
      if (document.hidden) return;
      fetchTables();
    }, TABLE_POLL_INTERVAL_MS);

    return () => clearInterval(timer);
  }, [isEditing, workspaceId]);

  useEffect(() => {
    if (viewMode !== TABLE_VIEW.LAYOUT) return;
    if (!selectedTable || selectedTable.position != null) return;
    if (noticedTableNo === tableNo) return;

    toast.info(`${selectedTable.tableNumber}번 테이블은 아직 배치되지 않았습니다.`);
    setNoticedTableNo(tableNo);
  }, [viewMode, selectedTable, tableNo, noticedTableNo]);

  const handleOpenSettings = () => {
    setExternalSidebar({
      location,
      title: '테이블 설정',
      action: RIGHT_SIDEBAR_ACTION.OPEN,
      content: <TableSettingsSidebar />,
    });
  };

  const handleSelectTable = (table: Table) => {
    setTableNo(String(table.tableNumber));
  };

  const handleStartEdit = () => {
    setConflictedPosition(null);
    setIsEditing(true);
  };

  const handlePositionChange = () => {
    setConflictedPosition(null);
  };

  const handleExitEdit = () => {
    setIsEditing(false);
    fetchTables();
  };

  const handleSaveError = (error: unknown, changes: TablePositionUpdate[]) => {
    const index = parseConflictIndex(error);
    const conflicted = index !== null ? changes[index]?.position ?? null : null;

    setConflictedPosition(conflicted);

    const fallback = conflicted ? '이미 다른 테이블이 있는 자리입니다.' : '배치 저장에 실패했어요. 잠시 후 다시 시도해주세요.';
    toast.error(getApiErrorMessage(error, fallback));
  };

  const handleSaveLayout = async (changes: TablePositionUpdate[]) => {
    setIsSavingLayout(true);
    try {
      const updated = await updateTablePositions(changes);
      setAdminTables(updated);
      setConflictedPosition(null);
      setIsEditing(false);
      toast.success('배치를 저장했습니다.');
    } catch (error) {
      handleSaveError(error, changes);
    } finally {
      setIsSavingLayout(false);
    }
  };

  const needsTablesOnboarding = workspace.isOnboarding && !isOnboardingStepCompleted(workspace, ONBOARDING_STEP.TABLES);

  return (
    <AppContainer useFlex={colFlex({ justify: 'start', align: 'center' })}>
      <>
        <OnboardingStepHint step={ONBOARDING_STEP.TABLES} width="1000px" />
        <TopBar>
          <TopBarRow justify="flex-end">
            <TopBarActions>
              {viewMode === TABLE_VIEW.LAYOUT && !isEditing && (
                <NewCommonButton size="sm" color="blue_gray" onClick={handleStartEdit}>
                  배치 편집
                </NewCommonButton>
              )}
              <ButtonHighlightWrapper animate={needsTablesOnboarding}>
                <NewCommonButton size="sm" icon={<SettingIcon />} onClick={handleOpenSettings}>
                  테이블 설정
                </NewCommonButton>
              </ButtonHighlightWrapper>
            </TopBarActions>
          </TopBarRow>
          {!isEditing && (
            <TopBarRow>
              <TableFilterBar activeFilter={filterType} counts={counts} onChange={setFilterType} />
              <TopBarActions>
                <ViewToggle />
                <TableRefreshButton onClick={handleManualRefresh} />
              </TopBarActions>
            </TopBarRow>
          )}
        </TopBar>
        {isEditing ? (
          <EditorArea>
            <TableLayoutEditor
              tables={tables}
              onExit={handleExitEdit}
              onSave={handleSaveLayout}
              onPositionChange={handlePositionChange}
              isSaving={isSavingLayout}
              conflictedPosition={conflictedPosition}
            />
          </EditorArea>
        ) : (
          <Container>
            {viewMode === TABLE_VIEW.LAYOUT ? (
              <TableLayoutView
                tables={tables}
                orderStatsBySessionId={statsBySessionId}
                visibleTableNumbers={visibleTableNumbers}
                selectedTableNumber={selectedTable?.tableNumber ?? null}
                flashingTableNumbers={flashingTableNumbers}
                onSelectTable={handleSelectTable}
                onStartEdit={handleStartEdit}
              />
            ) : (
              <AdminTableList tables={filteredTables} orderStatsBySessionId={statsBySessionId} />
            )}
            {selectedTable ? (
              <TableDetailPanel
                workspaceId={workspaceId}
                workspaceName={workspace.name}
                table={selectedTable}
                orders={orders}
                totalOrderAmount={totalOrderAmount}
                refetchTable={fetchTables}
              />
            ) : (
              <FallbackContainer>테이블을 선택하면 상세 정보가 여기에 표시됩니다</FallbackContainer>
            )}
          </Container>
        )}
        <RightSidebarModal useExternalControl={{ location }} />
      </>
    </AppContainer>
  );
}

export default AdminTableRealtime;
