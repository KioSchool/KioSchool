import { Table } from '@@types/index';
import AdminTableList from '@components/admin/order/table-manage/list/AdminTableList';
import AdminTableOrderList from '@components/admin/order/table-manage/list/AdminTableOrderList';
import TableQRCode from '@components/admin/order/table-manage/qrcode/TableQRCode';
import TableElapsedTimer from '@components/admin/order/table-manage/timer/TableElapsedTimer';
import TableSessionControler from '@components/admin/order/table-manage/timer/TableSessionControler';
import RoundedAppButton from '@components/common/button/RoundedAppButton';
import AppContainer from '@components/common/container/AppContainer';
import styled from '@emotion/styled';
import useAdminWorkspace from '@hooks/admin/useAdminWorkspace';
import { Color } from '@resources/colors';
import { colFlex } from '@styles/flexStyles';
import { useAtomValue } from 'jotai';
import { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { adminWorkspaceAtom } from 'src/jotai/admin/atoms';

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
  border: 1px solid black;
  font-size: 1.5rem;
  color: ${Color.GREY};
  ${colFlex({ justify: 'center', align: 'center' })};
`;

function AdminOrderTable() {
  const navigate = useNavigate();
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const workspaceSetting = useAtomValue(adminWorkspaceAtom).workspaceSetting;

  const [searchParams] = useSearchParams();
  const tableNo = searchParams.get('tableNo');
  const { fetchWorkspaceTables } = useAdminWorkspace();

  const [tables, setTables] = useState<Table[]>([]);

  const selectedTable = tables.find((t) => t.tableNumber === Number(tableNo)) || tables[0];

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
  }, []);

  return (
    <AppContainer
      useFlex={colFlex({ justify: 'center' })}
      titleNavBarProps={{
        title: '테이블 주문 조회',
        children: (
          <RoundedAppButton size={'170px'} onClick={() => navigate(`/admin/workspace/${workspaceId}/table/manage`)}>
            테이블 관리
          </RoundedAppButton>
        ),
        subTitle: `${selectedTable?.tableNumber}번 테이블`,
        onLeftArrowClick: () => navigate(`/admin/workspace/${workspaceId}`),
      }}
    >
      <Container>
        <AdminTableList tables={tables} />
        {selectedTable ? (
          <TableDetail>
            <DetailHeader>
              <TableElapsedTimer createdAt={selectedTable.orderSession?.createdAt} expectedEndAt={selectedTable.orderSession?.expectedEndAt} />
              <TableSessionControler
                timeLimit={workspaceSetting.orderSessionTimeLimitMinutes}
                workspaceId={workspaceId}
                orderSessionId={selectedTable.orderSession?.id}
                currentExpectedEndAt={selectedTable.orderSession?.expectedEndAt}
                tableNumber={selectedTable.tableNumber}
                refetchTable={fetchTables}
              />
              <TableQRCode workspaceId={workspaceId} selectedTable={selectedTable} />
            </DetailHeader>
            <AdminTableOrderList workspaceId={Number(workspaceId)} orderSessionId={selectedTable.orderSession?.id || 0} />
          </TableDetail>
        ) : (
          <FallbackContainer>
            <div>테이블을 선택하여 상세 정보를 확인하세요.</div>
          </FallbackContainer>
        )}
      </Container>
    </AppContainer>
  );
}

export default AdminOrderTable;
