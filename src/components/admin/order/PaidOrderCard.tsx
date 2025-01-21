import React, { memo, useState, useEffect } from 'react';
import { Order } from '@@types/index';
import AppLabel from '@components/common/label/AppLabel';
import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import CheckSvg from '@resources/svg/CheckSvg';
import ChevronRightSvg from '@resources/svg/ChevronRightSvg';
import { expandButtonStyle } from '@styles/buttonStyles';
import { colFlex, rowFlex } from '@styles/flexStyles';
import useAdminOrder from '@hooks/admin/useAdminOrder';
import { useParams } from 'react-router-dom';
import RollBackSvg from '@resources/svg/RollBackSvg';
import OrderDetailModal from '@components/admin/order/modal/OrderDetailModal';
import OrderItemList from '@components/admin/order/OrderItemList';
import { extractMinFromDate } from '@utils/FormatDate';

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

const RollBackIcon = styled(RollBackSvg)`
  width: 15px;
  height: 15px;
  ${expandButtonStyle}
`;

interface OrderCardProps {
  order: Order;
}

function areOrderInfoEqual(prevOrder: Order, nextOrder: Order) {
  const isSameOrderId = prevOrder.id === nextOrder.id;
  const hasSameStatus = prevOrder.status === nextOrder.status;

  const areAllServedCountsEqual = prevOrder.orderProducts.every((prevProduct, index) => {
    const nextProduct = nextOrder.orderProducts[index];
    return prevProduct.servedCount === nextProduct.servedCount;
  });

  return isSameOrderId && hasSameStatus && areAllServedCountsEqual;
}

const arePropsEqual = (prevProps: OrderCardProps, nextProps: OrderCardProps) => {
  return areOrderInfoEqual(prevProps.order, nextProps.order);
};

function PaidOrderCard({ order }: OrderCardProps) {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const { serveOrder, refundOrder } = useAdminOrder(workspaceId);

  const [isModalOpen, setModalOpen] = useState(false);
  const [orderDelayTime, setOrderDelayTime] = useState<Number>(extractMinFromDate(order.createdAt));

  useEffect(() => {
    const interval = setInterval(() => {
      const updatedDelayTime = extractMinFromDate(order.createdAt);

      setOrderDelayTime((prevDelayTime) => (prevDelayTime !== updatedDelayTime ? updatedDelayTime : prevDelayTime));
    }, 10000);

    return () => clearInterval(interval);
  }, [order.createdAt]);

  const openModalHandler = () => {
    setModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModalHandler = () => {
    setModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  const checkClickHandler = () => {
    serveOrder(order.id);
  };

  const rollBackClickHandler = () => {
    refundOrder(order.id);
  };

  return (
    <>
      <CardContainer>
        <CardContents>
          <HeaderContainer>
            <TitleContainer>
              <AppLabel color={Color.BLACK} size={17} style={{ fontWeight: 800 }}>
                {`테이블 ${order.tableNumber}`}
              </AppLabel>
              <AppLabel color={Color.BLACK} size={13}>{`${orderDelayTime}분 전 주문`}</AppLabel>
            </TitleContainer>
            <RightIcon onClick={openModalHandler} />
          </HeaderContainer>
          <OrderItemList order={order} />
          <CheckButtonContainer>
            <CheckIcon onClick={checkClickHandler} />
            <RollBackIcon onClick={rollBackClickHandler} />
          </CheckButtonContainer>
        </CardContents>
      </CardContainer>
      <OrderDetailModal isOpen={isModalOpen} order={order} onClose={closeModalHandler} />
    </>
  );
}

export default memo(PaidOrderCard, arePropsEqual);
