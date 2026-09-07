import styled from '@emotion/styled';
import { Color, OnboardingColor } from '@resources/colors';
import { rowFlex } from '@styles/flexStyles';
import { AcquisitionChannel, ACQUISITION_CHANNEL_LABEL } from '@utils/acquisitionChannel';

const OptionLabel = styled.label<{ isSelected: boolean }>`
  width: 100%;
  padding: 11px 16px;
  box-sizing: border-box;
  border: 1.5px solid ${({ isSelected }) => (isSelected ? Color.KIO_ORANGE : OnboardingColor.STEP_INACTIVE_BORDER)};
  border-radius: 12px;
  background: ${({ isSelected }) => (isSelected ? OnboardingColor.STEP_ACTIVE_BG : Color.WHITE)};
  cursor: pointer;
  font-size: 15px;
  color: ${({ isSelected }) => (isSelected ? OnboardingColor.TITLE_TEXT : OnboardingColor.SUBTLE_TEXT)};
  gap: 10px;
  transition: border-color 0.15s, color 0.15s;
  ${rowFlex({ justify: 'start', align: 'center' })}

  &:hover {
    border-color: ${Color.KIO_ORANGE};
  }
`;

const Radio = styled.input`
  appearance: none;
  margin: 0;
  flex-shrink: 0;
  border: max(2px, 0.1em) solid ${OnboardingColor.STEP_IDLE_BORDER};
  border-radius: 50%;
  width: 1.15em;
  height: 1.15em;

  &:checked {
    border: 0.35em solid ${Color.KIO_ORANGE};
  }
`;

interface AcquisitionChannelOptionProps {
  channel: AcquisitionChannel;
  isSelected: boolean;
  onSelect: (channel: AcquisitionChannel) => void;
}

function AcquisitionChannelOption({ channel, isSelected, onSelect }: AcquisitionChannelOptionProps) {
  return (
    <OptionLabel htmlFor={channel} isSelected={isSelected}>
      <Radio type="radio" id={channel} name="acquisitionChannel" checked={isSelected} onChange={() => onSelect(channel)} />
      {ACQUISITION_CHANNEL_LABEL[channel]}
    </OptionLabel>
  );
}

export default AcquisitionChannelOption;
