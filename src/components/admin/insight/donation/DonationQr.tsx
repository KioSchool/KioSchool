import styled from '@emotion/styled';
import { QRCodeSVG } from 'qrcode.react';
import { Color } from '@resources/colors';
import { colFlex } from '@styles/flexStyles';
import { buildDonationTossUrl, CUSTOM_AMOUNT_SENTINEL, MIN_AMOUNT } from './donationConstants';

const Container = styled.div`
  width: 100%;
  min-width: 0;
  box-sizing: border-box;
  padding: 14px;
  background: ${Color.WHITE};
  border: 1px solid ${Color.HEAVY_GREY};
  border-radius: 10px;
  gap: 10px;
  ${colFlex({ justify: 'start', align: 'center' })};
`;

const AmountLine = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: ${Color.BLACK};
`;

const QrFrame = styled.div`
  padding: 8px;
  background: ${Color.WHITE};
  border-radius: 8px;
  border: 1px solid ${Color.KIO_ORANGE_FAINT};
`;

const Placeholder = styled.div`
  width: 150px;
  height: 150px;
  background: ${Color.LIGHT_GREY};
  border-radius: 8px;
  color: ${Color.GREY};
  font-size: 12px;
  text-align: center;
  padding: 0 12px;
  ${colFlex({ justify: 'center', align: 'center' })};
`;

const Guide = styled.div`
  font-size: 12px;
  color: ${Color.GREY};
  text-align: center;
  line-height: 1.4;
`;

interface DonationQrProps {
  amount: number;
}

function DonationQr({ amount }: DonationQrProps) {
  const isCustomMode = amount === CUSTOM_AMOUNT_SENTINEL;
  const isAmountValid = isCustomMode || amount >= MIN_AMOUNT;
  const qrValue = isAmountValid ? buildDonationTossUrl(isCustomMode ? undefined : amount) : '';

  const amountLabel = isCustomMode ? '원하는 금액으로 보내기' : `${amount.toLocaleString()}원 보내기`;

  return (
    <Container>
      <AmountLine>{amountLabel}</AmountLine>
      {isAmountValid ? (
        <QrFrame>
          <QRCodeSVG value={qrValue} size={150} level="M" bgColor="#ffffff" fgColor="#000000" />
        </QrFrame>
      ) : (
        <Placeholder>{MIN_AMOUNT.toLocaleString()}원 이상 금액을 선택해주세요.</Placeholder>
      )}
      <Guide>휴대폰 카메라로 QR을 스캔하면 토스 앱이 열립니다.</Guide>
    </Container>
  );
}

export default DonationQr;
