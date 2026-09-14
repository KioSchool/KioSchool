import styled from '@emotion/styled';
import { DonationClickDailyPoint } from '@@types/donationClick';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { mobileMediaQuery } from '@styles/globalStyles';
import { formatCurrency, formatNumber } from '@utils/formatNumber';

const Cell = styled.div<{ isToday: boolean; hasClicks: boolean; isCurrentMonth: boolean }>`
  min-height: 92px;
  padding: 6px;
  gap: 4px;
  border: 1px solid ${Color.HEAVY_GREY};
  border-radius: 8px;
  background: ${({ isToday }) => (isToday ? Color.KIO_ORANGE_FAINT : Color.WHITE)};
  cursor: ${({ hasClicks }) => (hasClicks ? 'pointer' : 'default')};
  opacity: ${({ isCurrentMonth }) => (isCurrentMonth ? 1 : 0.4)};
  transition: border-color 0.15s;
  ${colFlex({ align: 'stretch' })}

  &:hover {
    border-color: ${({ hasClicks }) => (hasClicks ? Color.KIO_ORANGE : Color.HEAVY_GREY)};
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

const ClickTag = styled.div`
  font-size: 11px;
  padding: 2px 6px;
  border-radius: 4px;
  background: ${Color.KIO_ORANGE_ICON_BG};
  color: ${Color.KIO_ORANGE_DARK};
  font-weight: 700;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Amount = styled.div`
  font-size: 10px;
  padding: 0 6px;
  color: ${Color.GREY};
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

interface DonationClickCalendarCellProps {
  day: number | null;
  isToday: boolean;
  point: DonationClickDailyPoint | null;
  onClick: () => void;
}

function DonationClickCalendarCell({ day, isToday, point, onClick }: DonationClickCalendarCellProps) {
  if (day === null) {
    return <Cell isToday={false} hasClicks={false} isCurrentMonth={false} />;
  }

  const hasClicks = !!point && point.clicks > 0;

  return (
    <Cell isToday={isToday} hasClicks={hasClicks} isCurrentMonth onClick={hasClicks ? onClick : undefined}>
      <TopRow>
        <DateLabel isToday={isToday}>{day}</DateLabel>
        {hasClicks && point && <OrderCount>주문 {formatNumber(point.uniqueOrders)}건</OrderCount>}
      </TopRow>
      {hasClicks && point && (
        <>
          <ClickTag>클릭 {formatNumber(point.clicks)}회</ClickTag>
          <Amount title={`토스 클릭 금액 ${formatCurrency(point.amountSum)}`}>토스 {formatCurrency(point.amountSum)}</Amount>
        </>
      )}
    </Cell>
  );
}

export default DonationClickCalendarCell;
