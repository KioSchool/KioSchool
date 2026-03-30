import AdminTableList from '@components/admin/order/table-manage/list/AdminTableList';
import AdminTableOrderList from '@components/admin/order/table-manage/list/AdminTableOrderList';
import TableQRCode from '@components/admin/order/table-manage/qrcode/TableQRCode';
import TableElapsedTimer from '@components/admin/order/table-manage/timer/TableElapsedTimer';
import TableSessionControler from '@components/admin/order/table-manage/timer/TableSessionControler';
import TableOrderAmount from '@components/admin/order/table-manage/TableOrderAmount';
import InactiveTableView from '@components/admin/order/table-manage/InactiveTableView';
import TableSettingsSidebar from '@components/admin/order/table-manage/setting/TableSettingsSidebar';
import AppContainer from '@components/common/container/AppContainer';
import RightSidebarModal from '@components/common/modal/RightSidebarModal';
import styled from '@emotion/styled';
import useAdminWorkspace from '@hooks/admin/useAdminWorkspace';
import useTableOrders from '@hooks/admin/useTableOrders';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { useEffect, useState } from 'react';
import { useParams, useSearchParams, useLocation } from 'react-router-dom';
import { useAtomValue, useSetAtom } from 'jotai';
import { adminWorkspaceAtom, externalSidebarAtom } from '@jotai/admin/atoms';
import { RIGHT_SIDEBAR_ACTION, Table } from '@@types/index';
import NewCommonButton from '@components/common/button/NewCommonButton';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 10px;
`;

const DetailWrapper = styled.div`
  position: relative;
  height: 600px;
`;

const TableDetail = styled.div`
  height: 100%;
  display: grid;
  grid-template-rows: auto 1fr;
  gap: 5px;
`;

const DetailHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5px;
  height: 320px;
`;

const RightColumn = styled.div`
  ${colFlex()};
  gap: 12px;
`;

const TopCards = styled.div`
  ${rowFlex({ justify: 'space-between' })};
  gap: 5px;
`;

const SettingsButtonContainer = styled.div`
  width: 1000px;
  padding-bottom: 24px;
  ${colFlex({ align: 'end' })}
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
  const [searchParams] = useSearchParams();
  const tableNo = searchParams.get('tableNo');
  const { fetchWorkspaceTables } = useAdminWorkspace();
  const workspace = useAtomValue(adminWorkspaceAtom);

  const location = useLocation();
  const setExternalSidebar = useSetAtom(externalSidebarAtom);

  const [tables, setTables] = useState<Table[]>([]);
  const selectedTable = tables.find((t) => t.tableNumber === Number(tableNo));
  const { orders, totalOrderAmount, fetchOrders } = useTableOrders(workspaceId, selectedTable?.orderSession?.id);

  const fetchTables = () => {
    fetchWorkspaceTables(workspaceId)
      .then((response) => setTables(response.data))
      .catch((error) => console.error('테이블 데이터를 조회하는데 문제가 발생했습니다:', error));
  };

  useEffect(() => {
    fetchTables();
  }, [workspace.tableCount]);

  const handleOpenSettings = () => {
    setExternalSidebar({
      location,
      title: '테이블 설정',
      action: RIGHT_SIDEBAR_ACTION.OPEN,
      content: <TableSettingsSidebar />,
    });
  };

  return (
    <AppContainer useFlex={colFlex({ justify: 'center', align: 'center' })}>
      <>
        <SettingsButtonContainer>
          <NewCommonButton size="sm" onClick={handleOpenSettings}>
            테이블 설정
          </NewCommonButton>
        </SettingsButtonContainer>
        <Container>
          <AdminTableList tables={tables} />
          {selectedTable ? (
            <DetailWrapper>
              <TableDetail>
                <DetailHeader>
                  <TableElapsedTimer
                    orderSession={selectedTable.orderSession}
                    workspaceId={workspaceId}
                    tableNumber={selectedTable.tableNumber}
                    refetchTable={fetchTables}
                  />
                  <RightColumn>
                    <TopCards>
                      <TableQRCode workspaceId={workspaceId} selectedTable={selectedTable} />
                      <TableOrderAmount totalOrderAmount={totalOrderAmount} />
                    </TopCards>
                    <TableSessionControler
                      workspaceId={workspaceId}
                      orderSessionId={selectedTable.orderSession?.id}
                      currentExpectedEndAt={selectedTable.orderSession?.expectedEndAt}
                      tableNumber={selectedTable.tableNumber}
                      refetchTable={fetchTables}
                      tables={tables}
                    />
                  </RightColumn>
                </DetailHeader>
                <AdminTableOrderList orders={orders} onRefresh={fetchOrders} />
              </TableDetail>
              {!selectedTable.orderSession && (
                <InactiveTableView workspaceId={workspaceId} tableNumber={selectedTable.tableNumber} refetchTable={fetchTables} />
              )}
            </DetailWrapper>
          ) : (
            <FallbackContainer>테이블을 선택하여 상세 정보를 확인하세요.</FallbackContainer>
          )}
        </Container>
        <RightSidebarModal useExternalControl={{ location }} />
      </>
    </AppContainer>
  );
}

export default AdminTableRealtime;
