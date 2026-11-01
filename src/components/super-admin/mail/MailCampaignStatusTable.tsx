import styled from '@emotion/styled';
import { match } from 'ts-pattern';
import { MAIL_RECIPIENT_STATUS_COLORS, MAIL_RECIPIENT_STATUS_LABELS } from '@constants/data/mailData';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import type { MailCampaignRecipient } from '@@types/mail';
import { formatNullableKoreanDateTime } from '@utils/formatNumber';

const Table = styled.div`
  width: 100%;
  border: 1px solid ${Color.BORDER_GREY};
  border-radius: 10px;
  overflow: hidden;
  ${colFlex()}
`;

const Row = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 10px 14px;
  border-bottom: 1px solid #f0f0f0;
  gap: 10px;
  font-size: 13px;
  ${rowFlex({ align: 'center' })}

  &:last-of-type {
    border-bottom: none;
  }
`;

const HeadRow = styled(Row)`
  background: ${Color.LIGHT_GREY};
  color: ${Color.GREY};
  font-weight: 600;
`;

const Cell = styled.span<{ flex: number }>`
  flex: ${({ flex }) => flex};
  min-width: 0;
  overflow-wrap: anywhere;
`;

const StatusCell = styled(Cell)<{ color: string }>`
  color: ${({ color }) => color};
  font-weight: 700;
`;

function getRecipientNote(recipient: MailCampaignRecipient): string {
  return match(recipient.status)
    .with('SENT', () => formatNullableKoreanDateTime(recipient.sentAt))
    .with('PENDING', () => '차례가 되면 보내요')
    .with('SENDING', () => '보내는 중이에요')
    .otherwise(() => recipient.failureReason ?? '');
}

interface MailCampaignStatusTableProps {
  recipients: MailCampaignRecipient[];
}

function MailCampaignStatusTable({ recipients }: MailCampaignStatusTableProps) {
  return (
    <Table>
      <HeadRow>
        <Cell flex={2}>주점</Cell>
        <Cell flex={1}>상태</Cell>
        <Cell flex={3}>내용</Cell>
      </HeadRow>
      {recipients.map((recipient) => (
        <Row key={recipient.id}>
          <Cell flex={2}>{recipient.workspaceName}</Cell>
          <StatusCell flex={1} color={MAIL_RECIPIENT_STATUS_COLORS[recipient.status]}>
            {MAIL_RECIPIENT_STATUS_LABELS[recipient.status]}
          </StatusCell>
          <Cell flex={3}>{getRecipientNote(recipient)}</Cell>
        </Row>
      ))}
    </Table>
  );
}

export default MailCampaignStatusTable;
