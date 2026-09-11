import { OrderSession } from '@@types/index';
import { formatKoreanTime } from './formatDate';

const MS_PER_MINUTE = 60 * 1000;
const MINUTES_PER_HOUR = 60;
const FULL_PERCENT = 100;

export function getElapsedMs(session: OrderSession | null): number {
  if (!session) return 0;

  const start = new Date(session.createdAt).getTime();
  // 클라이언트 시계가 서버보다 뒤면 음수 → 게이지가 꽉 차 보인다
  return Math.max(0, Date.now() - start);
}

export function getTotalMs(session: OrderSession | null): number {
  if (!session || !session.expectedEndAt) return 0;

  const start = new Date(session.createdAt).getTime();
  const end = new Date(session.expectedEndAt).getTime();
  return end - start;
}

export function getElapsedPercent(session: OrderSession | null): number {
  if (!session || !session.expectedEndAt) return 0;

  const total = getTotalMs(session);
  if (total <= 0) return FULL_PERCENT;

  const elapsed = getElapsedMs(session);
  return Math.min(FULL_PERCENT, (elapsed / total) * FULL_PERCENT);
}

export function hasTimeLimit(session: OrderSession | null): boolean {
  return Boolean(session?.expectedEndAt);
}

export function getRemainingMs(session: OrderSession | null): number {
  if (!session?.expectedEndAt) return 0;

  return new Date(session.expectedEndAt).getTime() - Date.now();
}

// 내림하면 실제 종료 1분 전부터 "0분"이 된다
export function ceilToMinute(ms: number): number {
  return Math.ceil(ms / MS_PER_MINUTE) * MS_PER_MINUTE;
}

export function formatShortDuration(ms: number): string {
  const totalMinutes = Math.floor(Math.max(0, ms) / MS_PER_MINUTE);
  const hours = Math.floor(totalMinutes / MINUTES_PER_HOUR);
  const minutes = totalMinutes % MINUTES_PER_HOUR;

  return `${hours}:${String(minutes).padStart(2, '0')}`;
}

export function formatLongDuration(ms: number): string {
  const totalMinutes = Math.floor(Math.max(0, ms) / MS_PER_MINUTE);
  const hours = Math.floor(totalMinutes / MINUTES_PER_HOUR);
  const minutes = totalMinutes % MINUTES_PER_HOUR;

  if (hours > 0) {
    return `${hours}시간 ${minutes}분`;
  }

  return `${minutes}분`;
}

export function formatSessionTimeShortLabel(session: OrderSession | null): string {
  if (!session) return '미사용';
  if (!hasTimeLimit(session)) return formatShortDuration(getElapsedMs(session));

  const remaining = getRemainingMs(session);
  if (remaining <= 0) return `+${formatShortDuration(ceilToMinute(-remaining))}`;

  return formatShortDuration(ceilToMinute(remaining));
}

export function formatSessionTimeLabel(session: OrderSession | null): string {
  if (!session) return '미사용';
  if (!hasTimeLimit(session)) return `${formatLongDuration(getElapsedMs(session))} 경과`;

  const remaining = getRemainingMs(session);
  if (remaining <= 0) return `${formatLongDuration(ceilToMinute(-remaining))} 초과`;

  return `${formatLongDuration(ceilToMinute(remaining))} 남음`;
}

export function formatSessionStartLabel(session: OrderSession | null): string | null {
  if (!session) return null;

  const start = `${formatKoreanTime(session.createdAt)}부터`;
  if (!hasTimeLimit(session)) return start;

  return `${start} · 총 ${formatLongDuration(getTotalMs(session))}`;
}
