import AppContainer from '@components/common/container/AppContainer';
import Pagination from '@components/common/pagination/Pagination';
import styled from '@emotion/styled';
import { colFlex } from '@styles/flexStyles';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useParams } from 'react-router-dom';
import { tablePaginationResponseAtom } from '@recoils/atoms';
import useCustomNavigate from '@hooks/useCustomNavigate';
import OrderTableHistoryContent from '@components/user/order/OrderTableHistoryCotent';
import { Color } from '@resources/colors';
import useAdminOrder from '@hooks/admin/useAdminOrder';

const ContentContainer = styled.div<{ justifyCenter?: boolean }>`
  margin-top: 20px;
  height: ${(props) => (props.justifyCenter ? '550px' : '100%')};
  ${(props) =>
    colFlex({
      justify: props.justifyCenter ? 'center' : 'flex-start',
      align: 'center',
    })};
`;

const HorizontalLine = styled.hr`
  width: 100%;
  border: 0.3px solid #eeecec;
`;

const EmptyLabel = styled.div`
  font-size: 40px;
  color: ${Color.HEAVY_GREY};
`;

function AdminOrderTableHistory() {
  const { workspaceId, tableNumber } = useParams<{ workspaceId: string; tableNumber: string }>();
  const { replaceLastPath } = useCustomNavigate();
  const tables = useRecoilValue(tablePaginationResponseAtom);
  const { fetchWorkspaceTable } = useAdminOrder(workspaceId);
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);

  const isEmptyWorkspaces = tables.empty;
  const emptyMessage = '찾고자 하는 주문이 존재하지 않습니다.';

  const pageSize = 6;

  useEffect(() => {
    fetchWorkspaceTable(Number(tableNumber), 0, pageSize);
  }, []);

  return (
    <AppContainer
      useFlex={colFlex({ justify: 'center' })}
      customWidth={'1000px'}
      useNavBackground={true}
      useScroll={true}
      titleNavBarProps={{ title: `${tableNumber}번 테이블`, onLeftArrowClick: () => replaceLastPath(`/orders-table`) }}
    >
      <>
        <ContentContainer justifyCenter={isEmptyWorkspaces} className={'content-container'}>
          {tables.content.map((item, index) => (
            <div key={item.id}>
              <OrderTableHistoryContent {...item} isShowDetail={item.id === selectedOrderId} setSelectedOrderId={setSelectedOrderId} />
              {index < tables.content.length - 1 && <HorizontalLine />}
            </div>
          ))}

          {isEmptyWorkspaces && <EmptyLabel className={'empty-label'}>{emptyMessage}</EmptyLabel>}

          <Pagination
            totalPageCount={tables.totalPages}
            paginateFunction={(page: number) => {
              fetchWorkspaceTable(Number(tableNumber), page, pageSize);
            }}
          />
        </ContentContainer>
      </>
    </AppContainer>
  );
}

export default AdminOrderTableHistory;
