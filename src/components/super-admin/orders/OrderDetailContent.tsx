import styled from '@emotion/styled';
import { RiExternalLinkLine } from '@remixicon/react';
import { useNavigate } from 'react-router-dom';
import { OrderProduct, SuperAdminOrder } from '@@types/index';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { formatCurrency, formatKoreanDateTime } from '@utils/formatNumber';
import { getAdminWorkspacePath, getSuperAdminOrdersPath } from '@constants/routes';
import OrderStatusBadge from './OrderStatusBadge';

const Wrap = styled.div`
  width: 100%;
  min-width: 0;
  gap: 16px;
  overflow-x: hidden;
  ${colFlex()}
`;

const HeaderRow = styled.div`
  width: 100%;
  min-width: 0;
  gap: 8px;
  ${rowFlex({ justify: 'space-between', align: 'flex-start' })}
`;

const HeaderText = styled.div`
  min-width: 0;
  flex: 1;
  gap: 2px;
  overflow: hidden;
  ${colFlex()}
`;

const TitleText = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: ${Color.BLACK};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const SubText = styled.div`
  font-size: 12px;
  color: ${Color.GREY};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const SectionTitle = styled.div`
  font-size: 11px;
  color: ${Color.GREY};
  text-transform: uppercase;
  letter-spacing: 0.04em;
  font-weight: 600;
  margin-bottom: 6px;
`;

const InfoBlock = styled.div`
  width: 100%;
  font-size: 13px;
  color: ${Color.GREY};
  line-height: 2;
  ${colFlex()}
`;

const InfoRow = styled.div`
  width: 100%;
  border-bottom: 1px solid #f7f7f7;
  &:last-of-type {
    border-bottom: none;
  }
  ${rowFlex({ justify: 'space-between' })}
`;

const InfoValue = styled.b`
  color: ${Color.BLACK};
  font-weight: 600;
`;

const ProductList = styled.div`
  width: 100%;
  box-sizing: border-box;
  background: #fcfcfc;
  border: 1px solid #f0f0f0;
  border-radius: 8px;
  padding: 10px 12px;
  gap: 6px;
  ${colFlex()}
`;

const ProductRow = styled.div`
  width: 100%;
  min-width: 0;
  gap: 8px;
  font-size: 12px;
  color: ${Color.GREY};
  ${rowFlex({ justify: 'space-between', align: 'center' })}
`;

const ProductNameCell = styled.span`
  color: ${Color.BLACK};
  font-weight: 500;
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const QtyCell = styled.span`
  flex-shrink: 0;
`;

const PriceCell = styled.span`
  color: ${Color.BLACK};
  font-weight: 600;
  flex-shrink: 0;
`;

const TotalRow = styled.div`
  width: 100%;
  padding-top: 10px;
  margin-top: 4px;
  border-top: 1px solid #f0f0f0;
  font-size: 13px;
  font-weight: 700;
  color: ${Color.BLACK};
  ${rowFlex({ justify: 'space-between', align: 'center' })}
`;

const Footer = styled.div`
  width: 100%;
  margin-top: 6px;
  padding-top: 14px;
  border-top: 1px solid #f0f0f0;
  gap: 8px;
  ${colFlex()}
`;

const PrimaryCta = styled.button`
  height: 38px;
  border-radius: 6px;
  background: ${Color.KIO_ORANGE};
  color: ${Color.WHITE};
  border: none;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  gap: 6px;
  ${rowFlex({ justify: 'center', align: 'center' })}

  &:hover {
    background: ${Color.KIO_ORANGE_DARK};
  }
`;

const SecondaryCta = styled.button`
  height: 38px;
  border-radius: 6px;
  background: ${Color.WHITE};
  color: ${Color.GREY};
  border: 1px solid ${Color.HEAVY_GREY};
  font-size: 13px;
  cursor: pointer;
  ${rowFlex({ justify: 'center', align: 'center' })}

  &:hover {
    color: ${Color.BLACK};
    border-color: ${Color.GREY};
  }
`;

interface OrderDetailContentProps {
  order: SuperAdminOrder;
  onClose: () => void;
}

function OrderDetailContent({ order, onClose }: OrderDetailContentProps) {
  const navigate = useNavigate();

  const handleOpenAdmin = () => {
    window.open(getAdminWorkspacePath(order.workspaceId), '_blank', 'noopener,noreferrer');
  };

  const handleOpenWorkspaceOrders = () => {
    navigate(getSuperAdminOrdersPath({ workspaceId: order.workspaceId }));
    onClose();
  };

  return (
    <Wrap>
      <HeaderRow>
        <HeaderText>
          <TitleText>주문 #{order.orderNumber}</TitleText>
          <SubText>
            {order.workspaceName} · {order.tableNumber}번 테이블
          </SubText>
          <SubText>{formatKoreanDateTime(order.createdAt)}</SubText>
        </HeaderText>
        <OrderStatusBadge status={order.status} />
      </HeaderRow>

      <div>
        <SectionTitle>주문 정보</SectionTitle>
        <InfoBlock>
          <InfoRow>
            <span>고객</span>
            <InfoValue>{order.customerName}</InfoValue>
          </InfoRow>
          <InfoRow>
            <span>주문번호</span>
            <InfoValue>#{order.orderNumber}</InfoValue>
          </InfoRow>
          <InfoRow>
            <span>워크스페이스 ID</span>
            <InfoValue>{order.workspaceId}</InfoValue>
          </InfoRow>
        </InfoBlock>
      </div>

      <div>
        <SectionTitle>주문 상품 ({order.orderProducts.length})</SectionTitle>
        <ProductList>
          {order.orderProducts.map((product: OrderProduct) => (
            <ProductRow key={product.id}>
              <ProductNameCell>{product.productName}</ProductNameCell>
              <QtyCell>×{product.quantity}</QtyCell>
              <PriceCell>{formatCurrency(product.totalPrice)}</PriceCell>
            </ProductRow>
          ))}
          <TotalRow>
            <span>총 결제 금액</span>
            <span>{formatCurrency(order.totalPrice)}</span>
          </TotalRow>
        </ProductList>
      </div>

      <Footer>
        <SectionTitle>바로 가기</SectionTitle>
        <PrimaryCta onClick={handleOpenAdmin}>
          {order.workspaceName} 어드민 새 탭으로 열기
          <RiExternalLinkLine size={14} />
        </PrimaryCta>
        <SecondaryCta onClick={handleOpenWorkspaceOrders}>이 워크스페이스의 주문만 보기</SecondaryCta>
      </Footer>
    </Wrap>
  );
}

export default OrderDetailContent;
