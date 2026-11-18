import styled from '@emotion/styled';
import { useAtomValue } from 'jotai';
import { getDemoStep } from '@constants/data/demo/demoSteps';
import { demoStateAtom } from '@jotai/user/demoAtoms';
import DemoChapterProgress from './DemoChapterProgress';
import DemoStage from './stage/DemoStage';

const Container = styled.div`
  width: 100%;
`;

function DemoStepContent() {
  const { step } = useAtomValue(demoStateAtom);

  return (
    <Container>
      <DemoChapterProgress currentChapter={getDemoStep(step).chapter} stepNumber={step} />
      <DemoStage />
    </Container>
  );
}

export default DemoStepContent;
