import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import styled from '@emotion/styled';
import { useAtomValue, useSetAtom } from 'jotai';
import { toast } from 'react-toastify';
import AdminTableList from '@components/admin/order/table-manage/list/AdminTableList';
import TableLayoutView from '@components/admin/order/table-manage/layout/TableLayoutView';
import TableLayoutEditor from '@components/admin/order/table-manage/layout/edit/TableLayoutEditor';
import TableDetailPanel from '@components/admin/order/table-manage/detail/TableDetailPanel';
import TableManageTopBar from '@components/admin/order/table-manage/TableManageTopBar';
import TableSettingsSidebar from '@components/admin/order/table-manage/setting/TableSettingsSidebar';
import AppContainer from '@components/common/container/AppContainer';
import RightSidebarModal from '@components/common/modal/RightSidebarModal';
import OnboardingStepHint from '@components/admin/workspace/onboarding/OnboardingStepHint';
import { ONBOARDING_STEP } from '@components/admin/workspace/onboarding/onboardingData';
import useAdminWorkspace from '@hooks/admin/useAdminWorkspace';
import useTableFilter, { TABLE_FILTER } from '@hooks/admin/useTableFilter';
import useTableLayoutSave from '@hooks/admin/useTableLayoutSave';
import useTableOrders from '@hooks/admin/useTableOrders';
import useTableOrderStats from '@hooks/admin/useTableOrderStats';
import useClockTick from '@hooks/common/useClockTick';
import useQueryParam from '@hooks/common/useQueryParam';
import { tableNoQueryParamConfig } from '@hooks/common/queryParamConfigs';
import useIsMobile from '@hooks/useIsMobile';
import { TablePositionUpdate } from '@hooks/admin/useAdminTableLayout';
import { adminTablesAtom, adminTableViewModeAtom, adminWorkspaceAtom, TABLE_VIEW } from '@jotai/admin/atoms';
import { externalSidebarAtom } from '@jotai/atoms';
import { TABLE_CLOCK_TICK_MS, TABLE_DETAIL_COLUMN_PX, TABLE_POLL_INTERVAL_MS, TABLE_VIEW_HEIGHT_PX } from '@constants/layout';
import { Color } from '@resources/colors';
import { colFlex } from '@styles/flexStyles';
import { mobileMediaQuery } from '@styles/globalStyles';
import { isOnboardingStepCompleted } from '@utils/onboarding';
import { RIGHT_SIDEBAR_ACTION, Table } from '@@types/index';

const UNPLACED_NOTICE_TOAST_ID = 'unplaced-table-notice';

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
  const workspace = useAtomValue(adminWorkspaceAtom);
  const storedViewMode = useAtomValue(adminTableViewModeAtom);
  const isMobile = useIsMobile();
  const viewMode = isMobile ? TABLE_VIEW.LIST : storedViewMode;

  const location = useLocation();
  const setExternalSidebar = useSetAtom(externalSidebarAtom);

  // 잔여 시간은 렌더 시점 계산이라 폴링이 멈춰도(편집 중) 주기적으로 다시 그린다
  useClockTick(TABLE_CLOCK_TICK_MS);

  const tables = useAtomValue(adminTablesAtom);
  const setAdminTables = useSetAtom(adminTablesAtom);
  const selectedTable = tables.find((table) => table.tableNumber === Number(tableNo));
  const { orders, fetchOrders } = useTableOrders(workspaceId, selectedTable?.orderSession?.id);
  const { filterType, setFilterType, counts, filteredTables } = useTableFilter(tables);
  const { statsBySessionId, refresh: refreshOrderStats } = useTableOrderStats(workspaceId, tables);
  const { isSaving: isSavingLayout, conflictedPosition, clearConflict, save: saveLayout } = useTableLayoutSave(workspaceId, setAdminTables);

  const visibleTableNumbers = filterType === TABLE_FILTER.ALL ? null : new Set(filteredTables.map((table) => table.tableNumber));

  const [noticedTableNo, setNoticedTableNo] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const fetchTables = () => {
    fetchWorkspaceTables(workspaceId);
  };

  const handleManualRefresh = () => {
    fetchTables();
    refreshOrderStats();
    fetchOrders();
  };

  useEffect(() => {
    fetchTables();
  }, [workspace.tableCount]);

  useEffect(() => {
    if (isEditing) return undefined;

    const timer = setInterval(() => {
      if (document.hidden) return;
      fetchTables();
      refreshOrderStats();
    }, TABLE_POLL_INTERVAL_MS);

    return () => clearInterval(timer);
  }, [isEditing, workspaceId]);

  useEffect(() => {
    if (viewMode !== TABLE_VIEW.LAYOUT) return;
    if (!selectedTable || selectedTable.position != null) return;
    if (noticedTableNo === tableNo) return;

    const message = `${selectedTable.tableNumber}번 테이블은 아직 배치되지 않았습니다.`;
    if (toast.isActive(UNPLACED_NOTICE_TOAST_ID)) {
      toast.update(UNPLACED_NOTICE_TOAST_ID, { render: message });
    } else {
      toast.info(message, { toastId: UNPLACED_NOTICE_TOAST_ID });
    }
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
    setTableNo(String(table.tableNumber), { replace: true });
  };

  const handleStartEdit = () => {
    clearConflict();
    setIsEditing(true);
  };

  const handleExitEdit = () => {
    setIsEditing(false);
    fetchTables();
  };

  const handleSaveLayout = async (changes: TablePositionUpdate[]) => {
    const saved = await saveLayout(changes);
    if (saved) setIsEditing(false);
  };

  const needsTablesOnboarding = workspace.isOnboarding && !isOnboardingStepCompleted(workspace, ONBOARDING_STEP.TABLES);

  return (
    <AppContainer useFlex={colFlex({ justify: 'start', align: 'center' })}>
      <>
        <OnboardingStepHint step={ONBOARDING_STEP.TABLES} width="1000px" />
        <TableManageTopBar
          showFilters={!isEditing}
          highlightSettings={needsTablesOnboarding}
          filterType={filterType}
          filterCounts={counts}
          onChangeFilter={setFilterType}
          onOpenSettings={handleOpenSettings}
          onRefresh={handleManualRefresh}
        />
        {isEditing ? (
          <EditorArea>
            <TableLayoutEditor
              tables={tables}
              onExit={handleExitEdit}
              onSave={handleSaveLayout}
              onPositionChange={clearConflict}
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
                onSelectTable={handleSelectTable}
                onStartEdit={handleStartEdit}
              />
            ) : (
              <AdminTableList tables={filteredTables} orderStatsBySessionId={statsBySessionId} />
            )}
            {selectedTable ? (
              <TableDetailPanel workspaceId={workspaceId} workspaceName={workspace.name} table={selectedTable} orders={orders} refetchTable={fetchTables} />
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
