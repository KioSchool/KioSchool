import { useState } from 'react';
import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { colFlex } from '@styles/flexStyles';
import DonationQr from './donation/DonationQr';
import PresetChips from './donation/PresetChips';
import { DEFAULT_AMOUNT, PresetOption } from './donation/donationConstants';

const Section = styled.div`
  width: 100%;
  min-width: 0;
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

  const tossUrl = import.meta.env.VITE_KIO_DONATION_TOSS_URL as string | undefined;

  const handlePresetSelect = (option: PresetOption) => {
    setAmount(option.amount);
  };

  return (
    <Section>
      <Label>KioSchool 만든 사람들에게 응원 보내기</Label>
      <PresetChips selectedAmount={amount} onSelect={handlePresetSelect} />
      <DonationQr tossAccountUrl={tossUrl} amount={amount} />
      <Tail>송금자명에 닉네임이나 주점명을 적어주시면 운영팀이 확인하기 쉬워요.</Tail>
    </Section>
  );
}

export default DonationSection;
