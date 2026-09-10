import { useId } from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import Modal from '@mui/material/Modal';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { resolveThanksCount } from '@utils/donation';
import { buildDonationCtaLabel, DONATION_AMOUNT_OPTIONS } from '@constants/data/customerDonationCopy';
import useCustomerDonationModal, { DonationMethod } from '@hooks/user/useCustomerDonationModal';
import useCustomerDonationAction from '@hooks/user/useCustomerDonationAction';
import thanksCharacter from '@resources/image/donation/good.webp';
import DonationVisualHeader from './donation/DonationVisualHeader';
import DonationAccountBox from './donation/DonationAccountBox';

interface MethodOption {
  value: DonationMethod;
  label: string;
}

const DONATION_METHOD_OPTIONS: readonly MethodOption[] = [
  { value: 'toss', label: '토스' },
  { value: 'account', label: '계좌이체' },
];

const TRIGGER_LABEL_DEFAULT = '🙌 키오스쿨 응원하기';
const TRIGGER_LABEL_DONATED = '✓ 응원해주셔서 고마워요';

const Container = styled.div`
  width: 100%;
`;

const Overlay = styled(Modal)`
  position: fixed;
  inset: 0;
  background: rgba(70, 74, 77, 0.35);
  z-index: 3000;
  ${rowFlex({ justify: 'center', align: 'center' })};
`;

const CenterPanel = styled.div`
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

// 주문 완료 화면의 주 CTA는 하단 고정 "더 주문하기"다. 후원 재진입은 그것과 경쟁하지 않는
// 보조 어포던스라, 꽉 찬 채움 버튼이 아니라 가운데 정렬 아웃라인 pill로 둔다.
const DonationTriggerRow = styled.div`
  width: 100%;
  padding: 2px 0;
  ${rowFlex({ justify: 'center', align: 'center' })};
`;

const DonationTrigger = styled.button<{ hasDonated: boolean }>`
  padding: 9px 18px;
  border: 1px solid ${({ hasDonated }) => (hasDonated ? Color.KIO_ORANGE_FAINT : Color.KIO_ORANGE)};
  border-radius: 999px;
  background: ${({ hasDonated }) => (hasDonated ? Color.KIO_ORANGE_FAINT : Color.WHITE)};
  color: ${Color.KIO_ORANGE_DARK};
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
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
  font-size: 14px;
  font-weight: 400;
  line-height: 1;
  cursor: pointer;
`;

const BrandBadge = styled.div`
  align-self: flex-start;
  padding: 3px 8px;
  border-radius: 999px;
  background: ${Color.KIO_ORANGE_FAINT};
  color: ${Color.KIO_ORANGE_DARK};
  font-size: 11px;
  font-weight: 700;
`;

const Divider = styled.div`
  height: 0.5px;
  background: ${Color.HEAVY_GREY};
`;

const FieldGroup = styled.div`
  gap: 6px;
  ${colFlex({ justify: 'start', align: 'stretch' })};
`;

const FieldLabel = styled.div`
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.02em;
  color: ${Color.MUTED_GREY};
`;

const FieldHint = styled.div`
  font-size: 13px;
  font-weight: 400;
  color: ${Color.TEXT_BODY};
  line-height: 1.65;
`;

const ChipRow = styled.div`
  gap: 6px;
  ${rowFlex({ justify: 'space-between', align: 'center' })};
`;

const Chip = styled.button<{ selected: boolean }>`
  flex: 1;
  padding: 10px 0;
  border: 1px solid ${({ selected }) => (selected ? Color.KIO_ORANGE : Color.HEAVY_GREY)};
  border-radius: 8px;
  background: ${({ selected }) => (selected ? Color.KIO_ORANGE_FAINT : Color.WHITE)};
  color: ${({ selected }) => (selected ? Color.KIO_ORANGE_DARK : Color.GREY)};
  font-size: 14px;
  font-weight: ${({ selected }) => (selected ? 700 : 400)};
  cursor: pointer;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const DonateButton = styled.button`
  padding: 12px;
  border: none;
  border-radius: 8px;
  background: ${Color.KIO_ORANGE};
  color: ${Color.WHITE};
  font-size: 16px;
  font-weight: 700;
  text-align: center;
  cursor: pointer;

  &:disabled {
    opacity: 0.6;
    cursor: wait;
  }
`;

