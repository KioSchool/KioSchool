import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import {
  CUSTOM_MAIN_ILLUSTRATION,
  MIN_AMOUNT,
  OVERFLOW_COPY,
  OVERFLOW_ILLUSTRATION,
  OVERFLOW_THRESHOLD,
  UNDERFLOW_COPY,
  UNDERFLOW_ILLUSTRATION,
  UNDERFLOW_THRESHOLD,
} from './donationConstants';

const Container = styled.div`
  width: 100%;
  gap: 8px;
  ${colFlex({ justify: 'start', align: 'stretch' })};
`;

const ToggleHeader = styled.button<{ expanded: boolean }>`
  width: 100%;
  padding: 8px 0;
  background: transparent;
  border: none;
  font-size: 13px;
  font-weight: 600;
  color: ${({ expanded }) => (expanded ? Color.KIO_ORANGE_DARK : Color.GREY)};
  cursor: pointer;
  text-align: left;
`;

const Panel = styled.div`
  width: 100%;
  padding: 12px;
  background: ${Color.KIO_ORANGE_FAINT};
  border-radius: 8px;
  gap: 10px;
  ${colFlex({ justify: 'start', align: 'stretch' })};
`;

const MainIllustrationRow = styled.div`
  gap: 10px;
  ${rowFlex({ justify: 'start', align: 'center' })};
`;

const MainIllustration = styled.img`
  width: 72px;
  height: 72px;
  object-fit: contain;
  flex-shrink: 0;
`;

const InputRow = styled.div`
  flex: 1;
  gap: 6px;
  ${rowFlex({ justify: 'start', align: 'center' })};
`;

const AmountInput = styled.input`
  flex: 1;
  padding: 8px 10px;
  border: 1px solid ${Color.HEAVY_GREY};
  border-radius: 6px;
  font-size: 14px;
  background: ${Color.WHITE};

  &:focus {
    outline: none;
    border-color: ${Color.KIO_ORANGE};
  }
`;

const Unit = styled.span`
  color: ${Color.GREY};
  font-size: 12px;
`;

const HelperRow = styled.div`
  gap: 8px;
  padding-top: 8px;
  border-top: 1px dashed ${Color.HEAVY_GREY};
  ${rowFlex({ justify: 'start', align: 'center' })};
`;

const HelperIllustration = styled.img`
  width: 56px;
  height: 56px;
  object-fit: contain;
  flex-shrink: 0;
`;

const HelperCopy = styled.div`
  font-size: 12px;
  color: ${Color.BLACK};
  font-weight: 500;
  line-height: 1.4;
`;

interface CustomAmountInputProps {
  expanded: boolean;
  customInput: string;
  amount: number;
  onToggle: () => void;
  onCustomChange: (raw: string) => void;
}

function CustomAmountInput({ expanded, customInput, amount, onToggle, onCustomChange }: CustomAmountInputProps) {
  const showUnderflow = amount > 0 && amount <= UNDERFLOW_THRESHOLD;
  const showOverflow = amount >= OVERFLOW_THRESHOLD;

  return (
    <Container>
      <ToggleHeader expanded={expanded} onClick={onToggle} type="button">
        {expanded ? '원하는 만큼 직접 보내기 ▴' : '원하는 만큼 직접 보내기 ▾'}
      </ToggleHeader>
      {expanded && (
        <Panel>
          <MainIllustrationRow>
            <MainIllustration src={CUSTOM_MAIN_ILLUSTRATION} alt="I 캐릭터가 빈 깃발에 숫자를 적는 모습" />
            <InputRow>
              <AmountInput type="number" min={MIN_AMOUNT} value={customInput} placeholder="원하는 금액" onChange={(e) => onCustomChange(e.target.value)} />
              <Unit>원</Unit>
            </InputRow>
          </MainIllustrationRow>
          {showUnderflow && (
            <HelperRow>
              <HelperIllustration src={UNDERFLOW_ILLUSTRATION} alt="K 캐릭터가 종이컵을 받는 모습" />
              <HelperCopy>{UNDERFLOW_COPY}</HelperCopy>
            </HelperRow>
          )}
          {showOverflow && (
            <HelperRow>
              <HelperIllustration src={OVERFLOW_ILLUSTRATION} alt="K, I, O 세 캐릭터가 함께 환호하는 모습" />
              <HelperCopy>{OVERFLOW_COPY}</HelperCopy>
            </HelperRow>
          )}
        </Panel>
      )}
    </Container>
  );
}

export default CustomAmountInput;
