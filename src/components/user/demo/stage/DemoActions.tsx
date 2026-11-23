import styled from '@emotion/styled';
import { useAtomValue } from 'jotai';
import { DEMO_STEPS } from '@constants/data/demo/demoSteps';
import LandingButton from '@components/user/landing/LandingButton';
import useDemoActionButton from '@hooks/user/useDemoActionButton';
import { demoStateAtom } from '@jotai/user/demoAtoms';
import { LandingColor } from '@resources/colors';
import { DEMO_STAGE_WIDTH } from '@styles/demoStyles';
import { rowFlex } from '@styles/flexStyles';

const Container = styled.div`
  width: 100%;
  max-width: ${DEMO_STAGE_WIDTH}px;
  margin: 32px auto 0;
  ${rowFlex({ justify: 'space-between', align: 'center' })}
`;

const Count = styled.span`
  font-size: 15px;
  font-weight: 600;
  color: ${LandingColor.CAPTION};
`;

function DemoActions() {
  const { step } = useAtomValue(demoStateAtom);
  const { label, variant, handleClick } = useDemoActionButton();

  return (
    <Container>
      <Count>
        {step} / {DEMO_STEPS.length}
      </Count>
      <LandingButton label={label} variant={variant} onClick={handleClick} />
    </Container>
  );
}

export default DemoActions;
