import React, { memo } from 'react';
import { Order } from '@@types/index';
import AppLabel from '@components/common/label/AppLabel';
import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { expandButtonStyle } from '@styles/buttonStyles';
import { colFlex, rowFlex } from '@styles/flexStyles';
import OrderSummaryContents from './OrderSummaryContents';
import useAdminOrder from '@hooks/admin/useAdminOrder';
import { useParams } from 'react-router-dom';
import RollBackSvg from '@resources/svg/RollBackSvg';
import OrderDetailModal from '@components/admin/order/modal/OrderDetailModal';
import { areOrdersEquivalent } from '@utils/MemoCompareFunction';
import useModal from '@hooks/useModal';
import { RiArrowRightSLine } from '@remixicon/react';

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
  ${colFlex()}
  gap: 15px;
  background-color: ${Color.LIGHT_GREY};
  box-sizing: border-box;
  padding: 5px 15px;
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

function ServedOrderCard({ order }: OrderCardProps) {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const { payOrder } = useAdminOrder(workspaceId);
  const { isModalOpen, openModal, closeModal } = useModal();

  const rollBackClickHandler = () => {
    payOrder(order.id);
  };

  const orderInfoClickHandler = () => {
    openModal();
  };

  return (
    <>
      <CardContainer>
        <CardContents>
          <OrderInfoContainer onClick={orderInfoClickHandler}>
            <HeaderContainer>
              <TitleContainer>
                <AppLabel color={Color.BLACK} size={17} style={{ fontWeight: 800 }}>
                  {`테이블 ${order.tableNumber}`}
                </AppLabel>
                <AppLabel color={Color.BLACK} size={13}>
                  {`주문 번호 ${order.orderNumber}`}
                </AppLabel>
              </TitleContainer>
              <RightIcon onClick={openModal} />
            </HeaderContainer>
            <OrderSummaryContents contents={order} />
          </OrderInfoContainer>
          <OrderDetailModal order={order} isModalOpen={isModalOpen} closeModal={closeModal} />
          <CheckButtonContainer>
            <RollBackIcon onClick={rollBackClickHandler} />
          </CheckButtonContainer>
        </CardContents>
      </CardContainer>
    </>
  );
}

export default memo(ServedOrderCard, arePropsEqual);
