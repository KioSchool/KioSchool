import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { match } from 'ts-pattern';
import { useNavigate } from 'react-router-dom';
import { RiExternalLinkLine } from '@remixicon/react';
import useSuperAdminWorkspace from '@hooks/super-admin/useSuperAdminWorkspace';
import { Workspace, WorkspaceAdminDetail } from '@@types/index';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { formatKoreanDate } from '@utils/formatNumber';
import { getAdminWorkspacePath, getSuperAdminOrdersPath } from '@constants/routes';
import OnboardingBadge from './OnboardingBadge';
import WorkspaceRecentOrders from './WorkspaceRecentOrders';

const Wrap = styled.div`
  width: 100%;
  gap: 16px;
  ${colFlex()}
`;

const HeaderRow = styled.div`
  width: 100%;
  ${rowFlex({ justify: 'space-between', align: 'flex-start' })}
`;

const HeaderText = styled.div`
  gap: 2px;
  ${colFlex()}
`;

const TitleText = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: ${Color.BLACK};
`;

const SubText = styled.div`
  font-size: 12px;
  color: ${Color.GREY};
`;

const SectionTitle = styled.div`
  font-size: 11px;
  color: ${Color.GREY};
  text-transform: uppercase;
  letter-spacing: 0.04em;
  font-weight: 600;
  margin-bottom: 6px;
`;

const StatGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 8px;
`;

const StatCell = styled.div`
  background: #f7f7f7;
  border-radius: 6px;
  padding: 8px 10px;
  gap: 2px;
  ${colFlex()}
`;

const StatLabel = styled.div`
  font-size: 10px;
  color: ${Color.GREY};
`;

const StatValue = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: ${Color.BLACK};
`;

const StateText = styled.div`
  font-size: 12px;
  color: ${Color.HEAVY_GREY};
`;

const Footer = styled.div`
  width: 100%;
  margin-top: 6px;
  padding-top: 14px;
  border-top: 1px solid #f0f0f0;
  gap: 8px;
  ${colFlex()}
`;

const PrimaryCta = styled.button`
  height: 38px;
  border-radius: 6px;
  background: ${Color.KIO_ORANGE};
  color: ${Color.WHITE};
  border: none;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  gap: 6px;
  ${rowFlex({ justify: 'center', align: 'center' })}

  &:hover {
    background: ${Color.KIO_ORANGE_DARK};
  }
`;

const SecondaryCta = styled.button`
  height: 38px;
  border-radius: 6px;
  background: ${Color.WHITE};
  color: ${Color.GREY};
  border: 1px solid ${Color.HEAVY_GREY};
  font-size: 13px;
  cursor: pointer;
  ${rowFlex({ justify: 'center', align: 'center' })}

  &:hover {
    color: ${Color.BLACK};
    border-color: ${Color.GREY};
  }
`;

type DetailState = { kind: 'idle' } | { kind: 'loading' } | { kind: 'loaded'; detail: WorkspaceAdminDetail } | { kind: 'error' };

interface WorkspaceDetailContentProps {
  workspace: Workspace;
  onClose: () => void;
}

function WorkspaceDetailContent({ workspace, onClose }: WorkspaceDetailContentProps) {
  const [state, setState] = useState<DetailState>({ kind: 'idle' });
  const { fetchWorkspaceDetail } = useSuperAdminWorkspace();
  const navigate = useNavigate();

  useEffect(() => {
    let cancelled = false;
    setState({ kind: 'loading' });
    fetchWorkspaceDetail(workspace.id).then((detail) => {
      if (cancelled) return;
      setState(detail ? { kind: 'loaded', detail } : { kind: 'error' });
    });
    return () => {
      cancelled = true;
    };
  }, [workspace.id, fetchWorkspaceDetail]);

  const handleOpenAdmin = () => {
    window.open(getAdminWorkspacePath(workspace.id), '_blank', 'noopener,noreferrer');
  };

  const handleOpenWorkspaceOrders = () => {
    navigate(getSuperAdminOrdersPath({ workspaceId: workspace.id }));
    onClose();
  };

  return (
    <Wrap>
      <HeaderRow>
        <HeaderText>
          <TitleText>{workspace.name}</TitleText>
          <SubText>
            사장 {workspace.owner.name} · {formatKoreanDate(workspace.createdAt)} 가입
          </SubText>
        </HeaderText>
        <OnboardingBadge done={workspace.isOnboarding} />
      </HeaderRow>

      {match(state)
        .with({ kind: 'loading' }, () => <StateText>현황 불러오는 중...</StateText>)
        .with({ kind: 'error' }, () => <StateText>현황 정보를 불러오지 못했습니다.</StateText>)
        .with({ kind: 'idle' }, () => null)
        .with({ kind: 'loaded' }, ({ detail }) => (
          <div>
            <SectionTitle>현황</SectionTitle>
            <StatGrid>
              <StatCell>
                <StatLabel>멤버</StatLabel>
                <StatValue>{detail.memberCount}명</StatValue>
              </StatCell>
              <StatCell>
                <StatLabel>상품</StatLabel>
                <StatValue>{detail.productCount}개</StatValue>
              </StatCell>
              <StatCell>
                <StatLabel>테이블</StatLabel>
                <StatValue>{detail.tableCount}개</StatValue>
              </StatCell>
            </StatGrid>
          </div>
        ))
        .exhaustive()}

      <WorkspaceRecentOrders workspaceId={workspace.id} />

      <Footer>
        <SectionTitle>바로 가기</SectionTitle>
        <PrimaryCta onClick={handleOpenAdmin}>
          {workspace.name} 어드민 새 탭으로 열기
          <RiExternalLinkLine size={14} />
        </PrimaryCta>
        <SecondaryCta onClick={handleOpenWorkspaceOrders}>이 워크스페이스의 주문만 보기</SecondaryCta>
      </Footer>
    </Wrap>
  );
}

export default WorkspaceDetailContent;
