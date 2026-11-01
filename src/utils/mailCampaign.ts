import type { MailAudienceRow } from '@@types/mail';

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

// 서버의 MailTemplateRenderer와 같이 한 번만 치환한다. 미리보기 전용이다.
export function renderMailTemplatePreview(template: string, row: MailAudienceRow | undefined, transform: (value: string) => string = (value) => value): string {
  if (!row) return template;

  const values: Record<string, string> = {
    '{주점 이름}': row.workspaceName,
    '{사장 이름}': row.ownerName,
    '{주점 번호}': row.workspaceId.toString(),
  };
  return template.replace(/\{[^{}]+\}/g, (placeholder) => {
    const value = values[placeholder];
    if (value === undefined) return placeholder;
    return transform(value);
  });
}
