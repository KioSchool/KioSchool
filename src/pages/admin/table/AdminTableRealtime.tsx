import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import styled from '@emotion/styled';
import { useAtomValue, useSetAtom } from 'jotai';
import { toast } from 'react-toastify';
import AdminTableList from '@components/admin/order/table-manage/list/AdminTableList';
import TableLayoutView from '@components/admin/order/table-manage/layout/TableLayoutView';
import TableLayoutEditor from '@components/admin/order/table-manage/layout/edit/TableLayoutEditor';
import TableLayoutPromoPopupContent, { TABLE_LAYOUT_PROMO_POPUP_ID } from '@components/admin/order/table-manage/layout/TableLayoutPromoPopupContent';
import TableDetailPanel from '@components/admin/order/table-manage/detail/TableDetailPanel';
import TableManageTopBar from '@components/admin/order/table-manage/TableManageTopBar';
import TableSettingsSidebar from '@components/admin/order/table-manage/setting/TableSettingsSidebar';
import AppContainer from '@components/common/container/AppContainer';
import RightSidebarModal from '@components/common/modal/RightSidebarModal';
import AppPopup from '@components/common/popup/AppPopup';
import OnboardingStepHint from '@components/admin/workspace/onboarding/OnboardingStepHint';
import { ONBOARDING_MIN_TABLE_COUNT, ONBOARDING_STEP } from '@components/admin/workspace/onboarding/onboardingData';
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
import { adminTablesAtom, adminTableViewModeAtom, adminWorkspaceAtom, TABLE_VIEW, TableView } from '@jotai/admin/atoms';
import { externalSidebarAtom } from '@jotai/atoms';
import { TABLE_CLOCK_TICK_MS, TABLE_DETAIL_COLUMN_PX, TABLE_POLL_INTERVAL_MS, TABLE_VIEW_HEIGHT_PX } from '@constants/layout';
import { GA_EVENT } from '@constants/analytics';
import { POPUP_CLOSE_MODE, PopupData } from '@constants/data/popupData';
import { getAdminWorkspacePath } from '@constants/routes';
import { Color } from '@resources/colors';
import { colFlex } from '@styles/flexStyles';
import { mobileMediaQuery } from '@styles/globalStyles';
import { trackEvent } from '@utils/analytics';
import { isOnboardingStepCompleted } from '@utils/onboarding';
import { RIGHT_SIDEBAR_ACTION, Table } from '@@types/index';

const UNPLACED_NOTICE_TOAST_ID = 'unplaced-table-notice';

