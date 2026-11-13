import { ReactNode, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { RiArrowLeftLine, RiArrowRightLine } from '@remixicon/react';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { Account, OrderProduct, PaymentMethod } from '@@types/index';
import { getPayButtonCaption, getPayButtonLabel } from '@constants/data/payMethods';
import { getAvailablePayMethods, getDefaultPayMethod, isPayApp } from '@utils/payMethods';
import OrderPayContent from '@components/user/order/pay/OrderPayContent';
import OrderPayFooter from '@components/user/order/pay/OrderPayFooter';
import OrderWaitHeader from '@components/user/order/wait/OrderWaitHeader';
import BankAccountCard from '@components/user/order/wait/BankAccountCard';
import OrderItemsCard from '@components/user/order/wait/OrderItemsCard';
import tossExample from '@resources/image/admin/payPreview/toss.png';
import kakaoPayExample from '@resources/image/admin/payPreview/kakaopay.png';

// 손님 화면(390×844)을 폰 그림 안(207×447)에 줄여 넣는 비율
const SCREEN_WIDTH = 390;
const SCREEN_HEIGHT = 844;
const PHONE_INNER_WIDTH = 207;
const SCALE = PHONE_INNER_WIDTH / SCREEN_WIDTH;
const PHONE_COLUMN_HEIGHT = 501;

const SAMPLE_AMOUNT = 27000;
const SAMPLE_SUMMARY = '닭꼬치 외 2개';
const sampleProduct = (id: number, productName: string, price: number): OrderProduct => ({
  id,
  productId: id,
  productName,
  productPrice: price,
  quantity: 1,
  totalPrice: price,
  isServed: false,
  servedCount: 0,
  createdAt: '',
  updatedAt: '',
});
const SAMPLE_PRODUCTS = [sampleProduct(1, '닭꼬치', 12000), sampleProduct(2, '김치전', 10000), sampleProduct(3, '콜라', 5000)];

const APP_EXAMPLES: Record<PaymentMethod.TOSS | PaymentMethod.KAKAOPAY, string> = {
  [PaymentMethod.TOSS]: tossExample,
  [PaymentMethod.KAKAOPAY]: kakaoPayExample,
};

const Panel = styled.section`
  box-sizing: border-box;
  width: 100%;
  padding: 24px 24px 24px 28px;
  gap: 48px;
  border-radius: 14px;
  background: #f7f7f7;
  ${rowFlex({ justify: 'center', align: 'start' })}
`;

const Column = styled.div`
  position: relative;
  gap: 10px;
  ${colFlex({ align: 'start' })}
`;

const LabelRow = styled.div`
  height: 32px;
  color: #697278;
  font-size: 12px;
  font-weight: 700;
  ${rowFlex({ align: 'center' })}
`;

const Phone = styled.div`
  box-sizing: border-box;
  width: 219px;
  height: 459px;
  padding: 3px;
  border-radius: 28px;
  border: 3px solid #d1d5d8;
  background: #ffffff;
  overflow: hidden;
`;

const PhoneScreen = styled.div`
  width: ${PHONE_INNER_WIDTH}px;
  height: 447px;
  border-radius: 22px;
  overflow: hidden;
`;

const Scaled = styled.div`
  width: ${SCREEN_WIDTH}px;
  height: ${SCREEN_HEIGHT}px;
  transform: scale(${SCALE});
  transform-origin: top left;
  background: #ffffff;
  ${colFlex({ justify: 'space-between' })}
`;

const ScreenTop = styled.div`
  ${colFlex()}
`;

const NavBar = styled.div`
  height: 56px;
  padding: 0 10px;
  gap: 10px;
  border-bottom: 1px solid #f7f7f7;
  ${rowFlex({ align: 'center' })}
`;

const NavTitle = styled.span`
  color: #000000;
  font-size: 20px;
  font-weight: 700;
`;

const NavTable = styled.span`
  color: #000000;
  font-size: 15px;
  font-weight: 700;
`;

const WaitBody = styled.div`
  box-sizing: border-box;
  padding: 20px 20px 0;
  gap: 14px;
  ${colFlex({ align: 'stretch' })}
`;

const Bubble = styled.div`
  position: absolute;
  right: calc(100% + 8px);
  ${rowFlex({ align: 'center' })}
`;

const BubbleBox = styled.span`
  padding: 8px 12px;
  border-radius: 10px;
  background: #ff9142;
  box-shadow: 0 4px 10px rgba(255, 145, 66, 0.25);
  color: #ffffff;
  font-size: 13px;
  font-weight: 700;
  white-space: nowrap;
`;

const BubbleTail = styled.span`
  width: 0;
  height: 0;
  margin-left: -1px;
  border-top: 6px solid transparent;
  border-bottom: 6px solid transparent;
  border-left: 7px solid #ff9142;
`;

const Middle = styled.div`
  height: ${PHONE_COLUMN_HEIGHT}px;
  gap: 6px;
  color: #697278;
  font-size: 12px;
  ${colFlex({ justify: 'center', align: 'center' })}
`;

const RightColumn = styled.div`
  padding-top: 42px;
  gap: 8px;
  ${colFlex({ align: 'center' })}
`;

// 오른쪽 폰 자리. 수단을 바꿔도 판 높이가 그대로여야 운영진 페이지(세로 가운데 정렬)가 위아래로 움직이지 않는다
const OpenedVisual = styled.div`
  width: 220px;
  height: 460px;
  ${rowFlex({ justify: 'center', align: 'start' })}
`;

const ExampleImage = styled.img`
  width: 220px;
  height: 460px;
`;

// hidden은 HTML 속성이라 DOM으로 넘어가 자리까지 없앤다. 자리를 남기려고 따로 이름을 쓴다
const ExampleTag = styled.span<{ isSpaceOnly?: boolean }>`
  visibility: ${({ isSpaceOnly }) => (isSpaceOnly ? 'hidden' : 'visible')};
  padding: 3px 10px;
  border-radius: 10px;
  background: #e8edf2;
  color: #697378;
  font-size: 11px;
  font-weight: 700;
`;

function ScaledPhone({ children }: { children: ReactNode }) {
  return (
    <Phone>
      <PhoneScreen>
        <Scaled>{children}</Scaled>
      </PhoneScreen>
    </Phone>
  );
}

function PreviewNavBar() {
  return (
    <NavBar>
      <RiArrowLeftLine size={20} color="#000000" />
      <NavTitle>우리 주점</NavTitle>
      <NavTable>테이블 3</NavTable>
    </NavBar>
  );
}

interface PayPreviewPanelProps {
  account: Account | null;
}

// 계좌 관리 화면 아래 판: 왼쪽 손님 결제 화면(송금 방법을 누르면 고름) → 오른쪽에 그 방법으로 열리는 화면
function PayPreviewPanel({ account }: PayPreviewPanelProps) {
  const methods = getAvailablePayMethods(account);
  const [selected, setSelected] = useState<PaymentMethod | null>(getDefaultPayMethod(methods));
  const methodsKey = methods.join(',');

  // 운영진이 송금 방법을 켜고 끄면 고른 방법을 다시 맞춘다
  useEffect(() => {
    setSelected((current) => (current && methods.includes(current) ? current : getDefaultPayMethod(methods)));
  }, [methodsKey]);

  // 송금 방법 카드 가운데(줄이기 전 화면 기준 y≈248)를 말풍선이 가리킨다
  const bubbleTop = 42 + 6 + Math.round(248 * SCALE) - 16;

  const openedScreen = (() => {
    if (!selected || !account) return null;
    if (isPayApp(selected)) {
      return (
        <RightColumn>
          <OpenedVisual>
            <ExampleImage src={APP_EXAMPLES[selected]} alt={`${selected === PaymentMethod.TOSS ? '토스' : '카카오페이'} 송금 화면 예시`} />
          </OpenedVisual>
          <ExampleTag>예시 화면</ExampleTag>
        </RightColumn>
      );
    }
    return (
      <RightColumn>
        <OpenedVisual>
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
        </OpenedVisual>
        {/* 우리 화면이라 '예시 화면' 이름표는 안 보이게 두되 자리는 같게 차지한다 */}
        <ExampleTag isSpaceOnly aria-hidden="true">
          예시 화면
        </ExampleTag>
      </RightColumn>
    );
  })();

  return (
    <Panel aria-label="손님에게 보이는 화면">
      <Column>
        <LabelRow>손님 결제 화면</LabelRow>
        <ScaledPhone>
          <ScreenTop>
            <PreviewNavBar />
            <OrderPayContent totalAmount={SAMPLE_AMOUNT} summaryText={SAMPLE_SUMMARY} methods={methods} selected={selected} onSelect={setSelected} isPreview />
          </ScreenTop>
          <OrderPayFooter fixed={false} label={getPayButtonLabel(selected, SAMPLE_AMOUNT)} caption={getPayButtonCaption(selected)} disabled={!selected} />
        </ScaledPhone>
        {methods.length > 1 && (
          <Bubble style={{ top: bubbleTop }}>
            <BubbleBox>눌러서 바꿔 보세요</BubbleBox>
            <BubbleTail />
          </Bubble>
        )}
      </Column>
      {openedScreen && (
        <>
          <Middle>
            누르면 열려요
            <RiArrowRightLine size={22} color="#9aa1a6" />
          </Middle>
          {openedScreen}
        </>
      )}
    </Panel>
  );
}

export default PayPreviewPanel;
