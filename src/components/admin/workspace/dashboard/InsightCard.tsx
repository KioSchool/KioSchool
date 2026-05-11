import styled from '@emotion/styled';
import { RiShare2Line } from '@remixicon/react';
import { rowFlex, colFlex } from '@styles/flexStyles';
import { useAdminFetchInsightCard } from '@hooks/admin/useAdminFetchInsightCard';
import { InsightCardResponse, MetricSummary } from '@@types/index';
import { InsightDesignTokens, RankKey } from '@components/admin/insight/insightDesignTokens';

const Container = styled.div`
  width: 100%;
  box-sizing: border-box;
  background: ${InsightDesignTokens.card.background};
  border: 1px solid ${InsightDesignTokens.card.border};
  border-radius: ${InsightDesignTokens.card.radius};
  box-shadow: ${InsightDesignTokens.card.shadow};
  padding: 14px 21px;
  gap: 14px;
  ${colFlex({ align: 'stretch' })};
`;

const HeaderRow = styled.div`
  width: 100%;
  gap: 12px;
  ${rowFlex({ justify: 'space-between', align: 'center' })};
`;

const HeaderText = styled.div`
  flex: 1;
  min-width: 0;
  gap: 4px;
  ${rowFlex({ align: 'center' })};
`;

const Medal = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(180deg, #ffe066 0%, #ffb300 55%, #c77800 100%);
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.18);
  font-size: 22px;
  flex-shrink: 0;
  ${rowFlex({ justify: 'center', align: 'center' })};
`;

const HeaderTextInner = styled.div`
  min-width: 0;
  gap: 2px;
  ${colFlex({ align: 'start' })};
`;

const Sub = styled.div`
  font-size: 11px;
  color: ${InsightDesignTokens.text.muted};
`;

const Headline = styled.div`
  font-size: 17px;
  font-weight: 800;
  color: ${InsightDesignTokens.text.primary};
  line-height: 1.3;
  word-break: keep-all;
`;

const ShareButton = styled.button`
  padding: 8px 14px;
  background: ${InsightDesignTokens.brand.main};
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  gap: 4px;
  flex-shrink: 0;
  box-shadow: 0 2px 6px rgba(255, 145, 66, 0.25);
  ${rowFlex({ align: 'center' })};
  transition: all 0.15s ease;

  &:hover {
    background: ${InsightDesignTokens.brand.dark};
    transform: translateY(-1px);
    box-shadow: 0 4px 10px rgba(255, 145, 66, 0.35);
  }
`;

const Grid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 8px;
`;

const Cell = styled.div<{ rank: RankKey }>`
  min-width: 0;
  padding: 12px;
  border-radius: 10px;
  background: ${({ rank }) => InsightDesignTokens.rank[rank].bg};
  border: 1px solid ${({ rank }) => InsightDesignTokens.rank[rank].border};
  gap: 4px;
  ${colFlex({ align: 'start' })};
`;

const CellLabel = styled.div<{ rank: RankKey }>`
  font-size: 10px;
  font-weight: 600;
  color: ${({ rank }) => InsightDesignTokens.rank[rank].labelText};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
`;

const CellValue = styled.div<{ rank: RankKey }>`
  font-size: 16px;
  font-weight: 800;
  color: ${({ rank }) => InsightDesignTokens.rank[rank].text};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
`;

const CellNote = styled.div<{ rank: RankKey }>`
  font-size: 9px;
  font-weight: 600;
  color: ${({ rank }) => InsightDesignTokens.rank[rank].labelText};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
`;

const RankPrefix = styled.span`
  opacity: 0.55;
  margin-right: 3px;
  font-weight: 700;
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
      {summary.percentile != null && <CellNote rank={rank}>상위 {Math.round(100 - summary.percentile)}%</CellNote>}
      {summary.milestoneStep != null && <CellNote rank={rank}>마일스톤 돌파</CellNote>}
    </Cell>
  );
}

function pickMedalEmoji(template: InsightCardResponse['template']): string {
  if (template === 'SINGLE_TROPHY') return '🥇';
  if (template === 'MILESTONE') return '🎉';
  return '📊';
}

function InsightCard({ workspaceId, onShareClick }: Props) {
  const { card, isLoading } = useAdminFetchInsightCard(workspaceId);

  if (isLoading) return null;
  if (!card || card.topMetrics.length === 0) return null;

  return (
    <Container>
      <HeaderRow>
        <HeaderText>
          <Medal>{pickMedalEmoji(card.template)}</Medal>
          <HeaderTextInner>
            <Sub>어제의 자랑 · {card.referenceDate}</Sub>
            <Headline>{card.headline}</Headline>
          </HeaderTextInner>
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
