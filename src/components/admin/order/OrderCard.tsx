import { Order } from '@@types/index';
import AppLabel from '@components/common/label/AppLabel';
import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { colFlex } from '@styles/flexStyles';

interface OrderCardProps {
  orderInfo: Order;
}

const CardContainer = styled.div`
  ${colFlex({ justify: 'center', align: 'center' })}
  background-color: ${Color.LIGHT_GREY};
  width: 180px;
  height: 150px;
  border-radius: 10px;

  :hover {
    background-color: ${Color.KIO_ORANGE};
    color: ${Color.WHITE};
  }
`;

const CardContents = styled.div`
  ${colFlex()}
  width: 80%;
  height: 80%;
`;

const HeaderContainer = styled.div`
  ${colFlex({ justify: 'space-between' })}
`;

const TitleContainer = styled.div`
  ${colFlex({ align: 'start' })}
`;

function OrderCard({ orderInfo }: OrderCardProps) {
  const createdAtDate = new Date(orderInfo.createdAt.replace(' ', 'T'));
  const currentTime = new Date();
  const orderDelayTime = Math.floor((currentTime.getTime() - createdAtDate.getTime()) / (1000 * 60));

  return (
    <CardContainer>
      <CardContents>
        <HeaderContainer>
          <TitleContainer>
            <AppLabel size={17} style={{ fontWeight: 800 }}>{`테이블 ${orderInfo.tableNumber + 1}`}</AppLabel>
            <AppLabel size={13}>{`${orderDelayTime} 분전 주문`}</AppLabel>
          </TitleContainer>
        </HeaderContainer>
      </CardContents>
    </CardContainer>
  );
}

export default OrderCard;
