import styled from '@emotion/styled';
import ContentCard from '@components/common/card/ContentCard';
import { PAYMENT_METHOD_LABELS } from '@constants/data/paymentMethod';
import { PaymentMethod } from '@@types/index';
import { PaymentMethodStatistics } from '@utils/paymentMethodStatistics';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { mobileMediaQuery } from '@styles/globalStyles';

const RATIO_DECIMAL_PLACES = 1;

const Container = styled.section`
  width: 100%;
`;

const Content = styled.div`
  gap: 16px;
  padding-top: 4px;
  ${colFlex()}
`;

const Description = styled.p`
  margin: 0;
  color: ${Color.TEXT_BODY};
  font-size: 12px;
`;

const Track = styled.div`
  width: 100%;
  height: 20px;
  border-radius: 6px;
  overflow: hidden;
  background-color: ${Color.LIGHT_GREY};
  ${rowFlex()}
`;

const Segment = styled.div<{ ratio: number; color: string }>`
  width: ${({ ratio }) => ratio}%;
  background-color: ${({ color }) => color};
`;

const Legend = styled.div`
  gap: 12px;
  ${rowFlex({ justify: 'space-between' })}
  ${mobileMediaQuery} {
    flex-direction: column;
  }
`;

const LegendItem = styled.div`
  gap: 8px;
  color: ${Color.TEXT_STRONG};
  font-size: 14px;
  ${rowFlex({ align: 'center' })}
`;

const Marker = styled.span<{ color: string }>`
  width: 10px;
  height: 10px;
  flex-shrink: 0;
  border-radius: 3px;
  background-color: ${({ color }) => color};
`;

const Value = styled.span`
  font-variant-numeric: tabular-nums;
`;

const Status = styled.p`
  margin: 0;
  padding: 16px 0;
  color: ${Color.TEXT_BODY};
  font-size: 14px;
`;

const ErrorNotice = styled.div`
  gap: 8px;
  color: ${Color.TEXT_BODY};
  ${rowFlex({ align: 'center' })}
`;

const RetryButton = styled.button`
  padding: 6px 10px;
  border: 1px solid ${Color.BORDER_GREY};
  border-radius: 6px;
  background-color: ${Color.WHITE};
  color: ${Color.TEXT_STRONG};
  font: inherit;
  cursor: pointer;

  &:disabled {
    cursor: default;
    opacity: 0.5;
  }
`;

interface PaymentMethodRatioSectionProps {
  statistics: PaymentMethodStatistics | null;
  isLoading: boolean;
  hasError: boolean;
  onRetry: () => void;
}

function PaymentMethodRatioSection({ statistics, isLoading, hasError, onRetry }: PaymentMethodRatioSectionProps) {
  const recordedCount = statistics ? statistics.tossCount + statistics.bankTransferCount : 0;
  const hasRecordedOrders = recordedCount > 0;
  const unknownCount = statistics?.unknownCount ?? 0;
  const emptyMessage = unknownCount > 0 ? '결제수단이 기록된 주문이 없습니다.' : '결제 완료 주문이 없습니다.';
  const errorMessage = statistics ? '결제수단 비율을 갱신하지 못했습니다. 이전 결과를 표시합니다.' : '결제수단 비율을 불러오지 못했습니다.';

  return (
    <Container aria-label="결제수단별 주문 비율" aria-busy={isLoading}>
      <ContentCard title="결제수단별 주문 비율" showDivider={false}>
        <Content>
          <Description>결제 완료 주문 건수 기준</Description>
          {isLoading && <Description role="status">결제수단 비율을 불러오는 중입니다.</Description>}
          {statistics && hasRecordedOrders && (
            <>
              <Track aria-hidden="true">
                <Segment ratio={statistics.tossRatio} color={Color.BLUE} />
                <Segment ratio={statistics.bankTransferRatio} color={Color.KIO_ORANGE} />
              </Track>
              <Legend>
                <LegendItem>
                  <Marker color={Color.BLUE} aria-hidden="true" />
                  <Value>
                    {PAYMENT_METHOD_LABELS[PaymentMethod.TOSS]} {statistics.tossRatio.toFixed(RATIO_DECIMAL_PLACES)}% · {statistics.tossCount.toLocaleString()}
                    건
                  </Value>
                </LegendItem>
                <LegendItem>
                  <Marker color={Color.KIO_ORANGE} aria-hidden="true" />
                  <Value>
                    {PAYMENT_METHOD_LABELS[PaymentMethod.BANK_TRANSFER]} {statistics.bankTransferRatio.toFixed(RATIO_DECIMAL_PLACES)}% ·{' '}
                    {statistics.bankTransferCount.toLocaleString()}건
                  </Value>
                </LegendItem>
              </Legend>
            </>
          )}
          {statistics && !hasRecordedOrders && <Status>{emptyMessage}</Status>}
          {unknownCount > 0 && <Description>결제수단 미기록 {unknownCount.toLocaleString()}건 제외</Description>}
          {hasError && (
            <ErrorNotice role="status">
              <Value>{errorMessage}</Value>
              <RetryButton type="button" onClick={onRetry} disabled={isLoading}>
                재시도
              </RetryButton>
            </ErrorNotice>
          )}
        </Content>
      </ContentCard>
    </Container>
  );
}

export default PaymentMethodRatioSection;
