import { memo } from 'react';
import { Order } from '@@types/index';
import AppLabel from '@components/common/label/AppLabel';
import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { expandButtonStyle } from '@styles/buttonStyles';
import { colFlex, rowFlex } from '@styles/flexStyles';
import OrderDetailModal from '@components/admin/order/realtime/modal/order-detail/OrderDetailModal';
import { areOrdersEquivalent } from '@utils/MemoCompareFunction';
import useModal from '@hooks/useModal';
import { RiArrowRightSLine } from '@remixicon/react';

const CardContainer = styled.div`
  ${colFlex({ justify: 'center', align: 'center' })}
  background-color: #f4f4f4;
  width: 200px;
  height: 70px;
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
  width: 100%;
  height: 85%;
  border-radius: 10px;
  ${colFlex({ justify: 'space-between', align: 'center' })}
`;

const OrderInfoContainer = styled.div`
  ${colFlex()}
  gap: 15px;
  box-sizing: border-box;
  border-radius: 10px;
  padding: 5px 15px;
  width: 100%;
  cursor: pointer;
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

function ServedOrderCard({ order }: OrderCardProps) {
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
                  테이블 {order.tableNumber}
                </AppLabel>
                <RightIcon onClick={openModal} />
              </TitleContainer>
              <DescriptionContainer>
                <AppLabel size={12}>{`주문번호 ${order.orderNumber}`}</AppLabel>
                <AppLabel size={12}>{`총 ${order.totalPrice.toLocaleString()}원`}</AppLabel>
              </DescriptionContainer>
            </HeaderContainer>
          </OrderInfoContainer>
          <OrderDetailModal order={order} isModalOpen={isModalOpen} closeModal={closeModal} />
        </CardContents>
      </CardContainer>
    </>
  );
}

export default memo(ServedOrderCard, arePropsEqual);
