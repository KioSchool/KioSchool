import { DEMO_ENTRY, DemoAction, DemoEntry, GA_EVENT } from '@constants/analytics';
import { MOBILE_BREAKPOINT } from '@styles/globalStyles';
import { trackEvent } from '@utils/analytics';

const MS_PER_SECOND = 1000;

export type DemoStepMethod = 'direct' | 'skip';

interface DemoRunMetrics {
  startedAt: number;
  stepStartedAt: number;
  taps: number;
  stepTaps: number;
  skips: number;
  method: DemoStepMethod;
  hasLeft: boolean;
}

// 탭마다 상태를 바꾸면 체험 화면 전체가 다시 그려지므로, 한 페이지에 하나뿐인 체험의 집계값은 모듈 안에 둔다
let metrics: DemoRunMetrics = { startedAt: 0, stepStartedAt: 0, taps: 0, stepTaps: 0, skips: 0, method: 'direct', hasLeft: false };

const DEMO_ENTRY_VALUES: string[] = Object.values(DEMO_ENTRY);

export function parseDemoEntry(value: string | null): DemoEntry {
  if (value !== null && DEMO_ENTRY_VALUES.includes(value)) return value as DemoEntry;
  return DEMO_ENTRY.DIRECT;
}

export function getDemoLayout() {
  if (window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`).matches) return 'mobile';
  return 'desktop';
}

const secondsSince = (from: number, now: number) => Math.round((now - from) / MS_PER_SECOND);

export function startDemoRun(now: number) {
  metrics = { startedAt: now, stepStartedAt: now, taps: 0, stepTaps: 0, skips: 0, method: 'direct', hasLeft: false };
}

export function recordDemoTap() {
  metrics.taps += 1;
  metrics.stepTaps += 1;
}

export function markDemoSkip() {
  metrics.method = 'skip';
  metrics.skips += 1;
}

export function finishDemoStep(now: number) {
  const result = { method: metrics.method, taps: metrics.stepTaps, seconds: secondsSince(metrics.stepStartedAt, now) };
  metrics.stepStartedAt = now;
  metrics.stepTaps = 0;
  metrics.method = 'direct';
  return result;
}

export function getDemoRunSummary(now: number) {
  return { taps: metrics.taps, seconds: secondsSince(metrics.startedAt, now), skips: metrics.skips };
}

/** 한 번의 체험에서 처음 화면을 떠날 때만 true */
export function markDemoLeft() {
  if (metrics.hasLeft) return false;
  metrics.hasLeft = true;
  return true;
}

export function trackDemoAction(action: DemoAction, step: number) {
  trackEvent(GA_EVENT.DEMO_ACTION, { action, step, layout: getDemoLayout() });
}
