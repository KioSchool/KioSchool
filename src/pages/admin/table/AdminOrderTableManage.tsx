import TableCount from '@components/admin/order/table-manage/setting/TableCount';
import TableQRCodes from '@components/admin/order/table-manage/setting/TableQRCodes';
import TableTimeLimit from '@components/admin/order/table-manage/setting/TableTimeLimit';
import AppContainer from '@components/common/container/AppContainer';
import styled from '@emotion/styled';
import { colFlex } from '@styles/flexStyles';

const Contents = styled.div`
  width: 60%;
  gap: 20px;
  ${colFlex({ justify: 'center', align: 'center' })};
`;

function AdminOrderTableManage() {
  return (
    <AppContainer useFlex={colFlex({ justify: 'center', align: 'center' })}>
      <Contents>
        <TableCount />
        <TableTimeLimit />
        <TableQRCodes />
      </Contents>
    </AppContainer>
  );
}

export default AdminOrderTableManage;
