import type { InquiryCategory } from '@@types/inquiry';

export const INQUIRY_TITLE_MAX_LENGTH = 100;
export const INQUIRY_CONTENT_MAX_LENGTH = 2000;
export const INQUIRY_IMAGE_MAX_COUNT = 5;
export const INQUIRY_IMAGE_MAX_SIZE_MB = 5;

const BYTES_PER_KILOBYTE = 1024;
const KILOBYTES_PER_MEGABYTE = 1024;

export const INQUIRY_IMAGE_MAX_SIZE_BYTES = INQUIRY_IMAGE_MAX_SIZE_MB * KILOBYTES_PER_MEGABYTE * BYTES_PER_KILOBYTE;
export const INQUIRY_ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'] as const;
export const INQUIRY_IMAGE_ACCEPT_ATTRIBUTE = INQUIRY_ACCEPTED_IMAGE_TYPES.join(',');

export const INQUIRY_CATEGORY_OPTIONS: { id: InquiryCategory; name: string }[] = [
  { id: 'BUG', name: '버그 및 오류' },
  { id: 'UI', name: '화면 및 사용성' },
  { id: 'PAYMENT', name: '결제' },
  { id: 'EMAIL', name: '이메일' },
  { id: 'OTHER', name: '기타' },
];