const TABLE_REALTIME_POPUP_DATAS: PopupData[] = [
  {
    popupId: 0,
    title: 'Default Popup for prevent flickering',
    expireDate: new Date(1000, 1, 1),
    children: null,
  },
  {
    popupId: TABLE_LAYOUT_PROMO_POPUP_ID,
    title: '테이블 배치 기능 안내',
    expireDate: new Date(2026, 9, 14),
    children: <TableLayoutPromoPopupContent />,
    closeMode: POPUP_CLOSE_MODE.FOREVER,
    closeText: '다시 보지 않기',
  },
];

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

  const location = useLocation();
  const navigate = useNavigate();
  const setExternalSidebar = useSetAtom(externalSidebarAtom);

  // 잔여 시간은 렌더 시점 계산이라 폴링이 멈춰도(편집 중) 주기적으로 다시 그린다
  useClockTick(TABLE_CLOCK_TICK_MS);

  const tables = useAtomValue(adminTablesAtom);
  const setAdminTables = useSetAtom(adminTablesAtom);
  const isTablesOnboardingCompleted = isOnboardingStepCompleted(workspace, ONBOARDING_STEP.TABLES, tables);
  const needsTablesOnboarding = workspace.isOnboarding && !isTablesOnboardingCompleted && workspace.tableCount < ONBOARDING_MIN_TABLE_COUNT;
  const needsTableLayoutOnboarding = workspace.isOnboarding && !isTablesOnboardingCompleted && workspace.tableCount >= ONBOARDING_MIN_TABLE_COUNT;
  const viewMode = isMobile ? TABLE_VIEW.LIST : storedViewMode;
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

  // 배치/리스트 뷰 사용률의 공통 파라미터. `table_view_mode`는 반드시 이 파생값을 써야 한다 —
  // 모바일에서는 저장된 선호(`storedViewMode`)와 실제 화면이 갈라지므로, 하위 컴포넌트가
  // `adminTableViewModeAtom`을 직접 읽으면 리스트를 보는 사용자가 배치로 집계된다.
  const viewAnalyticsParams = {
    table_view_mode: viewMode,
    workspace_id: workspaceId,
    occupied_table_count: counts[TABLE_FILTER.USING] + counts[TABLE_FILTER.WARNING] + counts[TABLE_FILTER.EXCEEDED],
  };

  // 진입 시 1회가 아니라 뷰가 바뀔 때마다 찍는다. 프로모 팝업·온보딩 유도는 페이지에 머문 채로
  // 모드를 바꾸므로, 진입 시점에만 찍으면 분모는 LIST인데 분자는 LAYOUT이 되어 비율이 깨진다.
  const lastShownViewModeRef = useRef<TableView | null>(null);

  useEffect(() => {
    // 마운트 직후엔 테이블이 아직 비어 있어 점유/전체 수가 0으로 찍힌다
    if (tables.length === 0) return;
    if (lastShownViewModeRef.current === viewMode) return;

    lastShownViewModeRef.current = viewMode;
    trackEvent(GA_EVENT.TABLE_VIEW_SHOWN, {
      ...viewAnalyticsParams,
      total_table_count: tables.length,
      positioned_table_count: tables.filter((table) => table.position != null).length,
      is_onboarding: workspace.isOnboarding,
    });
  }, [viewMode, tables]);

  // 배치 뷰와 리스트 뷰는 선택 경로가 다르지만(`onSelectTable` vs `TableListItem`의 searchParams)
  // 둘 다 `tableNo`로 수렴하므로 여기 한 곳에서만 계측한다.
  const isInitialTableNoRef = useRef(true);

  useEffect(() => {
    // 새로고침·딥링크로 이미 들어 있던 값(기본값 '1' 포함)은 사용자의 선택이 아니다
    if (isInitialTableNoRef.current) {
      isInitialTableNoRef.current = false;
      return;
    }

    trackEvent(GA_EVENT.TABLE_SELECTED, viewAnalyticsParams);
  }, [tableNo]);

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
    trackEvent(GA_EVENT.TABLE_LAYOUT_EDIT_START, { workspace_id: workspaceId });
    clearConflict();
    setIsEditing(true);
  };

  const handleExitEdit = () => {
    setIsEditing(false);
    fetchTables();
  };

  const handleSaveLayout = async (changes: TablePositionUpdate[]) => {
    const changedPositionByTableId = new Map(changes.map(({ tableId, position }) => [tableId, position]));
    const completesTableOnboarding =
      workspace.isOnboarding &&
      workspace.tableCount >= ONBOARDING_MIN_TABLE_COUNT &&
      tables.length === workspace.tableCount &&
      tables.some((table) => (changedPositionByTableId.has(table.id) ? changedPositionByTableId.get(table.id) : table.position) != null);

    const saved = await saveLayout(changes);
    if (!saved) return;

    trackEvent(GA_EVENT.TABLE_LAYOUT_SAVED, { workspace_id: workspaceId, table_count: changes.length });
    setIsEditing(false);

    if (completesTableOnboarding) {
      navigate(getAdminWorkspacePath(workspace.id));
    }
  };

  // 편집도 좌측 영역만 인라인 교체한다 — 우측 상세 구역까지 갈아엎으면 별도 페이지로 이동한 느낌을 준다
  const renderMainColumn = () => {
    if (viewMode !== TABLE_VIEW.LAYOUT) return <AdminTableList tables={filteredTables} orderStatsBySessionId={statsBySessionId} />;

    if (isEditing) {
      return (
        <TableLayoutEditor
          tables={tables}
          onExit={handleExitEdit}
          onSave={handleSaveLayout}
          onPositionChange={clearConflict}
          isSaving={isSavingLayout}
          conflictedPosition={conflictedPosition}
        />
      );
    }

    return (
      <TableLayoutView
        tables={tables}
        orderStatsBySessionId={statsBySessionId}
        visibleTableNumbers={visibleTableNumbers}
        selectedTableNumber={selectedTable?.tableNumber ?? null}
        onSelectTable={handleSelectTable}
        onStartEdit={handleStartEdit}
        highlightEditButton={needsTableLayoutOnboarding}
      />
    );
  };

  const renderDetailColumn = () => {
    if (isEditing) return <FallbackContainer>배치 편집 중에는 테이블 상세를 확인할 수 없습니다</FallbackContainer>;
    if (!selectedTable) return <FallbackContainer>테이블을 선택하면 상세 정보가 여기에 표시됩니다</FallbackContainer>;

    return (
      <TableDetailPanel
        workspaceId={workspaceId}
        workspaceName={workspace.name}
        table={selectedTable}
        orders={orders}
        refetchTable={fetchTables}
        viewMode={viewMode}
      />
    );
  };

  return (
    <AppContainer useFlex={colFlex({ justify: 'start', align: 'center' })}>
      <>
        <OnboardingStepHint step={ONBOARDING_STEP.TABLES} width="1000px" />
        <TableManageTopBar
          showFilters={!isEditing}
          highlightSettings={needsTablesOnboarding}
          highlightLayout={needsTableLayoutOnboarding && viewMode !== TABLE_VIEW.LAYOUT}
          filterType={filterType}
          filterCounts={counts}
          onChangeFilter={setFilterType}
          onOpenSettings={handleOpenSettings}
          onRefresh={handleManualRefresh}
        />
        <Container>
          {renderMainColumn()}
          {renderDetailColumn()}
        </Container>
        <RightSidebarModal useExternalControl={{ location }} />
        {!isMobile && <AppPopup popupDatas={TABLE_REALTIME_POPUP_DATAS} />}
      </>
    </AppContainer>
  );
}

export default AdminTableRealtime;
