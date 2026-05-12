import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { MIN_AMOUNT } from './donationConstants';

const Button = styled.button<{ disabled: boolean }>`
  width: 100%;
  padding: 12px;
  background: ${({ disabled }) => (disabled ? Color.LIGHT_GREY : Color.KIO_ORANGE)};
  color: ${({ disabled }) => (disabled ? Color.GREY : Color.WHITE)};
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 700;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  transition: background 120ms ease;

  &:hover:not(:disabled) {
    background: ${Color.KIO_ORANGE_DARK};
  }
`;

interface DonateCtaProps {
  amount: number;
  onClick: () => void;
}

function DonateCta({ amount, onClick }: DonateCtaProps) {
  const disabled = amount < MIN_AMOUNT;
  const label = disabled ? `${MIN_AMOUNT.toLocaleString()}원 이상 입력해주세요` : `${amount.toLocaleString()}원 보내기 →`;

  return (
    <Button disabled={disabled} onClick={onClick} type="button">
      {label}
    </Button>
  );
}

export default DonateCta;
