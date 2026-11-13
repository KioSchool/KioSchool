import styled from '@emotion/styled';
import { match } from 'ts-pattern';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { Account, PaymentMethod } from '@@types/index';
import { PAY_METHOD_STYLE } from '@constants/data/payMethods';
import { isPayApp } from '@utils/payMethods';
import OrderWaitHeader from '@components/user/order/wait/OrderWaitHeader';
import BankAccountCard from '@components/user/order/wait/BankAccountCard';
import OrderItemsCard from '@components/user/order/wait/OrderItemsCard';
import tossExample from '@resources/image/admin/payPreview/toss.png';
import kakaoPayExample from '@resources/image/admin/payPreview/kakaopay.png';
import ScaledPhone from './ScaledPhone';
import PreviewNavBar from './PreviewNavBar';
import { LABEL_ROW_HEIGHT, COLUMN_GAP, SAMPLE_AMOUNT, SAMPLE_PRODUCTS } from './previewConstants';

const APP_EXAMPLES: Record<PaymentMethod.TOSS | PaymentMethod.KAKAOPAY, string> = {
  [PaymentMethod.TOSS]: tossExample,
  [PaymentMethod.KAKAOPAY]: kakaoPayExample,
};

const getTagVisibility = (isSpaceOnly: boolean) =>
  match(isSpaceOnly)
    .with(true, () => 'hidden')
    .otherwise(() => 'visible');

const RightColumn = styled.div`
  padding-top: ${LABEL_ROW_HEIGHT + COLUMN_GAP}px;
  gap: 8px;
  ${colFlex({ align: 'center' })}
`;

// 고른 수단마다 높이가 다르면 세로 가운데 정렬된 운영진 페이지 전체가 위아래로 움직인다
const OpenedVisual = styled.div`
  width: 220px;
  height: 460px;
  ${rowFlex({ justify: 'center', align: 'start' })}
`;

const ExampleImage = styled.img`
  width: 220px;
  height: 460px;
`;

const ExampleTag = styled.span<{ isSpaceOnly?: boolean }>`
  visibility: ${({ isSpaceOnly }) => getTagVisibility(Boolean(isSpaceOnly))};
  padding: 3px 10px;
  border-radius: 10px;
  background: #e8edf2;
  color: #697378;
  font-size: 11px;
  font-weight: 700;
`;

const ScreenTop = styled.div`
  ${colFlex()}
`;

const WaitBody = styled.div`
  box-sizing: border-box;
  padding: 20px 20px 0;
  gap: 14px;
  ${colFlex({ align: 'stretch' })}
`;

interface PreviewOpenedScreenProps {
  method: PaymentMethod;
  account: Account;
}

function PreviewOpenedScreen({ method, account }: PreviewOpenedScreenProps) {
  return (
    <RightColumn>
      <OpenedVisual>
        {isPayApp(method) && <ExampleImage src={APP_EXAMPLES[method]} alt={`${PAY_METHOD_STYLE[method].label} 송금 화면 예시`} />}
        {!isPayApp(method) && (
          <ScaledPhone>
            <ScreenTop>
              <PreviewNavBar />
              <WaitBody>
                <OrderWaitHeader method={PaymentMethod.BANK_TRANSFER} amount={SAMPLE_AMOUNT} />
                <BankAccountCard account={account} />
                <OrderItemsCard orderProducts={SAMPLE_PRODUCTS} totalPrice={SAMPLE_AMOUNT} />
              </WaitBody>
            </ScreenTop>
          </ScaledPhone>
        )}
      </OpenedVisual>
      <ExampleTag isSpaceOnly={!isPayApp(method)} aria-hidden={!isPayApp(method)}>
        예시 화면
      </ExampleTag>
    </RightColumn>
  );
}

export default PreviewOpenedScreen;
