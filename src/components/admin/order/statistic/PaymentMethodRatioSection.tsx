import { P, match } from 'ts-pattern';
import styled from '@emotion/styled';
import ContentCard from '@components/common/card/ContentCard';
import { PAYMENT_METHOD_LABELS } from '@constants/data/paymentMethod';
import { ORDER_STATISTICS_SUMMARY_CARD_HEIGHT } from '@constants/layout';
import { PaymentMethod } from '@@types/index';
import { PaymentMethodStatistics } from '@utils/paymentMethodStatistics';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';

const RATIO_DECIMAL_PLACES = 1;

const Container = styled.section`
  width: 100%;
`;

const Content = styled.div`
  height: 100%;
  gap: 8px;
  ${colFlex({ justify: 'center' })}
`;

const Description = styled.p`
  margin: 0;
  color: ${Color.TEXT_BODY};
  font-size: 12px;
`;

const Track = styled.div`
  width: 100%;
  height: 14px;
  flex-shrink: 0;
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
  gap: 8px;
  flex-wrap: wrap;
  ${rowFlex({ justify: 'space-between' })}
`;

const RatioContent = styled.div`
  width: 100%;
  gap: 8px;
  ${colFlex()}
`;

const LegendItem = styled.div`
  gap: 5px;
  color: ${Color.TEXT_STRONG};
  font-size: 12px;
  ${rowFlex({ align: 'center' })}
`;

const Marker = styled.span<{ color: string }>`
  width: 8px;
  height: 8px;
  flex-shrink: 0;
  border-radius: 3px;
  background-color: ${({ color }) => color};
`;

const Value = styled.span`
  font-variant-numeric: tabular-nums;
`;

const Status = styled.p`
  margin: 0;
  color: ${Color.TEXT_BODY};
  font-size: 14px;
`;

const ErrorNotice = styled.div`
  gap: 8px;
  color: ${Color.TEXT_BODY};
  flex-wrap: wrap;
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

function hasRecordedOrders(statistics: PaymentMethodStatistics | null): statistics is PaymentMethodStatistics {
  if (!statistics) return false;

  return statistics.tossCount + statistics.bankTransferCount > 0;
}

function getEmptyMessage(unknownCount: number) {
  return match(unknownCount)
    .with(P.number.gt(0), () => '결제수단이 기록된 주문이 없습니다.')
    .otherwise(() => '결제 완료 주문이 없습니다.');
}

function getErrorMessage(statistics: PaymentMethodStatistics | null) {
  return match(statistics)
    .with(P.nullish, () => '결제수단 비율을 불러오지 못했습니다.')
    .otherwise(() => '결제수단 비율을 갱신하지 못했습니다.');
}

function PaymentMethodRatioSection({ statistics, isLoading, hasError, onRetry }: PaymentMethodRatioSectionProps) {
  const content = match({ hasError, isLoading, statistics })
    .with({ hasError: true }, () => (
      <ErrorNotice role="status">
        <Value>{getErrorMessage(statistics)}</Value>
        <RetryButton type="button" onClick={onRetry} disabled={isLoading}>
          재시도
        </RetryButton>
      </ErrorNotice>
    ))
    .with({ statistics: null, isLoading: true }, () => <Description role="status">결제수단 비율을 불러오는 중입니다.</Description>)
    .with({ statistics: null }, () => null)
    .with({ statistics: P.when(hasRecordedOrders) }, ({ statistics: recordedStatistics }) => (
      <RatioContent>
        <Track aria-hidden="true">
          <Segment ratio={recordedStatistics.tossRatio} color={Color.BLUE} />
          <Segment ratio={recordedStatistics.bankTransferRatio} color={Color.KIO_ORANGE} />
        </Track>
        <Legend>
          <LegendItem>
            <Marker color={Color.BLUE} aria-hidden="true" />
            <Value>
              {PAYMENT_METHOD_LABELS[PaymentMethod.TOSS]} {recordedStatistics.tossRatio.toFixed(RATIO_DECIMAL_PLACES)}% ·{' '}
              {recordedStatistics.tossCount.toLocaleString()}건
            </Value>
          </LegendItem>
          <LegendItem>
            <Marker color={Color.KIO_ORANGE} aria-hidden="true" />
            <Value>
              {PAYMENT_METHOD_LABELS[PaymentMethod.BANK_TRANSFER]} {recordedStatistics.bankTransferRatio.toFixed(RATIO_DECIMAL_PLACES)}% ·{' '}
              {recordedStatistics.bankTransferCount.toLocaleString()}건
            </Value>
          </LegendItem>
        </Legend>
      </RatioContent>
    ))
    .with({ statistics: P.nonNullable }, ({ statistics: emptyStatistics }) => <Status>{getEmptyMessage(emptyStatistics.unknownCount)}</Status>)
    .exhaustive();

  return (
    <Container aria-label="결제수단별 주문" aria-busy={isLoading}>
      <ContentCard
        title="결제수단별 주문"
        height={ORDER_STATISTICS_SUMMARY_CARD_HEIGHT}
        showDivider={false}
        rightAction={<Description>결제 완료 주문 건수 기준</Description>}
      >
        <Content>{content}</Content>
      </ContentCard>
    </Container>
  );
}

export default PaymentMethodRatioSection;
