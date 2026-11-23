import { useAtomValue, useSetAtom } from 'jotai';
import { match } from 'ts-pattern';
import { DEMO_STEP } from '@constants/data/demo/demoSteps';
import { demoStateAtom } from '@jotai/user/demoAtoms';
import { LandingButtonVariant } from '@styles/landingButtonStyles';

function useDemoActionButton() {
  const { step } = useAtomValue(demoStateAtom);
  const dispatch = useSetAtom(demoStateAtom);
  const { label, variant } = match(step === DEMO_STEP.CLOSING)
    .with(true, () => ({ label: '다 봤어요', variant: 'primary' as LandingButtonVariant }))
    .otherwise(() => ({ label: '대신 해 주기', variant: 'secondary' as LandingButtonVariant }));

  const handleClick = () => {
    dispatch({ type: 'DO_FOR_ME', now: Date.now() });
  };

  return { label, variant, handleClick };
}

export default useDemoActionButton;
