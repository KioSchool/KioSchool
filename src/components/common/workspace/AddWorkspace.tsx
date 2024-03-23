import { AddWorkspaceContainer } from './Container';
import plusLogo from '../../../resources/image/plusLogo.png';
const AddWorkspace = (props: any) => {
  return (
    <>
      {props.workspaces.length < 3 && (
        <AddWorkspaceContainer onClick={props.modalOpen}>
          <img src={plusLogo} width={'51px'} height={'51px'}></img>
        </AddWorkspaceContainer>
      )}
    </>
  );
};

export default AddWorkspace;
