import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { DEMO_STEP_PARAM } from '@constants/routes';
import { DEMO_FINISHED_STEP, DEMO_STEPS } from '@constants/data/demo/demoSteps';

const END_VALUE = 'end';
const FIRST_STEP = 1;

export function parseDemoStep(value: string | null): number {
  if (value === END_VALUE) return DEMO_FINISHED_STEP;

  const step = Number(value);
  if (Number.isInteger(step) && step >= FIRST_STEP && step <= DEMO_STEPS.length) return step;
  return FIRST_STEP;
}

function useDemoStep() {
  const [searchParams] = useSearchParams();
  const [initialStep] = useState(() => parseDemoStep(searchParams.get(DEMO_STEP_PARAM)));

  return initialStep;
}

export default useDemoStep;
