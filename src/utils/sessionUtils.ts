import { OrderSessionWithOrder } from '@@types/index';
import { differenceInMinutes } from 'date-fns';

export function getSessionDurationMinutes(session: OrderSessionWithOrder, now: Date = new Date()): number {
  const start = new Date(session.createdAt);
  const end = session.endAt ? new Date(session.endAt) : now;
  return differenceInMinutes(end, start);
}
