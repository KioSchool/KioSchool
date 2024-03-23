import { DummyWorkspaceContainer } from './Container';

const DummyWorkspace = (props: any) => {
  return (
    <>
      {props.workspaces.length < 2 &&
        Array.from({ length: 2 - props.workspaces.length }, (_, index) => <DummyWorkspaceContainer key={`dummy_${index}`}></DummyWorkspaceContainer>)}
    </>
  );
};

export default DummyWorkspace;
