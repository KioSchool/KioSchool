export type InquiryStatus = 'PENDING' | 'ANSWERED' | 'CLOSED';

export interface CreateInquiryRequest {
  title: string;
  content: string;
  replyEmail: string;
  privacyConsent: true;
}

export interface CreateInquiryResponse {
  id: number;
  status: InquiryStatus;
  createdAt: string | null;
}

export interface InquiryImage {
  id: number;
  originalFileName: string;
  contentType: string;
  size: number;
  accessUrl: string;
}

export interface InquiryReply {
  subject: string;
  content: string;
  sentAt: string;
}

export interface InquiryListItem {
  id: number;
  title: string;
  replyEmail: string;
  status: InquiryStatus;
  imageCount: number;
  createdAt: string | null;
}

export interface InquiryDetail extends InquiryListItem {
  content: string;
  closedReason: string | null;
  images: InquiryImage[];
  reply: InquiryReply | null;
}

export interface ReplyInquiryRequest {
  subject: string;
  content: string;
}

export interface CloseInquiryRequest {
  closedReason?: string;
}
