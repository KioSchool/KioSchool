import styled from '@emotion/styled';
import { OrderSessionWithOrder, OrderStatus } from '@@types/index';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { RiCloseLargeLine } from '@remixicon/react';
import { format } from 'date-fns';
import { expandButtonStyle } from '@styles/buttonStyles';
import { formatMinutesToTime } from '@utils/formatDate';
import { getSessionDurationMinutes } from '@utils/sessionUtils';
import { timelineColors } from './timelineConstants';

const ModalHeader = styled.div`
  padding: 20px 30px 0 30px;
  color: ${timelineColors.TEXT_PRIMARY};
  flex-shrink: 0;
  ${colFlex({ align: 'start' })}
`;

const ModalHeaderTitle = styled.div`
  width: 100%;
  height: 24px;
  ${rowFlex({ justify: 'space-between', align: 'center' })}
`;

const MainLabel = styled.div`
  font-size: 16px;
  font-weight: 800;
  gap: 8px;
  ${rowFlex({ align: 'center' })}
`;

const CloseIcon = styled(RiCloseLargeLine)`
  width: 16px;
  height: 16px;
  ${expandButtonStyle}
`;

const DescriptionLabel = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: ${timelineColors.TEXT_SECONDARY};
  padding-top: 4px;
`;

const StatusBadge = styled.span<{ isActive: boolean }>`
  font-size: 11px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 4px;
  color: ${({ isActive }) => (isActive ? Color.KIO_ORANGE : timelineColors.TEXT_SECONDARY)};
  background: ${({ isActive }) => (isActive ? '#fff0e5' : '#f0f0f0')};
`;

const SummaryStrip = styled.div`
  width: 100%;
  margin-top: 16px;
  padding: 12px 0;
  border-top: 1px solid ${timelineColors.BORDER_CARD};
  border-bottom: 1px solid ${timelineColors.BORDER_CARD};
  gap: 0;
  ${rowFlex({ align: 'center' })}
`;

const SummaryItem = styled.div<{ isLast?: boolean }>`
  flex: 1;
  padding: 0 16px;
  border-right: ${({ isLast }) => (isLast ? 'none' : '1px solid ' + timelineColors.BORDER_CARD)};
  ${colFlex({ align: 'center' })}
`;

const SummaryValue = styled.span`
  font-size: 16px;
  font-weight: 700;
  color: ${timelineColors.TEXT_PRIMARY};
  line-height: 1.4;
`;

const SummaryLabel = styled.span`
  font-size: 11px;
  color: ${timelineColors.TEXT_SECONDARY};
  line-height: 1.4;
`;

interface SessionModalHeaderContentsProps {
  session: OrderSessionWithOrder;
  currentTime: Date;
  onClose: () => void;
}

function SessionModalHeaderContents({ session, currentTime, onClose }: SessionModalHeaderContentsProps) {
  const start = new Date(session.createdAt);
  const end = session.endAt ? new Date(session.endAt) : currentTime;
  const durationMinutes = getSessionDurationMinutes(session, currentTime);
  const isActive = !session.endAt;
  const totalPrice = session.totalOrderPrice;
  const customerNames = [...new Set(session.orders.map((o) => o.customerName))];
  const paidOrderCount = session.orders.filter((o) => o.status === OrderStatus.PAID || o.status === OrderStatus.SERVED).length;

  const getCustomerNameLabel = () => {
    if (customerNames.length === 0) return '주문자 없음';
    if (customerNames.length > 2) return `${customerNames[0]} 외 ${customerNames.length - 1}명`;
    return customerNames.join(', ');
  };

  return (
    <ModalHeader>
      <ModalHeaderTitle>
        <MainLabel id="session-modal-title">
          {`테이블 ${session.tableNumber}`}
          <StatusBadge isActive={isActive}>{isActive ? '이용중' : '사용완료'}</StatusBadge>
        </MainLabel>
        <CloseIcon onClick={onClose} />
      </ModalHeaderTitle>
      <DescriptionLabel>
        {format(start, 'yyyy.MM.dd')} · {format(start, 'HH:mm')} – {session.endAt ? format(end, 'HH:mm') : '진행중'} · {getCustomerNameLabel()}
      </DescriptionLabel>

      <SummaryStrip>
        <SummaryItem>
          <SummaryValue>{formatMinutesToTime(durationMinutes)}</SummaryValue>
          <SummaryLabel>이용 시간</SummaryLabel>
        </SummaryItem>
        <SummaryItem>
          <SummaryValue>
            {paidOrderCount}/{session.orders.length}건
          </SummaryValue>
          <SummaryLabel>결제 완료</SummaryLabel>
        </SummaryItem>
        <SummaryItem isLast>
          <SummaryValue>{totalPrice.toLocaleString()}원</SummaryValue>
          <SummaryLabel>총 매출</SummaryLabel>
        </SummaryItem>
      </SummaryStrip>
    </ModalHeader>
  );
}

export default SessionModalHeaderContents;
