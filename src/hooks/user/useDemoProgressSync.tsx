import { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAtomValue } from 'jotai';
import { match } from 'ts-pattern';
import { GA_EVENT } from '@constants/analytics';
import { DEMO_STEP_PARAM } from '@constants/routes';
import { getDemoStep } from '@constants/data/demo/demoSteps';
import { demoStateAtom } from '@jotai/user/demoAtoms';
import { trackEvent } from '@utils/analytics';

const END_VALUE = 'end';

function useDemoProgressSync() {
  const { step, isFinished, startedAt } = useAtomValue(demoStateAtom);
  const [, setSearchParams] = useSearchParams();
  const progressRef = useRef({ startedAt: -1, maxStep: 0 });
  const stepValue = match(isFinished)
    .with(true, () => END_VALUE)
    .otherwise(() => String(step));

  useEffect(() => {
    setSearchParams({ [DEMO_STEP_PARAM]: stepValue }, { replace: true });
  }, [stepValue, setSearchParams]);

  // 같은 체험에서 처음 닿은 단계만 센다. 되돌리기나 끝난 주소로 다시 들어온 경우는 세지 않는다
  useEffect(() => {
    const progress = progressRef.current;
    const isNewRun = progress.startedAt !== startedAt;
    if (isNewRun) {
      progressRef.current = { startedAt, maxStep: step };
      if (!isFinished) trackEvent(GA_EVENT.DEMO_STEP, { step, device: getDemoStep(step).device, is_entry: true });
      return;
    }
    if (isFinished) {
      trackEvent(GA_EVENT.DEMO_COMPLETE, {});
      return;
    }
    if (step <= progress.maxStep) return;
    progressRef.current = { startedAt, maxStep: step };
    trackEvent(GA_EVENT.DEMO_STEP, { step, device: getDemoStep(step).device });
  }, [step, isFinished, startedAt]);
}

export default useDemoProgressSync;
