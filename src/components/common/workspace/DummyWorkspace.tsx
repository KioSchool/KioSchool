import { DummyWorkspaceContainer } from './Container';

const DummyWorkspace = (props: any) => {
  const maxDummyWorkspaceNum = 2;

  return (
    <>
      {props.workspaces.length < maxDummyWorkspaceNum &&
        Array.from({ length: maxDummyWorkspaceNum - props.workspaces.length }, (_, index) => <DummyWorkspaceContainer key={`dummy_${index}`} />)}
    </>
  );
};

export default DummyWorkspace;
