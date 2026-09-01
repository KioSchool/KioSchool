import { Color } from '@resources/colors';
import type { InquiryStatus } from '@@types/inquiry';

export const INQUIRY_TITLE_MAX_LENGTH = 100;
export const INQUIRY_CONTENT_MAX_LENGTH = 2000;
export const INQUIRY_REPLY_SUBJECT_MAX_LENGTH = 150;
export const INQUIRY_REPLY_CONTENT_MAX_LENGTH = 5000;
export const INQUIRY_IMAGE_MAX_COUNT = 5;
export const INQUIRY_IMAGE_MAX_SIZE_MB = 5;

export const INQUIRY_IMAGE_MAX_SIZE_BYTES = INQUIRY_IMAGE_MAX_SIZE_MB * 1024 * 1024;
export const INQUIRY_ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'] as const;
export const INQUIRY_IMAGE_ACCEPT_ATTRIBUTE = INQUIRY_ACCEPTED_IMAGE_TYPES.join(',');

export const INQUIRY_STATUSES: InquiryStatus[] = ['PENDING', 'ANSWERED', 'CLOSED'];

export const INQUIRY_STATUS_LABELS: Record<InquiryStatus, string> = {
  PENDING: '답변 대기',
  ANSWERED: '답변 완료',
  CLOSED: '종결',
};

export const INQUIRY_STATUS_PALETTE: Record<InquiryStatus, { bg: string; text: string }> = {
  PENDING: { bg: Color.KIO_ORANGE_FAINT, text: Color.KIO_ORANGE_DARK },
  ANSWERED: { bg: Color.GREEN_FAINT, text: Color.GREEN },
  CLOSED: { bg: Color.LIGHT_GREY, text: Color.GREY },
};
