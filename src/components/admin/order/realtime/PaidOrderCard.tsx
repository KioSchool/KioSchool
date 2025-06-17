import { memo } from 'react';
import { Order } from '@@types/index';
import AppLabel from '@components/common/label/AppLabel';
import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { RiArrowRightSLine } from '@remixicon/react';
import { expandButtonStyle } from '@styles/buttonStyles';
import { colFlex, rowFlex } from '@styles/flexStyles';
import OrderDetailModal from '@components/admin/order/realtime/modal/OrderDetailModal';
import OrderItemList from '@components/admin/order/realtime/OrderItemList';
import { areOrdersEquivalent } from '@utils/MemoCompareFunction';
import useDelayTime from '@hooks/useDelayTime';
import useModal from '@hooks/useModal';

const CardContainer = styled.div`
  ${colFlex({ justify: 'center', align: 'center' })}
  background-color: #f4f4f4;
  width: 200px;
  height: 260px;
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
  height: 90%;
`;

const OrderInfoContainer = styled.div`
  ${colFlex()}
  box-sizing: border-box;
  padding: 5px 15px;
  width: 100%;
  border-radius: 10px;
  cursor: pointer;
`;

const HeaderContainer = styled.div`
  ${rowFlex({ justify: 'space-between', align: 'start' })}
  width: 100%;
`;

const TitleContainer = styled.div`
  ${colFlex({ align: 'start' })}
  padding-top: 3px;
  gap: 5px;
`;

const HorizontalLine = styled.hr`
  width: 100%;
  border: 0.3px solid #d9d9d9;
`;

const RightIcon = styled(RiArrowRightSLine)`
  width: 25px;
  height: 25px;
  ${expandButtonStyle}
`;

const arePropsEqual = (prevProps: OrderCardProps, nextProps: OrderCardProps) => {
  return areOrdersEquivalent(prevProps.order, nextProps.order);
};

interface OrderCardProps {
  order: Order;
}

function PaidOrderCard({ order }: OrderCardProps) {
  const { delayMinutes } = useDelayTime({ date: order.createdAt });
  const { isModalOpen, openModal, closeModal } = useModal();

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
                <AppLabel size={17} style={{ fontWeight: 800 }}>
                  {`테이블 ${order.tableNumber}`}
                </AppLabel>
                <AppLabel size={13}>{`${delayMinutes}분 전`}</AppLabel>
              </TitleContainer>
              <RightIcon onClick={openModal} />
            </HeaderContainer>
            <HorizontalLine />
            <OrderItemList order={order} />
          </OrderInfoContainer>
          <OrderDetailModal order={order} isModalOpen={isModalOpen} closeModal={closeModal} />
        </CardContents>
      </CardContainer>
    </>
  );
}

export default memo(PaidOrderCard, arePropsEqual);
