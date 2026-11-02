import type { PaginationResponse } from '@@types/index';

export type MailThreadStatus = 'NEEDS_REPLY' | 'WAITING' | 'RESOLVED' | 'SPAM';

export type MailDirection = 'INBOUND' | 'OUTBOUND';

export interface MailThreadListItem {
  id: number;
  subject: string | null;
  status: MailThreadStatus;
  isUnread: boolean;
  workspaceId: number | null;
  workspaceName: string | null;
  counterpartName: string | null;
  counterpartEmail: string;
  lastMessageAt: string;
}

export interface MailAttachment {
  id: number;
  filename: string | null;
  size: number | null;
}

export interface MailMessage {
  id: number;
  direction: MailDirection | null;
  fromName: string | null;
  fromEmail: string | null;
  sentByName: string | null;
  textBody: string | null;
  htmlBody: string | null;
  sentAt: string | null;
  bounced: boolean;
  attachments: MailAttachment[];
}

export interface MailThreadDetail extends MailThreadListItem {
  schoolName: string | null;
  messages: MailMessage[];
}

export type MailCampaignStatus = 'SENDING' | 'STOPPED' | 'DONE';

export type MailRecipientStatus = 'PENDING' | 'SENDING' | 'SENT' | 'FAILED' | 'EXCLUDED';

export interface MailAudienceFilter {
  from: string;
  to: string;
  workspaceIds: number[];
}

export interface MailAudienceRow {
  workspaceId: number;
  workspaceName: string;
  schoolName: string;
  ownerName: string;
  ownerEmail: string;
  tableCount: number;
  orderCount: number;
  revenue: number;
  operatingDays: number;
  firstOperatingDate: string | null;
  lastOperatingDate: string | null;
  topMenu: string | null;
  insightCardCount: number;
  lastSentAt: string | null;
  lastSentSubject: string | null;
  lastReplied: boolean;
}

export interface MailAudiencePeriod {
  label: string;
  from: string;
  to: string;
}

export interface MailAudience {
  rows: MailAudienceRow[];
  noEmailCount: number;
  unsubscribedCount: number;
  withdrawnCount: number;
  dailyLimit: number;
}

export type MailSentFilter = 'ALL' | 'NEVER' | 'NO_REPLY' | 'REPLIED';

export interface MailAudienceCondition {
  keyword: string;
  minOrders: number;
  schoolName: string;
  sent: MailSentFilter;
}

export interface MailCampaignRequest {
  filter: MailAudienceFilter;
  subject: string;
  content: string;
  expectedCount: number;
  requestId: string;
}

export interface MailCampaignPreviewRequest {
  filter: MailAudienceFilter;
  subject: string;
  content: string;
}

export interface MailCampaignPreview {
  subject: string;
  html: string;
  workspaceName: string | null;
  ownerEmail: string | null;
}

export interface MailCampaignSummary {
  id: number;
  subject: string;
  status: MailCampaignStatus;
  totalCount: number;
  sentCount: number;
  pendingCount: number;
  failedCount: number;
  excludedCount: number;
  createdByName: string | null;
  createdAt: string | null;
}

export interface MailCampaignRecipient {
  id: number;
  workspaceId: number | null;
  workspaceName: string;
  name: string;
  email: string;
  status: MailRecipientStatus;
  failureReason: string | null;
  sentAt: string | null;
}

export interface MailCampaignDetail {
  summary: MailCampaignSummary;
  dailyLimit: number;
  recipients: PaginationResponse<MailCampaignRecipient>;
}

export interface MailUnsubscribeInfo {
  maskedEmail: string;
  unsubscribed: boolean;
}

export interface MailTargetWorkspace {
  id: number;
  name: string;
  ownerName: string;
  ownerEmail: string | null;
}

export interface SendMailRequest {
  workspaceId: number;
  subject: string;
  content: string;
  requestId: string;
}

export interface ReplyMailRequest {
  lastMessageId: number;
  content: string;
}
