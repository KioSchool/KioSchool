import { subMonths, subWeeks, subYears } from 'date-fns';
import type { MailAudiencePeriod, MailAudienceRow } from '@@types/mail';
import { formatDateToYmd } from '@utils/formatDate';

const DATE_LENGTH = 10;
const MAIL_AUDIENCE_PERIODS = [
  { label: '최근 1주', getFrom: (now: Date) => subWeeks(now, 1) },
  { label: '최근 1달', getFrom: (now: Date) => subMonths(now, 1) },
  { label: '최근 3달', getFrom: (now: Date) => subMonths(now, 3) },
  { label: '최근 6달', getFrom: (now: Date) => subMonths(now, 6) },
  { label: '최근 1년', getFrom: (now: Date) => subYears(now, 1) },
];
const SENDING_START_HOUR = 10;
const SENDING_END_HOUR = 20;

export function calcCampaignDays(count: number, dailyLimit: number): number {
  if (dailyLimit <= 0) return 0;
  return Math.ceil(count / dailyLimit);
}

// 서버는 KST 10시부터 20시 전까지만 보낸다
function getKstHour(now: Date): number {
  return Number(new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Seoul', hour: 'numeric', hourCycle: 'h23' }).format(now));
}

function getStartDayText(hour: number): string {
  if (hour < SENDING_START_HOUR) return '오늘';
  return '내일';
}

export function getCampaignConfirmDescription(count: number, dailyLimit: number, now: Date = new Date()): string {
  const hour = getKstHour(now);
  const days = calcCampaignDays(count, dailyLimit);

  if (hour < SENDING_START_HOUR || hour >= SENDING_END_HOUR) {
    return `지금은 보내는 시간이 아니라 ${getStartDayText(hour)} 오전 10시부터 보내요. 모두 보내는 데 ${days}일 걸려요.`;
  }

  if (count <= dailyLimit) return '오늘 모두 보내요.';
  return `오늘 ${dailyLimit}곳에 보내고, 나머지는 내일부터 이어서 보내요. 모두 보내는 데 ${days}일 걸려요.`;
}

export function getMailAudiencePeriods(now: Date = new Date()): MailAudiencePeriod[] {
  const to = formatDateToYmd(now);
  return MAIL_AUDIENCE_PERIODS.map(({ label, getFrom }) => ({ label, from: formatDateToYmd(getFrom(now)), to }));
}

function formatMonthDay(iso: string): string {
  const [, month, day] = iso.split('-').map(Number);
  return `${month}/${day}`;
}

export function formatOperatingPeriod(firstDate: string | null, lastDate: string | null): string {
  if (!firstDate || !lastDate) return '';
  if (firstDate === lastDate) return formatMonthDay(firstDate);
  return `${formatMonthDay(firstDate)}~${formatMonthDay(lastDate)}`;
}

export function formatLastSent(row: MailAudienceRow): string {
  if (!row.lastSentAt) return '없음';

  const sent = `${formatMonthDay(row.lastSentAt.slice(0, DATE_LENGTH))} ${row.lastSentSubject ?? ''}`.trim();
  if (row.lastReplied) return `${sent} · 답장 옴`;
  return sent;
}
