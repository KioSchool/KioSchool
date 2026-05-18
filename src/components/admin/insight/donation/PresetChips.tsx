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
  word-break: keep-all;
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

const ChipMain = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: ${Color.BLACK};
  text-align: center;
  word-break: keep-all;
`;

const ChipSub = styled.div`
  font-size: 11px;
  font-weight: 500;
  color: ${Color.GREY};
`;

const ChipDescription = styled.div`
  font-size: 11px;
  color: ${Color.GREY};
  text-align: center;
  line-height: 1.3;
`;

const MAX_PRESET_AMOUNT = 1000000;

function pickRandomCustomIllustration(): string {
  const idx = Math.floor(Math.random() * CUSTOM_RANDOM_ILLUSTRATIONS.length);
  return CUSTOM_RANDOM_ILLUSTRATIONS[idx];
}

function formatRevenuePercent(amount: number, revenue: number): string {
  const ratio = (amount / revenue) * 100;
  return ratio >= 10 ? `${ratio.toFixed(0)}%` : `${ratio.toFixed(1)}%`;
}

interface PresetChipsProps {
  selectedAmount: number;
  yesterdayRevenue?: number;
  onSelect: (option: PresetOption) => void;
}

function PresetChips({ selectedAmount, yesterdayRevenue, onSelect }: PresetChipsProps) {
  const customIllustration = useMemo(() => pickRandomCustomIllustration(), []);
  const usePercentMode = yesterdayRevenue != null && yesterdayRevenue >= MAX_PRESET_AMOUNT;

  return (
    <Row>
      {PRESET_OPTIONS.map((option) => {
        const isCustom = option.amount === CUSTOM_AMOUNT_SENTINEL;
        const illustration = isCustom ? customIllustration : option.illustration;
        const selected = selectedAmount === option.amount;
        const amountLabel = `${option.amount.toLocaleString()}원`;

        const showPercent = usePercentMode && !isCustom;
        const mainLabel = isCustom ? '자유' : showPercent ? `어제 매출의 ${formatRevenuePercent(option.amount, yesterdayRevenue!)}` : amountLabel;

        return (
          <Chip key={option.character} selected={selected} onClick={() => onSelect(option)} type="button">
            <ChipIllustration src={illustration} alt={`${option.character} 마스코트`} />
            <ChipMain>{mainLabel}</ChipMain>
            {showPercent && <ChipSub>{amountLabel}</ChipSub>}
            <ChipDescription>{option.description}</ChipDescription>
          </Chip>
        );
      })}
    </Row>
  );
}

export default PresetChips;
