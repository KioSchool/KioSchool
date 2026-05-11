import { useRef, useState } from 'react';
import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import useTossPopup from '@hooks/user/useTossPopup';

const Section = styled.div`
  width: 100%;
  padding-top: 12px;
  border-top: 1px dashed ${Color.GREY};
  gap: 8px;
  ${colFlex({ justify: 'start', align: 'stretch' })};
`;

const Label = styled.div`
  font-size: 13px;
  color: ${Color.BLACK};
  font-weight: 600;
`;

const HelperText = styled.div`
  font-size: 11px;
  color: ${Color.GREY};
  line-height: 1.4;
`;

const InputRow = styled.div`
  gap: 6px;
  ${rowFlex({ justify: 'start', align: 'center' })};
`;

const AmountInput = styled.input`
  flex: 1;
  padding: 8px;
  border: 1px solid ${Color.GREY};
  border-radius: 4px;
  font-size: 13px;
`;

const Unit = styled.span`
  color: ${Color.GREY};
  font-size: 12px;
`;

const DonateButton = styled.button<{ disabled: boolean }>`
  width: 100%;
  padding: 10px;
  background: ${(p) => (p.disabled ? Color.LIGHT_GREY : '#10b981')};
  color: ${(p) => (p.disabled ? Color.GREY : '#fff')};
  border: none;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
  cursor: ${(p) => (p.disabled ? 'not-allowed' : 'pointer')};
`;

const MIN_AMOUNT = 1000;

function DonationSection() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [amount, setAmount] = useState<number>(0);
  const { openTossPopupSync } = useTossPopup();

  const tossUrl = import.meta.env.VITE_KIO_DONATION_TOSS_URL as string | undefined;

  const onClick = () => {
    if (!tossUrl) {
      alert('도네이션 정보가 설정되지 않았습니다. 운영팀에 문의해주세요.');
      return;
    }
    if (amount < MIN_AMOUNT) {
      alert(`${MIN_AMOUNT.toLocaleString()}원 이상 입력해주세요.`);
      return;
    }
    openTossPopupSync({ tossAccountUrl: tossUrl, amount, closeDelay: 5000 });
  };

  return (
    <Section>
      <Label>☕ KioSchool 개발팀에게 응원하기</Label>
      <HelperText>KioSchool은 무료로 운영돼요. 도움 되셨다면 한 잔 사주세요!</HelperText>
      <InputRow>
        <AmountInput
          ref={inputRef}
          type="number"
          min={MIN_AMOUNT}
          placeholder="금액 입력 (예: 5000)"
          onChange={(e) => setAmount(parseInt(e.target.value || '0', 10))}
        />
        <Unit>원</Unit>
      </InputRow>
      <DonateButton disabled={amount < MIN_AMOUNT} onClick={onClick}>
        토스로 응원하기 →
      </DonateButton>
      <HelperText>송금자명에 닉네임이나 주점명을 적어주시면 운영팀이 확인하기 쉬워요.</HelperText>
    </Section>
  );
}

export default DonationSection;
