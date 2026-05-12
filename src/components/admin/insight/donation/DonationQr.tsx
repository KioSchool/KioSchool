import styled from '@emotion/styled';
import { QRCodeSVG } from 'qrcode.react';
import { Color } from '@resources/colors';
import { colFlex } from '@styles/flexStyles';
import { MIN_AMOUNT } from './donationConstants';

const Container = styled.div`
  width: 100%;
  padding: 16px;
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
  width: 200px;
  height: 200px;
  background: ${Color.LIGHT_GREY};
  border-radius: 8px;
  color: ${Color.GREY};
  font-size: 13px;
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
  tossAccountUrl: string | undefined;
  amount: number;
}

function DonationQr({ tossAccountUrl, amount }: DonationQrProps) {
  const isAmountValid = amount >= MIN_AMOUNT;
  const isReady = !!tossAccountUrl && isAmountValid;
  const qrValue = isReady ? `${tossAccountUrl}&amount=${amount}` : '';

  const placeholderText = (() => {
    if (!tossAccountUrl) return '도네이션 정보가 설정되지 않았습니다.\n운영팀에 문의해주세요.';
    return `${MIN_AMOUNT.toLocaleString()}원 이상 금액을 선택해주세요.`;
  })();

  return (
    <Container>
      <AmountLine>{amount.toLocaleString()}원 보내기</AmountLine>
      {isReady ? (
        <QrFrame>
          <QRCodeSVG value={qrValue} size={200} level="M" bgColor="#ffffff" fgColor="#000000" />
        </QrFrame>
      ) : (
        <Placeholder>{placeholderText}</Placeholder>
      )}
      <Guide>휴대폰 카메라로 QR을 스캔하면 토스로 바로 송금돼요.</Guide>
    </Container>
  );
}

export default DonationQr;
