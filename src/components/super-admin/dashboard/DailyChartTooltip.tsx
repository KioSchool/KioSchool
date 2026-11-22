import styled from '@emotion/styled';
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

interface DailyChartTooltipProps {
  active?: boolean;
  payload?: Array<{ value: number; dataKey: string }>;
  label?: string;
}

function DailyChartTooltip({ active, payload, label }: DailyChartTooltipProps) {
  if (!active || !payload?.length) return null;
  const item = payload[0];
  const isRevenue = item.dataKey === 'revenue';
  const value = isRevenue ? formatCurrency(item.value) : `${formatNumber(item.value)}건`;
  return (
    <TooltipBox>
      <span>{label}</span>
      <b>{value}</b>
    </TooltipBox>
  );
}

export default DailyChartTooltip;
