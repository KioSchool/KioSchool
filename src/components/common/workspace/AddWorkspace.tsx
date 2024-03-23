import styled from '@emotion/styled';
import plusLogo from '../../../resources/image/plusLogo.png';

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
