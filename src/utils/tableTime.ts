import { OrderSession } from '@@types/index';

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
 * Format milliseconds as "h:mm" format
 * Examples: "1:18", "0:48", "2:10"
 */
export function formatShortDuration(ms: number): string {
  const totalMinutes = Math.floor(ms / MS_PER_MINUTE);
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
  const totalMinutes = Math.floor(ms / MS_PER_MINUTE);
  const hours = Math.floor(totalMinutes / MINUTES_PER_HOUR);
  const minutes = totalMinutes % MINUTES_PER_HOUR;

  if (hours > 0) {
    return `${hours}시간 ${minutes}분`;
  }

  return `${minutes}분`;
}

/**
 * Format session start time as "오후 11:10부터"
 */
export function formatStartTime(session: OrderSession | null): string {
  if (!session) return '';

  const date = new Date(session.createdAt);
  const options: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  };
  const timeString = new Intl.DateTimeFormat('ko-KR', options).format(date);

  return `${timeString}부터`;
}
