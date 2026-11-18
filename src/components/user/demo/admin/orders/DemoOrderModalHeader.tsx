import styled from '@emotion/styled';
import { RiArrowRightSLine, RiCloseLargeLine } from '@remixicon/react';
import { Order } from '@@types/index';
import { Color } from '@resources/colors';
import { expandButtonStyle } from '@styles/buttonStyles';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { formatDate } from '@utils/formatDate';

const ModalHeader = styled.div`
  padding: 20px 30px 12px 30px;
  border-bottom: 1px solid ${Color.BORDER_GREY};
  color: ${Color.TEXT_DEFAULT};
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

const MainLabel = styled.div`
  font-size: 16px;
  font-weight: 800;
`;

const DescriptionLabel = styled.div`
  font-size: 14px;
  font-weight: 400;
`;

const IconButton = styled.button`
  padding: 0;
  border: 0;
  background: none;
  line-height: 0;
  ${expandButtonStyle({})}
`;

const CloseIcon = styled(RiCloseLargeLine)`
  width: 16px;
  height: 16px;
`;

const ArrowRightIcon = styled(RiArrowRightSLine)`
  width: 16px;
  height: 16px;
`;

interface DemoOrderModalHeaderProps {
  order: Order;
  isReadOnly: boolean;
  onClose: () => void;
  onUnsupported: () => void;
}

function DemoOrderModalHeader({ order, isReadOnly, onClose, onUnsupported }: DemoOrderModalHeaderProps) {
  return (
    <ModalHeader>
      <ModalHeaderTitle>
        <MainLabel>{`주문 번호  ${order.orderNumber}`}</MainLabel>
        <IconButton type="button" aria-label="닫기" onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </ModalHeaderTitle>
      <ModalDescription>
        <DescriptionLabel>{`${formatDate(order.createdAt)} · ${order.customerName}`}</DescriptionLabel>
        <ModalTableDescription>
          <DescriptionLabel>{`테이블 ${order.tableNumber}`}</DescriptionLabel>
          {!isReadOnly && (
            <IconButton type="button" aria-label="테이블 주문 보기" onClick={onUnsupported}>
              <ArrowRightIcon />
            </IconButton>
          )}
        </ModalTableDescription>
      </ModalDescription>
    </ModalHeader>
  );
}

export default DemoOrderModalHeader;
