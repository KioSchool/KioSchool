import { useAtomValue, useSetAtom } from 'jotai';
import { match } from 'ts-pattern';
import { DEMO_ACTION } from '@constants/analytics';
import { DEMO_STEP } from '@constants/data/demo/demoSteps';
import { demoStateAtom } from '@jotai/user/demoAtoms';
import { LandingButtonVariant } from '@styles/landingButtonStyles';
import { markDemoSkip, trackDemoAction } from '@utils/demo/demoAnalytics';

function useDemoActionButton() {
  const { step } = useAtomValue(demoStateAtom);
  const dispatch = useSetAtom(demoStateAtom);
  const isClosing = step === DEMO_STEP.CLOSING;
  const { label, variant } = match(isClosing)
    .with(true, () => ({ label: '다 봤어요', variant: 'primary' as LandingButtonVariant }))
    .otherwise(() => ({ label: '건너뛰기', variant: 'secondary' as LandingButtonVariant }));

  const handleClick = () => {
    if (!isClosing) {
      markDemoSkip();
      trackDemoAction(DEMO_ACTION.SKIP, step);
    }
    dispatch({ type: 'DO_FOR_ME', now: Date.now() });
  };

  return { label, variant, handleClick };
}

export default useDemoActionButton;
