import styled from '@emotion/styled';
import { FestivalWorkspace } from '@@types/index';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';

const MAX_VISIBLE_TAGS = 2;

const Cell = styled.div<{ isToday: boolean; hasEvent: boolean; isCurrentMonth: boolean }>`
  min-height: 90px;
  padding: 6px;
  border: 1px solid ${Color.HEAVY_GREY};
  border-radius: 8px;
  cursor: ${({ hasEvent }) => (hasEvent ? 'pointer' : 'default')};
  background: ${({ isToday }) => (isToday ? Color.KIO_ORANGE_FAINT : Color.WHITE)};
  opacity: ${({ isCurrentMonth }) => (isCurrentMonth ? 1 : 0.35)};
  transition: background 0.15s;

  &:hover {
    background: ${({ hasEvent }) => (hasEvent ? Color.KIO_ORANGE_FAINT : Color.WHITE)};
  }

  ${colFlex({ align: 'flex-start' })}
`;

const DateLabel = styled.span<{ isToday: boolean }>`
  font-size: 12px;
  font-weight: ${({ isToday }) => (isToday ? 700 : 400)};
  color: ${({ isToday }) => (isToday ? Color.KIO_ORANGE : Color.BLACK)};
  margin-bottom: 4px;
`;

const TagList = styled.div`
  gap: 3px;
  width: 100%;
  ${colFlex({ align: 'flex-start' })}
`;

const WorkspaceTag = styled.div`
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 4px;
  background: ${Color.KIO_ORANGE_ICON_BG};
  color: ${Color.KIO_ORANGE_DARK};
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
`;

const MoreBadge = styled.div`
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 4px;
  background: ${Color.GREY_ICON_BG};
  color: ${Color.GREY};
  font-weight: 500;
`;

const CountRow = styled.div`
  gap: 4px;
  margin-top: 2px;
  ${rowFlex({ align: 'center' })}
`;

const OrderBadge = styled.div`
  font-size: 10px;
  color: ${Color.GREY};
`;

interface FestivalCalendarCellProps {
  day: number | null;
  isCurrentMonth: boolean;
  isToday: boolean;
  workspaces: FestivalWorkspace[];
  onClick: () => void;
}

function FestivalCalendarCell({ day, isCurrentMonth, isToday, workspaces, onClick }: FestivalCalendarCellProps) {
  if (day === null) {
    return <Cell isToday={false} hasEvent={false} isCurrentMonth={false} />;
  }

  const visibleTags = workspaces.slice(0, MAX_VISIBLE_TAGS);
  const hiddenCount = workspaces.length - MAX_VISIBLE_TAGS;
  const totalOrders = workspaces.reduce((sum, w) => sum + w.totalOrders, 0);

  return (
    <Cell isToday={isToday} hasEvent={workspaces.length > 0} isCurrentMonth={isCurrentMonth} onClick={workspaces.length > 0 ? onClick : undefined}>
      <DateLabel isToday={isToday}>{day}</DateLabel>
      {workspaces.length > 0 && (
        <TagList>
          {visibleTags.map((w) => (
            <WorkspaceTag key={w.workspaceId} title={`${w.workspaceName} (${w.universityName})`}>
              {w.workspaceName}
            </WorkspaceTag>
          ))}
          {hiddenCount > 0 && <MoreBadge>+{hiddenCount}개 더</MoreBadge>}
          <CountRow>
            <OrderBadge>주문 {totalOrders.toLocaleString()}건</OrderBadge>
          </CountRow>
        </TagList>
      )}
    </Cell>
  );
}

export default FestivalCalendarCell;
