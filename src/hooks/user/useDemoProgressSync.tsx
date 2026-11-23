import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAtomValue } from 'jotai';
import { match } from 'ts-pattern';
import { DEMO_ACTION, GA_EVENT } from '@constants/analytics';
import { DEMO_ENTRY_PARAM, DEMO_STEP_PARAM } from '@constants/routes';
import { getDemoStep } from '@constants/data/demo/demoSteps';
import { demoStateAtom } from '@jotai/user/demoAtoms';
import { trackEvent } from '@utils/analytics';
import { finishDemoStep, getDemoLayout, getDemoRunSummary, markDemoLeft, parseDemoEntry, startDemoRun, trackDemoAction } from '@utils/demo/demoAnalytics';

const END_VALUE = 'end';
const NO_RUN = -1;

function useDemoProgressSync() {
  const { step, isFinished, startedAt } = useAtomValue(demoStateAtom);
  const [searchParams, setSearchParams] = useSearchParams();
  const [entry] = useState(() => parseDemoEntry(searchParams.get(DEMO_ENTRY_PARAM)));
  const progressRef = useRef({ startedAt: NO_RUN, maxStep: 0 });
  const liveRef = useRef({ step, isFinished });
  const stepValue = match(isFinished)
    .with(true, () => END_VALUE)
    .otherwise(() => String(step));

  liveRef.current = { step, isFinished };

  useEffect(() => {
    setSearchParams({ [DEMO_STEP_PARAM]: stepValue }, { replace: true });
  }, [stepValue, setSearchParams]);

  // 같은 체험에서 처음 닿은 단계만 센다. 되돌리기나 끝난 주소로 다시 들어온 경우는 세지 않는다
  useEffect(() => {
    const progress = progressRef.current;
    const now = Date.now();
    const layout = getDemoLayout();
    if (progress.startedAt !== startedAt) {
      if (progress.startedAt !== NO_RUN) trackDemoAction(DEMO_ACTION.RESTART, progress.maxStep);
      progressRef.current = { startedAt, maxStep: step };
      startDemoRun(now);
      if (!isFinished) trackEvent(GA_EVENT.DEMO_STEP, { step, device: getDemoStep(step).device, is_entry: true, layout, entry });
      return;
    }
    if (isFinished) {
      trackEvent(GA_EVENT.DEMO_STEP_DONE, { step: progress.maxStep, ...finishDemoStep(now), layout });
      trackEvent(GA_EVENT.DEMO_COMPLETE, { ...getDemoRunSummary(now), layout, entry });
      return;
    }
    if (step <= progress.maxStep) return;
    trackEvent(GA_EVENT.DEMO_STEP_DONE, { step: progress.maxStep, ...finishDemoStep(now), layout });
    progressRef.current = { startedAt, maxStep: step };
    trackEvent(GA_EVENT.DEMO_STEP, { step, device: getDemoStep(step).device, layout, entry });
  }, [step, isFinished, startedAt, entry]);

  // 체험 도중 다른 앱·탭으로 가거나 닫으면 그때의 단계와 누적 탭을 남긴다. 폰 Safari는 pagehide가 잘 안 와서 visibilitychange를 같이 본다
  useEffect(() => {
    const handleLeave = () => {
      if (document.visibilityState !== 'hidden' || liveRef.current.isFinished || !markDemoLeft()) return;
      trackEvent(GA_EVENT.DEMO_LEAVE, { step: liveRef.current.step, ...getDemoRunSummary(Date.now()), layout: getDemoLayout(), entry });
    };
    document.addEventListener('visibilitychange', handleLeave);
    window.addEventListener('pagehide', handleLeave);
    return () => {
      document.removeEventListener('visibilitychange', handleLeave);
      window.removeEventListener('pagehide', handleLeave);
    };
  }, [entry]);
}

export default useDemoProgressSync;
