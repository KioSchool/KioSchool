import React, { memo } from 'react';
import { Order } from '@@types/index';
import AppLabel from '@components/common/label/AppLabel';
import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { RiCloseLargeLine, RiCheckLine } from '@remixicon/react';
import { expandButtonStyle } from '@styles/buttonStyles';
import { colFlex, rowFlex } from '@styles/flexStyles';
import OrderSummaryContents from './OrderSummaryContents';
import useAdminOrder from '@hooks/admin/useAdminOrder';
import { useParams } from 'react-router-dom';
import OrderDetailModalButton from '@components/admin/order/modal/OrderDetailModalButton';
import { areOrdersEquivalent } from '@utils/MemoCompareFunction';
import useDelayTime from '@hooks/useDelayTime';

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
  padding-top: 3px;
`;

const CheckButtonContainer = styled.div`
  ${rowFlex({ justify: 'center', align: 'center' })}
  gap: 35px;
  width: 55%;
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

  const checkClickHandler = () => {
    payOrder(order.id);
  };

  const closeClickHandler = () => {
    cancelOrder(order.id);
  };

  return (
    <>
      <CardContainer>
        <CardContents>
          <HeaderContainer>
            <TitleContainer>
              <AppLabel color={Color.BLACK} size={17} style={{ fontWeight: 800 }}>
                {order.customerName}
              </AppLabel>
              <AppLabel color={Color.BLACK} size={13}>{`${delayMinutes}분 전 주문`}</AppLabel>
            </TitleContainer>
            <OrderDetailModalButton order={order} />
          </HeaderContainer>
          <OrderSummaryContents contents={order} />
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
