import styled from '@emotion/styled';
import { TooltipProps } from 'recharts';
import { DonationClickDailyPoint } from '@@types/donationClick';
import { Color } from '@resources/colors';
import { colFlex } from '@styles/flexStyles';
import { formatCurrency, formatNumber } from '@utils/formatNumber';

const TooltipBox = styled.div`
  background: ${Color.WHITE};
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 8px 12px;
  font-size: 12px;
  color: ${Color.BLACK};
  gap: 2px;
  ${colFlex()}
`;

const Muted = styled.span`
  color: ${Color.GREY};
`;

function DonationClickChartTooltip({ active, payload }: TooltipProps<number, string>) {
  if (!active || !payload?.length) return null;
  const point = payload[0].payload as DonationClickDailyPoint;

  return (
    <TooltipBox>
      <Muted>{point.date}</Muted>
      <b>클릭 {formatNumber(point.clicks)}회</b>
      <span>고유 주문 {formatNumber(point.uniqueOrders)}건</span>
      <span>금액 {formatCurrency(point.amountSum)}</span>
    </TooltipBox>
  );
}

export default DonationClickChartTooltip;
