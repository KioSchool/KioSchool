import { Table } from '@@types/index';
import AppContainer from '@components/common/container/AppContainer';
import styled from '@emotion/styled';
import useAdminWorkspace from '@hooks/admin/useAdminWorkspace';
import { colFlex } from '@styles/flexStyles';
import { formatRemainingTime } from '@utils/TableTime';
import { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

const Container = styled.div`
  width: 100%;
  height: 100%;
  ${colFlex({ align: 'center' })}
`;

function AdminOrderTable() {
  const navigate = useNavigate();
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const tableNo = searchParams.get('tableNo');
  const { fetchWorkspaceTables } = useAdminWorkspace();

  const [tables, setTables] = useState<Table[]>([]);
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);

  useEffect(() => {
    fetchWorkspaceTables(workspaceId)
      .then((response) => {
        setTables(response.data);
      })
      .catch((error) => {
        console.error('테이블 데이터를 조회하는데 문제가 발생했습니다:', error);
      });
  }, [workspaceId]);

  useEffect(() => {
    if (tableNo) {
      const table = tables.find((t) => t.tableNumber === Number(tableNo));
      setSelectedTable(table || null);
    } else {
      setSelectedTable(null);
    }
  }, [tableNo, tables]);

  console.log('tables', tables);
  console.log('selectedTable', selectedTable);

  const onClickTable = (tableNumber: number) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('tableNo', String(tableNumber));
    setSearchParams(newSearchParams);
  };
  return (
    <AppContainer
      useFlex={colFlex({ justify: 'center' })}
      titleNavBarProps={{
        title: '테이블 주문 조회',
        subTitle: `${selectedTable?.tableNumber}번 테이블`,
        onLeftArrowClick: () => navigate(`/admin/workspace/${workspaceId}`),
      }}
    >
      <Container className={'admin-order-table-count-container'}>
        {tables.length > 0 &&
          tables.map((table) => {
            const remainTime = formatRemainingTime(table.orderSession?.expectedEndAt);
            const isUsing = table.orderSession;
            return (
              <div key={table.id} onClick={() => onClickTable(table.tableNumber)}>
                <div>
                  <div>{table.tableNumber}</div>
                  <div>{remainTime}</div>
                  <div>{isUsing ? '사용중' : '종료됨'}</div>
                </div>
              </div>
            );
          })}
      </Container>
    </AppContainer>
  );
}

export default AdminOrderTable;
