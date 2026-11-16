import { Color } from '@resources/colors';
import type { MailCampaignStatus, MailRecipientStatus, MailSentFilter, MailSignatureScope, MailThreadStatus } from '@@types/mail';

export const MAIL_SUBJECT_MAX_LENGTH = 200;
export const MAIL_NO_SUBJECT = '(제목 없음)';
export const MAIL_NO_WORKSPACE = '주점 없음';
export const MAIL_TEAM_NAME = '키오스쿨';
export const MAIL_ADDRESS = 'contact@kio-school.com';

export const MAIL_STATUS_FILTERS: MailThreadStatus[] = ['NEEDS_REPLY', 'WAITING', 'RESOLVED', 'SPAM'];

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

export const MAIL_SIGNATURE_TEXT_MAX_LENGTH = 40;
export const MAIL_SIGNATURE_SLOGAN_MAX_LENGTH = 80;
export const MAIL_SIGNATURE_CONTACT_LABEL_MAX_LENGTH = 20;
export const MAIL_SIGNATURE_CONTACT_VALUE_MAX_LENGTH = 120;
export const MAIL_SIGNATURE_MAX_CONTACTS = 5;

export const MAIL_SIGNATURE_SCOPES: MailSignatureScope[] = ['mine', 'team'];

export const MAIL_SIGNATURE_SCOPE_LABELS: Record<MailSignatureScope, string> = {
  mine: '내 인사말·서명',
  team: '팀 공용',
};

export const MAIL_SIGNATURE_SCOPE_DESCRIPTIONS: Record<MailSignatureScope, string> = {
  mine: '새 메일과 답장을 쓸 때 들어가요. 나만 고칠 수 있어요.',
  team: '여러 곳 보내기에 들어가요. 내 설정이 없는 사람이 새 메일·답장을 쓸 때도 이걸로 채워요. 슈퍼어드민 누구나 고칠 수 있어요.',
};

export const MAIL_SIGNATURE_PREVIEW_DESCRIPTIONS: Record<MailSignatureScope, string> = {
  mine: '새 메일과 답장에 이렇게 들어가요. 본문 자리는 비워 두고 보여 줘요.',
  team: '여러 곳 보내기에 이렇게 들어가요. 실제 메일은 카드 틀 안에 들어가요. 본문 자리는 비워 두고 보여 줘요.',
};

export const MAIL_AUDIENCE_DEFAULT_MIN_ORDERS = 15;

export const MAIL_SENT_FILTER_OPTIONS: { value: MailSentFilter; label: string }[] = [
  { value: 'ALL', label: '전체' },
  { value: 'NEVER', label: '받은 적 없음' },
  { value: 'NO_REPLY', label: '받았는데 답장 없음' },
  { value: 'REPLIED', label: '답장 옴' },
];

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
