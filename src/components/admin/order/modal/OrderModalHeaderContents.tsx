import { Order } from '@@types/index';
import AppLabel from '@components/common/label/AppLabel';
import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { RiCloseLargeLine } from '@remixicon/react';
import { expandButtonStyle } from '@styles/buttonStyles';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { formatDate } from '@utils/FormatDate';
import { orderStatusConverter } from '@utils/OrderStatusConverter';

const ModalHeader = styled.div`
  ${colFlex({ justify: 'space-between', align: 'start' })}
  gap: 10px;
  padding: 40px 40px 20px 40px;
  border-bottom: 12px solid ${Color.LIGHT_GREY};
`;

const ModalHeaderTitle = styled.div`
  ${rowFlex({ justify: 'space-between', align: 'center' })}
  width: 100%;
`;

const HeaderDetailContainer = styled.div`
  ${rowFlex({ justify: 'space-between', align: 'center' })}
  width: 100%;
`;

const HeaderDetail = styled.div`
  ${colFlex({ align: 'start' })}
  gap: 5px;
`;

const CloseIcon = styled(RiCloseLargeLine)`
  ${expandButtonStyle}
`;

interface OrderModalHeaderContentsProps {
  order: Order;
  onClose: () => void;
}

function OrderModalHeaderContents({ onClose, order }: OrderModalHeaderContentsProps) {
  return (
    <ModalHeader>
      <ModalHeaderTitle>
        <AppLabel color={Color.BLACK} size={20} style={{ fontWeight: 800 }}>{`테이블 ${order.tableNumber}`}</AppLabel>
        <CloseIcon onClick={onClose} />
      </ModalHeaderTitle>
      <HeaderDetailContainer>
        <HeaderDetail>
          <AppLabel color={Color.BLACK} size={17}>{`주문 번호  ${order.orderNumber}`}</AppLabel>
          <AppLabel color={Color.BLACK} size={17}>{`${order.customerName} | ${formatDate(order.createdAt)}`}</AppLabel>
        </HeaderDetail>
        <AppLabel color={Color.KIO_ORANGE} size={20} style={{ fontWeight: 600 }}>
          {orderStatusConverter(order.status)}
        </AppLabel>
      </HeaderDetailContainer>
    </ModalHeader>
  );
}

export default OrderModalHeaderContents;
