import styled from '@emotion/styled';
import { rowFlex } from '@styles/flexStyles';
import { OrderProduct } from '@@types/index';
import { WaitCard, WaitCardTitle } from './waitStyles';

const Card = styled(WaitCard)`
  padding: 18px 20px;
  gap: 10px;
`;

const Row = styled.div`
  ${rowFlex({ justify: 'space-between', align: 'center' })}
`;

const Menu = styled.span`
  gap: 6px;
  ${rowFlex({ align: 'center' })}
`;

const Text = styled.span`
  color: #464a4d;
  font-size: 14px;
`;

const Quantity = styled.span`
  color: #9aa1a6;
  font-size: 13px;
`;

const Divider = styled.hr`
  width: 100%;
  margin: 0;
  border: none;
  border-top: 1px solid #e8eef2;
`;

const TotalLabel = styled.span`
  color: #25282b;
  font-size: 14px;
  font-weight: 700;
`;

const TotalValue = styled.span`
  color: #25282b;
  font-size: 15px;
  font-weight: 700;
`;

interface OrderItemsCardProps {
  orderProducts: OrderProduct[];
  totalPrice: number;
}

// 대기 화면 아래 주문 내역(메뉴·수량·합계)
function OrderItemsCard({ orderProducts, totalPrice }: OrderItemsCardProps) {
  if (orderProducts.length === 0) return null;

  return (
    <Card>
      <WaitCardTitle>주문 내역</WaitCardTitle>
      {orderProducts.map((product) => (
        <Row key={product.id}>
          <Menu>
            <Text>{product.productName}</Text>
            <Quantity>{product.quantity}개</Quantity>
          </Menu>
          <Text>{product.totalPrice.toLocaleString()}원</Text>
        </Row>
      ))}
      <Divider />
      <Row>
        <TotalLabel>합계</TotalLabel>
        <TotalValue>{totalPrice.toLocaleString()}원</TotalValue>
      </Row>
    </Card>
  );
}

export default OrderItemsCard;
