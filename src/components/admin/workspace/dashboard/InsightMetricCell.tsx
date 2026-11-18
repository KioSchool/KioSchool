import styled from '@emotion/styled';
import { colFlex } from '@styles/flexStyles';
import { MetricSummary } from '@@types/index';
import { InsightDesignTokens, RankKey } from '@components/admin/insight/insightDesignTokens';

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

interface InsightMetricCellProps {
  summary: MetricSummary;
}

function InsightMetricCell({ summary }: InsightMetricCellProps) {
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

export default InsightMetricCell;
