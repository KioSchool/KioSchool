import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { mobileMediaQuery } from '@styles/globalStyles';
import { PRESET_OPTIONS, PresetOption } from './donationConstants';

const Row = styled.div`
  width: 100%;
  gap: 8px;
  ${rowFlex({ justify: 'space-between', align: 'stretch' })};

  ${mobileMediaQuery} {
    gap: 6px;
  }
`;

const Chip = styled.button<{ selected: boolean }>`
  flex: 1;
  padding: 10px 8px;
  background: ${({ selected }) => (selected ? Color.KIO_ORANGE_FAINT : Color.WHITE)};
  border: 1.5px solid ${({ selected }) => (selected ? Color.KIO_ORANGE : Color.HEAVY_GREY)};
  border-radius: 10px;
  cursor: pointer;
  gap: 4px;
  ${colFlex({ justify: 'start', align: 'center' })};

  &:hover {
    border-color: ${Color.KIO_ORANGE};
  }
`;

const ChipIllustration = styled.img`
  width: 120px;
  height: 120px;
  object-fit: contain;

  ${mobileMediaQuery} {
    width: 96px;
    height: 96px;
  }
`;

const ChipAmount = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: ${Color.BLACK};
`;

const ChipDescription = styled.div`
  font-size: 11px;
  color: ${Color.GREY};
  text-align: center;
  line-height: 1.3;
`;

interface PresetChipsProps {
  selectedAmount: number;
  isPresetMode: boolean;
  onSelect: (option: PresetOption) => void;
}

function PresetChips({ selectedAmount, isPresetMode, onSelect }: PresetChipsProps) {
  return (
    <Row>
      {PRESET_OPTIONS.map((option) => {
        const selected = isPresetMode && selectedAmount === option.amount;
        return (
          <Chip key={option.amount} selected={selected} onClick={() => onSelect(option)} type="button">
            <ChipIllustration src={option.illustration} alt={`${option.character} 캐릭터`} />
            <ChipAmount>{option.amount.toLocaleString()}원</ChipAmount>
            <ChipDescription>{option.description}</ChipDescription>
          </Chip>
        );
      })}
    </Row>
  );
}

export default PresetChips;
