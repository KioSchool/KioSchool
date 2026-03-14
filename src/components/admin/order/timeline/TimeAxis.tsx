import styled from '@emotion/styled';
import { rowFlex } from '@styles/flexStyles';
import { TIMELINE_START_HOUR, TIMELINE_HOURS, timelineColors } from './timelineConstants';

const AxisContainer = styled.div`
  flex: 1;
  min-width: 0;
  height: 32px;
  background: ${timelineColors.HEADER_BG};
  border: 1px solid ${timelineColors.BORDER};
  box-sizing: border-box;
  ${rowFlex({ align: 'center' })}
`;

const HourCell = styled.span<{ isLast?: boolean }>`
  flex: 1;
  font-size: 11px;
  font-weight: 700;
  color: ${timelineColors.TEXT_PRIMARY};
  text-align: center;
  border-right: ${({ isLast }) => (isLast ? 'none' : `1px solid ${timelineColors.BORDER}`)};
  height: 100%;
  line-height: 32px;
`;

function TimeAxis() {
  const hours = Array.from({ length: TIMELINE_HOURS }, (_, i) => (TIMELINE_START_HOUR + i) % 24);

  return (
    <AxisContainer>
      {hours.map((hour, i) => (
        <HourCell key={i} isLast={i === hours.length - 1}>
          {`${String(hour).padStart(2, '0')}:00`}
        </HourCell>
      ))}
    </AxisContainer>
  );
}

export default TimeAxis;