const ActionError = styled.p`
  margin: 0;
  color: ${Color.RED};
  font-size: 13px;
  line-height: 1.5;
`;

const ThanksTitle = styled.div`
  font-size: 19px;
  font-weight: 700;
  color: ${Color.TEXT_STRONG};
  text-align: center;
`;

const THANKS_CHARACTER_HEIGHT_PX = 96;
const CONFETTI_COUNT = 12;

const popIn = keyframes`
  0% { transform: scale(0.6); opacity: 0; }
  70% { transform: scale(1.08); opacity: 1; }
  100% { transform: scale(1); }
`;

const confettiFall = keyframes`
  0% { transform: translateY(-14px) rotate(0deg); opacity: 0; }
  12% { opacity: 1; }
  100% { transform: translateY(96px) rotate(320deg); opacity: 0; }
`;

const ThanksCharacter = styled.img`
  align-self: center;
  height: ${THANKS_CHARACTER_HEIGHT_PX}px;
  object-fit: contain;
  animation: ${popIn} 0.42s cubic-bezier(0.34, 1.4, 0.64, 1) both;
`;

const Confetti = styled.div`
  position: absolute;
  top: 6px;
  left: 0;
  right: 0;
  height: 0;
  z-index: 1;
  pointer-events: none;
`;

const ConfettiPiece = styled.i`
  position: absolute;
  top: 0;
  width: 6px;
  height: 10px;
  border-radius: 1px;
  animation: ${confettiFall} 900ms ease-in forwards;

  &:nth-of-type(1) {
    left: 6%;
    background: ${Color.KIO_ORANGE};
    animation-delay: 0ms;
  }
  &:nth-of-type(2) {
    left: 15%;
    background: ${Color.GREEN};
    animation-delay: 90ms;
  }
  &:nth-of-type(3) {
    left: 24%;
    background: ${Color.BLUE};
    animation-delay: 30ms;
  }
  &:nth-of-type(4) {
    left: 33%;
    background: ${Color.KIO_ORANGE_DARK};
    animation-delay: 150ms;
  }
  &:nth-of-type(5) {
    left: 42%;
    background: ${Color.RED};
    animation-delay: 60ms;
  }
  &:nth-of-type(6) {
    left: 50%;
    background: ${Color.KIO_ORANGE};
    animation-delay: 180ms;
  }
  &:nth-of-type(7) {
    left: 58%;
    background: ${Color.GREEN};
    animation-delay: 10ms;
  }
  &:nth-of-type(8) {
    left: 66%;
    background: ${Color.BLUE};
    animation-delay: 120ms;
  }
  &:nth-of-type(9) {
    left: 75%;
    background: ${Color.KIO_ORANGE_DARK};
    animation-delay: 45ms;
  }
  &:nth-of-type(10) {
    left: 84%;
    background: ${Color.RED};
    animation-delay: 165ms;
  }
  &:nth-of-type(11) {
    left: 90%;
    background: ${Color.KIO_ORANGE};
    animation-delay: 75ms;
  }
  &:nth-of-type(12) {
    left: 96%;
    background: ${Color.GREEN};
    animation-delay: 135ms;
  }
`;

const ThanksCount = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: ${Color.TEXT_BODY};
  text-align: center;
  line-height: 1.3;
`;

const ThanksCountNumber = styled.strong`
  font-size: 30px;
  font-weight: 700;
  color: ${Color.KIO_ORANGE};
  font-variant-numeric: tabular-nums;
  margin: 0 3px;
`;

const SecondaryButton = styled.button`
  padding: 12px;
  border: 1px solid ${Color.KIO_ORANGE};
  border-radius: 8px;
  background: ${Color.WHITE};
  color: ${Color.KIO_ORANGE_DARK};
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
`;

const CloseButton = styled.button`
  padding: 12px;
  border-radius: 8px;
  background: ${Color.KIO_ORANGE};
  color: ${Color.WHITE};
  border: none;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
