import { memo } from 'react';
import { Order } from '@@types/index';
import AppLabel from '@components/common/label/AppLabel';
import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { RiArrowRightSLine, RiCheckboxCircleFill, RiCloseCircleFill } from '@remixicon/react';
import { expandButtonStyle } from '@styles/buttonStyles';
import { colFlex, rowFlex } from '@styles/flexStyles';
import useAdminOrder from '@hooks/admin/useAdminOrder';
import { useParams } from 'react-router-dom';
import OrderDetailModal from '@components/admin/order/realtime/modal/order-detail/OrderDetailModal';
import { areOrdersEquivalent } from '@utils/MemoCompareFunction';
import useFormattedTime from '@hooks/useFormattedTime';
import useModal from '@hooks/useModal';
import { extractMinFromDate } from '@utils/FormatDate';

const CardContainer = styled.div`
  ${colFlex({ justify: 'center', align: 'center' })}
  background-color: #f4f4f4;
  width: 200px;
  height: 110px;
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
  border-radius: 10px;
  gap: 15px;
`;

const OrderInfoContainer = styled.div`
  ${colFlex()}
  gap: 15px;
  box-sizing: border-box;
  padding: 5px 15px;
  width: 100%;
  cursor: pointer;
  border-radius: 10px;
`;

const HeaderContainer = styled.div`
  ${colFlex({ align: 'start' })}
  width: 100%;
  gap: 5px;
`;

const TitleContainer = styled.div`
  width: 100%;
  ${rowFlex({ justify: 'space-between', align: 'center' })}
  padding-top: 3px;
`;

const DescriptionContainer = styled.div`
  width: 100%;
  ${rowFlex({ justify: 'space-between', align: 'center' })}
`;

const CheckButtonContainer = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 0 15px;
  border-radius: 10px;
  ${rowFlex({ justify: 'space-between', align: 'center' })}
`;

const RightIcon = styled(RiArrowRightSLine)`
  width: 25px;
  height: 25px;
  stroke-width: 1px;
  ${expandButtonStyle}
`;

const CheckIcon = styled(RiCheckboxCircleFill)`
  width: 20px;
  height: 20px;
  color: ${Color.GREY};
  ${expandButtonStyle}
`;

const CloseIcon = styled(RiCloseCircleFill)`
  width: 20px;
  height: 20px;
  color: ${Color.GREY};
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
  const delayMinutes = useFormattedTime<number>({ date: order.createdAt, formatter: extractMinFromDate });
  const { isModalOpen, openModal, closeModal } = useModal();

  const checkClickHandler = () => {
    payOrder(order.id);
  };

  const closeClickHandler = () => {
    cancelOrder(order.id);
  };

  const orderInfoClickHandler = () => {
    openModal();
  };

  return (
    <CardContainer>
      <CardContents>
        <OrderInfoContainer onClick={orderInfoClickHandler}>
          <HeaderContainer>
            <TitleContainer>
              <AppLabel size={17} style={{ fontWeight: 800 }}>
                {order.customerName}
              </AppLabel>
              <RightIcon onClick={openModal} />
            </TitleContainer>
            <DescriptionContainer>
              <AppLabel size={12}>{`${delayMinutes}분 전`}</AppLabel>
              <AppLabel size={12}>{`총 ${order.totalPrice.toLocaleString()}원`}</AppLabel>
            </DescriptionContainer>
          </HeaderContainer>
        </OrderInfoContainer>
        <OrderDetailModal order={order} isModalOpen={isModalOpen} closeModal={closeModal} />
        <CheckButtonContainer>
          <CloseIcon onClick={closeClickHandler} />
          <CheckIcon onClick={checkClickHandler} />
        </CheckButtonContainer>
      </CardContents>
    </CardContainer>
  );
}

export default memo(NotPaidOrderCard, arePropsEqual);
