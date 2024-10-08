import AppContainer from '@components/common/container/AppContainer';
import Pagination from '@components/common/pagination/Pagination';
import styled from '@emotion/styled';
import useAdminWorkspace from '@hooks/admin/useAdminWorkspace';
import { colFlex } from '@styles/flexStyles';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { useParams } from 'react-router-dom';
import { tablePaginationResponseAtom } from '@recoils/atoms';
import useCustomNavigate from '@hooks/useCustomNavigate';
import SuperAdminSearchContents from '@components/SuperAdmin/SuperAdminSearchContents';
import OrderTableHistoryContent from '@components/user/order/OrderTableHistoryCotent';

const ContentContainer = styled.div<{ justifyCenter?: boolean }>`
  height: 550px;
  ${(props) =>
    colFlex({
      justify: props.justifyCenter ? 'center' : 'flex-start',
      align: 'center',
    })}
`;

function AdminOrderTableHistory() {
  const { workspaceId, tableNumber } = useParams<{ workspaceId: string; tableNumber: string }>();
  const { replaceLastPath } = useCustomNavigate();
  const pageSize = 6;
  const tables = useRecoilValue(tablePaginationResponseAtom);
  const { fetchWorkspaceTable } = useAdminWorkspace();
  const isEmptyWorkspaces = tables.empty;

  useEffect(() => {
    fetchWorkspaceTable(Number(workspaceId), Number(tableNumber), 0, pageSize);
  }, []);

  return (
    <AppContainer
      useFlex={colFlex({ justify: 'center' })}
      customWidth={'1000px'}
      customHeight={'100%'}
      customGap={'20px'}
      titleNavBarProps={{ title: `${tableNumber}번 테이블`, onLeftArrowClick: () => replaceLastPath(`/orders-table`) }}
    >
      <>
        <ContentContainer justifyCenter={isEmptyWorkspaces} className={'content-container'}>
          <SuperAdminSearchContents contents={tables} target={'주문번호'} ContentComponent={OrderTableHistoryContent} />
        </ContentContainer>
        <Pagination
          totalPageCount={tables.totalPages}
          paginateFunction={(page: number) => {
            fetchWorkspaceTable(Number(workspaceId), Number(tableNumber), page, pageSize);
          }}
        />
      </>
    </AppContainer>
  );
}

export default AdminOrderTableHistory;
