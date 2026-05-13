import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { FestivalWorkspace } from '@@types/index';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { getAdminWorkspacePath } from '@constants/routes';

const DaySummary = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  padding-bottom: 16px;
  border-bottom: 1px solid ${Color.HEAVY_GREY};
`;

const SummaryItem = styled.div`
  gap: 2px;
  ${colFlex()}
`;

const SummaryLabel = styled.div`
  font-size: 10px;
  color: ${Color.GREY};
  font-weight: 500;
`;

const SummaryValue = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: ${Color.BLACK};
`;

const UniversitySection = styled.div`
  gap: 8px;
  padding: 16px 0;
  border-bottom: 1px solid ${Color.HEAVY_GREY};
  ${colFlex({ align: 'flex-start' })}
`;

const UniversitySectionLabel = styled.div`
  font-size: 10px;
  font-weight: 600;
  color: ${Color.GREY};
  text-transform: uppercase;
  letter-spacing: 0.04em;
`;

const UniversityTagList = styled.div`
  gap: 6px;
  flex-wrap: wrap;
  ${rowFlex({ align: 'center' })}
`;

const UniversityTag = styled.div`
  font-size: 12px;
  padding: 3px 10px;
  border-radius: 12px;
  background: ${Color.BLUE_FAINT};
  color: ${Color.BLUE};
  font-weight: 500;
`;

const WorkspaceList = styled.div`
  gap: 12px;
  padding-top: 16px;
  ${colFlex()}
`;

const WorkspaceCard = styled.div`
  border: 1px solid ${Color.HEAVY_GREY};
  border-radius: 10px;
  padding: 14px;
  gap: 10px;
  width: 100%;
  box-sizing: border-box;
  ${colFlex()}
`;

const WorkspaceCardHeader = styled.div`
  gap: 6px;
  width: 100%;
  ${rowFlex({ align: 'center', justify: 'space-between' })}
`;

const WorkspaceName = styled(Link)`
  font-size: 14px;
  font-weight: 700;
  color: ${Color.BLACK};
  text-decoration: none;

  &:hover {
    color: ${Color.KIO_ORANGE};
    text-decoration: underline;
  }
`;

const UniversityBadge = styled.div`
  font-size: 11px;
  padding: 2px 8px;
  border-radius: 12px;
  background: ${Color.BLUE_FAINT};
  color: ${Color.BLUE};
  font-weight: 500;
  white-space: nowrap;
`;

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
  width: 100%;
`;

const Metric = styled.div`
  gap: 2px;
  padding: 8px;
  background: ${Color.LIGHT_GREY};
  border-radius: 8px;
  ${colFlex()}
`;

const MetricLabel = styled.div`
  font-size: 10px;
  color: ${Color.GREY};
`;

const MetricValue = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: ${Color.BLACK};
`;

interface FestivalDayDetailProps {
  workspaces: FestivalWorkspace[];
}

function FestivalDayDetail({ workspaces }: FestivalDayDetailProps) {
  const totalOrders = workspaces.reduce((s, w) => s + w.totalOrders, 0);
  const totalRevenue = workspaces.reduce((s, w) => s + w.totalRevenue, 0);
  const universities = [...new Set(workspaces.map((w) => w.universityName))];

  return (
    <>
      <DaySummary>
        <SummaryItem>
          <SummaryLabel>총 주문</SummaryLabel>
          <SummaryValue>{totalOrders.toLocaleString()}건</SummaryValue>
        </SummaryItem>
        <SummaryItem>
          <SummaryLabel>총 매출</SummaryLabel>
          <SummaryValue>{totalRevenue.toLocaleString()}원</SummaryValue>
        </SummaryItem>
        <SummaryItem>
          <SummaryLabel>참여 대학</SummaryLabel>
          <SummaryValue>{universities.length}개교</SummaryValue>
        </SummaryItem>
      </DaySummary>
      <UniversitySection>
        <UniversitySectionLabel>참여 대학교</UniversitySectionLabel>
        <UniversityTagList>
          {universities.map((u) => (
            <UniversityTag key={u}>{u}</UniversityTag>
          ))}
        </UniversityTagList>
      </UniversitySection>
      <WorkspaceList>
        {workspaces.map((w) => (
          <WorkspaceCard key={w.workspaceId}>
            <WorkspaceCardHeader>
              <WorkspaceName to={getAdminWorkspacePath(w.workspaceId)} target="_blank" rel="noopener noreferrer">
                {w.workspaceName}
              </WorkspaceName>
              <UniversityBadge>{w.universityName}</UniversityBadge>
            </WorkspaceCardHeader>
            <MetricsGrid>
              <Metric>
                <MetricLabel>주문 건수</MetricLabel>
                <MetricValue>{w.totalOrders.toLocaleString()}건</MetricValue>
              </Metric>
              <Metric>
                <MetricLabel>매출</MetricLabel>
                <MetricValue>{w.totalRevenue.toLocaleString()}원</MetricValue>
              </Metric>
              <Metric>
                <MetricLabel>평균 주문금액</MetricLabel>
                <MetricValue>{w.averageOrderAmount.toLocaleString()}원</MetricValue>
              </Metric>
              <Metric>
                <MetricLabel>테이블 회전율</MetricLabel>
                <MetricValue>{w.tableTurnoverRate.toFixed(1)}회</MetricValue>
              </Metric>
              <Metric>
                <MetricLabel>평균 체류시간</MetricLabel>
                <MetricValue>{Math.round(w.averageStayTimeMinutes)}분</MetricValue>
              </Metric>
              <Metric>
                <MetricLabel>피크 시간대</MetricLabel>
                <MetricValue>{w.peakHour !== null ? `${w.peakHour}시` : '-'}</MetricValue>
              </Metric>
            </MetricsGrid>
          </WorkspaceCard>
        ))}
      </WorkspaceList>
    </>
  );
}

export default FestivalDayDetail;
