import { useState } from 'react';
import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { colFlex } from '@styles/flexStyles';
import useInsightDiscordReport from '@hooks/admin/useInsightDiscordReport';
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

interface DonationSectionProps {
  workspaceId: string;
  workspaceName: string;
  yesterdayRevenue?: number;
}

function DonationSection({ workspaceId, workspaceName, yesterdayRevenue }: DonationSectionProps) {
  const [amount, setAmount] = useState<number>(DEFAULT_AMOUNT);
  const { reportDonationAmountClick } = useInsightDiscordReport();

  const handlePresetSelect = (option: PresetOption) => {
    reportDonationAmountClick(workspaceId, workspaceName, option);
    setAmount(option.amount);
  };

  return (
    <Section>
      <Label>KioSchool 응원하기</Label>
      <PresetChips selectedAmount={amount} yesterdayRevenue={yesterdayRevenue} onSelect={handlePresetSelect} />
      <DonationQr amount={amount} />
      <Tail>송금자명에 닉네임이나 주점명을 적어주시면 운영팀이 확인하기 쉬워요.</Tail>
    </Section>
  );
}

export default DonationSection;
