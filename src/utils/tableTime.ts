import { OrderSession } from '@@types/index';
import { formatKoreanTime } from './formatDate';

// Constants
const MS_PER_MINUTE = 60 * 1000;
const MINUTES_PER_HOUR = 60;
const FULL_PERCENT = 100;

/**
 * Get elapsed milliseconds since session creation
 */
export function getElapsedMs(session: OrderSession | null): number {
  if (!session) return 0;

  const start = new Date(session.createdAt).getTime();
  return Date.now() - start;
}

/**
 * Get total session duration in milliseconds (expectedEndAt - createdAt)
 */
export function getTotalMs(session: OrderSession | null): number {
  if (!session || !session.expectedEndAt) return 0;

  const start = new Date(session.createdAt).getTime();
  const end = new Date(session.expectedEndAt).getTime();
  return end - start;
}

/**
 * Get elapsed percentage (0-100, clamped at 100)
 */
export function getElapsedPercent(session: OrderSession | null): number {
  if (!session || !session.expectedEndAt) return 0;

  const total = getTotalMs(session);
  if (total <= 0) return FULL_PERCENT;

  const elapsed = getElapsedMs(session);
  return Math.min(FULL_PERCENT, (elapsed / total) * FULL_PERCENT);
}

/**
 * Whether the session has a time limit (expectedEndAt)
 */
export function hasTimeLimit(session: OrderSession | null): boolean {
  return Boolean(session?.expectedEndAt);
}

/**
 * Remaining milliseconds until expectedEndAt. Negative when exceeded, 0 without a limit.
 */
export function getRemainingMs(session: OrderSession | null): number {
  if (!session?.expectedEndAt) return 0;

  return new Date(session.expectedEndAt).getTime() - Date.now();
}

/**
 * Round up to the next minute — 잔여 표기에 쓴다. 내림하면 실제로 끝나기 1분 전부터 "0분"이 된다.
 */
export function ceilToMinute(ms: number): number {
  return Math.ceil(ms / MS_PER_MINUTE) * MS_PER_MINUTE;
}

/**
 * Format milliseconds as "h:mm" format
 * Examples: "1:18", "0:48", "2:10"
 */
export function formatShortDuration(ms: number): string {
  const totalMinutes = Math.floor(Math.max(0, ms) / MS_PER_MINUTE);
  const hours = Math.floor(totalMinutes / MINUTES_PER_HOUR);
  const minutes = totalMinutes % MINUTES_PER_HOUR;

  return `${hours}:${String(minutes).padStart(2, '0')}`;
}

/**
 * Format milliseconds to Korean time string
 * Examples: "1시간 18분", "48분"
 * For durations under 1 hour, only shows minutes
 */
export function formatLongDuration(ms: number): string {
  const totalMinutes = Math.floor(Math.max(0, ms) / MS_PER_MINUTE);
  const hours = Math.floor(totalMinutes / MINUTES_PER_HOUR);
  const minutes = totalMinutes % MINUTES_PER_HOUR;

  if (hours > 0) {
    return `${hours}시간 ${minutes}분`;
  }

  return `${minutes}분`;
}

/**
 * 목록·상세 공용 주 시간 라벨. 운영 판단 기준인 잔여 시간을 우선한다.
 * Examples: "1시간 5분 남음", "12분 초과", (무제한 세션) "1시간 18분 경과", "미사용"
 */
export function formatSessionTimeLabel(session: OrderSession | null): string {
  if (!session) return '미사용';
  if (!hasTimeLimit(session)) return `${formatLongDuration(getElapsedMs(session))} 경과`;

  const remaining = getRemainingMs(session);
  if (remaining <= 0) return `${formatLongDuration(ceilToMinute(-remaining))} 초과`;

  return `${formatLongDuration(ceilToMinute(remaining))} 남음`;
}

/**
 * 목록·상세 공용 보조 라벨. 세션이 없으면 null.
 * Examples: "오후 8:30부터 · 총 2시간", (무제한 세션) "오후 8:30부터"
 */
export function formatSessionStartLabel(session: OrderSession | null): string | null {
  if (!session) return null;

  const start = `${formatKoreanTime(session.createdAt)}부터`;
  if (!hasTimeLimit(session)) return start;

  return `${start} · 총 ${formatLongDuration(getTotalMs(session))}`;
}
