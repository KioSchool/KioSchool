import styled from '@emotion/styled';
import { useAtomValue } from 'jotai';
import { getDemoStep } from '@constants/data/demo/demoSteps';
import { demoStateAtom } from '@jotai/user/demoAtoms';
import { mobileMediaQuery } from '@styles/globalStyles';
import DemoChapterProgress from './DemoChapterProgress';
import DemoStage from './stage/DemoStage';

const Container = styled.div`
  width: 100%;
`;

// 폰은 체험 무대 머리줄에 진행 막대가 따로 있다
const ProgressArea = styled.div`
  ${mobileMediaQuery} {
    display: none;
  }
`;

function DemoStepContent() {
  const { step } = useAtomValue(demoStateAtom);

  return (
    <Container>
      <ProgressArea>
        <DemoChapterProgress currentChapter={getDemoStep(step).chapter} />
      </ProgressArea>
      <DemoStage />
    </Container>
  );
}

export default DemoStepContent;
