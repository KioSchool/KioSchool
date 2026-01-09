import styled from '@emotion/styled';
import { colFlex } from '@styles/flexStyles';
import ToggleButton from '@components/common/toggle/ToggleButton';
import NumberInput from '@components/common/input/NumberInput';

const SectionLabel = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: #464a4d;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #e8eef2;
  margin: 6px 0;
`;

const Container = styled.div`
  gap: 8px;
  width: 100%;
  ${colFlex({ justify: 'start', align: 'start' })};
`;

interface TableTimeSettingProps {
  isTimeLimited: boolean;
  timeLimitMinutes: number;
  onTimeLimitedChange: (value: boolean) => void;
  onMinutesChange: (value: number) => void;
}

function TableTimeSetting({ isTimeLimited, timeLimitMinutes, onTimeLimitedChange, onMinutesChange }: TableTimeSettingProps) {
  const handleTimeMinus = () => {
    if (!isTimeLimited) return;

    onMinutesChange(Math.max(1, timeLimitMinutes - 1));
  };

  const handleTimePlus = () => {
    if (!isTimeLimited) return;

    onMinutesChange(timeLimitMinutes + 1);
  };

  const formatTime = (mins: number) => {
    const hours = Math.floor(mins / 60);
    const remainingMins = mins % 60;
    return hours > 0 ? `${hours}시간 ${remainingMins > 0 ? `${remainingMins}분` : ''}` : `${mins}분`;
  };

  return (
    <Container>
      <SectionLabel>테이블 시간 제한</SectionLabel>
      <ToggleButton checked={isTimeLimited} onChange={onTimeLimitedChange} />

      <Divider />

      <SectionLabel>테이블 시간</SectionLabel>
      <NumberInput value={formatTime(timeLimitMinutes)} onIncrement={handleTimePlus} onDecrement={handleTimeMinus} disabled={!isTimeLimited} />
    </Container>
  );
}

export default TableTimeSetting;