`;

interface CustomerDonationModalProps {
  orderId: string | null;
  workspaceId: string | null;
  eligible: boolean;
  initialTodayCount?: number;
}

function CustomerDonationModal({ orderId, workspaceId, eligible, initialTodayCount }: CustomerDonationModalProps) {
  const {
    isOpen,
    open,
    hasDonated,
    view,
    justDonated,
    copy,
    note,
    amount,
    todayCount,
    donationRank,
    method,
    selectAmount,
    selectMethod,
    donate,
    donateAgain,
    dismiss,
  } = useCustomerDonationModal({
    orderId,
    workspaceId,
    eligible,
    initialTodayCount,
  });
  const { errorMessage, isCopying, handleAccountDonate, handleTossDonate } = useCustomerDonationAction({
    isActive: isOpen && eligible && view === 'donate',
    method,
    amount,
    onDonate: donate,
  });

  const dialogTitleId = useId();
  if (!eligible) return null;

  const isAccountMethod = method === 'account';
  const thanksCount = resolveThanksCount({ justDonated, rank: donationRank, todayCount });

  const primaryAction = isAccountMethod ? (
    <DonateButton type="button" onClick={handleAccountDonate} disabled={isCopying} aria-busy={isCopying}>
      {isCopying ? '복사 중…' : '계좌번호 복사하기'}
    </DonateButton>
  ) : (
    <DonateButton type="button" onClick={handleTossDonate}>
      {buildDonationCtaLabel(copy, amount)}
    </DonateButton>
  );

  const donateView = (
    <>
      <DismissButton type="button" aria-label="후원 안내 닫기" onClick={dismiss}>
        ✕
      </DismissButton>
      <BrandBadge>키오스쿨</BrandBadge>
      <DonationVisualHeader copy={copy} note={note} amount={amount} todayCount={todayCount} titleId={dialogTitleId} />
      <Divider />
      <FieldGroup>
        <FieldLabel>보내는 방법</FieldLabel>
        <ChipRow>
          {DONATION_METHOD_OPTIONS.map((option) => (
            <Chip
              key={option.value}
              type="button"
              selected={option.value === method}
              aria-pressed={option.value === method}
              onClick={() => selectMethod(option.value)}
              disabled={isCopying}
            >
              {option.label}
            </Chip>
          ))}
        </ChipRow>
      </FieldGroup>
      {isAccountMethod ? (
        <FieldGroup>
          <FieldHint>원하시는 만큼 직접 입력해 주세요</FieldHint>
        </FieldGroup>
      ) : (
        <FieldGroup>
          <FieldLabel>얼마를 보낼까요</FieldLabel>
          <ChipRow>
            {DONATION_AMOUNT_OPTIONS.map((option) => (
              <Chip key={option} type="button" selected={option === amount} aria-pressed={option === amount} onClick={() => selectAmount(option)}>
                {option.toLocaleString()}원
              </Chip>
            ))}
          </ChipRow>
        </FieldGroup>
      )}
      {isAccountMethod && <DonationAccountBox />}
      {errorMessage && <ActionError role="alert">{errorMessage}</ActionError>}
      {primaryAction}
    </>
  );

  const thanksView = (
    <>
      {justDonated && (
        <Confetti aria-hidden>
          {Array.from({ length: CONFETTI_COUNT }).map((_, index) => (
            <ConfettiPiece key={index} />
          ))}
        </Confetti>
      )}
      <ThanksCharacter src={thanksCharacter} alt="키오스쿨 마스코트" />
      <ThanksTitle id={dialogTitleId}>정말 고마워요 🎉</ThanksTitle>
      {thanksCount && (
        <ThanksCount>
          {thanksCount.prefix}
          {thanksCount.count != null && <ThanksCountNumber>{thanksCount.count.toLocaleString()}</ThanksCountNumber>}
          {thanksCount.suffix}
        </ThanksCount>
      )}
      <SecondaryButton type="button" onClick={donateAgain}>
        더 응원하기
      </SecondaryButton>
      <CloseButton type="button" onClick={dismiss}>
        닫기
      </CloseButton>
    </>
  );

  const content = view === 'donate' ? donateView : thanksView;

  return (
    <Container>
      <DonationTriggerRow>
        <DonationTrigger type="button" hasDonated={hasDonated} onClick={open}>
          {hasDonated ? TRIGGER_LABEL_DONATED : TRIGGER_LABEL_DEFAULT}
        </DonationTrigger>
      </DonationTriggerRow>
      <Overlay open={isOpen} onClose={dismiss} hideBackdrop>
        <CenterPanel className={'customer-donation-modal'} role="dialog" aria-modal="true" aria-labelledby={dialogTitleId} tabIndex={-1}>
          {content}
        </CenterPanel>
      </Overlay>
    </Container>
  );
}

export default CustomerDonationModal;
