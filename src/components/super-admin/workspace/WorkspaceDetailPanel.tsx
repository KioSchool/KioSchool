import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { match } from 'ts-pattern';
import useSuperAdminWorkspace from '@hooks/super-admin/useSuperAdminWorkspace';
import { WorkspaceAdminDetail } from '@@types/index';
import { Color } from '@resources/colors';
import { colFlex } from '@styles/flexStyles';
import OnboardingBadge from './OnboardingBadge';
import WorkspaceRecentOrders from './WorkspaceRecentOrders';

const Panel = styled.div`
  width: 100%;
  padding: 14px;
  background: ${Color.LIGHT_GREY};
  border-radius: 10px;
  border: 1px solid ${Color.HEAVY_GREY};
  margin-bottom: 10px;
  gap: 14px;
  ${colFlex()}
`;

const DetailGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 10px;
`;

const DetailItem = styled.div`
  gap: 2px;
  ${colFlex()}
`;

const DetailLabel = styled.div`
  font-size: 11px;
  color: ${Color.GREY};
  font-weight: 500;
`;

const DetailValue = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: ${Color.BLACK};
`;

const StateText = styled.div`
  font-size: 12px;
  color: ${Color.HEAVY_GREY};
`;

interface DetailBodyProps {
  detail: WorkspaceAdminDetail;
  workspaceId: number;
}

function DetailBody({ detail, workspaceId }: DetailBodyProps) {
  return (
    <>
      <DetailGrid>
        <DetailItem>
          <DetailLabel>멤버 수</DetailLabel>
          <DetailValue>{detail.memberCount}명</DetailValue>
        </DetailItem>
        <DetailItem>
          <DetailLabel>상품 수</DetailLabel>
          <DetailValue>{detail.productCount}개</DetailValue>
        </DetailItem>
        <DetailItem>
          <DetailLabel>테이블 수</DetailLabel>
          <DetailValue>{detail.tableCount}개</DetailValue>
        </DetailItem>
        <DetailItem>
          <DetailLabel>온보딩</DetailLabel>
          <DetailValue>
            <OnboardingBadge done={detail.isOnboarding} />
          </DetailValue>
        </DetailItem>
      </DetailGrid>
      <WorkspaceRecentOrders workspaceId={workspaceId} />
    </>
  );
}

interface WorkspaceDetailPanelProps {
  workspaceId: number;
  isOpen: boolean;
}

type DetailState = { kind: 'idle' } | { kind: 'loading' } | { kind: 'loaded'; detail: WorkspaceAdminDetail } | { kind: 'error' };

function WorkspaceDetailPanel({ workspaceId, isOpen }: WorkspaceDetailPanelProps) {
  const [state, setState] = useState<DetailState>({ kind: 'idle' });
  const { fetchWorkspaceDetail } = useSuperAdminWorkspace();

  useEffect(() => {
    if (!isOpen || state.kind !== 'idle') return;
    let cancelled = false;
    setState({ kind: 'loading' });
    fetchWorkspaceDetail(workspaceId).then((detail) => {
      if (cancelled) return;
      setState(detail ? { kind: 'loaded', detail } : { kind: 'error' });
    });
    return () => {
      cancelled = true;
    };
  }, [isOpen, workspaceId, fetchWorkspaceDetail, state.kind]);

  if (!isOpen) return null;

  return (
    <Panel>
      {match(state)
        .with({ kind: 'idle' }, () => <StateText>준비 중...</StateText>)
        .with({ kind: 'loading' }, () => <StateText>불러오는 중...</StateText>)
        .with({ kind: 'error' }, () => <StateText>상세 정보를 불러오지 못했습니다.</StateText>)
        .with({ kind: 'loaded' }, ({ detail }) => <DetailBody detail={detail} workspaceId={workspaceId} />)
        .exhaustive()}
    </Panel>
  );
}

export default WorkspaceDetailPanel;
