import { useEffect, useState } from 'react';
import AppContainer from '@components/common/container/AppContainer';
import styled from '@emotion/styled';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { Color } from '@resources/colors';
import useSuperAdminOrders from '@hooks/super-admin/useSuperAdminOrders';
import { PaginationResponse, SuperAdminOrder, OrderStatus } from '@@types/index';
import { defaultPaginationValue } from '@@types/defaultValues';
import Pagination from '@components/common/pagination/Pagination';
import { useSearchParams } from 'react-router-dom';

const PageContainer = styled.div`
  width: 100%;
  max-width: 1100px;
  padding: 40px 20px;
  gap: 24px;
  ${colFlex()}
`;

const SectionTitle = styled.h1`
  font-size: 28px;
  font-weight: 800;
  color: ${Color.BLACK};
  margin: 0;
`;

const FilterBar = styled.div`
  gap: 12px;
  flex-wrap: wrap;
  ${rowFlex({ align: 'center' })}
`;

const FilterSelect = styled.select`
  height: 40px;
  padding: 0 12px;
  border: 1px solid ${Color.HEAVY_GREY};
  border-radius: 10px;
  font-size: 14px;
  color: ${Color.GREY};
  background: ${Color.WHITE};
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: ${Color.KIO_ORANGE};
  }
`;

const FilterInput = styled.input`
  height: 40px;
  padding: 0 12px;
  border: 1px solid ${Color.HEAVY_GREY};
  border-radius: 10px;
  font-size: 14px;
  color: ${Color.GREY};
  background: ${Color.WHITE};
  width: 160px;

  &:focus {
    outline: none;
    border-color: ${Color.KIO_ORANGE};
  }
`;

const FilterButton = styled.button`
  height: 40px;
  padding: 0 20px;
  border-radius: 10px;
  background: ${Color.KIO_ORANGE};
  color: ${Color.WHITE};
  border: none;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #f7842e;
  }
`;

const ResetButton = styled.button`
  height: 40px;
  padding: 0 16px;
  border-radius: 10px;
  background: ${Color.WHITE};
  color: ${Color.GREY};
  border: 1px solid ${Color.HEAVY_GREY};
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: ${Color.GREY};
  }
`;

const OrderTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: ${Color.WHITE};
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid ${Color.HEAVY_GREY};
`;

const Thead = styled.thead`
  background: ${Color.LIGHT_GREY};
`;

const Th = styled.th`
  padding: 14px 16px;
  text-align: left;
  font-size: 13px;
  font-weight: 700;
  color: ${Color.GREY};
  border-bottom: 1px solid ${Color.HEAVY_GREY};
`;

const Tr = styled.tr`
  border-bottom: 1px solid ${Color.HEAVY_GREY};
  transition: background 0.15s;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: ${Color.LIGHT_GREY};
  }
`;

const Td = styled.td`
  padding: 14px 16px;
  font-size: 14px;
  color: ${Color.GREY};
  vertical-align: middle;
`;

const StatusBadge = styled.span<{ status: OrderStatus }>`
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 700;
  background: ${({ status }) => {
    switch (status) {
      case 'NOT_PAID': return '#FFF3E7';
      case 'PAID': return '#E8F5FF';
      case 'SERVED': return '#EDF9F1';
      case 'CANCELLED': return '#FFEBEB';
    }
  }};
  color: ${({ status }) => {
    switch (status) {
      case 'NOT_PAID': return Color.KIO_ORANGE;
      case 'PAID': return Color.BLUE;
      case 'SERVED': return Color.GREEN;
      case 'CANCELLED': return Color.RED;
    }
  }};
`;

const WorkspaceName = styled.span`
  font-weight: 600;
  color: ${Color.BLACK};
`;

const EmptyText = styled.div`
  text-align: center;
  padding: 60px 0;
  font-size: 16px;
  color: ${Color.GREY};
  background: ${Color.WHITE};
  border-radius: 16px;
  border: 1px solid ${Color.HEAVY_GREY};
