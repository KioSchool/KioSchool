import { Workspace } from '@@types/index';
import styled from '@emotion/styled';
import { rowFlex } from '@styles/flexStyles';

const DummyWorkspaceContainer = styled.div`
  width: 321px;
  height: 332px;
  border-radius: 25px;
  background: #eeecec;
  ${rowFlex({ justify: 'center', align: 'center' })}
`;

interface Props {
  workspaces: Workspace[];
}

function DummyWorkspace({ workspaces }: Props) {
  const maxDummyWorkspaceNumber = 2;
  const dummyArray = new Array(Math.max(maxDummyWorkspaceNumber - workspaces.length, 0)).fill(1);

  if (maxDummyWorkspaceNumber <= workspaces.length) return null;

  return (
    <>
      {dummyArray.map((_, index) => {
        return <DummyWorkspaceContainer key={`dummy_${index}`} className={'dummy-workspace-container'} />;
      })}
    </>
  );
}

export default DummyWorkspace;
