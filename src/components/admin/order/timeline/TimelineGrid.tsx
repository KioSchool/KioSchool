import { memo, useMemo } from 'react';
import groupBy from 'lodash/groupBy';
import styled from '@emotion/styled';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { OrderSessionWithOrder } from '@@types/index';
import { addHours, startOfDay } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import SessionBar from './SessionBar';
import TimeAxis from './TimeAxis';
import { TIMELINE_COLORS, TIMELINE_START_HOUR } from './timelineConstants';

const ScrollContainer = styled.div`
  width: 100%;
  max-height: 680px;
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
`;

const StickyHeader = styled.div`
  position: sticky;
  top: 0;
  z-index: 5;
  ${rowFlex({ align: 'start' })}
`;

const TableHeaderCell = styled.div`
  width: 60px;
  min-width: 60px;
  height: 32px;
  background: ${TIMELINE_COLORS.HEADER_BG};
  border: 1px solid ${TIMELINE_COLORS.BORDER};
  box-sizing: border-box;
  font-size: 12px;
  font-weight: 700;
  color: black;
  ${rowFlex({ justify: 'center', align: 'center' })}
`;

const GridBody = styled.div`
  width: 100%;
  ${rowFlex({ align: 'start' })}
`;

const TableColumn = styled.div`
  width: 60px;
  min-width: 60px;
  ${colFlex()}
`;

const TableCell = styled.div`
  height: 50px;
  border-bottom: 1px solid ${TIMELINE_COLORS.BORDER};
  border-left: 1px solid ${TIMELINE_COLORS.BORDER};
  box-sizing: border-box;
  font-size: 12px;
  font-weight: 700;
  color: black;
  background: white;
  ${rowFlex({ justify: 'center', align: 'center' })}
`;

const TrackColumn = styled.div`
  flex: 1;
  min-width: 0;
  ${colFlex()}
`;

const TrackRow = styled.div<{ totalHours: number }>`
  height: 50px;
  position: relative;
  border-bottom: 1px solid ${TIMELINE_COLORS.BORDER};
  border-right: 1px solid ${TIMELINE_COLORS.BORDER};
  box-sizing: border-box;
  background-color: white;
  background-image: repeating-linear-gradient(
    to right,
    ${TIMELINE_COLORS.BORDER} 0px,
    ${TIMELINE_COLORS.BORDER} 1px,
    transparent 1px,
    transparent calc(100% / ${({ totalHours }) => totalHours * 2})
  );
`;

const EmptyMessage = styled.div`
  width: 100%;
  height: 200px;
  font-size: 14px;
  color: ${TIMELINE_COLORS.TEXT_SECONDARY};
  ${colFlex({ justify: 'center', align: 'center' })}
`;

interface TimelineGridProps {
  sessions: OrderSessionWithOrder[];
  tableCount: number;
  selectedDate: Date;
  currentTime: Date;
  minPrice: number;
  maxPrice: number;
  isLoading: boolean;
  onSessionClick: (session: OrderSessionWithOrder) => void;
}

function TimelineGrid({ sessions, tableCount, selectedDate, currentTime, minPrice, maxPrice, isLoading, onSessionClick }: TimelineGridProps) {
  const { startHour, totalHours, hourOffset } = useMemo(() => {
    // 1. 기본 베이스 라인 (09:00 기준)
    const baseDayStart = addHours(startOfDay(toZonedTime(selectedDate, 'Asia/Seoul')), TIMELINE_START_HOUR);
    const baseDayEnd = addHours(baseDayStart, 24);

    // 2. Fallback 범위 (보편적인 주점 영업시간: 당일 17:00 ~ 익일 05:00 / 총 12시간)
    let minTimeMs = addHours(baseDayStart, 8).getTime(); // 17:00
    let maxTimeMs = addHours(baseDayStart, 20).getTime(); // 05:00

    // 3. 세션 있을 때 범위 동적 확대 (축소는 하지 않음)
    if (sessions && sessions.length > 0) {
      sessions.forEach((session) => {
        const start = new Date(session.createdAt).getTime();
        const end = (session.endAt ? new Date(session.endAt) : currentTime).getTime();

        if (start < minTimeMs) minTimeMs = start;
        if (end > maxTimeMs) maxTimeMs = end;
      });
    }

    // 4. 클리핑 가드 (09:00 ~ 익일 09:00 범위를 넘지 않게)
    minTimeMs = Math.max(minTimeMs, baseDayStart.getTime());
    maxTimeMs = Math.min(maxTimeMs, baseDayEnd.getTime());

    // 5. Hour 단위 계산 (여백 추가 반영)
    const diffStartHours = Math.floor((minTimeMs - baseDayStart.getTime()) / (1000 * 60 * 60));
    let diffEndHours = Math.ceil((maxTimeMs - baseDayStart.getTime()) / (1000 * 60 * 60));

    // 방어 로직
    if (diffEndHours <= diffStartHours) diffEndHours = diffStartHours + 1;

    const calculatedTotalHours = diffEndHours - diffStartHours;
    const exactStartHour = (TIMELINE_START_HOUR + diffStartHours) % 24;

    return { startHour: exactStartHour, totalHours: calculatedTotalHours, hourOffset: diffStartHours };
  }, [sessions, selectedDate, currentTime]);

  const displayDayStart = useMemo(
    () => addHours(startOfDay(toZonedTime(selectedDate, 'Asia/Seoul')), TIMELINE_START_HOUR + hourOffset),
    [selectedDate, hourOffset],
  );

  const sessionsByTable = useMemo(() => groupBy(sessions, 'tableNumber'), [sessions]);

  if (tableCount === 0) {
    return <EmptyMessage>워크스페이스에 테이블이 없습니다</EmptyMessage>;
  }

  if (isLoading) {
    return <EmptyMessage>세션 데이터를 불러오는 중...</EmptyMessage>;
  }

  const tableNumbers = Array.from({ length: tableCount }, (__, i) => i + 1);

  return (
    <ScrollContainer>
      <StickyHeader>
        <TableHeaderCell>테이블</TableHeaderCell>
        <TimeAxis startHour={startHour} totalHours={totalHours} />
      </StickyHeader>
      <GridBody>
        <TableColumn>
          {tableNumbers.map((tableNo) => (
            <TableCell key={tableNo}>{tableNo}</TableCell>
          ))}
        </TableColumn>
        <TrackColumn>
          {tableNumbers.map((tableNo) => {
            const tableSessions = sessionsByTable[tableNo] || [];
            return (
              <TrackRow key={tableNo} totalHours={totalHours}>
                {tableSessions.map((session) => (
                  <SessionBar
                    key={session.id}
                    session={session}
                    dayStart={displayDayStart}
                    currentTime={currentTime}
                    minPrice={minPrice}
                    maxPrice={maxPrice}
                    totalHours={totalHours}
                    onSessionClick={onSessionClick}
                  />
                ))}
              </TrackRow>
            );
          })}
        </TrackColumn>
      </GridBody>
    </ScrollContainer>
  );
}

export default memo(TimelineGrid);
