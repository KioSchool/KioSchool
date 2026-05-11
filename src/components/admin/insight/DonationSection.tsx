import { useEffect } from 'react';
import styled from '@emotion/styled';
import { QRCodeSVG } from 'qrcode.react';
import { RiCupLine, RiQrScan2Line } from '@remixicon/react';
import * as Sentry from '@sentry/react';
import { rowFlex, colFlex } from '@styles/flexStyles';
import { InsightDesignTokens } from './insightDesignTokens';

const Section = styled.div`
  width: 100%;
  padding-top: 14px;
  border-top: 1px dashed ${InsightDesignTokens.brand.iconBg};
  gap: 8px;
  ${colFlex({ justify: 'start', align: 'stretch' })};
`;

const Header = styled.div`
  font-size: 12px;
  color: ${InsightDesignTokens.text.primary};
  font-weight: 600;
  gap: 6px;
  ${rowFlex({ align: 'center' })};
`;

const HelperText = styled.div`
  font-size: 10px;
  color: ${InsightDesignTokens.text.muted};
  line-height: 1.6;
`;

const QrRow = styled.div`
  gap: 12px;
  align-items: center;
  ${rowFlex({ align: 'center' })};
`;

const QrBox = styled.div`
  background: #fff;
  border: 1px solid ${InsightDesignTokens.card.border};
  border-radius: 8px;
  padding: 6px;
  flex-shrink: 0;
  width: 108px;
  height: 108px;
  ${rowFlex({ justify: 'center', align: 'center' })};
`;

const QrCaption = styled.div`
  flex: 1;
  font-size: 11px;
  line-height: 1.6;
  color: ${InsightDesignTokens.text.primary};
  gap: 4px;
  ${colFlex({ align: 'start' })};
`;

const ScanHint = styled.div`
  gap: 4px;
  ${rowFlex({ align: 'center' })};
  color: ${InsightDesignTokens.brand.main};
  font-weight: 600;
`;

const Subtle = styled.div`
  color: ${InsightDesignTokens.text.muted};
`;

const PREFILL_AMOUNT = 50000;

function buildTossUrlWithAmount(baseUrl: string, amount: number): string {
  if (!baseUrl) return '';
  const separator = baseUrl.includes('?') ? '&' : '?';
  return `${baseUrl}${separator}amount=${amount}`;
}

function DonationSection() {
  const baseUrl = (import.meta.env.VITE_KIO_DONATION_TOSS_URL as string | undefined) ?? '';
  const tossUrl = buildTossUrlWithAmount(baseUrl, PREFILL_AMOUNT);

  useEffect(() => {
    if (tossUrl) {
      Sentry.addBreadcrumb({
        category: 'insight-card',
        message: 'qr_shown',
        level: 'info',
      });
    }
  }, [tossUrl]);

  if (!tossUrl) {
    return (
      <Section>
        <Header>
          <RiCupLine size={14} />
          KioSchool 응원하기
        </Header>
        <HelperText>도네이션 정보가 설정되지 않았습니다. 운영팀에 문의해주세요.</HelperText>
      </Section>
    );
  }

  return (
    <Section>
      <Header>
        <RiCupLine size={14} />
        KioSchool 응원하기
      </Header>
      <HelperText>KioSchool은 무료로 운영돼요. 폰으로 QR 스캔해서 응원해주세요!</HelperText>
      <QrRow>
        <QrBox>
          <QRCodeSVG value={tossUrl} size={96} level="M" />
        </QrBox>
        <QrCaption>
          <ScanHint>
            <RiQrScan2Line size={12} />
            폰으로 스캔
          </ScanHint>
          <div>토스 앱에서 금액 입력 후 송금하시면 됩니다</div>
          <Subtle>송금자명에 닉네임이나 주점명을 적어주세요</Subtle>
        </QrCaption>
      </QrRow>
    </Section>
  );
}

export default DonationSection;
