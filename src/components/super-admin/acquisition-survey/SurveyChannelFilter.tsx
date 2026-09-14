import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { rowFlex } from '@styles/flexStyles';
import { ACQUISITION_CHANNEL_LABEL, ACQUISITION_CHANNEL_ORDER, AcquisitionChannel } from '@utils/acquisitionChannel';

const Row = styled.div`
  width: 100%;
  gap: 8px;
  flex-wrap: wrap;
  ${rowFlex({ align: 'center' })}
`;

const Pill = styled.button<{ active: boolean }>`
  height: 30px;
  padding: 0 12px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  border: 1px solid ${({ active }) => (active ? Color.KIO_ORANGE : Color.HEAVY_GREY)};
  background: ${({ active }) => (active ? Color.KIO_ORANGE_FAINT : Color.WHITE)};
  color: ${({ active }) => (active ? Color.KIO_ORANGE_DARK : Color.GREY)};
  transition: border-color 0.15s, background 0.15s, color 0.15s;
`;

interface SurveyChannelFilterProps {
  selected: AcquisitionChannel | null;
  onSelect: (channel: AcquisitionChannel | null) => void;
}

function SurveyChannelFilter({ selected, onSelect }: SurveyChannelFilterProps) {
  return (
    <Row>
      <Pill type="button" active={selected === null} onClick={() => onSelect(null)}>
        전체
      </Pill>
      {ACQUISITION_CHANNEL_ORDER.map((channel) => (
        <Pill key={channel} type="button" active={selected === channel} onClick={() => onSelect(channel)}>
          {ACQUISITION_CHANNEL_LABEL[channel]}
        </Pill>
      ))}
    </Row>
  );
}

export default SurveyChannelFilter;
