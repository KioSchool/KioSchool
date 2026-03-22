import { memo } from 'react';
import styled from '@emotion/styled';
import { OrderSessionWithOrder } from '@@types/index';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { getSessionBarStyle } from './sessionBarStyle';
import { formatMinutesToTime } from '@utils/formatDate';
import { differenceInMinutes } from 'date-fns';
import { TIMELINE_HOURS, TIMELINE_COLORS } from './timelineConstants';

const MIN_BAR_WIDTH_FOR_TEXT = 6;

const Bar = styled.div<{ left: number; width: number; backgroundColor: string; backgroundImage?: string }>`
  position: absolute;
  top: 5px;
  bottom: 5px;
  left: ${({ left }) => left}%;
  width: ${({ width }) => Math.max(width, 0.4)}%;
  min-width: 6px;
  border-radius: 6px;
  cursor: pointer;
  overflow: hidden;
  transition: filter 0.15s;
  background-color: ${({ backgroundColor }) => backgroundColor};
  background-image: ${({ backgroundImage }) => backgroundImage || 'none'};

  &:hover {
    filter: brightness(0.92);
  }

  &:hover .session-bar-tooltip {
    opacity: 1;
  }
`;

const BarContent = styled.div<{ textColor: string }>`
  width: 100%;
  height: 100%;
  padding: 0 10px;
  box-sizing: border-box;
  color: ${({ textColor }) => textColor};
  overflow: hidden;
  ${colFlex({ justify: 'center' })}
`;

const DurationText = styled.span`
  font-size: 11px;
  font-weight: 700;
  white-space: nowrap;
  line-height: 1.3;
`;

const InfoText = styled.span`
  font-size: 8px;
  font-weight: 600;
  white-space: nowrap;
  gap: 3px;
  line-height: 1.3;
  ${rowFlex({ align: 'center' })}
`;

const Tooltip = styled.div`
  position: absolute;
  bottom: calc(100% + 6px);
  left: 50%;
  transform: translateX(-50%);
  background: ${TIMELINE_COLORS.TEXT_PRIMARY};
  color: #ffffff;
  font-size: 11px;
  padding: 6px 10px;
  border-radius: 6px;
  white-space: nowrap;
  pointer-events: none;
  z-index: 10;
  opacity: 0;
  transition: opacity 0.15s;
`;

function getTimePercent(date: Date, timelineStart: Date): number {
  const diffMs = date.getTime() - timelineStart.getTime();
  const totalMs = TIMELINE_HOURS * 60 * 60 * 1000;
  return Math.max(0, Math.min(100, (diffMs / totalMs) * 100));
}

interface SessionBarProps {
  session: OrderSessionWithOrder;
  dayStart: Date;
  currentTime: Date;
  minPrice: number;
  maxPrice: number;
  onSessionClick: (session: OrderSessionWithOrder) => void;
}

function SessionBar({ session, dayStart, currentTime, minPrice, maxPrice, onSessionClick }: SessionBarProps) {
  const start = new Date(session.createdAt);
  const end = session.endAt ? new Date(session.endAt) : currentTime;
  const timelineEnd = new Date(dayStart.getTime() + TIMELINE_HOURS * 60 * 60 * 1000);

  const clippedStart = start < dayStart ? dayStart : start;
  const clippedEnd = end > timelineEnd ? timelineEnd : end;
  const left = getTimePercent(clippedStart, dayStart);
  const right = getTimePercent(clippedEnd, dayStart);
  const width = right - left;

  const totalPrice = session.totalOrderPrice;
  const orderCount = session.orderCount;
  const isGhost = session.isGhostSession;

  const durationMinutes = differenceInMinutes(clippedEnd, clippedStart);
  const barStyle = getSessionBarStyle(totalPrice, isGhost, orderCount, minPrice, maxPrice);
  const showText = width >= MIN_BAR_WIDTH_FOR_TEXT;

  const customerNames = showText && orderCount > 0 ? [...new Set(session.orders.map((order) => order.customerName))] : [];

  return (
    <Bar
      role="button"
      tabIndex={0}
      aria-label={`${formatMinutesToTime(durationMinutes)} 세션, ${totalPrice.toLocaleString()}원, 주문 ${orderCount}건`}
      left={left}
      width={width}
      backgroundColor={barStyle.backgroundColor}
      backgroundImage={barStyle.backgroundImage}
      onClick={() => onSessionClick(session)}
    >
      {showText && (
        <BarContent textColor={barStyle.textColor}>
          <DurationText>{formatMinutesToTime(durationMinutes)}</DurationText>
          <InfoText>
            <span>{totalPrice.toLocaleString()}원</span>
            <span>·</span>
            <span>{orderCount}건</span>
            {customerNames.length > 0 && (
              <>
                <span>·</span>
                <span>{customerNames[0]}</span>
              </>
            )}
          </InfoText>
        </BarContent>
      )}
      <Tooltip className="session-bar-tooltip">
        {formatMinutesToTime(durationMinutes)} · {totalPrice.toLocaleString()}원 · {orderCount}건
      </Tooltip>
    </Bar>
  );
}

export default memo(SessionBar);
