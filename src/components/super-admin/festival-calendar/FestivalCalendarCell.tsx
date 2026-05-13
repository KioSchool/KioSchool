import styled from '@emotion/styled';
import { FestivalWorkspace } from '@@types/index';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { mobileMediaQuery } from '@styles/globalStyles';
import { formatNumber } from '@utils/formatNumber';

const MAX_VISIBLE_TAGS = 2;

const Cell = styled.div<{ isToday: boolean; hasEvent: boolean; isCurrentMonth: boolean }>`
  min-height: 92px;
  padding: 6px;
  gap: 4px;
  border: 1px solid ${Color.HEAVY_GREY};
  border-radius: 8px;
  background: ${({ isToday }) => (isToday ? Color.KIO_ORANGE_FAINT : Color.WHITE)};
  cursor: ${({ hasEvent }) => (hasEvent ? 'pointer' : 'default')};
  opacity: ${({ isCurrentMonth }) => (isCurrentMonth ? 1 : 0.4)};
  transition: border-color 0.15s;
  ${colFlex({ align: 'stretch' })}

  &:hover {
    border-color: ${({ hasEvent }) => (hasEvent ? Color.KIO_ORANGE : Color.HEAVY_GREY)};
  }

  ${mobileMediaQuery} {
    min-height: 72px;
  }
`;

const TopRow = styled.div`
  gap: 4px;
  ${rowFlex({ align: 'center', justify: 'space-between' })}
`;

const DateLabel = styled.span<{ isToday: boolean }>`
  font-size: 12px;
  font-weight: ${({ isToday }) => (isToday ? 700 : 500)};
  color: ${({ isToday }) => (isToday ? Color.KIO_ORANGE : Color.BLACK)};
`;

const OrderCount = styled.span`
  font-size: 10px;
  color: ${Color.GREY};
  flex-shrink: 0;
`;

const TagList = styled.div`
  gap: 3px;
  ${colFlex({ align: 'stretch' })}
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
`;

const MoreLabel = styled.div`
  font-size: 10px;
  padding: 0 6px;
  color: ${Color.GREY};
  font-weight: 500;
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

  const hasEvent = workspaces.length > 0;
  const visibleTags = workspaces.slice(0, MAX_VISIBLE_TAGS);
  const hiddenCount = workspaces.length - MAX_VISIBLE_TAGS;
  const totalOrders = workspaces.reduce((sum, w) => sum + w.totalOrders, 0);

  return (
    <Cell isToday={isToday} hasEvent={hasEvent} isCurrentMonth={isCurrentMonth} onClick={hasEvent ? onClick : undefined}>
      <TopRow>
        <DateLabel isToday={isToday}>{day}</DateLabel>
        {hasEvent && <OrderCount>{formatNumber(totalOrders)}건</OrderCount>}
      </TopRow>
      {hasEvent && (
        <TagList>
          {visibleTags.map((w) => (
            <WorkspaceTag key={w.workspaceId} title={`${w.workspaceName} (${w.universityName})`}>
              {w.workspaceName}
            </WorkspaceTag>
          ))}
          {hiddenCount > 0 && <MoreLabel>+{hiddenCount}</MoreLabel>}
        </TagList>
      )}
    </Cell>
  );
}

export default FestivalCalendarCell;
