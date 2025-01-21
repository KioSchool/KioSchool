import React, { memo, useState } from 'react';
import { Order, OrderStatus } from '@@types/index';
import AppLabel from '@components/common/label/AppLabel';
import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import CheckSvg from '@resources/svg/CheckSvg';
import ChevronRightSvg from '@resources/svg/ChevronRightSvg';
import CloseSvg from '@resources/svg/CloseSvg';
import { expandButtonStyle } from '@styles/buttonStyles';
import { colFlex, rowFlex } from '@styles/flexStyles';
import OrderSummaryContents from './OrderSummaryContents';
import useAdminOrder from '@hooks/admin/useAdminOrder';
import { useParams } from 'react-router-dom';
import RollBackSvg from '@resources/svg/RollBackSvg';
import OrderDetailModal from './OrderDetailModal';
import OrderItemList from './OrderItemList';

const CardContainer = styled.div`
  ${colFlex({ justify: 'center', align: 'center' })}
  background-color: ${Color.LIGHT_GREY};
  width: 200px;
  height: 170px;
  border-radius: 10px;

  &:hover {
    background-color: ${Color.KIO_ORANGE};

    & * {
      color: ${Color.WHITE};
      stroke: ${Color.WHITE};
    }
  }
`;

const CardContents = styled.div`
  ${colFlex({ justify: 'space-between', align: 'center' })}
  width: 80%;
  height: 85%;
`;

const HeaderContainer = styled.div`
  ${rowFlex({ justify: 'space-between', align: 'start' })}
  width: 100%;
`;

const TitleContainer = styled.div`
  ${colFlex({ align: 'start' })}
`;

const RightIcon = styled(ChevronRightSvg)`
  margin-top: 3px;
  width: 20px;
  height: 15px;
  ${expandButtonStyle}
`;

const CheckButtonContainer = styled.div`
  ${rowFlex({ justify: 'center', align: 'center' })}
  gap: 35px;
  width: 55%;
`;

const CheckIcon = styled(CheckSvg)`
  width: 25px;
  height: 25px;
  ${expandButtonStyle}
`;

const CloseIcon = styled(CloseSvg)`
  ${expandButtonStyle}
`;

const RollBackIcon = styled(RollBackSvg)`
  width: 15px;
  height: 15px;
  ${expandButtonStyle}
`;

interface OrderCardProps {
  order: Order;
}

function areOrderInfoEqual(prevOrder: Order, nextOrder: Order) {
  if (prevOrder.id !== nextOrder.id || prevOrder.status !== nextOrder.status) {
    return false;
  }

  return prevOrder.orderProducts.every((prevProduct, index) => {
    const nextProduct = nextOrder.orderProducts[index];
    return prevProduct.servedCount === nextProduct.servedCount;
  });
}

const arePropsEqual = (prevProps: OrderCardProps, nextProps: OrderCardProps) => {
  return areOrderInfoEqual(prevProps.order, nextProps.order);
};

function OrderCard({ order }: OrderCardProps) {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const { payOrder, cancelOrder, serveOrder, refundOrder } = useAdminOrder(workspaceId);

  const [isModalOpen, setModalOpen] = useState(false);

  const createdAtDate = new Date(order.createdAt.replace(' ', 'T'));
  const currentTime = new Date();
  const orderDelayTime = Math.floor((currentTime.getTime() - createdAtDate.getTime()) / (1000 * 60));

  const openModalHandler = () => {
    setModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModalHandler = () => {
    setModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  const checkClickHandler = () => {
    if (order.status === OrderStatus.NOT_PAID) {
      payOrder(order.id);
    } else if (order.status === OrderStatus.PAID) {
      serveOrder(order.id);
    }
  };

  const closeClickHandler = () => {
    cancelOrder(order.id);
  };

  const rollBackClickHandler = () => {
    if (order.status === OrderStatus.PAID) {
      refundOrder(order.id);
    } else if (order.status === OrderStatus.SERVED) {
      payOrder(order.id);
    }
  };

  return (
    <>
      <CardContainer>
        <CardContents>
          <HeaderContainer>
            <TitleContainer>
              <AppLabel color={Color.BLACK} size={17} style={{ fontWeight: 800 }}>
                {order.status === OrderStatus.NOT_PAID ? order.customerName : `테이블 ${order.tableNumber}`}
              </AppLabel>
              <AppLabel color={Color.BLACK} size={13}>{`${orderDelayTime}분 전 주문`}</AppLabel>
            </TitleContainer>
            <RightIcon onClick={openModalHandler} />
          </HeaderContainer>
          {order.status === OrderStatus.PAID ? <OrderItemList order={order} /> : <OrderSummaryContents contents={order} />}
          <CheckButtonContainer>
            {order.status === OrderStatus.SERVED ? null : <CheckIcon onClick={checkClickHandler} />}
            {order.status === OrderStatus.NOT_PAID ? <CloseIcon onClick={closeClickHandler} /> : <RollBackIcon onClick={rollBackClickHandler} />}
          </CheckButtonContainer>
        </CardContents>
      </CardContainer>
      <OrderDetailModal isOpen={isModalOpen} order={order} onClose={closeModalHandler} />
    </>
  );
}

export default memo(OrderCard, arePropsEqual);
