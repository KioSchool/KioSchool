export type InquiryCategory = 'BUG' | 'UI' | 'PAYMENT' | 'EMAIL' | 'OTHER';

export type InquiryStatus = 'PENDING' | 'ANSWERED';

export interface CreateInquiryRequest {
  category: InquiryCategory;
  title: string;
  content: string;
  replyEmail: string;
  privacyConsent: true;
}

export interface CreateInquiryResponse {
  id: number;
  status: InquiryStatus;
  createdAt: string;
}

export interface InquiryImage {
  id: number;
  originalFileName: string;
  contentType: string;
  size: number;
  accessUrl: string;
  expiresAt: string;
}

export interface InquiryReply {
  subject: string;
  content: string;
  sentAt: string;
}

export interface InquiryListItem {
  id: number;
  category: InquiryCategory;
  title: string;
  replyEmail: string;
  status: InquiryStatus;
  imageCount: number;
  createdAt: string;
}

export interface InquiryDetail extends InquiryListItem {
  content: string;
  images: InquiryImage[];
  reply: InquiryReply | null;
}
