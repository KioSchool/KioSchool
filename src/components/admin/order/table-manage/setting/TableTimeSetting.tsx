import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { RiAddFill, RiSubtractFill } from '@remixicon/react';
import { rowFlex, colFlex } from '@styles/flexStyles';
import ToggleButton from '@components/common/toggle/ToggleButton';

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

const InputContainer = styled.div<{ disabled?: boolean }>`
  box-sizing: border-box;
  padding: 2px 4px;
  border-radius: 45px;
  background-color: ${({ disabled }) => (disabled ? '#e8eef2' : '#ffffff')};
  border: 1px solid #e8eef2;
  height: 28px;
  width: 100%;
  max-width: 250px;
  ::selection {
    background: none;
  }

  ${rowFlex({ justify: 'space-between', align: 'center' })};
`;

const Input = styled.input<{ disabled?: boolean }>`
  min-width: 50px;
  text-align: center;
  background: none;
  border: none;
  font-size: 13px;
  color: ${({ disabled }) => (disabled ? '#d1d5d8' : '#464a4d')};

  &:focus {
    outline: none;
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

const MinusButton = styled(RiSubtractFill)<{ disabled?: boolean }>`
  width: 18px;
  height: 18px;
  color: ${({ disabled }) => (disabled ? '#d1d5d8' : Color.KIO_ORANGE)};
  background-color: ${({ disabled }) => (disabled ? '#e8eef2' : Color.WHITE)};
  border: ${({ disabled }) => (disabled ? 'none' : `1px solid ${Color.KIO_ORANGE}`)};
  border-radius: 50%;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  flex-shrink: 0;
`;

const PlusButton = styled(RiAddFill)<{ disabled?: boolean }>`
  width: 18px;
  height: 18px;
  color: ${({ disabled }) => (disabled ? '#d1d5d8' : Color.WHITE)};
  background-color: ${({ disabled }) => (disabled ? '#e8eef2' : Color.KIO_ORANGE)};
  border-radius: 50%;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  flex-shrink: 0;
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
      <InputContainer disabled={!isTimeLimited}>
        <MinusButton disabled={!isTimeLimited} onClick={handleTimeMinus} />
        <Input type="text" disabled={!isTimeLimited} value={formatTime(timeLimitMinutes)} readOnly />
        <PlusButton disabled={!isTimeLimited} onClick={handleTimePlus} />
      </InputContainer>
    </Container>
  );
}

export default TableTimeSetting;
