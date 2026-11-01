import { Color } from '@resources/colors';
import type { MailThreadStatus } from '@@types/mail';

export const MAIL_SUBJECT_MAX_LENGTH = 200;
export const MAIL_CONTENT_MAX_LENGTH = 10000;
export const MAIL_NO_SUBJECT = '(제목 없음)';
export const MAIL_NO_WORKSPACE = '주점 없음';
export const MAIL_TEAM_NAME = '키오스쿨';
export const MAIL_ADDRESS = 'contact@kio-school.com';

export const MAIL_STATUS_FILTERS: MailThreadStatus[] = ['NEEDS_REPLY', 'WAITING', 'SPAM'];

export const MAIL_STATUS_LABELS: Record<MailThreadStatus, string> = {
  NEEDS_REPLY: '답장 필요',
  WAITING: '답장 대기',
  RESOLVED: '완료',
  SPAM: '스팸',
};

export const MAIL_STATUS_PALETTE: Record<MailThreadStatus, { bg: string; text: string }> = {
  NEEDS_REPLY: { bg: Color.KIO_ORANGE_FAINT, text: Color.KIO_ORANGE_DARK },
  WAITING: { bg: Color.LIGHT_GREY, text: Color.GREY },
  RESOLVED: { bg: Color.LIGHT_GREY, text: Color.GREY },
  SPAM: { bg: Color.LIGHT_GREY, text: Color.GREY },
};
