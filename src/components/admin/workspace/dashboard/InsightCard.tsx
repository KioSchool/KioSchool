import styled from '@emotion/styled';
import { RiShare2Line } from '@remixicon/react';
import { rowFlex, colFlex } from '@styles/flexStyles';
import { useAdminFetchInsightCard } from '@hooks/admin/useAdminFetchInsightCard';
import { InsightCardResponse, MetricSummary } from '@@types/index';
import { InsightDesignTokens, RankKey } from '@components/admin/insight/insightDesignTokens';

const Container = styled.div`
  width: 100%;
  background: ${InsightDesignTokens.card.background};
  border: 1px solid ${InsightDesignTokens.card.border};
  border-radius: ${InsightDesignTokens.card.radius};
  box-shadow: ${InsightDesignTokens.card.shadow};
  padding: ${InsightDesignTokens.card.padding};
  gap: 12px;
  ${colFlex({ align: 'stretch' })};
`;

const HeaderRow = styled.div`
  width: 100%;
  ${rowFlex({ justify: 'space-between', align: 'center' })};
`;

const HeaderText = styled.div`
  ${colFlex({ align: 'start' })};
  gap: 2px;
`;

const Sub = styled.div`
  font-size: 11px;
  color: ${InsightDesignTokens.text.muted};
`;

const Headline = styled.div`
  font-size: 15px;
  font-weight: 700;
  color: ${InsightDesignTokens.text.primary};
`;

const ShareButton = styled.button`
  padding: 6px 12px;
  background: ${InsightDesignTokens.brand.main};
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  gap: 4px;
  ${rowFlex({ align: 'center' })};

  &:hover {
    background: ${InsightDesignTokens.brand.dark};
  }
`;

const Grid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
`;

const Cell = styled.div<{ rank: RankKey }>`
  padding: 10px;
  border-radius: 8px;
  background: ${({ rank }) => InsightDesignTokens.rank[rank].bg};
  border: 1px solid ${({ rank }) => InsightDesignTokens.rank[rank].border};
  ${colFlex({ align: 'start' })};
  gap: 2px;
`;

const CellLabel = styled.div<{ rank: RankKey }>`
  font-size: 10px;
  color: ${({ rank }) => InsightDesignTokens.rank[rank].labelText};
`;

const CellValue = styled.div<{ rank: RankKey }>`
  font-size: 14px;
  font-weight: 700;
  color: ${({ rank }) => InsightDesignTokens.rank[rank].text};
`;

const CellNote = styled.div<{ rank: RankKey }>`
  font-size: 9px;
  color: ${({ rank }) => InsightDesignTokens.rank[rank].labelText};
`;

const RankPrefix = styled.span`
  opacity: 0.6;
  margin-right: 2px;
`;

interface Props {
  workspaceId: string;
  onShareClick: (card: InsightCardResponse) => void;
}

function MetricCell({ summary }: { summary: MetricSummary }) {
  const rank = summary.rank as RankKey;
  return (
    <Cell rank={rank}>
      <CellLabel rank={rank}>
        <RankPrefix>#{summary.rank}</RankPrefix>
        {summary.label}
      </CellLabel>
      <CellValue rank={rank}>{summary.value}</CellValue>
      {summary.percentile != null && (
        <CellNote rank={rank}>상위 {Math.round(100 - summary.percentile)}%</CellNote>
      )}
      {summary.milestoneStep != null && <CellNote rank={rank}>마일스톤 돌파</CellNote>}
    </Cell>
  );
}

function InsightCard({ workspaceId, onShareClick }: Props) {
  const { card, isLoading } = useAdminFetchInsightCard(workspaceId);

  if (isLoading) return null;
  if (!card || card.topMetrics.length === 0) return null;

  return (
    <Container>
      <HeaderRow>
        <HeaderText>
          <Sub>어제의 자랑 · {card.referenceDate}</Sub>
          <Headline>{card.headline}</Headline>
        </HeaderText>
        <ShareButton onClick={() => onShareClick(card)}>
          <RiShare2Line size={14} />
          자랑하기
        </ShareButton>
      </HeaderRow>
      <Grid>
        {card.topMetrics.map((m) => (
          <MetricCell key={m.key} summary={m} />
        ))}
      </Grid>
    </Container>
  );
}

export default InsightCard;
