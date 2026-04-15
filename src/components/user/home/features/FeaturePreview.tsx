import styled from '@emotion/styled';
import { match } from 'ts-pattern';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { mobileMediaQuery } from '@styles/globalStyles';
import { Color } from '@resources/colors';
import autoSettlementImage from '@resources/image/hero/auto-settlement.webp';
import phoneImage from '@resources/image/hero/phone.webp';
import qrCodeImage from '@resources/image/hero/qr-code.webp';
import realtimeOrderImage from '@resources/image/hero/realtime-order.webp';
import tableManagementImage from '@resources/image/hero/table-management.webp';
import { FeatureIconType } from './FeatureIcon';

const PreviewContainer = styled.div`
  width: 100%;
  height: 240px;
  margin-top: 20px;
  ${colFlex({ justify: 'center', align: 'center' })};

  ${mobileMediaQuery} {
    height: 180px;
  }
`;

const SinglePreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
`;

const QrFlow = styled.div`
  width: 100%;
  height: 100%;
  gap: 24px;
  ${rowFlex({ justify: 'center', align: 'center' })};

  ${mobileMediaQuery} {
    gap: 16px;
  }
`;

const PhoneFlowImage = styled.img`
  height: 100%;
  width: auto;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
`;

const QrFlowImage = styled.img`
  height: 65%;
  width: auto;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
`;

const ArrowIcon = styled.svg`
  width: 32px;
  height: 32px;
  flex-shrink: 0;

  ${mobileMediaQuery} {
    width: 24px;
    height: 24px;
  }
`;

interface FeaturePreviewProps {
  iconType: FeatureIconType;
  label: string;
}

function FeaturePreview({ iconType, label }: FeaturePreviewProps) {
  return (
    <PreviewContainer>
      {match(iconType)
        .with('qr', () => (
          <QrFlow>
            <QrFlowImage src={qrCodeImage} alt="QR 코드" />
            <ArrowIcon viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" stroke={Color.KIO_ORANGE} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
            </ArrowIcon>
            <PhoneFlowImage src={phoneImage} alt="QR 주문 화면" />
          </QrFlow>
        ))
        .with('realtime', () => <SinglePreviewImage src={realtimeOrderImage} alt={label} />)
        .with('settlement', () => <SinglePreviewImage src={autoSettlementImage} alt={label} />)
        .with('table', () => <SinglePreviewImage src={tableManagementImage} alt={label} />)
        .exhaustive()}
    </PreviewContainer>
  );
}

export default FeaturePreview;
