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
  const dummyArray = new Array(maxDummyWorkspaceNum - workspaces.length).fill(1);

  return (
    <>
      {dummyArray.map((_, index) => {
        return <DummyWorkspaceContainer key={`dummy_${index}`} />;
      })}
    </>
  );
};

export default DummyWorkspace;
