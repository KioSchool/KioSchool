// 후원 모달 디자인 탐색용 변형(shell × visual). 팀이 Storybook에서 비교해 하나를 고르면
// 진 브랜치(선택 안 된 shell/visual 분기와 donation/ 하위 컴포넌트)는 삭제된다.
// 프로덕션(OrderComplete.tsx)은 계속 기본값(shell='center', visual='plain')만 쓴다.
import { MouseEvent } from 'react';
import { createPortal } from 'react-dom';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { MODAL_ROOT_KEY } from '@hooks/useModal';
import { DONATION_ACCOUNT } from '@utils/donation';
import { buildDonationCtaLabel, DONATION_AMOUNT_OPTIONS, DONATION_COUNT_DISPLAY_MIN, DONATION_DESTINATION_NOTE } from '@constants/data/customerDonationCopy';
import useCustomerDonationModal, { DonationMethod } from '@hooks/user/useCustomerDonationModal';
import DonationVisualHeader, { DonationVisual } from './donation/DonationVisualHeader';
import DonationAccountBox from './donation/DonationAccountBox';

type DonationShell = 'center' | 'sheet';

interface MethodOption {
  value: DonationMethod;
  label: string;
}

const DONATION_METHOD_OPTIONS: readonly MethodOption[] = [
  { value: 'toss', label: '토스' },
  { value: 'account', label: '계좌이체' },
];

// framer-motion으로 하면 StrictMode 이중 마운트 때 애니메이션이 첫 프레임에서 취소돼
// 시트가 화면 밖에 걸린 채 멈춘다. CSS 키프레임은 중단 개념이 없어 항상 끝까지 도달한다.
const slideUp = keyframes`
  from { transform: translateY(100%); }
  to { transform: translateY(0); }
`;

const Overlay = styled.div<{ sheet: boolean }>`
  position: fixed;
  inset: 0;
  background: rgba(70, 74, 77, 0.35);
  z-index: 3000;
  ${({ sheet }) => rowFlex({ justify: 'center', align: sheet ? 'flex-end' : 'center' })};
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

const SheetPanel = styled.div`
  width: 100%;
  max-width: 480px;
  max-height: 88vh;
  box-sizing: border-box;
  padding: 20px;
  background: ${Color.WHITE};
  border-radius: 16px 16px 0 0;
  overflow-y: auto;
  position: relative;
  gap: 14px;
  animation: ${slideUp} 0.25s ease-out;
  ${colFlex({ justify: 'start', align: 'stretch' })};
`;

const HandleBar = styled.div`
  width: 34px;
  height: 4px;
  border-radius: 2px;
  background: ${Color.HEAVY_GREY};
  margin: 0 auto 12px;
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

const DestinationNote = styled.div`
  font-size: 11px;
  color: ${Color.MUTED_GREY};
  text-align: center;
`;

const Divider = styled.div`
  height: 0.5px;
  background: ${Color.HEAVY_GREY};
`;

const ChipRow = styled.div`
  gap: 6px;
  ${rowFlex({ justify: 'space-between', align: 'center' })};
`;

const Chip = styled.button<{ selected: boolean }>`
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

const DonateButton = styled.button`
  padding: 12px;
  border: none;
  border-radius: 8px;
  background: ${Color.KIO_ORANGE};
  color: ${Color.WHITE};
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  cursor: pointer;
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
  shell?: DonationShell;
  visual?: DonationVisual;
  initialTodayCount?: number;
  copyId?: string;
}

function CustomerDonationModal({ orderId, workspaceId, eligible, shell = 'center', visual = 'plain', initialTodayCount, copyId }: CustomerDonationModalProps) {
  const { shouldRender, view, copy, amount, todayCount, donationUrl, method, selectAmount, selectMethod, donate, dismiss } = useCustomerDonationModal({
    orderId,
    workspaceId,
    eligible,
    initialTodayCount,
    copyId,
  });

  const modalRoot = typeof document !== 'undefined' ? document.getElementById(MODAL_ROOT_KEY) : null;
  if (!shouldRender || !modalRoot) return null;

  const showCount = todayCount != null && todayCount >= DONATION_COUNT_DISPLAY_MIN;

  const handleAccountDonate = () => {
    navigator.clipboard?.writeText(DONATION_ACCOUNT.accountNo).catch(() => undefined);
    donate();
  };

  const stopPropagation = (event: MouseEvent) => event.stopPropagation();

  const primaryAction =
    method === 'toss' ? (
      <DonateAnchor href={donationUrl} onClick={donate}>
        {buildDonationCtaLabel(copy, amount)}
      </DonateAnchor>
    ) : (
      <DonateButton type="button" onClick={handleAccountDonate}>
        계좌번호 복사하기
      </DonateButton>
    );

  const donateView = (
    <>
      <DismissButton type="button" aria-label="후원 안내 닫기" onClick={dismiss}>
        ✕
      </DismissButton>
      <DonationVisualHeader visual={visual} copy={copy} amount={amount} todayCount={todayCount} />
      <DestinationNote>{DONATION_DESTINATION_NOTE}</DestinationNote>
      <Divider />
      <ChipRow>
        {DONATION_AMOUNT_OPTIONS.map((option) => (
          <Chip key={option} type="button" selected={option === amount} onClick={() => selectAmount(option)}>
            {option.toLocaleString()}원
          </Chip>
        ))}
      </ChipRow>
      <ChipRow>
        {DONATION_METHOD_OPTIONS.map((option) => (
          <Chip key={option.value} type="button" selected={option.value === method} onClick={() => selectMethod(option.value)}>
            {option.label}
          </Chip>
        ))}
      </ChipRow>
      {method === 'account' && <DonationAccountBox />}
      {primaryAction}
      <LaterButton type="button" onClick={dismiss}>
        다음에
      </LaterButton>
    </>
  );

  const thanksView = (
    <>
      <ThanksTitle>고마워요!</ThanksTitle>
      <ThanksBody>{showCount ? `오늘 ${todayCount}명이 키오스쿨과 함께했어요.` : '여러분 덕에 키오스쿨이 굴러가요.'}</ThanksBody>
      {method === 'account' && <DonationAccountBox />}
      <CloseButton type="button" onClick={dismiss}>
        닫기
      </CloseButton>
    </>
  );

  const content = view === 'donate' ? donateView : thanksView;

  if (shell === 'sheet') {
    return createPortal(
      <Overlay sheet onClick={dismiss}>
        <SheetPanel className={'customer-donation-modal'} onClick={stopPropagation}>
          <HandleBar />
          {content}
        </SheetPanel>
      </Overlay>,
      modalRoot,
    );
  }

  return createPortal(
    <Overlay sheet={false} onClick={dismiss}>
      <CenterPanel className={'customer-donation-modal'} onClick={stopPropagation}>
        {content}
      </CenterPanel>
    </Overlay>,
    modalRoot,
  );
}

export default CustomerDonationModal;
