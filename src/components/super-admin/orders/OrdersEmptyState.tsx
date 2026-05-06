import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { colFlex } from '@styles/flexStyles';
import NewCommonButton from '@components/common/button/NewCommonButton';

const Container = styled.div`
  width: 100%;
  background: ${Color.WHITE};
  border: 1px solid #f0f0f0;
  border-radius: 10px;
  padding: 60px 20px;
  gap: 12px;
  ${colFlex({ align: 'center', justify: 'center' })}
`;

const Title = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: ${Color.BLACK};
`;

const Sub = styled.div`
  font-size: 12px;
  color: ${Color.GREY};
`;

interface OrdersEmptyStateProps {
  onReset: () => void;
}

function OrdersEmptyState({ onReset }: OrdersEmptyStateProps) {
  return (
    <Container>
      <Title>조건에 맞는 주문이 없습니다.</Title>
      <Sub>필터 조건을 좁혀보거나 초기화해보세요.</Sub>
      <NewCommonButton size="xs" color="blue_gray" onClick={onReset}>
        필터 초기화
      </NewCommonButton>
    </Container>
  );
}

export default OrdersEmptyState;
