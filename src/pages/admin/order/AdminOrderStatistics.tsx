import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import 'react-datepicker/dist/react-datepicker.css';
import useAdminOrder from '@hooks/admin/useAdminOrder';
import { useParams } from 'react-router-dom';
import AppContainer from '@components/common/container/AppContainer';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { OrderStatus } from '@@types/index';
import { tabletMediaQuery } from '@styles/globalStyles';
import { Color } from '@resources/colors';
import TotalOrder from '@components/admin/order/statistic/TotalOrder';
import ProductStatistics from '@components/admin/order/statistic/ProductStatistics';
import OrderPriceStatistics from '@components/admin/order/statistic/OrderPriceStatistics';
import dayjs from 'dayjs';
import { dateConverter } from '@utils/FormatDate';
import { adminOrdersAtom } from 'src/jotai/admin/atoms';
import { useAtomValue } from 'jotai';

type CategoryKey = 'all' | 'byProduct' | 'byPrice';

interface Category {
  key: CategoryKey;
  label: string;
  render: React.ReactNode;
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

const HeaderContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 45px;
  ${rowFlex({ justify: 'space-between', align: 'center' })};
  padding: 0 20px;
  border-radius: 7px 7px 0 0;
  background: ${Color.KIO_ORANGE};
`;

const HeaderLabel = styled.p`
  color: ${Color.WHITE};
  font-size: 20px;
  font-weight: 700;
`;

const CategoryContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
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

  // TODO: 사용하지 않는 상태 변수 정리
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [showServedOrder, setShowServedOrder] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [startDate, setStartDate] = useState<Date>(() => dayjs().subtract(1, 'day').toDate());
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [endDate, setEndDate] = useState(new Date());
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey>('all');

  const statuses = showServedOrder ? [OrderStatus.SERVED] : undefined;
  const parsedStartDate = dateConverter(startDate);
  const parsedEndDate = dateConverter(endDate);

  useEffect(() => {
    fetchOrders({
      startDate: parsedStartDate,
      endDate: parsedEndDate,
      statuses,
    });
  }, [startDate, endDate, showServedOrder]);

  const totalOrderPrice = orders.reduce((sum, order) => sum + order.totalPrice, 0).toLocaleString();

  const categories: Category[] = [
    {
      key: 'all',
      label: '전체 주문 조회',
      render: <TotalOrder orders={orders} />,
    },
    {
      key: 'byProduct',
      label: '상품별 판매량',
      render: <ProductStatistics orders={orders} />,
    },
    {
      key: 'byPrice',
      label: '시간대별 매출',
      render: <OrderPriceStatistics startDate={parsedStartDate} endDate={parsedEndDate} status={showServedOrder ? OrderStatus.SERVED : undefined} />,
    },
  ];

  return (
    <AppContainer useFlex={colFlex({ justify: 'center', align: 'center' })}>
      <Container>
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
