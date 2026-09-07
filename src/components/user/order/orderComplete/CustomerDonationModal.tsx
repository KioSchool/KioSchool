import { createPortal } from 'react-dom';
import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { MODAL_ROOT_KEY } from '@hooks/useModal';
import { DONATION_ACCOUNT } from '@utils/donation';
import { DONATION_AMOUNT_OPTIONS, DONATION_COUNT_DISPLAY_MIN, DONATION_DESTINATION_NOTE } from '@constants/data/customerDonationCopy';
import useCustomerDonationModal from '@hooks/user/useCustomerDonationModal';

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(70, 74, 77, 0.35);
  z-index: 3000;
  ${rowFlex({ justify: 'center', align: 'center' })};
`;

const Panel = styled.div`
  width: 340px;
  max-width: 92vw;
  max-height: 88vh;
  box-sizing: border-box;
  padding: 20px;
  background: ${Color.WHITE};
  border-radius: 16px;
  overflow-y: auto;
  position: relative;
  gap: 14px;
  ${colFlex({ justify: 'start', align: 'stretch' })};
`;

const DismissButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
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
  font-size: 16px;
  font-weight: 600;
  color: ${Color.BLACK};
  line-height: 1.45;
  word-break: keep-all;
`;

const SubLineGroup = styled.div`
  gap: 6px;
  ${colFlex({ justify: 'start', align: 'stretch' })};
`;

const SubLine = styled.div`
  font-size: 13px;
  color: ${Color.GREY};
  line-height: 1.65;
  word-break: keep-all;
`;

const CountLine = styled.div`
  padding: 8px 10px;
  border-radius: 8px;
  background: ${Color.LIGHT_GREY};
  font-size: 12px;
  color: ${Color.GREY};
  text-align: center;
`;

const AmountRow = styled.div`
  gap: 6px;
  ${rowFlex({ justify: 'space-between', align: 'center' })};
`;

const AmountChip = styled.button<{ selected: boolean }>`
  flex: 1;
  padding: 10px 0;
  border: ${({ selected }) => (selected ? `2px solid ${Color.KIO_ORANGE}` : `0.5px solid ${Color.HEAVY_GREY}`)};
  border-radius: 8px;
  background: ${Color.WHITE};
  color: ${({ selected }) => (selected ? Color.KIO_ORANGE : Color.GREY)};
  font-size: 13px;
  font-weight: ${({ selected }) => (selected ? 600 : 400)};
  cursor: pointer;
`;

const DonateAnchor = styled.a`
  padding: 12px;
  border-radius: 8px;
  background: ${Color.KIO_ORANGE};
  color: ${Color.WHITE};
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  text-decoration: none;
`;

const AccountToggle = styled.button`
  padding: 4px;
  border: none;
  background: none;
  color: ${Color.GREY};
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

const AccountBox = styled.div`
  padding: 12px;
  border: 0.5px solid ${Color.HEAVY_GREY};
  border-radius: 8px;
  gap: 6px;
  ${colFlex({ justify: 'start', align: 'stretch' })};
`;

const AccountRow = styled.div`
  font-size: 13px;
  color: ${Color.BLACK};
`;

const CopyButton = styled.button`
  margin-top: 4px;
  padding: 8px;
  border: 0.5px solid ${Color.KIO_ORANGE};
  border-radius: 8px;
  background: ${Color.WHITE};
  color: ${Color.KIO_ORANGE};
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
`;

const DestinationNote = styled.div`
  font-size: 11px;
  color: ${Color.MUTED_GREY};
  text-align: center;
`;

const LaterButton = styled.button`
  padding: 6px;
  border: none;
  background: none;
  color: ${Color.MUTED_GREY};
  font-size: 13px;
  cursor: pointer;
`;

const ThanksTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: ${Color.BLACK};
  text-align: center;
`;

const ThanksBody = styled.div`
  font-size: 13px;
  color: ${Color.GREY};
  text-align: center;
  line-height: 1.65;
`;

const CloseButton = styled.button`
  padding: 12px;
  border-radius: 8px;
  background: ${Color.KIO_ORANGE};
  color: ${Color.WHITE};
  border: none;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
`;

interface CustomerDonationModalProps {
  orderId: string | null;
  workspaceId: string | null;
  eligible: boolean;
}

function CustomerDonationModal({ orderId, workspaceId, eligible }: CustomerDonationModalProps) {
  const { shouldRender, view, copy, amount, todayCount, donationUrl, isAccountOpen, selectAmount, toggleAccount, donate, dismiss } = useCustomerDonationModal({
    orderId,
    workspaceId,
    eligible,
  });

  const modalRoot = typeof document !== 'undefined' ? document.getElementById(MODAL_ROOT_KEY) : null;
  if (!shouldRender || !modalRoot) return null;

  const showCount = todayCount != null && todayCount >= DONATION_COUNT_DISPLAY_MIN;

  const handleCopyAccount = () => {
    navigator.clipboard?.writeText(DONATION_ACCOUNT.accountNo).catch(() => undefined);
    donate('account');
  };

  const accountBlock = (
    <AccountBox>
      <AccountRow>{DONATION_ACCOUNT.bankName}</AccountRow>
      <AccountRow>{DONATION_ACCOUNT.accountNo}</AccountRow>
      <AccountRow>{DONATION_ACCOUNT.holderName}</AccountRow>
    </AccountBox>
  );

  const donateView = (
    <>
      <DismissButton type="button" aria-label="후원 안내 닫기" onClick={dismiss}>
        ✕
      </DismissButton>
      <Headline>{copy.headline}</Headline>
      <SubLineGroup>
        {copy.subLines.map((line) => (
          <SubLine key={line}>{line}</SubLine>
        ))}
      </SubLineGroup>
      {showCount && <CountLine>오늘 {todayCount}명이 키오스쿨과 함께했어요</CountLine>}
      <AmountRow>
        {DONATION_AMOUNT_OPTIONS.map((option) => (
          <AmountChip key={option} type="button" selected={option === amount} onClick={() => selectAmount(option)}>
            {option.toLocaleString()}원
          </AmountChip>
        ))}
      </AmountRow>
      <DonateAnchor href={donationUrl} onClick={() => donate('toss')}>
        토스로 {amount.toLocaleString()}원 보내기
      </DonateAnchor>
      <AccountToggle type="button" onClick={toggleAccount}>
        토스 없이 계좌로 보내기
      </AccountToggle>
      {isAccountOpen && (
        <>
          {accountBlock}
          <CopyButton type="button" onClick={handleCopyAccount}>
            계좌번호 복사
          </CopyButton>
        </>
      )}
      <DestinationNote>{DONATION_DESTINATION_NOTE}</DestinationNote>
      <LaterButton type="button" onClick={dismiss}>
        다음에
      </LaterButton>
    </>
  );

  const thanksView = (
    <>
      <ThanksTitle>고마워요!</ThanksTitle>
      <ThanksBody>{showCount ? `오늘 ${todayCount}명이 키오스쿨과 함께했어요.` : '여러분 덕에 키오스쿨이 굴러가요.'}</ThanksBody>
      {isAccountOpen && accountBlock}
      <CloseButton type="button" onClick={dismiss}>
        닫기
      </CloseButton>
    </>
  );

  return createPortal(
    <Overlay onClick={dismiss}>
      <Panel className={'customer-donation-modal'} onClick={(event) => event.stopPropagation()}>
        {view === 'donate' ? donateView : thanksView}
      </Panel>
    </Overlay>,
    modalRoot,
  );
}

export default CustomerDonationModal;
