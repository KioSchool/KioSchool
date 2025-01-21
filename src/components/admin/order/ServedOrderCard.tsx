import React, { memo, useState } from 'react';
import { Order } from '@@types/index';
import AppLabel from '@components/common/label/AppLabel';
import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import ChevronRightSvg from '@resources/svg/ChevronRightSvg';
import { expandButtonStyle } from '@styles/buttonStyles';
import { colFlex, rowFlex } from '@styles/flexStyles';
import OrderSummaryContents from './OrderSummaryContents';
import useAdminOrder from '@hooks/admin/useAdminOrder';
import { useParams } from 'react-router-dom';
import RollBackSvg from '@resources/svg/RollBackSvg';
import OrderDetailModal from '@components/admin/order/modal/OrderDetailModal';
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

const RightIcon = styled(ChevronRightSvg)`
  margin-top: 6px;
  width: 20px;
  height: 15px;
  ${expandButtonStyle}
`;

const CheckButtonContainer = styled.div`
  ${rowFlex({ justify: 'center', align: 'center' })}
  gap: 35px;
  width: 55%;
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

  const [isModalOpen, setModalOpen] = useState(false);

  const openModalHandler = () => {
    setModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModalHandler = () => {
    setModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  const rollBackClickHandler = () => {
    payOrder(order.id);
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
              <AppLabel color={Color.BLACK} size={13}>
                {`주문 번호 ${order.id}`}
              </AppLabel>
            </TitleContainer>
            <RightIcon onClick={openModalHandler} />
          </HeaderContainer>
          <OrderSummaryContents contents={order} />
          <CheckButtonContainer>
            <RollBackIcon onClick={rollBackClickHandler} />
          </CheckButtonContainer>
        </CardContents>
      </CardContainer>
      <OrderDetailModal isOpen={isModalOpen} order={order} onClose={closeModalHandler} />
    </>
  );
}

export default memo(ServedOrderCard, arePropsEqual);
