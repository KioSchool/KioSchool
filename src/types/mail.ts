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
