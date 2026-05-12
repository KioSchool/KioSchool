import { useMemo } from 'react';
import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { CUSTOM_AMOUNT_SENTINEL, CUSTOM_RANDOM_ILLUSTRATIONS, PRESET_OPTIONS, PresetOption } from './donationConstants';

const Row = styled.div`
  width: 100%;
  min-width: 0;
  gap: 8px;
  overflow-x: auto;
  overflow-y: hidden;
  padding-bottom: 4px;
  flex-wrap: nowrap;
  scrollbar-width: thin;
  -webkit-overflow-scrolling: touch;
  ${rowFlex({ justify: 'flex-start', align: 'stretch' })};
`;

const Chip = styled.button<{ selected: boolean }>`
  flex: 0 0 auto;
  width: 130px;
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
  width: 100%;
  max-width: 110px;
  aspect-ratio: 1;
  object-fit: contain;
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

function pickRandomCustomIllustration(): string {
  const idx = Math.floor(Math.random() * CUSTOM_RANDOM_ILLUSTRATIONS.length);
  return CUSTOM_RANDOM_ILLUSTRATIONS[idx];
}

interface PresetChipsProps {
  selectedAmount: number;
  onSelect: (option: PresetOption) => void;
}

function PresetChips({ selectedAmount, onSelect }: PresetChipsProps) {
  const customIllustration = useMemo(() => pickRandomCustomIllustration(), []);

  return (
    <Row>
      {PRESET_OPTIONS.map((option) => {
        const isCustom = option.amount === CUSTOM_AMOUNT_SENTINEL;
        const illustration = isCustom ? customIllustration : option.illustration;
        const amountLabel = isCustom ? '자유' : `${option.amount.toLocaleString()}원`;
        const selected = selectedAmount === option.amount;
        return (
          <Chip key={option.character} selected={selected} onClick={() => onSelect(option)} type="button">
            <ChipIllustration src={illustration} alt={`${option.character} 마스코트`} />
            <ChipAmount>{amountLabel}</ChipAmount>
            <ChipDescription>{option.description}</ChipDescription>
          </Chip>
        );
      })}
    </Row>
  );
}

export default PresetChips;
