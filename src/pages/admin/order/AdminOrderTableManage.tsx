import TableCount from '@components/admin/order/table-management/setting/TableCount';
import TableQRCodes from '@components/admin/order/table-management/setting/TableQRCodes';
import TableTimeLimit from '@components/admin/order/table-management/setting/TableTimeLimit';
import AppContainer from '@components/common/container/AppContainer';
import styled from '@emotion/styled';
import { colFlex } from '@styles/flexStyles';

const Contents = styled.div`
  width: 80%;
  gap: 10px;
  ${colFlex({ justify: 'center', align: 'center' })};
`;

function AdminOrderTableManage() {
  return (
    <AppContainer useFlex={colFlex({ justify: 'center' })} titleNavBarProps={{ title: '테이블 관리' }}>
      <Contents>
        <TableCount />
        <TableTimeLimit />
        <TableQRCodes />
      </Contents>
    </AppContainer>
  );
}

export default AdminOrderTableManage;
