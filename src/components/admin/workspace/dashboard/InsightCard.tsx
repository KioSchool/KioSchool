import styled from '@emotion/styled';
import { RiShare2Line } from '@remixicon/react';
import { rowFlex, colFlex } from '@styles/flexStyles';
import { useAdminFetchInsightCard } from '@hooks/admin/useAdminFetchInsightCard';
import useInsightDiscordReport from '@hooks/admin/useInsightDiscordReport';
import { InsightCardResponse } from '@@types/index';
import { InsightDesignTokens } from '@components/admin/insight/insightDesignTokens';
import goodCharacter from '@resources/image/donation/good.webp';
import InsightMetricCell from './InsightMetricCell';

const Container = styled.div`
  width: 100%;
  box-sizing: border-box;
  background: ${InsightDesignTokens.card.background};
  border-radius: ${InsightDesignTokens.card.radius};
  box-shadow: ${InsightDesignTokens.card.shadow}, 0 0 18px rgba(255, 145, 66, 0.14), 0 0 32px rgba(255, 145, 66, 0.16), 0 0 56px rgba(255, 145, 66, 0.09);
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

const Medal = styled.img`
  width: 64px;
  height: 64px;
  object-fit: contain;
  flex-shrink: 0;
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
  transition: all 0.15s ease;
  ${rowFlex({ align: 'center' })};

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

interface Props {
  workspaceId: string;
  workspaceName: string;
  onShareClick: (card: InsightCardResponse) => void;
}

const MIN_YESTERDAY_REVENUE = 500000;

function InsightCard({ workspaceId, workspaceName, onShareClick }: Props) {
  const { card, isLoading } = useAdminFetchInsightCard(workspaceId);
  const { reportShareClick } = useInsightDiscordReport();

  if (isLoading) return null;
  if (!card || card.topMetrics.length === 0) return null;
  if ((card.payload.totalRevenue ?? 0) < MIN_YESTERDAY_REVENUE) return null;

  const handleShareClick = () => {
    reportShareClick(workspaceId, workspaceName, card);
    onShareClick(card);
  };

  return (
    <Container>
      <HeaderRow>
        <HeaderText>
          <Medal src={goodCharacter} alt="잘하고 있어요" />
          <HeaderTextInner>
            <Sub>어제의 자랑 · {card.referenceDate}</Sub>
            <Headline>{card.headline}</Headline>
          </HeaderTextInner>
        </HeaderText>
        <ShareButton onClick={handleShareClick}>
          <RiShare2Line size={14} />
          자랑하기
        </ShareButton>
      </HeaderRow>
      <Grid>
        {card.topMetrics.map((m) => (
          <InsightMetricCell key={m.key} summary={m} />
        ))}
      </Grid>
    </Container>
  );
}

export default InsightCard;
