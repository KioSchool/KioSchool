import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { colFlex } from '@styles/flexStyles';
import { formatNumber } from '@utils/formatNumber';

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

const TooltipLabel = styled.span``;

const TooltipValue = styled.b``;

interface OnboardingTimeTooltipProps {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}

function OnboardingTimeTooltip({ active, payload, label }: OnboardingTimeTooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <TooltipBox>
      <TooltipLabel>{label}</TooltipLabel>
      <TooltipValue>{formatNumber(payload[0].value)}명</TooltipValue>
    </TooltipBox>
  );
}

export default OnboardingTimeTooltip;
