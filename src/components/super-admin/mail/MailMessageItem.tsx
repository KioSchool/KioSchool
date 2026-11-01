import { useState } from 'react';
import styled from '@emotion/styled';
import { match, P } from 'ts-pattern';
import { MAIL_TEAM_NAME } from '@constants/data/mailData';
import { API_ERROR_CODES } from '@constants/errorCodes';
import useSuperAdminMail from '@hooks/super-admin/useSuperAdminMail';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import type { MailAttachment, MailMessage } from '@@types/mail';
import { getApiErrorMessage, isApiErrorCode } from '@utils/apiError';
import { formatNullableKoreanDateTime } from '@utils/formatNumber';
import MailHtmlFrame from './MailHtmlFrame';

const NO_FILE_NAME = '이름 없는 파일';
const ATTACHMENT_UNAVAILABLE_MESSAGE = '내려받을 수 없는 파일이에요';

const Container = styled.div<{ isOutbound: boolean }>`
  width: 100%;
  box-sizing: border-box;
  padding: 16px;
  border-radius: 8px;
  background: ${({ isOutbound }) => (isOutbound ? Color.LIGHT_GREY : Color.WHITE)};
  border: 1px solid ${Color.BORDER_GREY};
  gap: 12px;
  ${colFlex()}
`;

const Head = styled.div`
  width: 100%;
  gap: 12px;
  color: ${Color.GREY};
  font-size: 13px;
  ${rowFlex({ justify: 'space-between', align: 'center' })}
`;

const Sender = styled.span`
  gap: 8px;
  overflow-wrap: anywhere;
  ${rowFlex({ align: 'center' })}
`;

const BouncedBadge = styled.span`
  flex-shrink: 0;
  padding: 2px 8px;
  border-radius: 12px;
  background: ${Color.LIGHT_RED};
  color: ${Color.RED};
  font-size: 12px;
  font-weight: 700;
`;

const SentAt = styled.span`
  flex-shrink: 0;
`;

const Attachments = styled.div`
  width: 100%;
  gap: 6px;
  ${colFlex()}
`;

const AttachmentButton = styled.button`
  align-self: flex-start;
  padding: 0;
  border: none;
  background: none;
  color: ${Color.GREY};
  cursor: pointer;
  font-size: 13px;
  overflow-wrap: anywhere;
  text-align: left;
  text-decoration: underline;

  &:hover {
    color: ${Color.BLACK};
  }

  &:disabled {
    cursor: default;
  }
`;

const ErrorText = styled.span`
  color: ${Color.RED};
  font-size: 13px;
`;

function getSenderName(message: MailMessage): string {
  return match(message)
    .with({ direction: 'INBOUND' }, ({ fromName, fromEmail }) => fromName ?? fromEmail ?? '')
    .with({ sentByName: P.string }, ({ sentByName }) => `${MAIL_TEAM_NAME} · ${sentByName} 보냄`)
    .otherwise(() => MAIL_TEAM_NAME);
}

function getDownloadErrorMessage(error: unknown): string {
  if (isApiErrorCode(error, API_ERROR_CODES.MAIL_ATTACHMENT_UNAVAILABLE)) return ATTACHMENT_UNAVAILABLE_MESSAGE;
  return getApiErrorMessage(error, '파일을 내려받지 못했습니다.');
}

function saveBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

interface MailMessageItemProps {
  message: MailMessage;
}

function MailMessageItem({ message }: MailMessageItemProps) {
  const { downloadAttachment } = useSuperAdminMail();
  const [downloadingId, setDownloadingId] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleDownload = async (attachment: MailAttachment) => {
    setDownloadingId(attachment.id);
    setErrorMessage('');

    try {
      saveBlob(await downloadAttachment(attachment.id), attachment.filename ?? NO_FILE_NAME);
    } catch (error) {
      setErrorMessage(getDownloadErrorMessage(error));
    } finally {
      setDownloadingId(null);
    }
  };

  return (
    <Container isOutbound={message.direction === 'OUTBOUND'}>
      <Head>
        <Sender>
          {getSenderName(message)}
          {message.bounced && <BouncedBadge>전달 실패</BouncedBadge>}
        </Sender>
        <SentAt>{formatNullableKoreanDateTime(message.sentAt)}</SentAt>
      </Head>
      <MailHtmlFrame html={message.htmlBody} text={message.textBody} />
      {message.attachments.length > 0 && (
        <Attachments>
          {message.attachments.map((attachment) => (
            <AttachmentButton key={attachment.id} type="button" disabled={downloadingId === attachment.id} onClick={() => handleDownload(attachment)}>
              {attachment.filename ?? NO_FILE_NAME} · 내려받기
            </AttachmentButton>
          ))}
          {errorMessage && <ErrorText role="alert">{errorMessage}</ErrorText>}
        </Attachments>
      )}
    </Container>
  );
}

export default MailMessageItem;
