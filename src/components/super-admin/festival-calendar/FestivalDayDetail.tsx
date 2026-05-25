import { useState } from 'react';
import { Link } from 'react-router-dom';
import { RiArrowDownSLine, RiArrowUpSLine, RiExternalLinkLine, RiEyeOffLine, RiEyeLine } from '@remixicon/react';
import styled from '@emotion/styled';
import { FestivalWorkspace } from '@@types/index';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { formatCurrency, formatNumber } from '@utils/formatNumber';
import { getAdminWorkspacePath } from '@constants/routes';
import useSuperAdminFestivalCalendar from '@hooks/super-admin/useSuperAdminFestivalCalendar';

type SortKey = 'totalOrders' | 'totalRevenue';

const DaySummary = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  padding-bottom: 16px;
  border-bottom: 1px solid #f0f0f0;
`;

const SummaryItem = styled.div`
  gap: 4px;
  min-width: 0;
  ${colFlex()}
`;

const SummaryLabel = styled.div`
  font-size: 11px;
  color: ${Color.GREY};
  word-break: keep-all;
`;

const SummaryValue = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: ${Color.BLACK};
  word-break: keep-all;
`;

const UniversitySection = styled.div`
  gap: 8px;
  padding: 16px 0;
  border-bottom: 1px solid #f0f0f0;
  ${colFlex({ align: 'flex-start' })}
`;

const SectionLabel = styled.div`
  font-size: 11px;
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
  background: ${Color.LIGHT_GREY};
  color: ${Color.BLACK};
  font-weight: 500;
  word-break: keep-all;
  gap: 5px;
  ${rowFlex({ align: 'center' })}
`;

const UniversityTagCount = styled.span`
  font-size: 11px;
  font-weight: 700;
  color: ${Color.KIO_ORANGE};
`;

const WorkspaceListHeader = styled.div`
  padding-top: 16px;
  gap: 8px;
  ${rowFlex({ align: 'center', justify: 'space-between' })}
`;

const WorkspaceListLabel = styled.div`
  font-size: 11px;
  font-weight: 600;
  color: ${Color.GREY};
  text-transform: uppercase;
  letter-spacing: 0.04em;
`;

const SortToggle = styled.div`
  gap: 4px;
  ${rowFlex({ align: 'center' })}
`;

const SortButton = styled.button<{ active: boolean }>`
  font-size: 11px;
  font-weight: ${({ active }) => (active ? 700 : 400)};
  color: ${({ active }) => (active ? Color.KIO_ORANGE : Color.GREY)};
  background: ${({ active }) => (active ? '#fff3eb' : 'none')};
  border: 1px solid ${({ active }) => (active ? Color.KIO_ORANGE : Color.HEAVY_GREY)};
  border-radius: 10px;
  padding: 2px 8px;
  cursor: pointer;
`;

const WorkspaceList = styled.div`
  gap: 12px;
  padding-top: 12px;
  ${colFlex()}
`;

const WorkspaceCard = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 14px;
  gap: 12px;
  border: 1px solid ${Color.HEAVY_GREY};
  border-radius: 10px;
  ${colFlex()}
`;

const WorkspaceCardHeader = styled.div`
  width: 100%;
  min-width: 0;
  gap: 8px;
  ${rowFlex({ align: 'center', justify: 'space-between' })}
`;

const WorkspaceName = styled(Link)`
  font-size: 14px;
  font-weight: 700;
  color: ${Color.BLACK};
  text-decoration: none;
  min-width: 0;
  gap: 4px;
  word-break: keep-all;
  ${rowFlex({ align: 'center' })}

  &:hover {
    color: ${Color.KIO_ORANGE};
  }
`;

const WorkspaceCardActions = styled.div`
  gap: 6px;
  flex-shrink: 0;
  ${rowFlex({ align: 'center' })}
`;

const UniversityBadge = styled.div`
  font-size: 11px;
  padding: 2px 8px;
  border-radius: 12px;
  background: ${Color.LIGHT_GREY};
  color: ${Color.GREY};
  font-weight: 500;
  white-space: nowrap;
