import { AddWorkspaceContainer } from './Container';
import plusLogo from '../../../resources/image/plusLogo.png';
const AddWorkspace = (props: any) => {
  const maxWorkspaceNum = 3;

  if (props.workspaces.length >= maxWorkspaceNum) return null;

  return (
    <AddWorkspaceContainer onClick={props.modalOpen}>
      <img src={plusLogo} width={'51px'} height={'51px'}></img>
    </AddWorkspaceContainer>
  );
};

export default AddWorkspace;
