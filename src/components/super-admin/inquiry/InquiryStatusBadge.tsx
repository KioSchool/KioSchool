import styled from '@emotion/styled';
import { INQUIRY_STATUS_LABELS, INQUIRY_STATUS_PALETTE } from '@constants/data/inquiryData';
import { rowFlex } from '@styles/flexStyles';
import type { InquiryStatus } from '@@types/inquiry';

const Badge = styled.span<{ status: InquiryStatus }>`
  flex-shrink: 0;
  min-width: 64px;
  padding: 4px 8px;
  border-radius: 12px;
  background: ${({ status }) => INQUIRY_STATUS_PALETTE[status].bg};
  color: ${({ status }) => INQUIRY_STATUS_PALETTE[status].text};
  font-size: 12px;
  font-weight: 700;
  white-space: nowrap;
  ${rowFlex({ justify: 'center', align: 'center' })}
`;

interface InquiryStatusBadgeProps {
  status: InquiryStatus;
}

function InquiryStatusBadge({ status }: InquiryStatusBadgeProps) {
  return <Badge status={status}>{INQUIRY_STATUS_LABELS[status]}</Badge>;
}

export default InquiryStatusBadge;
