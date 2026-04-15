import styled from '@emotion/styled';
import { match } from 'ts-pattern';
import { rowFlex } from '@styles/flexStyles';
import { mobileMediaQuery } from '@styles/globalStyles';
import { Color } from '@resources/colors';
import autoSettlementImage from '@resources/image/hero/auto-settlement.webp';
import phoneImage from '@resources/image/hero/phone.webp';
import qrCodeImage from '@resources/image/hero/qr-code.webp';
import realtimeOrderImage from '@resources/image/hero/realtime-order.webp';
import tableManagementImage from '@resources/image/hero/table-management.webp';

const SinglePreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const QrFlow = styled.div`
  width: 100%;
  height: 100%;
  padding: 12px;
  box-sizing: border-box;
  gap: 16px;
  ${rowFlex({ justify: 'center', align: 'center' })};

  ${mobileMediaQuery} {
    padding: 10px;
    gap: 12px;
  }
`;

const PhoneFlowImage = styled.img`
  height: 100%;
  width: auto;
  object-fit: contain;
`;

const QrFlowImage = styled.img`
  height: 65%;
  width: auto;
  object-fit: contain;
`;

const ArrowIcon = styled.svg`
  width: 24px;
  height: 24px;
  flex-shrink: 0;

  ${mobileMediaQuery} {
    width: 20px;
    height: 20px;
  }
`;

interface FeatureVisualContentProps {
  number: string;
  title: string;
}

function FeatureVisualContent({ number, title }: FeatureVisualContentProps) {
  return match(number)
    .with('01', () => (
      <QrFlow>
        <QrFlowImage src={qrCodeImage} alt="QR 코드" />
        <ArrowIcon viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M5 12h14M13 6l6 6-6 6" stroke={Color.KIO_ORANGE} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
        </ArrowIcon>
        <PhoneFlowImage src={phoneImage} alt="QR 주문 화면" />
      </QrFlow>
    ))
    .with('02', () => <SinglePreviewImage src={realtimeOrderImage} alt={title} />)
    .with('03', () => <SinglePreviewImage src={autoSettlementImage} alt={title} />)
    .otherwise(() => <SinglePreviewImage src={tableManagementImage} alt={title} />);
}

export default FeatureVisualContent;
