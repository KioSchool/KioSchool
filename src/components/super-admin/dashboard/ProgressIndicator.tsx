import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';

const Wrap = styled.div`
  width: 100%;
  gap: 8px;
  ${colFlex()}
`;

const Bar = styled.div<{ rate: number }>`
  width: 100%;
  height: 8px;
  border-radius: 4px;
  background: ${Color.HEAVY_GREY};
  position: relative;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: ${({ rate }) => Math.min(Math.max(rate, 0), 1) * 100}%;
    border-radius: 4px;
    background: ${Color.KIO_ORANGE};
    transition: width 0.5s ease;
  }
`;

const AxisLabel = styled.div`
  font-size: 13px;
  color: ${Color.GREY};
  ${rowFlex({ justify: 'space-between' })}
`;

interface ProgressIndicatorProps {
  rate: number;
  showAxisLabels?: boolean;
}

function ProgressIndicator({ rate, showAxisLabels = false }: ProgressIndicatorProps) {
  return (
    <Wrap>
      <Bar rate={rate} />
      {showAxisLabels && (
        <AxisLabel>
          <span>0%</span>
          <span>100%</span>
        </AxisLabel>
      )}
    </Wrap>
  );
}

export default ProgressIndicator;
