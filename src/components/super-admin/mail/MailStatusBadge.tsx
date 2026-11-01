import styled from '@emotion/styled';
import { MAIL_STATUS_LABELS, MAIL_STATUS_PALETTE } from '@constants/data/mailData';
import { rowFlex } from '@styles/flexStyles';
import type { MailThreadStatus } from '@@types/mail';

const Badge = styled.span<{ status: MailThreadStatus }>`
  flex-shrink: 0;
  min-width: 64px;
  padding: 4px 8px;
  border-radius: 12px;
  background: ${({ status }) => MAIL_STATUS_PALETTE[status].bg};
  color: ${({ status }) => MAIL_STATUS_PALETTE[status].text};
  font-size: 12px;
  font-weight: 700;
  white-space: nowrap;
  ${rowFlex({ justify: 'center', align: 'center' })}
`;

interface MailStatusBadgeProps {
  status: MailThreadStatus;
}

function MailStatusBadge({ status }: MailStatusBadgeProps) {
  return <Badge status={status}>{MAIL_STATUS_LABELS[status]}</Badge>;
}

export default MailStatusBadge;
