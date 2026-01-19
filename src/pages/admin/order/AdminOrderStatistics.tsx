import { ReactNode, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import useAdminOrder from '@hooks/admin/useAdminOrder';
import { useParams } from 'react-router-dom';
import { useAtomValue } from 'jotai';
import { RiRefreshLine } from '@remixicon/react';
import AppContainer from '@components/common/container/AppContainer';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { OrderStatus } from '@@types/index';
import { tabletMediaQuery } from '@styles/globalStyles';
import { Color } from '@resources/colors';
import CustomSelect from '@components/common/select/CustomSelect';
import CustomDatePicker from '@components/common/date-picker/CustomDatePicker';
import ProductStatistics from '@components/admin/order/statistic/ProductStatistics';
import OrderPriceStatistics from '@components/admin/order/statistic/OrderPriceStatistics';
import { dateConverter } from '@utils/formatDate';
import { useAdminFetchOrderBase } from '@hooks/admin/useAdminFetchOrderBase';
import { adminOrdersAtom } from '@jotai/admin/atoms';

type CategoryKey = 'byProduct' | 'byPrice';

interface Category {
  key: CategoryKey;
  label: string;
  render: ReactNode;
}

const Container = styled.div`
  width: 100%;
  flex: 1;
  gap: 10px;
  padding-top: 25px;
  ${colFlex({ align: 'center' })}

  ${tabletMediaQuery} {
    width: 80%;
  }
`;

const FilterContainer = styled.div`
  width: 100%;
  gap: 10px;
  padding-bottom: 20px;
  ${rowFlex({ align: 'center' })};
`;

const ResetButton = styled.div`
  padding: 0 10px;
  height: 35px;
  background: ${Color.WHITE};
  border: 1px solid #e8eef2;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  color: #464a4d;
  gap: 4px;
  ${rowFlex({ justify: 'center', align: 'center' })}

  &:hover {
    border-color: ${Color.KIO_ORANGE};
    color: ${Color.KIO_ORANGE};
  }
`;

const HeaderContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 45px;
  padding: 0 20px;
  border-radius: 7px 7px 0 0;
  background: ${Color.KIO_ORANGE};
  ${rowFlex({ justify: 'space-between', align: 'center' })};
`;

const HeaderLabel = styled.p`
  color: ${Color.WHITE};
  font-size: 20px;
  font-weight: 700;
`;

const CategoryContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
  width: 100%;
  padding: 0 10px;
  box-sizing: border-box;
  border-bottom: 1px solid ${Color.LIGHT_GREY};
`;

const CategoryLink = styled.div<{ isSelected: boolean }>`
  padding: 10px;
  border-bottom: 3px solid ${({ isSelected }) => (isSelected ? Color.BLACK : 'transparent')};
  font-weight: ${({ isSelected }) => (isSelected ? 600 : 400)};
  cursor: pointer;
  ${rowFlex({ justify: 'center', align: 'center' })}
`;

function AdminOrderStatistics() {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const { fetchOrders } = useAdminOrder(workspaceId);
  const orders = useAtomValue(adminOrdersAtom);

  const { baseFilters, setBaseFilters, resetBaseFilters, statusOptions } = useAdminFetchOrderBase(workspaceId);
  const { startDate, endDate, orderStatuses } = baseFilters;
  const { setStartDate, setEndDate, setOrderStatuses } = setBaseFilters;

  const [selectedCategory, setSelectedCategory] = useState<CategoryKey>('byProduct');

  const parsedStartDate = dateConverter(startDate);
  const parsedEndDate = dateConverter(endDate);

  const dateRangeLabel = startDate && endDate ? `${startDate.toLocaleDateString()} ~ ${endDate.toLocaleDateString()}` : '날짜 선택';

  useEffect(() => {
    if (!parsedStartDate || !parsedEndDate) return;

    fetchOrders({
      startDate: parsedStartDate,
      endDate: parsedEndDate,
      statuses: orderStatuses,
    });
  }, [parsedStartDate, parsedEndDate, orderStatuses, workspaceId]);

  const totalOrderPrice = orders.reduce((sum, order) => sum + order.totalPrice, 0).toLocaleString();

  const categories: Category[] = [
    {
      key: 'byProduct',
      label: '상품별 판매량',
      render: <ProductStatistics orders={orders} />,
    },
    {
      key: 'byPrice',
      label: '시간대별 매출',
      render: (
        <OrderPriceStatistics
          startDate={parsedStartDate}
          endDate={parsedEndDate}
          status={orderStatuses && orderStatuses.length > 0 ? orderStatuses[0] : undefined}
        />
      ),
    },
  ];

  return (
    <AppContainer useFlex={colFlex({ justify: 'center', align: 'center' })}>
      <Container>
        <FilterContainer>
          <ResetButton onClick={resetBaseFilters}>
            <RiRefreshLine size={14} />
            초기화
          </ResetButton>

          <CustomSelect value={dateRangeLabel} triggerLabel={dateRangeLabel} highlightOnSelect={true} width="250px">
            <CustomDatePicker startDate={startDate} endDate={endDate} setStartDate={setStartDate} setEndDate={setEndDate} />
          </CustomSelect>

          <CustomSelect<OrderStatus>
            isMulti={true}
            value={orderStatuses}
            onChange={setOrderStatuses}
            options={statusOptions}
            highlightOnSelect={true}
            width="150px"
            placeholder="상태 전체"
          />
        </FilterContainer>

        <HeaderContainer>
          <HeaderLabel>총 매출액</HeaderLabel>
          <HeaderLabel>{totalOrderPrice} 원</HeaderLabel>
        </HeaderContainer>

        <CategoryContainer>
          {categories.map(({ key, label }) => (
            <CategoryLink key={key} isSelected={selectedCategory === key} onClick={() => setSelectedCategory(key)}>
              {label}
            </CategoryLink>
          ))}
        </CategoryContainer>

        {categories.find((category) => category.key === selectedCategory)?.render}
      </Container>
    </AppContainer>
  );
}

export default AdminOrderStatistics;
