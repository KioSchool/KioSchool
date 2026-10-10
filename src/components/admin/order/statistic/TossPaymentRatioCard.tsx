import styled from '@emotion/styled';
import StatCard from '@components/common/card/StatCard';
import { PaymentMethodStatistics } from '@utils/paymentMethodStatistics';
import { Color } from '@resources/colors';
import { colFlex } from '@styles/flexStyles';

const RATIO_DECIMAL_PLACES = 1;

const Container = styled.section`
  min-width: 193px;
  ${colFlex()}
`;

const Details = styled.div`
  gap: 6px;
  ${colFlex({ align: 'start' })}
`;

const Count = styled.span``;

const Notice = styled.span`
  font-size: 12px;
`;

const RetryButton = styled.button`
  padding: 0;
  border: none;
  background: none;
  color: ${Color.TEXT_BODY};
  font: inherit;
  font-size: 12px;
  text-align: left;
  text-decoration: underline;
  cursor: pointer;

  &:disabled {
    cursor: default;
    opacity: 0.5;
  }
`;

interface TossPaymentRatioCardProps {
  statistics: PaymentMethodStatistics | null;
  isLoading: boolean;
  hasError: boolean;
  onRetry: () => void;
}

function TossPaymentRatioCard({ statistics, isLoading, hasError, onRetry }: TossPaymentRatioCardProps) {
  const recordedCount = statistics ? statistics.tossCount + statistics.bankTransferCount : 0;
  const hasRecordedOrders = recordedCount > 0;
  const unknownCount = statistics?.unknownCount ?? 0;
  const value = statistics && hasRecordedOrders ? statistics.tossRatio.toFixed(RATIO_DECIMAL_PLACES) : '-';
  const emptyMessage = unknownCount > 0 ? '결제수단 기록 없음' : '결제 완료 주문 없음';
  const errorMessage = statistics ? '갱신 실패 · 재시도' : '조회 실패 · 재시도';

  return (
    <Container aria-label="토스 비율" aria-busy={isLoading} title="결제 완료된 토스·계좌 주문 건수 기준입니다. 결제수단 미기록 주문은 제외합니다.">
      <StatCard
        title="토스 비율"
        value={value}
        unit={hasRecordedOrders ? '%' : undefined}
        valueColor={Color.BLUE}
        description={
          <Details>
            {statistics && hasRecordedOrders && <Count>토스 {statistics.tossCount.toLocaleString()}건</Count>}
            {statistics && !hasRecordedOrders && <Notice>{emptyMessage}</Notice>}
            {unknownCount > 0 && <Notice>미기록 {unknownCount.toLocaleString()}건 제외</Notice>}
            {isLoading && <Notice role="status">불러오는 중...</Notice>}
            {hasError && (
              <RetryButton type="button" onClick={onRetry} disabled={isLoading}>
                {errorMessage}
              </RetryButton>
            )}
          </Details>
        }
      />
    </Container>
  );
}

export default TossPaymentRatioCard;
