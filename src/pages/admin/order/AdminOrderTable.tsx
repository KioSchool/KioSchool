import { Table } from '@@types/index';
import AppContainer from '@components/common/container/AppContainer';
import styled from '@emotion/styled';
import useAdminWorkspace from '@hooks/admin/useAdminWorkspace';
import { colFlex } from '@styles/flexStyles';
import { formatRemainingTime } from '@utils/TableTime';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Container = styled.div`
  width: 100%;
  height: 100px;
  ${colFlex({ align: 'center' })}
`;

function AdminOrderTable() {
  const navigate = useNavigate();
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const { fetchWorkspaceTables } = useAdminWorkspace();

  const [tables, setTables] = useState<Table[]>([]);

  useEffect(() => {
    fetchWorkspaceTables(workspaceId)
      .then((response) => {
        setTables(response.data);
      })
      .catch((error) => {
        console.error('테이블 데이터를 조회하는데 문제가 발생했습니다:', error);
      });
  }, []);

  console.log('tables', tables);
  return (
    <AppContainer
      useFlex={colFlex({ justify: 'center' })}
      titleNavBarProps={{
        title: '테이블 주문 조회',
        subTitle: '테이블 별 주문 내역을 조회합니다.',
        onLeftArrowClick: () => navigate(`/admin/workspace/${workspaceId}`),
      }}
    >
      <Container className={'admin-order-table-count-container'}>
        {tables.length > 0 &&
          tables.map((table) => {
            const remainTime = formatRemainingTime(table.orderSession?.expectedEndAt);
            const isUsing = table.orderSession;
            return (
              <div key={table.id}>
                <div>{table.tableNumber}</div>
                <div>{remainTime}</div>
                <div>{isUsing ? '사용중' : '종료됨'}</div>
              </div>
            );
          })}
      </Container>
    </AppContainer>
  );
}

export default AdminOrderTable;
