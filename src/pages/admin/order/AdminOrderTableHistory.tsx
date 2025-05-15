import AppContainer from '@components/common/container/AppContainer';
import Pagination from '@components/common/pagination/Pagination';
import styled from '@emotion/styled';
import { colFlex } from '@styles/flexStyles';
import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import useCustomNavigate from '@hooks/useCustomNavigate';
import { Color } from '@resources/colors';
import useAdminOrder from '@hooks/admin/useAdminOrder';
import { Order, PaginationResponse } from '@@types/index';
import { defaultPaginationValue } from '@@types/defaultValues';
import ToggleOrderCard from '@components/admin/order/ToggleOrderCard';

const ContentContainer = styled.div<{ justifyCenter?: boolean }>`
  margin-top: 20px;
  height: ${(props) => (props.justifyCenter ? '550px' : '100%')};
  ${(props) =>
    colFlex({
      justify: props.justifyCenter ? 'center' : 'flex-start',
      align: 'center',
    })};
`;

const OrderCardContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 5px 0;
`;

const EmptyLabel = styled.div`
  font-size: 40px;
  color: ${Color.HEAVY_GREY};
`;

function AdminOrderTableHistory() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { workspaceId, tableNumber } = useParams<{ workspaceId: string; tableNumber: string }>();
  const [tableOrders, setTableOrders] = useState<PaginationResponse<Order>>(defaultPaginationValue);
  const { replaceLastPath } = useCustomNavigate();
  const { fetchWorkspaceTable } = useAdminOrder(workspaceId);

  const isEmptyWorkspaces = tableOrders.empty;
  const emptyMessage = '찾고자 하는 주문이 존재하지 않습니다.';

  const pageSize = 6;

  const fetchAndSetWorkspaceTable = async (tableNo: number, page: number, size: number) => {
    const workspaceTableResponse = await fetchWorkspaceTable(tableNo, page, size);
    setTableOrders(workspaceTableResponse);
  };

  useEffect(() => {
    const nowPage = Number(searchParams.get('page'));

    fetchAndSetWorkspaceTable(Number(tableNumber), nowPage, pageSize);
  }, [searchParams.toString()]);

  return (
    <AppContainer
      useFlex={colFlex({ justify: 'center' })}
      customWidth={'1000px'}
      useNavBackground={true}
      useScroll={true}
      titleNavBarProps={{ title: `${tableNumber}번 테이블`, onLeftArrowClick: () => replaceLastPath('') }}
    >
      <>
        <ContentContainer justifyCenter={isEmptyWorkspaces} className={'content-container'}>
          {tableOrders.content.map((item) => (
            <OrderCardContainer key={item.id}>
              <ToggleOrderCard order={item} />
            </OrderCardContainer>
          ))}

          {isEmptyWorkspaces && <EmptyLabel className={'empty-label'}>{emptyMessage}</EmptyLabel>}

          <Pagination
            totalPageCount={tableOrders.totalPages}
            paginateFunction={(page: number) => {
              searchParams.set('page', page.toString());
              setSearchParams(searchParams);
            }}
          />
        </ContentContainer>
      </>
    </AppContainer>
  );
}

export default AdminOrderTableHistory;
