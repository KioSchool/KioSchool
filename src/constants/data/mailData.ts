import { Color } from '@resources/colors';
import type { MailCampaignStatus, MailRecipientStatus, MailThreadStatus } from '@@types/mail';

export const MAIL_SUBJECT_MAX_LENGTH = 200;
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

export const MAIL_TEMPLATE_VALUE_GROUPS: { label: string; values: string[] }[] = [
  { label: '주점', values: ['{주점 이름}', '{학교}', '{주점 번호}', '{테이블 수}'] },
  { label: '사장', values: ['{사장 이름}'] },
  { label: '고른 기간', values: ['{주문 수}', '{매출}', '{운영일}', '{첫 운영일}', '{마지막 운영일}', '{인기 메뉴}'] },
];
export const MAIL_TEMPLATE_VALUES = MAIL_TEMPLATE_VALUE_GROUPS.flatMap((group) => group.values);
export const MAIL_BUTTON_LABEL_MAX_LENGTH = 40;
export const MAIL_BUTTON_URL_MAX_LENGTH = 2000;

export const MAIL_CAMPAIGN_STATUS_LABELS: Record<MailCampaignStatus, string> = {
  SENDING: '보내는 중',
  STOPPED: '멈춤',
  DONE: '완료',
};

export const MAIL_RECIPIENT_STATUS_LABELS: Record<MailRecipientStatus, string> = {
  PENDING: '남음',
  SENDING: '보내는 중',
  SENT: '보냄',
  FAILED: '실패',
  EXCLUDED: '제외',
};

export const MAIL_RECIPIENT_STATUS_COLORS: Record<MailRecipientStatus, string> = {
  PENDING: Color.GREY,
  SENDING: Color.KIO_ORANGE_DARK,
  SENT: Color.GREEN,
  FAILED: Color.RED,
  EXCLUDED: Color.GREY,
};
