import styled from '@emotion/styled';
import { GHOST_TYPE, OrderSessionWithOrder } from '@@types/index';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { RiCloseLargeLine } from '@remixicon/react';
import { differenceInMinutes, format } from 'date-fns';
import { expandButtonStyle } from '@styles/buttonStyles';
import { formatMinutesToTime } from '@utils/formatDate';
import { TIMELINE_COLORS, SESSION_MESSAGES, GHOST_MESSAGES } from './timelineConstants';
import { match } from 'ts-pattern';

const ModalHeader = styled.div`
  padding: 20px 30px 0 30px;
  color: ${TIMELINE_COLORS.TEXT_PRIMARY};
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
  color: ${TIMELINE_COLORS.TEXT_SECONDARY};
  padding-top: 4px;
`;

const StatusBadge = styled.span<{ variant: 'active' | 'ghost' | 'completed' }>`
  font-size: 11px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 4px;
  color: ${({ variant }) => (variant === 'active' ? Color.KIO_ORANGE : variant === 'ghost' ? TIMELINE_COLORS.GHOST_TEXT : TIMELINE_COLORS.TEXT_SECONDARY)};
  background: ${({ variant }) => (variant === 'active' ? '#fff0e5' : variant === 'ghost' ? TIMELINE_COLORS.GHOST_BG : '#f0f0f0')};
`;

const SummaryStrip = styled.div`
  width: 100%;
  margin-top: 16px;
  padding: 12px 0;
  border-top: 1px solid ${TIMELINE_COLORS.BORDER_CARD};
  border-bottom: 1px solid ${TIMELINE_COLORS.BORDER_CARD};
  gap: 0;
  ${rowFlex({ align: 'center' })}
`;

const SummaryItem = styled.div<{ isLast?: boolean }>`
  flex: 1;
  padding: 0 16px;
  border-right: ${({ isLast }) => (isLast ? 'none' : '1px solid ' + TIMELINE_COLORS.BORDER_CARD)};
  ${colFlex({ align: 'center' })}
`;

const SummaryValue = styled.span`
  font-size: 16px;
  font-weight: 700;
  color: ${TIMELINE_COLORS.TEXT_PRIMARY};
  line-height: 1.4;
`;

const SummaryLabel = styled.span`
  font-size: 11px;
  color: ${TIMELINE_COLORS.TEXT_SECONDARY};
  line-height: 1.4;
`;

const ActiveSessionInfo = styled.div`
  width: 100%;
  margin-top: 16px;
  padding: 12px 0;
  border-top: 1px solid ${TIMELINE_COLORS.BORDER_CARD};
  border-bottom: 1px solid ${TIMELINE_COLORS.BORDER_CARD};
  gap: 4px;
  ${colFlex({ align: 'center' })}
`;

const ElapsedTime = styled.span`
  font-size: 16px;
  font-weight: 700;
  color: ${TIMELINE_COLORS.TEXT_PRIMARY};
`;

const GuideMessage = styled.span`
  font-size: 13px;
  color: ${TIMELINE_COLORS.TEXT_SECONDARY};
`;

const GhostInfoMessage = styled.div`
  box-sizing: border-box;
  width: 100%;
  margin-top: 16px;
  padding: 12px 16px;
  font-size: 13px;
  color: ${TIMELINE_COLORS.GHOST_TEXT};
  text-align: center;
  background: ${TIMELINE_COLORS.GHOST_BG};
  border: 1px solid ${TIMELINE_COLORS.GHOST_BORDER};
  border-radius: 6px;
`;

interface SessionModalHeaderContentsProps {
  session: OrderSessionWithOrder;
  currentTime: Date;
  onClose: () => void;
}

function SessionModalHeaderContents({ session, currentTime, onClose }: SessionModalHeaderContentsProps) {
  const start = new Date(session.createdAt);
  const durationMinutes = session.usageTime;
  const isActive = !session.endAt;
  const isGhost = session.ghostType !== GHOST_TYPE.NONE;
  const totalPrice = session.totalOrderPrice;
  const customerNameLabel = session.customerName || '주문자 없음';
  const elapsedMinutes = differenceInMinutes(currentTime, start);

  const getBadge = () => {
    if (isGhost) return { variant: 'ghost' as const, label: GHOST_MESSAGES[session.ghostType].badge };
    if (isActive) return { variant: 'active' as const, label: '이용중' };
    return { variant: 'completed' as const, label: '사용완료' };
  };
  const badge = getBadge();

  return (
    <ModalHeader>
      <ModalHeaderTitle>
        <MainLabel id="session-modal-title">
          {`테이블 ${session.tableNumber}`}
          <StatusBadge variant={badge.variant}>{badge.label}</StatusBadge>
        </MainLabel>
        <CloseIcon onClick={onClose} />
      </ModalHeaderTitle>
      <DescriptionLabel>
        {format(start, 'yyyy.MM.dd')} · {format(start, 'HH:mm')} – {session.endAt ? format(new Date(session.endAt), 'HH:mm') : '진행중'}
        {!isActive && !isGhost && ' · ' + customerNameLabel}
      </DescriptionLabel>

      {match({ isActive, isGhost })
        .with({ isActive: true }, () => (
          <ActiveSessionInfo>
            <ElapsedTime>⏱ 경과 {formatMinutesToTime(elapsedMinutes)}</ElapsedTime>
            <GuideMessage>{SESSION_MESSAGES.ACTIVE_GUIDE}</GuideMessage>
          </ActiveSessionInfo>
        ))
        .with({ isGhost: true }, () => <GhostInfoMessage>{GHOST_MESSAGES[session.ghostType].description}</GhostInfoMessage>)
        .otherwise(() => (
          <SummaryStrip>
            <SummaryItem>
              <SummaryValue>{formatMinutesToTime(durationMinutes)}</SummaryValue>
              <SummaryLabel>이용 시간</SummaryLabel>
            </SummaryItem>
            <SummaryItem>
              <SummaryValue>{session.orderCount}건</SummaryValue>
              <SummaryLabel>주문 건수</SummaryLabel>
            </SummaryItem>
            <SummaryItem isLast>
              <SummaryValue>{totalPrice.toLocaleString()}원</SummaryValue>
              <SummaryLabel>총 매출</SummaryLabel>
            </SummaryItem>
          </SummaryStrip>
        ))}
    </ModalHeader>
  );
}

export default SessionModalHeaderContents;
