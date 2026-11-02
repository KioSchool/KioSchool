import { subMonths, subWeeks, subYears } from 'date-fns';
import { match } from 'ts-pattern';
import type { MailAudienceCondition, MailAudiencePeriod, MailAudienceRow, MailSentFilter } from '@@types/mail';
import { formatDateToYmd } from '@utils/formatDate';

const DATE_LENGTH = 10;
const SUMMARY_NAME_COUNT = 5;
const SEARCH_TERM_SEPARATOR = /[,\r\n\t]+/;
const DEFAULT_PERIOD_INDEX = 2;
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

export function getDefaultMailAudiencePeriod(periods: MailAudiencePeriod[]): MailAudiencePeriod {
  return periods[DEFAULT_PERIOD_INDEX];
}

export function splitMailSearchTerms(keyword: string): string[] {
  return keyword
    .split(SEARCH_TERM_SEPARATOR)
    .map((term) => term.trim())
    .filter(Boolean);
}

function matchesSentFilter(row: MailAudienceRow, sent: MailSentFilter): boolean {
  return match(sent)
    .with('ALL', () => true)
    .with('NEVER', () => row.lastSentAt === null)
    .with('NO_REPLY', () => row.lastSentAt !== null && !row.lastReplied)
    .with('REPLIED', () => row.lastReplied)
    .exhaustive();
}

function getSearchText(row: MailAudienceRow): string {
  return [row.workspaceName, row.schoolName, row.ownerName, row.ownerEmail].join(' ').toLowerCase();
}

// 여러 곳을 붙여 넣었을 때 빠진 곳을 놓치지 않게 못 찾은 말을 알려 준다
export function getUnmatchedMailSearchTerms(rows: MailAudienceRow[], keyword: string): string[] {
  const searchTexts = rows.map(getSearchText);
  return splitMailSearchTerms(keyword).filter((term) => !searchTexts.some((text) => text.includes(term.toLowerCase())));
}

// 찾는 주점이 조건에 가려지지 않게, 검색할 때는 다른 조건을 보지 않는다
export function filterMailAudience(rows: MailAudienceRow[], { keyword, minOrders, schoolName, sent }: MailAudienceCondition): MailAudienceRow[] {
  const terms = splitMailSearchTerms(keyword).map((term) => term.toLowerCase());

  if (terms.length > 0) {
    return rows.filter((row) => {
      const text = getSearchText(row);
      return terms.some((term) => text.includes(term));
    });
  }

  return rows.filter((row) => row.orderCount >= minOrders && (!schoolName || row.schoolName === schoolName) && matchesSentFilter(row, sent));
}

export function getOwnerWorkspaceCounts(rows: MailAudienceRow[]): Map<string, number> {
  const counts = new Map<string, number>();
  rows.forEach((row) => counts.set(row.ownerEmail, (counts.get(row.ownerEmail) ?? 0) + 1));
  return counts;
}

export function getCampaignRecipientSummary(rows: MailAudienceRow[]): string {
  const names = rows
    .slice(0, SUMMARY_NAME_COUNT)
    .map((row) => row.workspaceName)
    .join(', ');
  const rest = rows.length - SUMMARY_NAME_COUNT;
  const repeatedOwners = Array.from(getOwnerWorkspaceCounts(rows).values()).filter((count) => count > 1).length;

  return [names, rest > 0 && `외 ${rest}곳`, repeatedOwners > 0 && `(사장 ${repeatedOwners}명은 여러 통을 받아요)`].filter(Boolean).join(' ');
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
