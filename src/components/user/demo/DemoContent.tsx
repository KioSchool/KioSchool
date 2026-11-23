import styled from '@emotion/styled';
import { useAtomValue } from 'jotai';
import { match } from 'ts-pattern';
import { demoStateAtom } from '@jotai/user/demoAtoms';
import useDemoProgressSync from '@hooks/user/useDemoProgressSync';
import DemoNoticeToaster from './stage/DemoNoticeToaster';
import DemoEndCard from './DemoEndCard';
import DemoStepContent from './DemoStepContent';

const Container = styled.div`
  width: 100%;
`;

function DemoContent() {
  const { step, isFinished } = useAtomValue(demoStateAtom);
  const stepValue = match(isFinished)
    .with(true, () => 'end')
    .otherwise(() => String(step));

  useDemoProgressSync();

  return (
    <Container data-demo-step={stepValue}>
      {match(isFinished)
        .with(true, () => <DemoEndCard />)
        .otherwise(() => (
          <DemoStepContent />
        ))}
      <DemoNoticeToaster />
    </Container>
  );
}

export default DemoContent;
