import { useState } from 'react';
import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { colFlex } from '@styles/flexStyles';
import CustomAmountInput from './donation/CustomAmountInput';
import DonationQr from './donation/DonationQr';
import PresetChips from './donation/PresetChips';
import { DEFAULT_AMOUNT, PresetOption } from './donation/donationConstants';

type Mode = 'preset' | 'custom';

const Section = styled.div`
  width: 100%;
  padding-top: 14px;
  border-top: 1px dashed ${Color.HEAVY_GREY};
  gap: 10px;
  ${colFlex({ justify: 'start', align: 'stretch' })};
`;

const Label = styled.div`
  font-size: 14px;
  color: ${Color.BLACK};
  font-weight: 700;
`;

const Tail = styled.div`
  font-size: 11px;
  color: ${Color.GREY};
  line-height: 1.4;
`;

function DonationSection() {
  const [amount, setAmount] = useState<number>(DEFAULT_AMOUNT);
  const [mode, setMode] = useState<Mode>('preset');
  const [customInput, setCustomInput] = useState<string>('');
  const [isCustomExpanded, setIsCustomExpanded] = useState<boolean>(false);

  const tossUrl = import.meta.env.VITE_KIO_DONATION_TOSS_URL as string | undefined;

  const handlePresetSelect = (option: PresetOption) => {
    setMode('preset');
    setAmount(option.amount);
    setCustomInput('');
  };

  const handleCustomToggle = () => {
    setIsCustomExpanded((prev) => !prev);
  };

  const handleCustomChange = (raw: string) => {
    setCustomInput(raw);
    setMode('custom');
    const parsed = parseInt(raw || '0', 10);
    setAmount(Number.isNaN(parsed) ? 0 : parsed);
  };

  return (
    <Section>
      <Label>KioSchool 만든 사람들에게 응원 보내기</Label>
      <PresetChips selectedAmount={amount} isPresetMode={mode === 'preset'} onSelect={handlePresetSelect} />
      <CustomAmountInput
        expanded={isCustomExpanded}
        customInput={customInput}
        amount={amount}
        onToggle={handleCustomToggle}
        onCustomChange={handleCustomChange}
      />
      <DonationQr tossAccountUrl={tossUrl} amount={amount} />
      <Tail>송금자명에 닉네임이나 주점명을 적어주시면 운영팀이 확인하기 쉬워요.</Tail>
    </Section>
  );
}

export default DonationSection;
