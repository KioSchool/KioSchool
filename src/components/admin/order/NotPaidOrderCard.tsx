import React, { memo } from 'react';
import { Order } from '@@types/index';
import AppLabel from '@components/common/label/AppLabel';
import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { RiCloseLargeLine, RiCheckLine, RiArrowRightSLine } from '@remixicon/react';
import { expandButtonStyle } from '@styles/buttonStyles';
import { colFlex, rowFlex } from '@styles/flexStyles';
import OrderSummaryContents from './OrderSummaryContents';
import useAdminOrder from '@hooks/admin/useAdminOrder';
import { useParams } from 'react-router-dom';
import OrderDetailModal from '@components/admin/order/modal/OrderDetailModal';
import { areOrdersEquivalent } from '@utils/MemoCompareFunction';
import useDelayTime from '@hooks/useDelayTime';
import useModal from '@hooks/useModal';

const CardContainer = styled.div`
  ${colFlex({ justify: 'center', align: 'center' })}
  background-color: #f4f4f4;
  width: 200px;
  height: 170px;
  border-radius: 10px;

  &:hover {
    background-color: ${Color.KIO_ORANGE};

    & * {
      background-color: ${Color.KIO_ORANGE};
      color: ${Color.WHITE};
      stroke: ${Color.WHITE};
    }
  }
`;

const CardContents = styled.div`
  ${colFlex({ justify: 'space-between', align: 'center' })}
  width: 100%;
  height: 85%;
`;

const OrderInfoContainer = styled.div`
  background-color: ${Color.LIGHT_GREY};
  box-sizing: border-box;
  padding: 15px;
  width: 100%;
  cursor: pointer;
`;

const HeaderContainer = styled.div`
  ${rowFlex({ justify: 'space-between', align: 'start' })}
  width: 100%;
`;

const TitleContainer = styled.div`
  ${colFlex({ align: 'start' })}
  padding-top: 3px;
`;

const CheckButtonContainer = styled.div`
  ${rowFlex({ justify: 'center', align: 'center' })}
  gap: 35px;
  width: 55%;
`;

const RightIcon = styled(RiArrowRightSLine)`
  width: 25px;
  height: 25px;
  ${expandButtonStyle}
`;

const CheckIcon = styled(RiCheckLine)`
  width: 25px;
  height: 25px;
  ${expandButtonStyle}
`;

const CloseIcon = styled(RiCloseLargeLine)`
  width: 20px;
  height: 20px;
  ${expandButtonStyle}
`;

interface OrderCardProps {
  order: Order;
}

const arePropsEqual = (prevProps: OrderCardProps, nextProps: OrderCardProps) => {
  return areOrdersEquivalent(prevProps.order, nextProps.order);
};

function NotPaidOrderCard({ order }: OrderCardProps) {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const { payOrder, cancelOrder } = useAdminOrder(workspaceId);
  const { delayMinutes } = useDelayTime({ date: order.createdAt });
  const { isModalOpen, openModal, closeModal } = useModal();

  const checkClickHandler = () => {
    payOrder(order.id);
  };

  const closeClickHandler = () => {
    cancelOrder(order.id);
  };

  const orderInfoClickHandler = () => {
    if (!isModalOpen) openModal();
  };

  return (
    <>
      <CardContainer>
        <CardContents>
          <OrderInfoContainer onClick={orderInfoClickHandler}>
            <HeaderContainer>
              <TitleContainer>
                <AppLabel color={Color.BLACK} size={17} style={{ fontWeight: 800 }}>
                  {order.customerName}
                </AppLabel>
                <AppLabel color={Color.BLACK} size={13}>{`${delayMinutes}분 전 주문`}</AppLabel>
              </TitleContainer>
              <RightIcon onClick={openModal} />
              <OrderDetailModal order={order} isModalOpen={isModalOpen} closeModal={closeModal} />
            </HeaderContainer>
            <OrderSummaryContents contents={order} />
          </OrderInfoContainer>
          <CheckButtonContainer>
            <CheckIcon onClick={checkClickHandler} />
            <CloseIcon onClick={closeClickHandler} />
          </CheckButtonContainer>
        </CardContents>
      </CardContainer>
    </>
  );
}

export default memo(NotPaidOrderCard, arePropsEqual);
