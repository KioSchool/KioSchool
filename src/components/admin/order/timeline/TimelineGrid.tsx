import { memo, useMemo } from 'react';
import styled from '@emotion/styled';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { OrderSessionWithOrder } from '@@types/index';
import { startOfDay, addHours } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import SessionBar from './SessionBar';
import TimeAxis from './TimeAxis';
import { TIMELINE_START_HOUR, TIMELINE_HOURS, timelineColors } from './timelineConstants';

const ScrollContainer = styled.div`
  width: 100%;
  max-height: 680px;
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
  border-left: 1px solid ${timelineColors.BORDER};
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
  background: ${timelineColors.HEADER_BG};
  border: 1px solid ${timelineColors.BORDER};
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
  border-bottom: 1px solid ${timelineColors.BORDER};
  border-left: 1px solid ${timelineColors.BORDER};
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

const TrackRow = styled.div`
  height: 50px;
  position: relative;
  border-bottom: 1px solid ${timelineColors.BORDER};
  border-right: 1px solid ${timelineColors.BORDER};
  box-sizing: border-box;
  background-color: white;
  background-image: repeating-linear-gradient(
    to right,
    ${timelineColors.BORDER} 0px,
    ${timelineColors.BORDER} 1px,
    transparent 1px,
    transparent calc(100% / ${TIMELINE_HOURS * 2})
  );
`;

const EmptyMessage = styled.div`
  width: 100%;
  height: 200px;
  font-size: 14px;
  color: ${timelineColors.TEXT_SECONDARY};
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
  const dayStart = useMemo(() => addHours(startOfDay(toZonedTime(selectedDate, 'Asia/Seoul')), TIMELINE_START_HOUR), [selectedDate]);

  const sessionsByTable = useMemo(() => {
    const map = new Map<number, OrderSessionWithOrder[]>();
    sessions.forEach((session) => {
      if (!map.has(session.tableNumber)) {
        map.set(session.tableNumber, []);
      }

      map.get(session.tableNumber)!.push(session);
    });
    return map;
  }, [sessions]);

  if (tableCount === 0) {
    return <EmptyMessage>워크스페이스에 테이블이 없습니다</EmptyMessage>;
  }

  if (isLoading) {
    return <EmptyMessage>세션 데이터를 불러오는 중...</EmptyMessage>;
  }

  const tableNumbers = Array.from({ length: tableCount }, (_, i) => i + 1);

  return (
    <ScrollContainer>
      <StickyHeader>
        <TableHeaderCell>테이블</TableHeaderCell>
        <TimeAxis />
      </StickyHeader>
      <GridBody>
        <TableColumn>
          {tableNumbers.map((tableNo) => (
            <TableCell key={tableNo}>{tableNo}</TableCell>
          ))}
        </TableColumn>
        <TrackColumn>
          {tableNumbers.map((tableNo) => {
            const tableSessions = sessionsByTable.get(tableNo) || [];
            return (
              <TrackRow key={tableNo}>
                {tableSessions.map((session) => (
                  <SessionBar
                    key={session.id}
                    session={session}
                    dayStart={dayStart}
                    currentTime={currentTime}
                    minPrice={minPrice}
                    maxPrice={maxPrice}
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
