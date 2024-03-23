import styled from '@emotion/styled';
import plusLogo from '../../../resources/image/plusLogo.png';
import { Workspace } from '@@types/index';

const AddWorkspaceContainer = styled.form`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 321px;
  height: 332px;
  border-radius: 25px;
  border: 1px solid #000;
`;

type WrapperProps = {
  workspaces: Workspace[];
  modalOpen: () => void;
};

const AddWorkspace = ({ workspaces, modalOpen }: WrapperProps) => {
  const maxWorkspaceNum = 3;

  if (workspaces.length >= maxWorkspaceNum) return null;

  return (
    <AddWorkspaceContainer onClick={modalOpen}>
      <img src={plusLogo} width={'51px'} height={'51px'}></img>
    </AddWorkspaceContainer>
  );
};

export default AddWorkspace;
