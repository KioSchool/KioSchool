import { FormEvent, useState } from 'react';
import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import DonationClickActionButton from './DonationClickActionButton';

const SAVE_ERROR_MESSAGE = '저장하지 못했어요. 금액을 확인하고 다시 시도해 주세요.';
const MEMO_MAX_LENGTH = 100;
const MIN_DEPOSIT_AMOUNT = 1;

const Form = styled.form`
  gap: 6px;
  padding-top: 8px;
  border-top: 1px dashed ${Color.BORDER_GREY};
  ${colFlex()}
`;

const FieldRow = styled.div`
  gap: 6px;
  ${rowFlex({ align: 'center' })}
`;

const Buttons = styled.div`
  gap: 6px;
  margin-left: auto;
  ${rowFlex({ align: 'center' })}
`;

const Input = styled.input`
  height: 32px;
  min-width: 0;
  padding: 0 10px;
  font-size: 13px;
  border: 1px solid ${Color.BORDER_GREY};
  border-radius: 6px;
  background: ${Color.WHITE};
  color: ${Color.BLACK};

  &:focus {
    outline: none;
    border-color: ${Color.KIO_ORANGE};
  }
`;

const AmountInput = styled(Input)`
  width: 120px;
  flex-shrink: 0;
`;

const MemoInput = styled(Input)`
  width: 100%;
  box-sizing: border-box;
`;

const ErrorText = styled.div`
  font-size: 11px;
  color: ${Color.RED};
`;

interface DonationDepositFormProps {
  initialAmount: number | null;
  initialMemo: string;
  onSubmit: (amount: number, memo: string) => Promise<void>;
  onClose: () => void;
}

function DonationDepositForm({ initialAmount, initialMemo, onSubmit, onClose }: DonationDepositFormProps) {
  const [amountInput, setAmountInput] = useState(initialAmount === null ? '' : String(initialAmount));
  const [memoInput, setMemoInput] = useState(initialMemo);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const parsedAmount = Number(amountInput);
  const isAmountValid = Number.isInteger(parsedAmount) && parsedAmount >= MIN_DEPOSIT_AMOUNT;

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!isAmountValid || isSubmitting) return;

    setIsSubmitting(true);
    setErrorMessage('');
    onSubmit(parsedAmount, memoInput)
      .then(onClose)
      .catch(() => {
        setErrorMessage(SAVE_ERROR_MESSAGE);
        setIsSubmitting(false);
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <AmountInput
        type="number"
        inputMode="numeric"
        min={MIN_DEPOSIT_AMOUNT}
        placeholder="입금 금액"
        aria-label="입금 금액"
        value={amountInput}
        onChange={(event) => setAmountInput(event.target.value)}
        autoFocus
      />
      <MemoInput
        type="text"
        maxLength={MEMO_MAX_LENGTH}
        placeholder="메모 (예: 입금자명·시각)"
        aria-label="메모"
        value={memoInput}
        onChange={(event) => setMemoInput(event.target.value)}
      />
      <FieldRow>
        {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
        <Buttons>
          <DonationClickActionButton type="button" onClick={onClose} disabled={isSubmitting}>
            닫기
          </DonationClickActionButton>
          <DonationClickActionButton type="submit" tone="primary" disabled={!isAmountValid || isSubmitting}>
            저장
          </DonationClickActionButton>
        </Buttons>
      </FieldRow>
    </Form>
  );
}

export default DonationDepositForm;
