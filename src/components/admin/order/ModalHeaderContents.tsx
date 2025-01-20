import { Order } from '@@types/index';
import AppLabel from '@components/common/label/AppLabel';
import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import CloseSvg from '@resources/svg/CloseSvg';
import { expandButtonStyle } from '@styles/buttonStyles';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { orderStatusConverter } from '@utils/OrderStatusConverter';

const ModalHeader = styled.div`
  ${colFlex({ justify: 'space-between', align: 'start' })}
  gap: 10px;
  padding-bottom: 10px;
  border-bottom: 20px solid ${Color.LIGHT_GREY};
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
  gap: 10px;
`;

const CloseIcon = styled(CloseSvg)`
  ${expandButtonStyle}
`;

interface ModalHeaderContentsProps {
  orderInfo: Order;
  onClose: () => void;
}

function ModalHeaderContents({ onClose, orderInfo }: ModalHeaderContentsProps) {
  return (
    <ModalHeader>
      <ModalHeaderTitle>
        <AppLabel color={Color.BLACK} size={17} style={{ fontWeight: 800 }}>{`테이블 ${orderInfo.tableNumber + 1}`}</AppLabel>
        <CloseIcon onClick={onClose} />
      </ModalHeaderTitle>
      <HeaderDetailContainer>
        <HeaderDetail>
          <AppLabel color={Color.BLACK} size={13}>{`주문 번호  ${orderInfo.id + 1}`}</AppLabel>
          <AppLabel color={Color.BLACK} size={13}>{`주문 일시 | ${new Date(orderInfo.createdAt).toLocaleString()}`}</AppLabel>
        </HeaderDetail>
        <AppLabel color={Color.KIO_ORANGE} size={17} style={{ fontWeight: 600 }}>
          {orderStatusConverter(orderInfo.status)}
        </AppLabel>
      </HeaderDetailContainer>
    </ModalHeader>
  );
}

export default ModalHeaderContents;
