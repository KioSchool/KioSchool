import { useEffect, useState } from 'react';
import styled from '@emotion/styled';

import NewAppInput from '@components/common/input/NewAppInput';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { getSetDiscountRate } from '@utils/setProduct';

const DISCOUNT_MODE = {
  AMOUNT: 'AMOUNT',
  RATE: 'RATE',
} as const;

type DiscountMode = typeof DISCOUNT_MODE[keyof typeof DISCOUNT_MODE];

const AMOUNT_PRESETS = [1000, 2000, 3000, 5000] as const;
const RATE_PRESETS = [5, 10, 15, 20] as const;
const MAX_DISCOUNT_RATE = 99;
const DISCOUNT_INPUT_WIDTH = 320;

const Section = styled.section`
  padding: 20px 0 0;
  border-top: 1px solid ${Color.BORDER_GREY};
  gap: 14px;
  ${colFlex()}
`;

const FieldRow = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) ${DISCOUNT_INPUT_WIDTH}px;
  align-items: center;
  gap: 24px;
`;

const FieldInfo = styled.div`
  gap: 5px;
  ${colFlex()}
`;

const FieldLabel = styled.span`
  font-size: 16px;
  font-weight: 700;
  color: ${Color.TEXT_STRONG};
`;

const FieldDescription = styled.span`
  font-size: 13px;
  color: ${Color.MUTED_GREY};
`;

const InputContainer = styled.div`
  position: relative;
  width: 100%;
`;

const DiscountInput = styled(NewAppInput)`
  padding-right: 58px;
  font-size: 16px;
  text-align: right;
  font-variant-numeric: tabular-nums;
`;

const InputUnit = styled.span`
  position: absolute;
  top: 50%;
  right: 28px;
  font-size: 14px;
  color: ${Color.MUTED_GREY};
  pointer-events: none;
  transform: translateY(-50%);
`;

const Controls = styled.div`
  gap: 12px;
  ${rowFlex({ justify: 'space-between', align: 'center' })}
`;

const ModeToggle = styled.div`
  flex-shrink: 0;
  padding: 3px;
  border-radius: 10px;
  background: ${Color.BORDER_GREY};
  gap: 2px;
  ${rowFlex({ align: 'center' })}
`;

const ModeButton = styled.button<{ selected: boolean }>`
  min-width: 44px;
  height: 32px;
  padding: 0 10px;
  border: none;
  border-radius: 8px;
  background: ${({ selected }) => (selected ? Color.WHITE : 'transparent')};
  font-size: 13px;
  font-weight: 700;
  color: ${({ selected }) => (selected ? Color.TEXT_STRONG : Color.MUTED_GREY)};
  cursor: pointer;
`;

const Presets = styled.div`
  flex-wrap: wrap;
  gap: 8px;
  ${rowFlex({ justify: 'flex-end', align: 'center' })}
`;

const PresetButton = styled.button<{ selected: boolean }>`
  min-width: 84px;
  height: 42px;
  padding: 0 14px;
  border: none;
  border-radius: 12px;
  background: ${({ selected }) => (selected ? Color.KIO_ORANGE : Color.KIO_ORANGE_FAINT)};
  font-size: 14px;
  font-weight: 700;
  color: ${({ selected }) => (selected ? Color.WHITE : Color.KIO_ORANGE_DARK)};
  cursor: pointer;

  &:disabled {
    background: ${Color.BORDER_GREY};
    color: ${Color.MUTED_GREY};
    cursor: not-allowed;
  }
`;

interface SetProductDiscountFieldProps {
  originalPrice: number;
  discountPrice: number;
  onChange: (discountPrice: string) => void;
}

function calculateDiscountPrice(originalPrice: number, discountRate: number): number {
  return Math.floor((originalPrice * discountRate) / 100);
}

function SetProductDiscountField({ originalPrice, discountPrice, onChange }: SetProductDiscountFieldProps) {
  const [mode, setMode] = useState<DiscountMode>(DISCOUNT_MODE.AMOUNT);
  const [rateInput, setRateInput] = useState('0');
  const isAmountMode = mode === DISCOUNT_MODE.AMOUNT;
  const inputValue = isAmountMode ? String(discountPrice) : rateInput;
  const presets = isAmountMode ? AMOUNT_PRESETS : RATE_PRESETS;

  useEffect(() => {
    if (isAmountMode) return;
    const nextDiscountPrice = calculateDiscountPrice(originalPrice, Number(rateInput));
    if (nextDiscountPrice !== discountPrice) onChange(String(nextDiscountPrice));
  }, [discountPrice, isAmountMode, onChange, originalPrice, rateInput]);

  const handleModeChange = (nextMode: DiscountMode) => {
    if (nextMode === mode) return;
    if (nextMode === DISCOUNT_MODE.RATE) setRateInput(String(getSetDiscountRate(originalPrice, discountPrice)));
    setMode(nextMode);
  };

  const handleInputChange = (input: string) => {
    const numericInput = input.replace(/[^0-9]/g, '');
    if (isAmountMode) {
      onChange(numericInput);
      return;
    }

    const rate = Math.min(Number(numericInput), MAX_DISCOUNT_RATE);
    const nextRateInput = numericInput ? String(rate) : '';
    setRateInput(nextRateInput);
    onChange(String(calculateDiscountPrice(originalPrice, rate)));
  };

  const handlePresetClick = (preset: number) => {
    if (isAmountMode) {
      onChange(String(preset));
      return;
    }

    setRateInput(String(preset));
    onChange(String(calculateDiscountPrice(originalPrice, preset)));
  };

  const handleClearClick = () => {
    setRateInput('0');
    onChange('0');
  };

  const isPresetSelected = (preset: number) => {
    return isAmountMode ? discountPrice === preset : Number(rateInput) === preset;
  };

  const isPresetDisabled = (preset: number) => {
    if (originalPrice <= 0) return true;
    return isAmountMode && preset >= originalPrice;
  };

  return (
    <Section>
      <FieldRow>
        <FieldInfo>
          <FieldLabel>할인</FieldLabel>
          <FieldDescription>금액 또는 비율 중 편한 방식으로 입력해주세요.</FieldDescription>
        </FieldInfo>
        <InputContainer>
          <DiscountInput width="100%" value={inputValue} inputMode="numeric" onChange={(event) => handleInputChange(event.target.value)} />
          <InputUnit>{isAmountMode ? '원' : '%'}</InputUnit>
        </InputContainer>
      </FieldRow>

      <Controls>
        <ModeToggle>
          <ModeButton type="button" selected={isAmountMode} onClick={() => handleModeChange(DISCOUNT_MODE.AMOUNT)}>
            원
          </ModeButton>
          <ModeButton type="button" selected={!isAmountMode} onClick={() => handleModeChange(DISCOUNT_MODE.RATE)}>
            %
          </ModeButton>
        </ModeToggle>

        <Presets>
          {presets.map((preset) => (
            <PresetButton
              type="button"
              key={preset}
              selected={isPresetSelected(preset)}
              disabled={isPresetDisabled(preset)}
              onClick={() => handlePresetClick(preset)}
            >
              {isAmountMode ? `-${preset.toLocaleString()}` : `-${preset}%`}
            </PresetButton>
          ))}
          <PresetButton type="button" selected={discountPrice === 0} onClick={handleClearClick}>
            없음
          </PresetButton>
        </Presets>
      </Controls>
    </Section>
  );
}

export default SetProductDiscountField;
