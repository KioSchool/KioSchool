import styled from '@emotion/styled';
import { Workspace } from '@@types/index';
import { rowFlex } from '@styles/flexStyles';
import AddWorkspaceModalButton from './modal/AddWorkspaceModalButton';

const AddWorkspaceContainer = styled.form`
  cursor: pointer;
  width: 321px;
  height: 332px;
  border-radius: 25px;
  background: #eeecec;
  ${rowFlex({ justify: 'center', align: 'center' })}
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
