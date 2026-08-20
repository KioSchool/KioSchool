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
import useTableFilter from '@hooks/admin/useTableFilter';
import useQueryParam from '@hooks/common/useQueryParam';
import { tableNoQueryParamConfig } from '@hooks/common/queryParamConfigs';
import useIsMobile from '@hooks/useIsMobile';
import useTableOrders from '@hooks/admin/useTableOrders';
import { Color } from '@resources/colors';
import { colFlex, JustifyType, rowFlex } from '@styles/flexStyles';
import { mobileMediaQuery } from '@styles/globalStyles';
import { TABLE_DETAIL_COLUMN_PX, TABLE_POLL_INTERVAL_MS } from '@constants/layout';
import { getApiErrorMessage } from '@utils/apiError';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useLocation, useParams } from 'react-router-dom';
import { useAtomValue, useSetAtom } from 'jotai';
import { adminTablesAtom, adminTableViewModeAtom, adminWorkspaceAtom, TABLE_VIEW } from '@jotai/admin/atoms';
import { externalSidebarAtom } from '@jotai/atoms';
import { RIGHT_SIDEBAR_ACTION, Table, TablePosition } from '@@types/index';
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
  height: 600px;
  border: 1px solid #ececec;
  border-radius: 10px;
  font-size: 1.5rem;
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

  const tables = useAtomValue(adminTablesAtom);
  const setAdminTables = useSetAtom(adminTablesAtom);
  const selectedTable = tables.find((t) => t.tableNumber === Number(tableNo));
  const { orders, totalOrderAmount } = useTableOrders(workspaceId, selectedTable?.orderSession?.id);
  const { filterType, setFilterType, counts, filteredTables } = useTableFilter(tables);
  const hasAnyPlacedTable = tables.some((table) => table.position != null);

  const [noticedTableNo, setNoticedTableNo] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSavingLayout, setIsSavingLayout] = useState(false);
  const [conflictedPosition, setConflictedPosition] = useState<TablePosition | null>(null);

  const fetchTables = () => {
    fetchWorkspaceTables(workspaceId);
  };

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
                <TableRefreshButton onClick={fetchTables} />
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
              isSaving={isSavingLayout}
              conflictedPosition={conflictedPosition}
            />
          </EditorArea>
        ) : (
          <Container>
            {viewMode === TABLE_VIEW.LAYOUT ? (
              <TableLayoutView
                tables={filteredTables}
                hasAnyPlacedTable={hasAnyPlacedTable}
                selectedTableNumber={selectedTable?.tableNumber ?? null}
                onSelectTable={handleSelectTable}
              />
            ) : (
              <AdminTableList tables={filteredTables} />
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
              <FallbackContainer>테이블을 선택하여 상세 정보를 확인하세요.</FallbackContainer>
            )}
          </Container>
        )}
        <RightSidebarModal useExternalControl={{ location }} />
      </>
    </AppContainer>
  );
}

export default AdminTableRealtime;
