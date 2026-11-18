import styled from '@emotion/styled';
import { useAtomValue, useSetAtom } from 'jotai';
import { match } from 'ts-pattern';
import { DEMO_STEP, DEMO_STEPS } from '@constants/data/demo/demoSteps';
import LandingButton from '@components/user/landing/LandingButton';
import { demoStateAtom } from '@jotai/user/demoAtoms';
import { LandingColor } from '@resources/colors';
import { DEMO_STAGE_WIDTH } from '@styles/demoStyles';
import { rowFlex } from '@styles/flexStyles';
import { mobileMediaQuery } from '@styles/globalStyles';

const Container = styled.div`
  width: 100%;
  max-width: ${DEMO_STAGE_WIDTH}px;
  margin: 32px auto 0;
  ${rowFlex({ justify: 'space-between', align: 'center' })}

  ${mobileMediaQuery} {
    margin-top: 16px;
  }
`;

const Count = styled.span`
  font-size: 15px;
  font-weight: 600;
  color: ${LandingColor.CAPTION};
`;

function DemoActions() {
  const { step } = useAtomValue(demoStateAtom);
  const dispatch = useSetAtom(demoStateAtom);
  const isClosing = step === DEMO_STEP.CLOSING;
  const button = match(isClosing)
    .with(true, () => ({ label: '다 봤어요', variant: 'primary' as const }))
    .otherwise(() => ({ label: '대신 해 주기', variant: 'secondary' as const }));

  const handleClick = () => {
    dispatch({ type: 'DO_FOR_ME', now: Date.now() });
  };

  return (
    <Container>
      <Count>
        {step} / {DEMO_STEPS.length}
      </Count>
      <LandingButton label={button.label} variant={button.variant} onClick={handleClick} />
    </Container>
  );
}

export default DemoActions;
