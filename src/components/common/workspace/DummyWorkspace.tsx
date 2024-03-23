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

interface Props {
  workspaces: Workspace[];
}

const DummyWorkspace = ({ workspaces }: Props) => {
  const maxDummyWorkspaceNumber = 2;
  const dummyArray = new Array(Math.max(maxDummyWorkspaceNumber - workspaces.length, 0)).fill(1);

  if (maxDummyWorkspaceNumber <= workspaces.length) return null;

  return (
    <>
      {dummyArray.map((_, index) => {
        return <DummyWorkspaceContainer key={`dummy_${index}`} />;
      })}
    </>
  );
};

export default DummyWorkspace;
