import React, { memo, useState, useEffect } from 'react';
import { Order } from '@@types/index';
import AppLabel from '@components/common/label/AppLabel';
import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import CheckSvg from '@resources/svg/CheckSvg';
import { expandButtonStyle } from '@styles/buttonStyles';
import { colFlex, rowFlex } from '@styles/flexStyles';
import useAdminOrder from '@hooks/admin/useAdminOrder';
import { useParams } from 'react-router-dom';
import RollBackSvg from '@resources/svg/RollBackSvg';
import OrderDetailModalWithButton from '@components/admin/order/modal/OrderDetailModalWithButton';
import OrderItemList from '@components/admin/order/OrderItemList';
import { extractMinFromDate } from '@utils/FormatDate';
import { areOrdersEquivalent } from '@utils/MemoCompareFunction';

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

const arePropsEqual = (prevProps: OrderCardProps, nextProps: OrderCardProps) => {
  return areOrdersEquivalent(prevProps.order, nextProps.order);
};

function PaidOrderCard({ order }: OrderCardProps) {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const { serveOrder, refundOrder } = useAdminOrder(workspaceId);

  const [orderDelayTime, setOrderDelayTime] = useState<number>(extractMinFromDate(order.createdAt));

  useEffect(() => {
    const interval = setInterval(() => {
      const updatedDelayTime = extractMinFromDate(order.createdAt);

      setOrderDelayTime((prevDelayTime) => (prevDelayTime !== updatedDelayTime ? updatedDelayTime : prevDelayTime));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

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
            <OrderDetailModalWithButton order={order} />
          </HeaderContainer>
          <OrderItemList order={order} />
          <CheckButtonContainer>
            <CheckIcon onClick={checkClickHandler} />
            <RollBackIcon onClick={rollBackClickHandler} />
          </CheckButtonContainer>
        </CardContents>
      </CardContainer>
    </>
  );
}

export default memo(PaidOrderCard, arePropsEqual);
