import styled from '@emotion/styled';
import { Order } from '@@types/index';
import { colFlex, rowFlex } from '@styles/flexStyles';
import useFormattedTime from '@hooks/useFormattedTime';
import { extractMinFromDate } from '@utils/formatDate';

const Container = styled.div`
  height: 76px;
  width: 180px;
  flex-shrink: 0;
  border-radius: 16px;
  background-color: #fff;
  border: 1px solid #e8eef2;
  box-sizing: border-box;
  padding: 13px 15px;
  ${colFlex({ justify: 'center', align: 'start' })}
`;

const ContentParent = styled.div`
  align-self: stretch;
  ${colFlex({ align: 'start' })}
`;

const Content = styled.b`
  align-self: stretch;
  line-height: 24px;
  font-size: 16px;
  color: #464a4d;
`;

const ContentGroup = styled.div`
  align-self: stretch;
  gap: 10px;
  font-size: 12px;
  ${rowFlex({ justify: 'space-between', align: 'center' })}
`;

const TimeText = styled.b`
  width: 50px;
  line-height: 24px;
  color: #464a4d;
`;

const PriceText = styled.b`
  width: 90px;
  line-height: 24px;
  text-align: right;
  color: #464a4d;
`;

interface RecentOrderCardProps {
  order: Order;
}

function RecentOrderCard({ order }: RecentOrderCardProps) {
  const delayMinutes = useFormattedTime<number>({ date: order.createdAt, formatter: extractMinFromDate });

  return (
    <Container>
      <ContentParent>
        <Content>{order.customerName}</Content>
        <ContentGroup>
          <TimeText>{`${delayMinutes}분 전`}</TimeText>
          <PriceText>{`총 ${order.totalPrice.toLocaleString()}원`}</PriceText>
        </ContentGroup>
      </ContentParent>
    </Container>
  );
}

export default RecentOrderCard;
