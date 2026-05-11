import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { rowFlex } from '@styles/flexStyles';
import { useAdminFetchInsightCard } from '@hooks/admin/useAdminFetchInsightCard';
import { InsightCardResponse } from '@@types/index';

const Container = styled.div`
  width: 100%;
  border-radius: 8px;
  border: 1px solid ${Color.GREY};
  padding: 14px;
  background: #fff;
`;

const Empty = styled.div`
  width: 100%;
  border-radius: 8px;
  border: 1px dashed ${Color.GREY};
  padding: 14px;
  text-align: center;
  color: ${Color.GREY};
  font-size: 12px;
`;

const TrophyRow = styled.div`
  gap: 14px;
  ${rowFlex({ justify: 'start', align: 'center' })};
`;

const Medal = styled.div`
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #fbbf24, #f59e0b);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  flex-shrink: 0;
`;

const Headline = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: #1f2937;
`;

const SubText = styled.div`
  font-size: 12px;
  color: #6b7280;
`;

const ShareButton = styled.button`
  margin-left: auto;
  padding: 8px 14px;
  background: #3b82f6;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
`;

interface Props {
  workspaceId: string;
  onShareClick: (card: InsightCardResponse) => void;
}

function InsightCard({ workspaceId, onShareClick }: Props) {
  const { card, isLoading } = useAdminFetchInsightCard(workspaceId);

  if (isLoading) return null;
  if (!card) return <Empty>오늘 영업이 끝나면 어제의 자랑 카드가 생성됩니다 ✨</Empty>;

  const renderMedal = () => {
    if (card.template === 'SINGLE_TROPHY') return <Medal>🥇</Medal>;
    if (card.template === 'MILESTONE') return <Medal style={{ background: '#10b981' }}>🎉</Medal>;
    return <Medal style={{ background: '#374151' }}>📊</Medal>;
  };

  return (
    <Container>
      <TrophyRow>
        {renderMedal()}
        <div>
          <SubText>어제의 자랑 · {card.referenceDate}</SubText>
          <Headline>{card.headline}</Headline>
          {card.payload.cohortAverageRatio != null && (
            <SubText>
              코호트 평균 대비 {card.payload.cohortAverageRatio > 0 ? '+' : ''}
              {Math.round(card.payload.cohortAverageRatio * 100)}%
            </SubText>
          )}
        </div>
        <ShareButton onClick={() => onShareClick(card)}>📤 자랑하기</ShareButton>
      </TrophyRow>
    </Container>
  );
}

export default InsightCard;
