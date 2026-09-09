import { createPortal } from 'react-dom';
import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { MODAL_ROOT_KEY } from '@hooks/useModal';
import { DONATION_ACCOUNT, resolveThanksCountText } from '@utils/donation';
import { buildDonationCtaLabel, DONATION_AMOUNT_OPTIONS, fillDonationAmount } from '@constants/data/customerDonationCopy';
import useCustomerDonationModal, { DonationMethod } from '@hooks/user/useCustomerDonationModal';
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

const Overlay = styled.div`
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
`;

const DonateAnchor = styled.a`
  padding: 12px;
  border-radius: 8px;
  background: ${Color.KIO_ORANGE};
  color: ${Color.WHITE};
  font-size: 16px;
  font-weight: 700;
  text-align: center;
  text-decoration: none;
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
`;

const ThanksTitle = styled.div`
  font-size: 19px;
  font-weight: 700;
  color: ${Color.TEXT_STRONG};
  text-align: center;
`;

const THANKS_CHARACTER_HEIGHT_PX = 96;

const ThanksCharacter = styled.img`
  align-self: center;
  height: ${THANKS_CHARACTER_HEIGHT_PX}px;
  object-fit: contain;
`;

const ThanksImpact = styled.div`
  padding: 9px 12px;
  border-radius: 8px;
  background: ${Color.KIO_ORANGE_FAINT};
  font-size: 13px;
  font-weight: 600;
  color: ${Color.KIO_ORANGE_DARK};
  text-align: center;
  line-height: 1.5;
  word-break: keep-all;
`;

const ThanksCount = styled.div`
  font-size: 12px;
  font-weight: 400;
  color: ${Color.TEXT_BODY};
  text-align: center;
`;

const ThanksGuide = styled.div`
  font-size: 13px;
  font-weight: 400;
  color: ${Color.TEXT_BODY};
  text-align: center;
  line-height: 1.7;
  white-space: pre-line;
  word-break: keep-all;
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
    donationUrl,
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

  const modalRoot = typeof document !== 'undefined' ? document.getElementById(MODAL_ROOT_KEY) : null;
  if (!eligible) return null;

  const isAccountMethod = method === 'account';
  const impactText = fillDonationAmount('{anchor} 값 {amount}원으로 서버가 {duration} 더 버텨요', amount, copy);
  const thanksCountText = resolveThanksCountText(todayCount, justDonated);

  const handleAccountDonate = () => {
    navigator.clipboard?.writeText(DONATION_ACCOUNT.accountNo).catch(() => undefined);
    donate();
  };

  const primaryAction = isAccountMethod ? (
    <DonateButton type="button" onClick={handleAccountDonate}>
      계좌번호 복사하기
    </DonateButton>
  ) : (
    <DonateAnchor href={donationUrl} onClick={donate}>
      {buildDonationCtaLabel(copy, amount)}
    </DonateAnchor>
  );

  const donateView = (
    <>
      <DismissButton type="button" aria-label="후원 안내 닫기" onClick={dismiss}>
        ✕
      </DismissButton>
      <BrandBadge>키오스쿨</BrandBadge>
      <DonationVisualHeader copy={copy} note={note} amount={amount} todayCount={todayCount} />
      <Divider />
      <FieldGroup>
        <FieldLabel>보내는 방법</FieldLabel>
        <ChipRow>
          {DONATION_METHOD_OPTIONS.map((option) => (
            <Chip key={option.value} type="button" selected={option.value === method} onClick={() => selectMethod(option.value)}>
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
              <Chip key={option} type="button" selected={option === amount} onClick={() => selectAmount(option)}>
                {option.toLocaleString()}원
              </Chip>
            ))}
          </ChipRow>
        </FieldGroup>
      )}
      {isAccountMethod && <DonationAccountBox />}
      {primaryAction}
    </>
  );

  const thanksView = isAccountMethod ? (
    <>
      <ThanksCharacter src={thanksCharacter} alt="키오스쿨 마스코트" />
      <ThanksTitle>계좌번호를 복사했어요</ThanksTitle>
      <DonationAccountBox />
      <ThanksGuide>{'뱅킹 앱에 붙여넣어 보내주시면 돼요.\n키오스쿨을 지켜주셔서 고마워요.'}</ThanksGuide>
      <CloseButton type="button" onClick={dismiss}>
        닫기
      </CloseButton>
    </>
  ) : (
    <>
      <ThanksCharacter src={thanksCharacter} alt="키오스쿨 마스코트" />
      <ThanksTitle>{justDonated ? '정말 고마워요 🎉' : '이미 응원해주셨어요'}</ThanksTitle>
      {justDonated && <ThanksImpact>{impactText}</ThanksImpact>}
      {thanksCountText && <ThanksCount>{thanksCountText}</ThanksCount>}
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
    <>
      <DonationTriggerRow>
        <DonationTrigger type="button" hasDonated={hasDonated} onClick={open}>
          {hasDonated ? TRIGGER_LABEL_DONATED : TRIGGER_LABEL_DEFAULT}
        </DonationTrigger>
      </DonationTriggerRow>
      {isOpen &&
        modalRoot &&
        createPortal(
          // 배경(회색 영역) 클릭으로는 안 닫는다. ✕ 버튼으로만 닫힌다.
          <Overlay>
            <CenterPanel className={'customer-donation-modal'}>{content}</CenterPanel>
          </Overlay>,
          modalRoot,
        )}
    </>
  );
}

export default CustomerDonationModal;
