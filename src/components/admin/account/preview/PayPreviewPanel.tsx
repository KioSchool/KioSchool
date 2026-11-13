import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { RiArrowRightLine } from '@remixicon/react';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { Color } from '@resources/colors';
import { Account, PaymentMethod } from '@@types/index';
import { getPayButtonCaption, getPayButtonLabel } from '@constants/data/payMethods';
import { getAvailablePayMethods, getDefaultPayMethod } from '@utils/payMethods';
import OrderPayContent from '@components/user/order/pay/OrderPayContent';
import OrderPayFooter from '@components/user/order/pay/OrderPayFooter';
import ScaledPhone from './ScaledPhone';
import PreviewNavBar from './PreviewNavBar';
import PreviewOpenedScreen from './PreviewOpenedScreen';
import { BUBBLE_TOP, LABEL_ROW_HEIGHT, PHONE_COLUMN_HEIGHT, SAMPLE_AMOUNT, SAMPLE_SUMMARY } from './previewConstants';

const Panel = styled.section`
  box-sizing: border-box;
  width: 100%;
  padding: 24px 24px 24px 28px;
  gap: 48px;
  border-radius: 14px;
  background: ${Color.LIGHT_GREY};
  ${rowFlex({ justify: 'center', align: 'start' })}
`;

const Column = styled.div`
  position: relative;
  gap: 10px;
  ${colFlex({ align: 'start' })}
`;

const LabelRow = styled.div`
  height: ${LABEL_ROW_HEIGHT}px;
  color: #697278;
  font-size: 12px;
  font-weight: 700;
  ${rowFlex({ align: 'center' })}
`;

const ScreenTop = styled.div`
  ${colFlex()}
`;

const Bubble = styled.div`
  position: absolute;
  top: ${BUBBLE_TOP}px;
  right: calc(100% + 8px);
  ${rowFlex({ align: 'center' })}
`;

const BubbleBox = styled.span`
  padding: 8px 12px;
  border-radius: 10px;
  background: ${Color.KIO_ORANGE};
  box-shadow: 0 4px 10px rgba(255, 145, 66, 0.25);
  color: ${Color.WHITE};
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
  border-left: 7px solid ${Color.KIO_ORANGE};
`;

const Middle = styled.div`
  height: ${PHONE_COLUMN_HEIGHT}px;
  gap: 6px;
  color: #697278;
  font-size: 12px;
  ${colFlex({ justify: 'center', align: 'center' })}
`;

const keepOrDefault = (current: PaymentMethod | null, methods: PaymentMethod[]) => {
  if (current && methods.includes(current)) return current;
  return getDefaultPayMethod(methods);
};

interface PayPreviewPanelProps {
  account: Account | null;
}

function PayPreviewPanel({ account }: PayPreviewPanelProps) {
  const methods = getAvailablePayMethods(account);
  const [selected, setSelected] = useState<PaymentMethod | null>(getDefaultPayMethod(methods));
  const methodsKey = methods.join(',');
  const hasChoice = methods.length > 1;

  useEffect(() => {
    setSelected((current) => keepOrDefault(current, methods));
  }, [methodsKey]);

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
        {hasChoice && (
          <Bubble>
            <BubbleBox>눌러서 바꿔 보세요</BubbleBox>
            <BubbleTail />
          </Bubble>
        )}
      </Column>
      {selected && account && (
        <Middle>
          누르면 열려요
          <RiArrowRightLine size={22} color="#9aa1a6" />
        </Middle>
      )}
      {selected && account && <PreviewOpenedScreen method={selected} account={account} />}
    </Panel>
  );
}

export default PayPreviewPanel;
