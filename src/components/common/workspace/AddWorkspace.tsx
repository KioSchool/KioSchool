import styled from '@emotion/styled';
import { Workspace } from '@@types/index';
import { rowFlex } from '@styles/flexStyles';
import AddWorkspaceModalButton from './modal/AddWorkspaceModalButton';
import { Color } from '@resources/colors';

const AddWorkspaceContainer = styled.form`
  cursor: pointer;
  width: 380px;
  height: 350px;
  border: 1px solid #e8eef2;
  border-radius: 16px;
  background: ${Color.WHITE};
  box-shadow: 0px 4px 20px rgba(92, 92, 92, 0.25);
  ${rowFlex({ justify: 'center', align: 'center' })};
`;

interface Props {
  workspaces: Workspace[];
}

function AddWorkspace({ workspaces }: Props) {
  const maxWorkspaceNumber = 3;

  if (workspaces.length >= maxWorkspaceNumber) return null;

  return (
    <AddWorkspaceContainer className={'add-workspace-container'}>
      <AddWorkspaceModalButton />
    </AddWorkspaceContainer>
  );
}

export default AddWorkspace;