`;

const ExcludeButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 6px;
  border: 1px solid ${Color.HEAVY_GREY};
  background: none;
  color: ${Color.GREY};
  cursor: pointer;
  flex-shrink: 0;

  &:hover {
    border-color: #f5a623;
    color: #f5a623;
    background: #fff8ef;
  }
`;

const ExcludedSection = styled.div`
  gap: 8px;
  padding-top: 16px;
  border-top: 1px dashed ${Color.HEAVY_GREY};
  ${colFlex()}
`;

const ExcludedSectionToggle = styled.button`
  width: 100%;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  gap: 4px;
  ${rowFlex({ align: 'center', justify: 'space-between' })}
`;

const ExcludedSectionLabel = styled.span`
  font-size: 11px;
  font-weight: 600;
  color: ${Color.GREY};
  text-transform: uppercase;
  letter-spacing: 0.04em;
`;

const ExcludedWorkspaceCard = styled(WorkspaceCard)`
  opacity: 0.5;
`;

const ExcludedOrderCount = styled.span`
  font-size: 11px;
  color: ${Color.GREY};
  flex-shrink: 0;
`;

const RestoreButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 6px;
  border: 1px solid ${Color.HEAVY_GREY};
  background: none;
  color: ${Color.GREY};
  cursor: pointer;
  flex-shrink: 0;

  &:hover {
    border-color: ${Color.KIO_ORANGE};
    color: ${Color.KIO_ORANGE};
    background: #fff3eb;
  }
`;

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 6px;
  width: 100%;
`;

const Metric = styled.div`
  gap: 2px;
  padding: 8px 10px;
  background: ${Color.LIGHT_GREY};
  border-radius: 6px;
  ${colFlex()}
`;

const MetricLabel = styled.div`
  font-size: 10px;
  color: ${Color.GREY};
  word-break: keep-all;
`;

