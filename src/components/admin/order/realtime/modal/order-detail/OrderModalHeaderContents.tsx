import { Order } from '@@types/index';
import AppLabel from '@components/common/label/AppLabel';
import styled from '@emotion/styled';
import { RiCloseLargeLine, RiArrowRightSLine } from '@remixicon/react';
import { expandButtonStyle } from '@styles/buttonStyles';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { formatDate } from '@utils/FormatDate';

const ModalHeader = styled.div`
  padding: 20px 30px 12px 30px;
  border-bottom: 1px solid #e8eef2;
  font-family: 'LINE Seed Sans KR', sans-serif;
  color: #464a4d;
  ${colFlex({ justify: 'space-between', align: 'start' })}
`;

const ModalHeaderTitle = styled.div`
  width: 100%;
  height: 24px;
  ${rowFlex({ justify: 'space-between', align: 'center' })}
`;

const ModalDescription = styled.div`
  width: 100%;
  gap: 4px;
  height: 48px;
  ${colFlex({ justify: 'center', align: 'start' })}
`;

const ModalTableDescription = styled.div`
  gap: 4px;
  ${rowFlex({ align: 'center' })}
`;

const CloseIcon = styled(RiCloseLargeLine)`
  width: 16px;
  height: 16px;
  ${expandButtonStyle}
`;

const ArrowRightIcon = styled(RiArrowRightSLine)`
  width: 16px;
  height: 16px;
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
        <AppLabel size={16} style={{ fontWeight: 800 }}>
          {`주문 번호  ${order.orderNumber}`}
        </AppLabel>
        <CloseIcon onClick={onClose} />
      </ModalHeaderTitle>
      <ModalDescription>
        <AppLabel size={14}>{`${formatDate(order.createdAt)} · ${order.customerName}`}</AppLabel>
        <ModalTableDescription>
          <AppLabel size={14}>{`테이블 ${order.tableNumber}`}</AppLabel>
          {/* todo: 어떤 click action? */}
          <ArrowRightIcon onClick={() => {}} />
        </ModalTableDescription>
      </ModalDescription>
    </ModalHeader>
  );
}

export default OrderModalHeaderContents;