`;

const STATUS_LABELS: Record<OrderStatus, string> = {
  NOT_PAID: '미결제',
  PAID: '결제완료',
  SERVED: '서빙완료',
  CANCELLED: '취소',
};

const formatDateTime = (dt: string) => {
  const d = new Date(dt);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
};

function SuperAdminOrders() {
  const pageSize = 20;
  const [searchParams, setSearchParams] = useSearchParams();
  const [orders, setOrders] = useState<PaginationResponse<SuperAdminOrder>>(defaultPaginationValue);
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [workspaceIdFilter, setWorkspaceIdFilter] = useState<string>('');
  const { fetchAllOrders } = useSuperAdminOrders();

  const fetchOrders = async (page: number) => {
    const params: any = { page, size: pageSize };
    if (statusFilter) params.statuses = [statusFilter];
    if (workspaceIdFilter) params.workspaceId = Number(workspaceIdFilter);

    const result = await fetchAllOrders(params);
    setOrders(result);
  };

  useEffect(() => {
    const page = Number(searchParams.get('page') || 0);
    fetchOrders(page);
  }, [searchParams.toString()]);

  const handleSearch = () => {
    searchParams.set('page', '0');
    setSearchParams(searchParams);
    fetchOrders(0);
  };

  const handleReset = () => {
    setStatusFilter('');
    setWorkspaceIdFilter('');
    setSearchParams({});
  };

  return (
    <AppContainer useFlex={colFlex({ align: 'center' })} backgroundColor={Color.LIGHT_GREY} useTitle={false}>
      <PageContainer>
        <SectionTitle>전체 주문 모니터링</SectionTitle>

        <FilterBar>
          <FilterInput
            type="number"
            placeholder="워크스페이스 ID"
            value={workspaceIdFilter}
            onChange={(e) => setWorkspaceIdFilter(e.target.value)}
          />
          <FilterSelect value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="">전체 상태</option>
            <option value="NOT_PAID">미결제</option>
            <option value="PAID">결제완료</option>
            <option value="SERVED">서빙완료</option>
            <option value="CANCELLED">취소</option>
          </FilterSelect>
          <FilterButton onClick={handleSearch}>조회</FilterButton>
          <ResetButton onClick={handleReset}>초기화</ResetButton>
        </FilterBar>

        {orders.content.length === 0 ? (
          <EmptyText>조회된 주문이 없습니다.</EmptyText>
        ) : (
          <OrderTable>
            <Thead>
              <tr>
                <Th>워크스페이스</Th>
                <Th>테이블</Th>
                <Th>고객명</Th>
                <Th>주문번호</Th>
                <Th>금액</Th>
                <Th>상태</Th>
                <Th>주문 시각</Th>
              </tr>
            </Thead>
            <tbody>
              {orders.content.map((order) => (
                <Tr key={order.id}>
                  <Td>
                    <WorkspaceName>{order.workspaceName}</WorkspaceName>
                    <div style={{ fontSize: '12px', color: Color.HEAVY_GREY }}>ID: {order.workspaceId}</div>
                  </Td>
                  <Td>{order.tableNumber}번</Td>
                  <Td>{order.customerName}</Td>
                  <Td>#{order.orderNumber}</Td>
                  <Td>{order.totalPrice.toLocaleString('ko-KR')}원</Td>
                  <Td>
                    <StatusBadge status={order.status}>{STATUS_LABELS[order.status]}</StatusBadge>
                  </Td>
                  <Td>{formatDateTime(order.createdAt)}</Td>
                </Tr>
              ))}
            </tbody>
          </OrderTable>
        )}

        <Pagination
          totalPageCount={orders.totalPages}
          paginateFunction={(page: number) => {
            searchParams.set('page', page.toString());
            setSearchParams(searchParams);
          }}
        />
      </PageContainer>
    </AppContainer>
  );
}

export default SuperAdminOrders;