const MetricValue = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: ${Color.BLACK};
`;

interface FestivalDayDetailProps {
  workspaces: FestivalWorkspace[];
  onExclusionChanged?: () => void;
}

function FestivalDayDetail({ workspaces: initialWorkspaces, onExclusionChanged }: FestivalDayDetailProps) {
  const [sortKey, setSortKey] = useState<SortKey>('totalOrders');
  const [workspaces, setWorkspaces] = useState<FestivalWorkspace[]>(initialWorkspaces);
  const [showExcluded, setShowExcluded] = useState(false);
  const { setCalendarExclusion } = useSuperAdminFestivalCalendar();

  const activeWorkspaces = workspaces.filter((w) => !w.excluded);
  const excludedWorkspaces = workspaces.filter((w) => w.excluded);

  const totalOrders = activeWorkspaces.reduce((sum, w) => sum + w.totalOrders, 0);
  const totalRevenue = activeWorkspaces.reduce((sum, w) => sum + w.totalRevenue, 0);
  const universityCountMap = activeWorkspaces.reduce<Record<string, number>>((acc, w) => {
    acc[w.universityName] = (acc[w.universityName] ?? 0) + 1;
    return acc;
  }, {});

  const handleSetExclusion = (statisticId: number, excluded: boolean) => {
    setCalendarExclusion(statisticId, excluded).then(() => {
      setWorkspaces((prev) => prev.map((w) => (w.statisticId === statisticId ? { ...w, excluded } : w)));
      onExclusionChanged?.();
    });
  };

  const sorted = [...activeWorkspaces].sort((a, b) => b[sortKey] - a[sortKey]);

  return (
    <>
      <DaySummary>
        <SummaryItem>
          <SummaryLabel>총 주문</SummaryLabel>
          <SummaryValue>{formatNumber(totalOrders)}건</SummaryValue>
        </SummaryItem>
        <SummaryItem>
          <SummaryLabel>총 매출</SummaryLabel>
          <SummaryValue>{formatCurrency(totalRevenue)}</SummaryValue>
        </SummaryItem>
        <SummaryItem>
          <SummaryLabel>참여 대학</SummaryLabel>
          <SummaryValue>{Object.keys(universityCountMap).length}개교</SummaryValue>
        </SummaryItem>
      </DaySummary>
      <UniversitySection>
        <SectionLabel>참여 대학교</SectionLabel>
        <UniversityTagList>
          {Object.entries(universityCountMap).map(([name, count]) => (
            <UniversityTag key={name}>
              <span>{name}</span>
              <UniversityTagCount>{count}개</UniversityTagCount>
            </UniversityTag>
          ))}
        </UniversityTagList>
      </UniversitySection>
      <WorkspaceListHeader>
        <WorkspaceListLabel>주점 목록</WorkspaceListLabel>
        <SortToggle>
          <SortButton active={sortKey === 'totalOrders'} onClick={() => setSortKey('totalOrders')}>
            주문순
          </SortButton>
          <SortButton active={sortKey === 'totalRevenue'} onClick={() => setSortKey('totalRevenue')}>
            매출순
          </SortButton>
        </SortToggle>
      </WorkspaceListHeader>
      <WorkspaceList>
        {sorted.map((w) => (
          <WorkspaceCard key={w.workspaceId}>
            <WorkspaceCardHeader>
              <WorkspaceName to={getAdminWorkspacePath(w.workspaceId)} target="_blank" rel="noopener noreferrer">
                <span>{w.workspaceName}</span>
                <RiExternalLinkLine size={12} />
              </WorkspaceName>
              <WorkspaceCardActions>
                <UniversityBadge>{w.universityName}</UniversityBadge>
                <ExcludeButton title="달력에서 제외" onClick={() => handleSetExclusion(w.statisticId, true)}>
                  <RiEyeOffLine size={13} />
                </ExcludeButton>
              </WorkspaceCardActions>
            </WorkspaceCardHeader>
            <MetricsGrid>
              <Metric>
                <MetricLabel>주문 건수</MetricLabel>
                <MetricValue>{formatNumber(w.totalOrders)}건</MetricValue>
              </Metric>
              <Metric>
                <MetricLabel>매출</MetricLabel>
                <MetricValue>{formatCurrency(w.totalRevenue)}</MetricValue>
              </Metric>
              <Metric>
                <MetricLabel>평균 주문금액</MetricLabel>
                <MetricValue>{formatCurrency(w.averageOrderAmount)}</MetricValue>
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
      {excludedWorkspaces.length > 0 && (
        <ExcludedSection>
          <ExcludedSectionToggle onClick={() => setShowExcluded((v) => !v)}>
            <ExcludedSectionLabel>제외된 주점 ({excludedWorkspaces.length})</ExcludedSectionLabel>
            {showExcluded ? <RiArrowUpSLine size={16} color={Color.GREY} /> : <RiArrowDownSLine size={16} color={Color.GREY} />}
          </ExcludedSectionToggle>
          {showExcluded &&
            excludedWorkspaces.map((w) => (
              <ExcludedWorkspaceCard key={w.workspaceId}>
                <WorkspaceCardHeader>
                  <WorkspaceName to={getAdminWorkspacePath(w.workspaceId)} target="_blank" rel="noopener noreferrer">
                    <span>{w.workspaceName}</span>
                    <RiExternalLinkLine size={12} />
                  </WorkspaceName>
                  <WorkspaceCardActions>
                    <ExcludedOrderCount>{formatNumber(w.totalOrders)}건</ExcludedOrderCount>
                    <UniversityBadge>{w.universityName}</UniversityBadge>
                    <RestoreButton title="달력에 복원" onClick={() => handleSetExclusion(w.statisticId, false)}>
                      <RiEyeLine size={13} />
                    </RestoreButton>
                  </WorkspaceCardActions>
                </WorkspaceCardHeader>
              </ExcludedWorkspaceCard>
            ))}
        </ExcludedSection>
      )}
    </>
  );
}

export default FestivalDayDetail;
