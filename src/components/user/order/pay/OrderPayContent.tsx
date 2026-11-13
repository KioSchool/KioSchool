import { RefObject } from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { RiArrowRightSLine } from '@remixicon/react';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { PaymentMethod } from '@@types/index';
import { NO_ACCOUNT_MESSAGE } from '@constants/data/payMethods';
import { USER_ROUTES } from '@constants/routes';
import { isPayApp } from '@utils/payMethods';
import PayMethodCard from './PayMethodCard';
import BankTransferRow from './BankTransferRow';

const Body = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding: 20px 20px 0;
  gap: 28px;
  ${colFlex({ align: 'stretch' })}
`;

const Amount = styled.div`
  gap: 2px;
  ${colFlex({ align: 'start' })}
`;

const Caption = styled.span`
  color: #697278;
  font-size: 13px;
  line-height: 1.45;
`;

const AmountValue = styled.strong`
  color: #25282b;
  font-size: 28px;
  font-weight: 700;
  line-height: 1.45;
`;

const Summary = styled.button`
  margin: 0;
  padding: 0;
  gap: 4px;
  border: none;
  background: none;
  font: inherit;
  cursor: pointer;
  ${rowFlex({ align: 'center' })}
`;

const Section = styled.div`
  gap: 10px;
  ${colFlex({ align: 'stretch' })}
`;

const SectionTitle = styled.span`
  color: #25282b;
  font-size: 15px;
  font-weight: 700;
  line-height: 1.45;
`;

const Apps = styled.div`
  gap: 10px;
  ${rowFlex({ align: 'stretch' })}
`;

const Empty = styled.div`
  height: 102px;
  border-radius: 10px;
  background: #f7f7f7;
  color: #697278;
  font-size: 13px;
  ${rowFlex({ justify: 'center', align: 'center' })}
`;

const Placeholder = styled.div`
  height: 102px;
`;

const NameInput = styled.input`
  box-sizing: border-box;
  width: 100%;
  height: 48px;
  padding: 0 14px;
  border-radius: 10px;
  border: 1px solid #e8eef2;
  color: #25282b;
  font-size: 15px;
  outline: none;

  &::placeholder {
    color: #a3abb0;
  }

  &:focus {
    border-color: #ff9142;
  }
`;

const NameCaption = styled.div`
  margin-top: -2px;
  ${rowFlex({ justify: 'space-between', align: 'start' })}
`;

const Hint = styled.span`
  color: #697278;
  font-size: 12px;
  line-height: 1.45;
`;

const PrivacyLink = styled(Link)`
  color: #9aa1a6;
  font-size: 12px;
  line-height: 1.45;
  text-decoration: underline;
`;

export interface OrderPayContentProps {
  totalAmount: number;
  // '닭꼬치 외 2개'
  summaryText: string;
  methods: PaymentMethod[];
  selected: PaymentMethod | null;
  onSelect: (method: PaymentMethod) => void;
  // 계좌 정보를 불러오는 동안은 빈 자리만 둔다(계좌 없음 안내가 잠깐 보이지 않게)
  isLoading?: boolean;
  customerNameRef?: RefObject<HTMLInputElement>;
  onSummaryClick?: () => void;
  // 운영진 미리보기에서는 입력·링크를 막는다
  isPreview?: boolean;
}

// 손님 결제 화면 본문. 상태를 갖지 않아 운영진 계좌 화면 미리보기에서도 같은 화면을 그린다.
function OrderPayContent({
  totalAmount,
  summaryText,
  methods,
  selected,
  onSelect,
  isLoading = false,
  customerNameRef,
  onSummaryClick,
  isPreview = false,
}: OrderPayContentProps) {
  const apps = methods.filter(isPayApp);
  const hasBankTransfer = methods.includes(PaymentMethod.BANK_TRANSFER);
  const layout = apps.length > 1 ? 'tile' : 'wide';

  const methodList = (() => {
    if (isLoading) return <Placeholder />;
    if (methods.length === 0) return <Empty>{NO_ACCOUNT_MESSAGE}</Empty>;
    return (
      <>
        {apps.length > 0 && (
          <Apps role="radiogroup" aria-label="송금 방법">
            {apps.map((method) => (
              <PayMethodCard key={method} method={method} layout={layout} selected={selected === method} onSelect={onSelect} />
            ))}
          </Apps>
        )}
        {hasBankTransfer && <BankTransferRow selected={selected === PaymentMethod.BANK_TRANSFER} onSelect={onSelect} />}
      </>
    );
  })();

  return (
    <Body>
      <Amount>
        <Caption>보낼 금액</Caption>
        <AmountValue>{totalAmount.toLocaleString()}원</AmountValue>
        <Summary type="button" onClick={onSummaryClick} tabIndex={isPreview ? -1 : undefined}>
          <Caption>{summaryText}</Caption>
          <RiArrowRightSLine size={14} color="#9aa1a6" />
        </Summary>
      </Amount>
      <Section>
        <SectionTitle>송금 방법</SectionTitle>
        {methodList}
      </Section>
      <Section>
        <SectionTitle>송금자명</SectionTitle>
        <NameInput ref={customerNameRef} placeholder="예: 홍길동" readOnly={isPreview} tabIndex={isPreview ? -1 : undefined} />
        <NameCaption>
          <Hint>실제로 보내는 분 이름을 적어 주세요</Hint>
          <PrivacyLink to={USER_ROUTES.PRIVACY} target="_blank" rel="noopener noreferrer" tabIndex={isPreview ? -1 : undefined}>
            개인정보처리방침
          </PrivacyLink>
        </NameCaption>
      </Section>
    </Body>
  );
}

export default OrderPayContent;
