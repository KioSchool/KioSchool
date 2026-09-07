import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { DONATION_AMOUNT_OPTIONS, DONATION_DESTINATION_NOTE } from '@constants/data/customerDonationCopy';
import useCustomerDonationCard from '@hooks/user/useCustomerDonationCard';

const Container = styled.div`
  position: relative;
  box-sizing: border-box;
  width: 100%;
  padding: 14px;
  border: 0.5px solid ${Color.HEAVY_GREY};
  border-radius: 12px;
  background: ${Color.WHITE};
  gap: 12px;
  ${colFlex({ justify: 'start', align: 'stretch' })};
`;

const DismissButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 24px;
  height: 24px;
  padding: 0;
  border: none;
  background: none;
  color: ${Color.MUTED_GREY};
  font-size: 16px;
  line-height: 1;
  cursor: pointer;
`;

const Headline = styled.div`
  padding-right: 24px;
  font-size: 14px;
  font-weight: 600;
  color: ${Color.BLACK};
  line-height: 1.45;
  word-break: keep-all;
`;

const SubLineGroup = styled.div`
  gap: 2px;
  ${colFlex({ justify: 'start', align: 'stretch' })};
`;

const SubLine = styled.div`
  font-size: 12px;
  color: ${Color.GREY};
  line-height: 1.6;
  word-break: keep-all;
`;

const AmountRow = styled.div`
  gap: 6px;
  ${rowFlex({ justify: 'space-between', align: 'center' })};
`;

const AmountChip = styled.button<{ selected: boolean }>`
  flex: 1;
  padding: 9px 0;
  border: ${({ selected }) => (selected ? `2px solid ${Color.KIO_ORANGE}` : `0.5px solid ${Color.HEAVY_GREY}`)};
  border-radius: 8px;
  background: ${Color.WHITE};
  color: ${({ selected }) => (selected ? Color.KIO_ORANGE : Color.GREY)};
  font-size: 13px;
  font-weight: ${({ selected }) => (selected ? 600 : 400)};
  cursor: pointer;
`;

const DonateAnchor = styled.a`
  padding: 11px;
  border-radius: 8px;
  background: ${Color.KIO_ORANGE};
  color: ${Color.WHITE};
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  text-decoration: none;
`;

const DestinationNote = styled.div`
  font-size: 11px;
  color: ${Color.MUTED_GREY};
  text-align: center;
`;

interface CustomerDonationCardProps {
  orderId: string | null;
  workspaceId: string | null;
  eligible: boolean;
}

function CustomerDonationCard({ orderId, workspaceId, eligible }: CustomerDonationCardProps) {
  const { shouldRender, copy, amount, donationUrl, selectAmount, reportDonateClick, dismiss } = useCustomerDonationCard({
    orderId,
    workspaceId,
    eligible,
  });

  if (!shouldRender) return null;

  return (
    <Container className={'customer-donation-card'}>
      <DismissButton type="button" aria-label="후원 안내 닫기" onClick={dismiss}>
        ✕
      </DismissButton>
      <Headline>{copy.headline}</Headline>
      <SubLineGroup>
        {copy.subLines.map((line) => (
          <SubLine key={line}>{line}</SubLine>
        ))}
      </SubLineGroup>
      <AmountRow>
        {DONATION_AMOUNT_OPTIONS.map((option) => (
          <AmountChip key={option} type="button" selected={option === amount} onClick={() => selectAmount(option)}>
            {option.toLocaleString()}원
          </AmountChip>
        ))}
      </AmountRow>
      <DonateAnchor href={donationUrl} onClick={reportDonateClick}>
        토스로 {amount.toLocaleString()}원 보내기
      </DonateAnchor>
      <DestinationNote>{DONATION_DESTINATION_NOTE}</DestinationNote>
    </Container>
  );
}

export default CustomerDonationCard;
