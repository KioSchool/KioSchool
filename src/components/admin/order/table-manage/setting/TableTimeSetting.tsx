import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { rowFlex } from '@styles/flexStyles';
import ToggleButton from '@components/common/toggle/ToggleButton';
import NumberInput from '@components/common/input/NumberInput';
import SettingSection from '@components/admin/order/table-manage/setting/SettingSection/SettingSection';
import { formatMinutesToTime } from '@utils/formatDate';

const ToggleRow = styled.div`
  width: 100%;
  gap: 8px;

  ${rowFlex({ justify: 'space-between', align: 'center' })};
`;

const ToggleLabel = styled.div`
  font-size: 13px;
  font-weight: 700;
  white-space: nowrap;
  color: ${Color.GREY};
`;

interface TableTimeSettingProps {
  isTimeLimited: boolean;
  timeLimitMinutes: number;
  onTimeLimitedChange: (value: boolean) => void;
  onMinutesChange: (value: number) => void;
}

function TableTimeSetting({ isTimeLimited, timeLimitMinutes, onTimeLimitedChange, onMinutesChange }: TableTimeSettingProps) {
  const handleTimeMinus = () => {
    onMinutesChange(Math.max(1, timeLimitMinutes - 1));
  };

  const handleTimePlus = () => {
    onMinutesChange(timeLimitMinutes + 1);
  };

  const handleValueChange = (value: number) => {
    onMinutesChange(Math.max(1, value));
  };

  return (
    <SettingSection label="이용 시간 제한">
      <ToggleRow>
        <ToggleLabel>시간 제한</ToggleLabel>
        <ToggleButton checked={isTimeLimited} onChange={onTimeLimitedChange} />
      </ToggleRow>
      <NumberInput
        value={timeLimitMinutes}
        formatter={formatMinutesToTime}
        maxWidth="100%"
        onChange={handleValueChange}
        onIncrement={handleTimePlus}
        onDecrement={handleTimeMinus}
        disabled={!isTimeLimited}
      />
    </SettingSection>
  );
}

export default TableTimeSetting;
