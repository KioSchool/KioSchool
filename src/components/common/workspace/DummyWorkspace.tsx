import { Workspace } from '@@types/index';
import styled from '@emotion/styled';

const DummyWorkspaceContainer = styled.div`
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
};

const DummyWorkspace = ({ workspaces }: WrapperProps) => {
  const maxDummyWorkspaceNum = 2;

  return (
    <>
      {workspaces.length < maxDummyWorkspaceNum &&
        Array.from({ length: maxDummyWorkspaceNum - workspaces.length }, (_, index) => <DummyWorkspaceContainer key={`dummy_${index}`} />)}
    </>
  );
};

export default DummyWorkspace;
