import { useState } from 'react';
import styled from '@emotion/styled';
import { RiArrowDownSLine, RiArrowUpSLine } from '@remixicon/react';
import { Workspace } from '@@types/index';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { formatKoreanDate } from '@utils/formatNumber';
import WorkspaceDetailPanel from './WorkspaceDetailPanel';

const Container = styled.div`
  width: 100%;
  ${colFlex({ justify: 'center', align: 'start' })}
`;

const MainRow = styled.div`
  width: 100%;
  min-height: 56px;
  gap: 10px;
  ${rowFlex({ align: 'center' })}
`;

const WorkspaceInfo = styled.div`
  flex: 1;
  min-width: 0;
  gap: 2px;
  ${colFlex({ justify: 'center' })}
`;

const SubLabelContainer = styled.div`
  font-size: 12px;
  color: ${Color.HEAVY_GREY};
  ${rowFlex()}
`;

const WorkspaceLabel = styled.div`
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  color: ${Color.BLACK};
  cursor: pointer;
  transition: color 0.15s;

  &:hover {
    color: ${Color.KIO_ORANGE};
  }
`;

const ActionRow = styled.div`
  gap: 6px;
  flex-shrink: 0;
  ${rowFlex({ align: 'center' })}
`;

const ToggleButton = styled.button`
  height: 30px;
  padding: 0 10px;
  border-radius: 6px;
  background: transparent;
  color: ${Color.GREY};
  border: 1px solid ${Color.HEAVY_GREY};
  font-size: 12px;
  cursor: pointer;
  gap: 4px;
  transition: border-color 0.15s, color 0.15s;
  ${rowFlex({ align: 'center' })}

  &:hover {
    border-color: ${Color.GREY};
    color: ${Color.BLACK};
  }
`;

function SuperAdminWorkspaceContent({ id, name, owner, createdAt }: Workspace) {
  const subLabel = `${formatKoreanDate(createdAt)} | ${owner.name}`;
  const [showDetail, setShowDetail] = useState(false);

  const handleOpenWorkspace = () => {
    window.open(`${window.location.origin}/admin/workspace/${id}`, '_blank', 'rel=noopener noreferrer popup=false');
  };

  const handleToggleDetail = () => {
    setShowDetail((prev) => !prev);
  };

  return (
    <Container>
      <MainRow>
        <WorkspaceInfo>
          <WorkspaceLabel onClick={handleOpenWorkspace}>{name}</WorkspaceLabel>
          <SubLabelContainer className={'sub-label-container'}>{subLabel}</SubLabelContainer>
        </WorkspaceInfo>
        <ActionRow>
          <ToggleButton type="button" onClick={handleToggleDetail}>
            {showDetail ? <RiArrowUpSLine size={14} /> : <RiArrowDownSLine size={14} />}
            {showDetail ? '닫기' : '상세'}
          </ToggleButton>
        </ActionRow>
      </MainRow>
      <WorkspaceDetailPanel workspaceId={id} isOpen={showDetail} />
    </Container>
  );
}

export default SuperAdminWorkspaceContent;
