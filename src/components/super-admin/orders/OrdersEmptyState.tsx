import styled from '@emotion/styled';
import { Color } from '@resources/colors';

const Empty = styled.div`
  width: 100%;
  text-align: center;
  padding: 60px 0;
  font-size: 16px;
  color: ${Color.GREY};
  background: ${Color.WHITE};
  border-radius: 16px;
  border: 1px solid ${Color.HEAVY_GREY};
`;

function OrdersEmptyState() {
  return <Empty>조회된 주문이 없습니다.</Empty>;
}

export default OrdersEmptyState;
