import styled from '@emotion/styled';
import { useSetAtom } from 'jotai';
import { Location } from 'react-router-dom';
import { Workspace, RIGHT_SIDEBAR_ACTION } from '@@types/index';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { formatKoreanDate } from '@utils/formatNumber';
import { externalSidebarAtom } from '@jotai/atoms';
import { SUPER_ADMIN_ROUTES } from '@constants/routes';
import WorkspaceDetailContent from './WorkspaceDetailContent';

const Container = styled.div`
  width: 100%;
  cursor: pointer;
  padding: 12px 0;
  ${rowFlex({ align: 'center' })}

  &:hover .ws-name {
    color: ${Color.KIO_ORANGE};
  }
`;

const Info = styled.div`
  flex: 1;
  min-width: 0;
  gap: 2px;
  ${colFlex({ justify: 'center' })}
`;

const Name = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: ${Color.BLACK};
  transition: color 0.15s;
`;

const Sub = styled.div`
  font-size: 12px;
  color: ${Color.HEAVY_GREY};
`;

function SuperAdminWorkspaceContent(workspace: Workspace) {
  const setExternalSidebar = useSetAtom(externalSidebarAtom);

  const handleClick = () => {
    setExternalSidebar({
      action: RIGHT_SIDEBAR_ACTION.OPEN,
      title: workspace.name,
      content: (
        <WorkspaceDetailContent
          workspace={workspace}
          onClose={() => setExternalSidebar({ action: RIGHT_SIDEBAR_ACTION.CLOSE })}
        />
      ),
      location: { pathname: SUPER_ADMIN_ROUTES.WORKSPACE } as Location,
    });
  };

  return (
    <Container onClick={handleClick}>
      <Info>
        <Name className="ws-name">{workspace.name}</Name>
        <Sub>
          {formatKoreanDate(workspace.createdAt)} | {workspace.owner.name}
        </Sub>
      </Info>
    </Container>
  );
}

export default SuperAdminWorkspaceContent;
