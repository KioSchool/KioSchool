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
  minOrders: number;
  schoolName?: string;
  excludedWorkspaceIds: number[];
}

export interface MailAudienceRow {
  workspaceId: number;
  workspaceName: string;
  schoolName: string;
  ownerName: string;
  ownerEmail: string;
}

export interface MailAudiencePreview {
  targetCount: number;
  noEmailCount: number;
  unsubscribedCount: number;
  withdrawnCount: number;
  dailyLimit: number;
  content: PaginationResponse<MailAudienceRow>;
}

export interface MailCampaignRequest {
  filter: MailAudienceFilter;
  subject: string;
  content: string;
  buttonLabel?: string;
  buttonUrl?: string;
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
