import { Table } from '@@types/index';
import AdminTableList from '@components/admin/order/table-manage/list/AdminTableList';
import AdminTableOrderList from '@components/admin/order/table-manage/list/AdminTableOrderList';
import TableQRCode from '@components/admin/order/table-manage/qrcode/TableQRCode';
import TableElapsedTimer from '@components/admin/order/table-manage/timer/TableElapsedTimer';
import TableSessionControler from '@components/admin/order/table-manage/timer/TableSessionControler';
import TableSettingsSidebar from '@components/admin/order/table-manage/setting/TableSettingsSidebar';
import AppContainer from '@components/common/container/AppContainer';
import RightSidebarModal from '@components/common/modal/RightSidebarModal';
import styled from '@emotion/styled';
import useAdminWorkspace from '@hooks/admin/useAdminWorkspace';
import { Color } from '@resources/colors';
import { colFlex } from '@styles/flexStyles';
import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useAtomValue } from 'jotai';
import { adminWorkspaceAtom } from '@jotai/admin/atoms';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 10px;
`;

const TableDetail = styled.div`
  height: 600px;
  display: grid;
  grid-template-rows: 2fr 7fr;
  gap: 5px;
`;

const DetailHeader = styled.div`
  display: grid;
  grid-template-columns: 1.3fr 1fr 1fr;
  gap: 5px;
`;

const FallbackContainer = styled.div`
  height: 600px;
  border: 1px solid #ececec;
  border-radius: 10px;
  font-size: 1.5rem;
  color: ${Color.GREY};
  ${colFlex({ justify: 'center', align: 'center' })};
`;

const FallbackText = styled.div`
  font-size: 1.5rem;
`;

function AdminOrderTable() {
  const { workspaceId } = useParams<{ workspaceId: string }>();

  const [searchParams] = useSearchParams();
  const tableNo = searchParams.get('tableNo');
  const { fetchWorkspaceTables } = useAdminWorkspace();
  const workspace = useAtomValue(adminWorkspaceAtom);

  const [tables, setTables] = useState<Table[]>([]);

  const selectedTable = tables.find((t) => t.tableNumber === Number(tableNo));

  const fetchTables = () => {
    fetchWorkspaceTables(workspaceId)
      .then((response) => {
        setTables(response.data);
      })
      .catch((error) => {
        console.error('테이블 데이터를 조회하는데 문제가 발생했습니다:', error);
      });
  };

  useEffect(() => {
    fetchTables();
  }, [workspace.tableCount]);

  return (
    <AppContainer useFlex={colFlex({ justify: 'center' })}>
      <>
        <Container>
          <AdminTableList tables={tables} />
          {selectedTable ? (
            <TableDetail>
              <DetailHeader>
                <TableElapsedTimer
                  orderSession={selectedTable.orderSession}
                  workspaceId={workspaceId}
                  tableNumber={selectedTable.tableNumber}
                  refetchTable={fetchTables}
                />
                <TableSessionControler
                  workspaceId={workspaceId}
                  orderSessionId={selectedTable.orderSession?.id}
                  currentExpectedEndAt={selectedTable.orderSession?.expectedEndAt}
                  tableNumber={selectedTable.tableNumber}
                  refetchTable={fetchTables}
                  tables={tables}
                />
                <TableQRCode workspaceId={workspaceId} selectedTable={selectedTable} />
              </DetailHeader>
              <AdminTableOrderList workspaceId={Number(workspaceId)} orderSessionId={selectedTable.orderSession?.id || 0} />
            </TableDetail>
          ) : (
            <FallbackContainer>
              <FallbackText>테이블을 선택하여 상세 정보를 확인하세요.</FallbackText>
            </FallbackContainer>
          )}
        </Container>
        <RightSidebarModal title="테이블 설정" subtitle="모든 테이블에 즉시 적용됩니다." useOpenButton={true}>
          <TableSettingsSidebar />
        </RightSidebarModal>
      </>
    </AppContainer>
  );
}

export default AdminOrderTable;
