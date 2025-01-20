import { Order, OrderStatus } from '@@types/index';
import AppLabel from '@components/common/label/AppLabel';
import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import CheckSvg from '@resources/svg/CheckSvg';
import ChevronRightSvg from '@resources/svg/ChevronRightSvg';
import CloseSvg from '@resources/svg/CloseSvg';
import { expandButtonStyle } from '@styles/buttonStyles';
import { colFlex, rowFlex } from '@styles/flexStyles';
import NotPaidCardContents from './NotPaidCardContents';
import useAdminOrder from '@hooks/admin/useAdminOrder';
import { useParams } from 'react-router-dom';
import RollBackSvg from '@resources/svg/RollBackSvg';

const CardContainer = styled.div`
  ${colFlex({ justify: 'center', align: 'center' })}
  background-color: ${Color.LIGHT_GREY};
  width: 180px;
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
  width: 35px;
  height: 35px;
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
  orderInfo: Order;
}

function OrderCard({ orderInfo }: OrderCardProps) {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const { payOrder, cancelOrder, serveOrder, refundOrder } = useAdminOrder(workspaceId);

  const createdAtDate = new Date(orderInfo.createdAt.replace(' ', 'T'));
  const currentTime = new Date();
  const orderDelayTime = Math.floor((currentTime.getTime() - createdAtDate.getTime()) / (1000 * 60));

  const checkClickHandler = () => {
    if (orderInfo.status === OrderStatus.NOT_PAID) {
      payOrder(orderInfo.id);
    } else if (orderInfo.status === OrderStatus.PAID) {
      serveOrder(orderInfo.id);
    }
  };

  const closeClickHandler = () => {
    cancelOrder(orderInfo.id);
  };

  const rollBackClickHandler = () => {
    if (orderInfo.status === OrderStatus.PAID) {
      refundOrder(orderInfo.id);
    } else if (orderInfo.status === OrderStatus.SERVED) {
      payOrder(orderInfo.id);
    }
  };

  return (
    <CardContainer>
      <CardContents>
        <HeaderContainer>
          <TitleContainer>
            <AppLabel size={17} style={{ fontWeight: 800 }}>{`테이블 ${orderInfo.tableNumber + 1}`}</AppLabel>
            <AppLabel size={13}>{`${orderDelayTime}분 전 주문`}</AppLabel>
          </TitleContainer>
          <RightIcon />
        </HeaderContainer>
        {orderInfo.status === OrderStatus.PAID ? null : <NotPaidCardContents contents={orderInfo} />}
        <CheckButtonContainer>
          {orderInfo.status === OrderStatus.SERVED ? null : <CheckIcon onClick={checkClickHandler} />}
          {orderInfo.status === OrderStatus.NOT_PAID ? <CloseIcon onClick={closeClickHandler} /> : <RollBackIcon onClick={rollBackClickHandler} />}
        </CheckButtonContainer>
      </CardContents>
    </CardContainer>
  );
}

export default OrderCard;
