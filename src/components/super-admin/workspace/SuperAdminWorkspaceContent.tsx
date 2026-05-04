import { useState } from 'react';
import { Workspace, WorkspaceAdminDetail } from '@@types/index';
import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import useSuperAdminWorkspace from '@hooks/super-admin/useSuperAdminWorkspace';
import { RiArrowDownSLine, RiArrowUpSLine } from '@remixicon/react';

const Container = styled.div`
  width: 100%;
  ${colFlex({ justify: 'center', align: 'start' })}
`;

const MainRow = styled.div`
  width: 100%;
  min-height: 80px;
  gap: 12px;
  ${rowFlex({ align: 'center' })}
`;

const WorkspaceInfo = styled.div`
  flex: 1;
  ${colFlex({ justify: 'center' })}
`;

const SubLabelContainer = styled.div`
  color: ${Color.HEAVY_GREY};
  ${rowFlex()}
`;

const WorkspaceLabel = styled.div`
  text-align: center;
  font-size: 18px;
  font-weight: 400;
  text-decoration: none;
  color: ${Color.GREY};
  cursor: pointer;
  transition: ease-in 0.1s;
  &:hover {
    color: ${Color.KIO_ORANGE};
    text-decoration: underline;
  }
`;

const ActionRow = styled.div`
  gap: 8px;
  flex-shrink: 0;
  ${rowFlex({ align: 'center' })}
`;

const ToggleButton = styled.button`
  height: 32px;
  padding: 0 12px;
  border-radius: 8px;
  background: ${Color.LIGHT_GREY};
  color: ${Color.GREY};
  border: 1px solid ${Color.HEAVY_GREY};
  font-size: 13px;
  cursor: pointer;
  gap: 4px;
  transition: all 0.15s;
  ${rowFlex({ align: 'center' })}
  &:hover {
    border-color: ${Color.GREY};
  }
`;

const DetailPanel = styled.div`
  width: 100%;
  padding: 20px;
  background: ${Color.LIGHT_GREY};
  border-radius: 12px;
  border: 1px solid ${Color.HEAVY_GREY};
  margin-bottom: 12px;
  gap: 16px;
  ${colFlex()}
`;

const DetailGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
`;

const DetailItem = styled.div`
  gap: 4px;
  ${colFlex()}
`;

const DetailLabel = styled.div`
  font-size: 12px;
  color: ${Color.HEAVY_GREY};
  font-weight: 500;
`;

const DetailValue = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: ${Color.BLACK};
`;

const OnboardingBadge = styled.span<{ done: boolean }>`
  padding: 3px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 700;
  background: ${({ done }) => (done ? '#EDF9F1' : '#FFF3E7')};
  color: ${({ done }) => (done ? Color.GREEN : Color.KIO_ORANGE)};
`;

const LoadingText = styled.div`
  font-size: 14px;
  color: ${Color.HEAVY_GREY};
`;

function SuperAdminWorkspaceContent({ id, name, owner, createdAt }: Workspace) {
  const datePart = createdAt.split('T')[0];
  const filteredCreatedDate = datePart.replace(/-/g, '.');
  const createdDateAndOwnerText = `${filteredCreatedDate} | ${owner.name}`;

  const [showDetail, setShowDetail] = useState(false);
  const [detail, setDetail] = useState<WorkspaceAdminDetail | null>(null);
  const [loadingDetail, setLoadingDetail] = useState(false);

  const { fetchWorkspaceDetail } = useSuperAdminWorkspace();

  const handleToggleDetail = async () => {
    if (!showDetail && !detail) {
      setLoadingDetail(true);
      const result = await fetchWorkspaceDetail(id);
      setDetail(result);
      setLoadingDetail(false);
    }
    setShowDetail((prev) => !prev);
  };

  return (
    <Container>
      <MainRow>
        <WorkspaceInfo>
          <WorkspaceLabel
            onClick={() => {
              window.open(`${window.location.origin}/admin/workspace/${id}`, '_blank', 'rel=noopener noreferrer popup=false');
            }}
            className={'workspace-label'}
          >
            {name}
          </WorkspaceLabel>
          <SubLabelContainer className={'sub-label-container'}>{createdDateAndOwnerText}</SubLabelContainer>
        </WorkspaceInfo>
        <ActionRow>
          <ToggleButton onClick={handleToggleDetail}>
            {showDetail ? <RiArrowUpSLine size={16} /> : <RiArrowDownSLine size={16} />}
            {showDetail ? '닫기' : '상세'}
          </ToggleButton>
        </ActionRow>
      </MainRow>

      {showDetail && (
        <DetailPanel>
          {loadingDetail ? (
            <LoadingText>불러오는 중...</LoadingText>
          ) : detail ? (
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
                    <OnboardingBadge done={detail.isOnboarding}>{detail.isOnboarding ? '완료' : '미완료'}</OnboardingBadge>
                  </DetailValue>
                </DetailItem>
              </DetailGrid>
            </>
          ) : (
            <LoadingText>상세 정보를 불러오지 못했습니다.</LoadingText>
          )}
        </DetailPanel>
      )}
    </Container>
  );
}

export default SuperAdminWorkspaceContent;
