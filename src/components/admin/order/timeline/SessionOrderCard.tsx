import styled from '@emotion/styled';
import { Order, OrderStatus, Product } from '@@types/index';
import { getOrderStatusLabel } from '@utils/orderStatusConverter';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { formatDate } from '@utils/formatDate';
import { timelineColors } from './timelineConstants';
import defaultProductImage from '@resources/image/defaultWorkspaceImage.png';

const Card = styled.div`
  width: 100%;
  border: 1px solid ${timelineColors.BORDER_CARD};
  border-radius: 10px;
  background: ${Color.WHITE};
  overflow: hidden;
  ${colFlex()}
`;

const Header = styled.div`
  width: 100%;
  padding: 12px 16px;
  box-sizing: border-box;
  ${rowFlex({ justify: 'space-between', align: 'center' })}
`;

const HeaderLeft = styled.div`
  gap: 2px;
  min-width: 0;
  ${colFlex()}
`;

const OrderNumberLabel = styled.span`
  font-size: 14px;
  font-weight: 700;
  color: ${timelineColors.TEXT_PRIMARY};
`;

const OrderSubLabel = styled.span`
  font-size: 12px;
  color: ${timelineColors.TEXT_SECONDARY};
`;

const StatusBadge = styled.span<{ status: OrderStatus }>`
  font-size: 11px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 6px;
  flex-shrink: 0;
  color: ${({ status }) => {
    if (status === OrderStatus.PAID) return Color.KIO_ORANGE;
    if (status === OrderStatus.SERVED) return Color.GREEN;
    if (status === OrderStatus.CANCELLED) return Color.RED;
    return timelineColors.TEXT_SECONDARY;
  }};
  background: ${({ status }) => {
    if (status === OrderStatus.PAID) return '#fff0e5';
    if (status === OrderStatus.SERVED) return '#e6f9f0';
    if (status === OrderStatus.CANCELLED) return '#ffeded';
    return '#f0f0f0';
  }};
`;

const ProductListContainer = styled.div`
  border-top: 1px solid ${timelineColors.BORDER_CARD};
  padding: 10px 16px;
  gap: 8px;
  ${colFlex()}
`;

const ProductRow = styled.div`
  gap: 12px;
  ${rowFlex({ align: 'center' })}
`;

const ProductImage = styled.img`
  width: 44px;
  height: 44px;
  border-radius: 8px;
  border: 1px solid ${timelineColors.BORDER_CARD};
  object-fit: cover;
  background-color: ${Color.LIGHT_GREY};
  flex-shrink: 0;
`;

const ProductInfo = styled.div`
  flex: 1;
  min-width: 0;
  ${rowFlex({ justify: 'space-between', align: 'center' })}
`;

const ProductName = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: ${timelineColors.TEXT_PRIMARY};
`;

const ProductDetail = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: ${timelineColors.TEXT_SECONDARY};
  flex-shrink: 0;
`;

function getOrderProductSummary(order: Order): string {
  if (order.orderProducts.length === 0) return '상품 없음';
  const first = order.orderProducts[0].productName;
  const rest = order.orderProducts.length - 1;
  return rest > 0 ? `${first} 외 ${rest}건` : first;
}

function handleImageError(e: React.SyntheticEvent<HTMLImageElement>) {
  e.currentTarget.onerror = null;
  e.currentTarget.src = defaultProductImage;
}

interface SessionOrderCardProps {
  order: Order;
  productMap: Record<number, Product | undefined>;
}

function SessionOrderCard({ order, productMap }: SessionOrderCardProps) {
  return (
    <Card>
      <Header>
        <HeaderLeft>
          <OrderNumberLabel>
            #{order.orderNumber} {getOrderProductSummary(order)}
          </OrderNumberLabel>
          <OrderSubLabel>
            {formatDate(order.createdAt)} · {order.customerName}
          </OrderSubLabel>
        </HeaderLeft>
        <StatusBadge status={order.status}>{getOrderStatusLabel(order.status)}</StatusBadge>
      </Header>
      <ProductListContainer>
        {order.orderProducts.map((orderProduct) => {
          const product = productMap[orderProduct.productId];
          const imageUrl = product?.imageUrl || defaultProductImage;

          return (
            <ProductRow key={orderProduct.id}>
              <ProductImage src={imageUrl} alt={orderProduct.productName} onError={handleImageError} loading="lazy" />
              <ProductInfo>
                <ProductName>{orderProduct.productName}</ProductName>
                <ProductDetail>
                  {orderProduct.quantity}개 · {orderProduct.totalPrice.toLocaleString()}원
                </ProductDetail>
              </ProductInfo>
            </ProductRow>
          );
        })}
      </ProductListContainer>
    </Card>
  );
}

export default SessionOrderCard;
