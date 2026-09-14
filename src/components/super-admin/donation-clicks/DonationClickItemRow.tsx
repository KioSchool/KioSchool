import { useState } from 'react';
import styled from '@emotion/styled';
import { DonationClickItem } from '@@types/donationClick';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { formatDonationClickTime, resolveDonationMethodLabel } from '@utils/donationClickStats';
import { formatCurrency } from '@utils/formatNumber';
import DonationClickActionButton from './DonationClickActionButton';
import DonationDepositForm from './DonationDepositForm';

const NO_WORKSPACE_LABEL = '(주점 정보 없음)';
const NO_ORDER_LABEL = '주문 정보 없음';
const UNKNOWN_AMOUNT_LABEL = '금액 모름';
const CANCEL_ERROR_MESSAGE = '입금 확인을 취소하지 못했어요. 다시 시도해 주세요.';

const Row = styled.div<{ isDeposited: boolean }>`
  padding: 10px 12px;
  gap: 8px;
  border: 1px solid ${({ isDeposited }) => (isDeposited ? Color.GREEN_ICON_BG : '#f0f0f0')};
  border-radius: 10px;
  background: ${({ isDeposited }) => (isDeposited ? Color.GREEN_FAINT : Color.WHITE)};
  ${colFlex()}
`;

const MainLine = styled.div`
  gap: 10px;
  ${rowFlex({ align: 'flex-start' })}
`;

const Time = styled.div`
  font-size: 13px;
  font-weight: 700;
  color: ${Color.BLACK};
  flex-shrink: 0;
  min-width: 44px;
`;

const Info = styled.div`
  flex: 1;
  min-width: 0;
  gap: 2px;
  ${colFlex()}
`;

const WorkspaceName = styled.div`
  font-size: 13px;
  font-weight: 500;
  color: ${Color.BLACK};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const SubText = styled.div`
  font-size: 11px;
  color: ${Color.MUTED_GREY};
  word-break: break-all;
`;

const ClickAmount = styled.div`
  font-size: 12px;
  color: ${Color.GREY};
  flex-shrink: 0;
  text-align: right;
`;

const ActionLine = styled.div`
  gap: 6px;
  ${rowFlex({ align: 'center', justify: 'space-between' })}
`;

const DepositBadge = styled.span`
  font-size: 12px;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 4px;
  background: ${Color.GREEN_ICON_BG};
  color: ${Color.GREEN};
`;

const PendingLabel = styled.span`
  font-size: 12px;
  color: ${Color.MUTED_GREY};
`;

const Buttons = styled.div`
  gap: 6px;
  margin-left: auto;
  ${rowFlex({ align: 'center' })}
`;

const ErrorText = styled.div`
  font-size: 11px;
  color: ${Color.RED};
`;

interface DonationClickItemRowProps {
  item: DonationClickItem;
  onConfirm: (clickId: number, amount: number, memo: string) => Promise<void>;
  onCancel: (clickId: number) => Promise<void>;
}

function DonationClickItemRow({ item, onConfirm, onCancel }: DonationClickItemRowProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { depositAmount } = item;
  const orderLabel = item.orderId === null ? NO_ORDER_LABEL : `주문 #${item.orderId}`;
  const clickAmountLabel = item.amount === null ? UNKNOWN_AMOUNT_LABEL : formatCurrency(item.amount);
  // 계좌이체 클릭은 amount가 null이라 금액 칸이 빈칸으로 시작한다.
  const initialAmount = depositAmount ?? item.amount;

  const handleOpenForm = () => {
    setErrorMessage('');
    setIsEditing(true);
  };

  const handleCancelDeposit = () => {
    if (isCancelling || !window.confirm('이 클릭의 입금 확인을 취소할까요?')) return;

    setIsCancelling(true);
    setErrorMessage('');
    onCancel(item.id)
      .catch(() => setErrorMessage(CANCEL_ERROR_MESSAGE))
      .finally(() => setIsCancelling(false));
  };

  return (
    <Row isDeposited={depositAmount !== null}>
      <MainLine>
        <Time>{formatDonationClickTime(item.createdAt)}</Time>
        <Info>
          <WorkspaceName>{item.workspaceName ?? NO_WORKSPACE_LABEL}</WorkspaceName>
          <SubText>{orderLabel}</SubText>
        </Info>
        <ClickAmount>
          {resolveDonationMethodLabel(item.method)} · {clickAmountLabel}
        </ClickAmount>
      </MainLine>
      {depositAmount !== null && item.depositMemo && <SubText>메모: {item.depositMemo}</SubText>}
      {isEditing && (
        <DonationDepositForm
          initialAmount={initialAmount}
          initialMemo={item.depositMemo ?? ''}
          onSubmit={(amount, memo) => onConfirm(item.id, amount, memo)}
          onClose={() => setIsEditing(false)}
        />
      )}
      {!isEditing && depositAmount === null && (
        <ActionLine>
          <PendingLabel>미확인</PendingLabel>
          <Buttons>
            <DonationClickActionButton type="button" tone="primary" onClick={handleOpenForm}>
              입금 확인
            </DonationClickActionButton>
          </Buttons>
        </ActionLine>
      )}
      {!isEditing && depositAmount !== null && (
        <ActionLine>
          <DepositBadge>입금 {formatCurrency(depositAmount)}</DepositBadge>
          <Buttons>
            <DonationClickActionButton type="button" tone="danger" onClick={handleCancelDeposit} disabled={isCancelling}>
              확인 취소
            </DonationClickActionButton>
            <DonationClickActionButton type="button" onClick={handleOpenForm} disabled={isCancelling}>
              수정
            </DonationClickActionButton>
          </Buttons>
        </ActionLine>
      )}
      {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
    </Row>
  );
}

export default DonationClickItemRow;
