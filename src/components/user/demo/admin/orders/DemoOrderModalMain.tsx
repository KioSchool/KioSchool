import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { match } from 'ts-pattern';
import { Order, OrderProduct, OrderStatus } from '@@types/index';
import { DEMO_PRODUCTS } from '@constants/data/demo/demoSeed';
import OrderModalProductList from '@components/admin/order/realtime/modal/order-detail/OrderModalProductsList';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';

const PRODUCT_MAP = Object.fromEntries(DEMO_PRODUCTS.map((product) => [product.id, product]));

const mobileContentStyle = css`
  flex: 1 1 auto;
  min-height: 0;
`;

const ModalContent = styled.div<{ isMobile: boolean }>`
  color: ${Color.TEXT_DEFAULT};
  gap: 10px;
  ${colFlex({ justify: 'start', align: 'start' })}
  ${({ isMobile }) => isMobile && mobileContentStyle}
`;

// 폰 아래 창에서는 상품 목록의 고정 높이(385px)를 풀어 내용만큼만 쓰고, 넘치면 목록만 스크롤해 아래 버튼이 늘 보이게 한다
const mobileListStyle = css`
  flex: 1 1 auto;
  min-height: 0;
  overflow-y: auto;

  & > div {
    height: auto;
  }
`;

const ListSlot = styled.div<{ isMobile: boolean }>`
  width: 100%;
  ${({ isMobile }) => isMobile && mobileListStyle}
`;

const TitleContainer = styled.div`
  width: 100%;
  padding: 0 30px;
  box-sizing: border-box;
  ${rowFlex({ justify: 'space-between', align: 'end' })}
`;

const servedLabelStyle = css`
  background-color: ${Color.KIO_ORANGE};
  border: 0;
  color: #ffffff;
`;

const StatusLabelContainer = styled.div<{ isServed: boolean }>`
  width: 84px;
  height: 24px;
  border-radius: 8px;
  box-sizing: border-box;
  font-size: 12px;
  background-color: white;
  border: 1px solid ${Color.BORDER_GREY};
  color: ${Color.TEXT_DEFAULT};
  ${rowFlex({ justify: 'center', align: 'center' })}
  ${({ isServed }) => isServed && servedLabelStyle}
`;

const TotalLabelContainer = styled.div`
  padding: 2px 30px 0 30px;
  width: 100%;
  box-sizing: border-box;
  ${rowFlex({ justify: 'space-between', align: 'center' })}
`;

const MainLabel = styled.div`
  font-size: 16px;
  font-weight: 700;
`;

interface DemoOrderModalMainProps {
  order: Order;
  isReadOnly: boolean;
  onServe: (orderProduct: OrderProduct, delta: number) => void;
  isMobile?: boolean;
}

function DemoOrderModalMain({ order, isReadOnly, onServe, isMobile = false }: DemoOrderModalMainProps) {
  const isPaidStatus = order.status === OrderStatus.PAID;
  const isAllServed = order.orderProducts.every((orderProduct) => orderProduct.isServed);
  const statusLabel = match(isAllServed)
    .with(true, () => '서빙 완료')
    .otherwise(() => '서빙 미완료');

  const handleIncrease = (orderProduct: OrderProduct) => {
    if (isReadOnly || orderProduct.isServed) return;
    onServe(orderProduct, 1);
  };

  const handleDecrease = (orderProduct: OrderProduct) => {
    if (isReadOnly || orderProduct.servedCount === 0) return;
    onServe(orderProduct, -1);
  };

  return (
    <ModalContent isMobile={isMobile}>
      <TitleContainer>
        <MainLabel>{`주문 상품 ${order.orderProducts.length}개`}</MainLabel>
        {isPaidStatus && <StatusLabelContainer isServed={isAllServed}>{statusLabel}</StatusLabelContainer>}
      </TitleContainer>
      <ListSlot isMobile={isMobile}>
        <OrderModalProductList
          orderProducts={order.orderProducts}
          productMap={PRODUCT_MAP}
          isPaidStatus={isPaidStatus}
          onIncrease={handleIncrease}
          onDecrease={handleDecrease}
        />
      </ListSlot>
      <TotalLabelContainer>
        <MainLabel>총 결제 금액</MainLabel>
        <MainLabel>{`${order.totalPrice.toLocaleString()}원`}</MainLabel>
      </TotalLabelContainer>
    </ModalContent>
  );
}

export default DemoOrderModalMain;
