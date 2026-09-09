import styled from '@emotion/styled';
import { Workspace } from '@@types/index';
import { rowFlex } from '@styles/flexStyles';
import AddWorkspaceModalButton from '@components/common/workspace/modal/AddWorkspaceModalButton';
import { Color } from '@resources/colors';

const MAX_WORKSPACE_NUMBER = 3;

const AddWorkspaceContainer = styled.div`
  width: calc((100% - 40px) / 3);
  max-width: 380px;
  min-width: 0;
  height: 350px;
  border: 1px solid ${Color.BORDER_GREY};
  border-radius: 16px;
  background: ${Color.WHITE};
  box-shadow: 0px 4px 20px rgba(92, 92, 92, 0.25);
  ${rowFlex({ justify: 'center', align: 'center' })};
`;

interface AddWorkspaceProps {
  workspaces: Workspace[];
}

function AddWorkspace({ workspaces }: AddWorkspaceProps) {
  if (workspaces.length >= MAX_WORKSPACE_NUMBER) return null;

  return (
    <AddWorkspaceContainer className={'add-workspace-container'}>
      <AddWorkspaceModalButton />
    </AddWorkspaceContainer>
  );
}

export default AddWorkspace;
