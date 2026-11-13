import { RefObject } from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { match } from 'ts-pattern';
import { Color } from '@resources/colors';
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
  color: ${Color.TEXT_STRONG};
  font-size: 28px;
  font-weight: 700;
  line-height: 1.45;
`;

const Section = styled.div`
  gap: 10px;
  ${colFlex({ align: 'stretch' })}
`;

const SectionTitle = styled.span`
  color: ${Color.TEXT_STRONG};
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
  background: ${Color.LIGHT_GREY};
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
  border: 1px solid ${Color.BORDER_GREY};
  color: ${Color.TEXT_STRONG};
  font-size: 15px;
  outline: none;

  &::placeholder {
    color: #a3abb0;
  }

  &:focus {
    border-color: ${Color.KIO_ORANGE};
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
  summaryText: string;
  methods: PaymentMethod[];
  selected: PaymentMethod | null;
  onSelect: (method: PaymentMethod) => void;
  // 불러오는 동안 '계좌 없음' 안내가 잠깐 보이지 않게 빈 자리만 둔다
  isLoading?: boolean;
  customerNameRef?: RefObject<HTMLInputElement>;
  isPreview?: boolean;
}

const getPreviewTabIndex = (isPreview: boolean) =>
  match(isPreview)
    .with(true, () => -1)
    .otherwise(() => undefined);

function OrderPayContent({
  totalAmount,
  summaryText,
  methods,
  selected,
  onSelect,
  isLoading = false,
  customerNameRef,
  isPreview = false,
}: OrderPayContentProps) {
  const apps = methods.filter(isPayApp);
  const hasBankTransfer = methods.includes(PaymentMethod.BANK_TRANSFER);
  const layout = match(apps.length)
    .with(1, () => 'wide' as const)
    .otherwise(() => 'tile' as const);
  const tabIndex = getPreviewTabIndex(isPreview);
  const isEmpty = !isLoading && methods.length === 0;

  return (
    <Body>
      <Amount>
        <Caption>보낼 금액</Caption>
        <AmountValue>{totalAmount.toLocaleString()}원</AmountValue>
        <Caption>{summaryText}</Caption>
      </Amount>
      <Section>
        <SectionTitle>송금 방법</SectionTitle>
        {isLoading && <Placeholder />}
        {isEmpty && <Empty>{NO_ACCOUNT_MESSAGE}</Empty>}
        {!isLoading && apps.length > 0 && (
          <Apps role="radiogroup" aria-label="송금 방법">
            {apps.map((method) => (
              <PayMethodCard key={method} method={method} layout={layout} selected={selected === method} onSelect={onSelect} />
            ))}
          </Apps>
        )}
        {!isLoading && hasBankTransfer && <BankTransferRow selected={selected === PaymentMethod.BANK_TRANSFER} onSelect={onSelect} />}
      </Section>
      <Section>
        <SectionTitle>송금자명</SectionTitle>
        <NameInput ref={customerNameRef} placeholder="예: 홍길동" readOnly={isPreview} tabIndex={tabIndex} />
        <NameCaption>
          <Hint>실제로 보내는 분 이름을 적어 주세요</Hint>
          <PrivacyLink to={USER_ROUTES.PRIVACY} target="_blank" rel="noopener noreferrer" tabIndex={tabIndex}>
            개인정보처리방침
          </PrivacyLink>
        </NameCaption>
      </Section>
    </Body>
  );
}

export default OrderPayContent;
