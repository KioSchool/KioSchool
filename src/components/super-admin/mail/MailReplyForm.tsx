import { FormEvent, useState } from 'react';
import styled from '@emotion/styled';
import { match } from 'ts-pattern';
import NewCommonButton from '@components/common/button/NewCommonButton';
import { API_ERROR_CODES } from '@constants/errorCodes';
import useSuperAdminMail from '@hooks/super-admin/useSuperAdminMail';
import useConfirm from '@hooks/useConfirm';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import type { MailThreadDetail } from '@@types/mail';
import { getApiErrorMessage, isApiErrorCode } from '@utils/apiError';
import { getReplySubject, isMailHtmlEmpty } from '@utils/mailEditor';
import LazyMailEditor from './editor/LazyMailEditor';
import MailPreviewModal from './MailPreviewModal';

const Form = styled.form`
  width: 100%;
  gap: 10px;
  ${colFlex()}
`;

const Label = styled.span`
  color: ${Color.GREY};
  font-size: 13px;
`;

const ErrorText = styled.span`
  color: ${Color.RED};
  font-size: 13px;
`;

const ButtonRow = styled.div`
  width: 100%;
  gap: 10px;
  ${rowFlex({ justify: 'flex-end' })}
`;

function getSendButtonText(isSending: boolean): string {
  return match(isSending)
    .with(true, () => '보내는 중...')
    .otherwise(() => '답장 보내기');
}

interface MailReplyFormProps {
  thread: MailThreadDetail;
  onReplied: (thread: MailThreadDetail) => void;
  onStale: (message: string) => Promise<void>;
  onResolve: () => void;
  isChanging: boolean;
}

function MailReplyForm({ thread, onReplied, onStale, onResolve, isChanging }: MailReplyFormProps) {
  const { previewReply, replyThread } = useSuperAdminMail();
  const [content, setContent] = useState('');
  const [resetKey, setResetKey] = useState(0);
  const [isSending, setIsSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [previewHtml, setPreviewHtml] = useState<string | null>(null);
  const { ConfirmModal, confirm } = useConfirm({
    title: '답장을 보낼까요?',
    description: `${thread.counterpartEmail} 주소로 답장을 보냅니다.`,
    okText: '보내기',
    cancelText: '취소',
  });
  const lastMessageId = thread.messages[thread.messages.length - 1]?.id;

  const handlePreview = async () => {
    if (isMailHtmlEmpty(content)) {
      setErrorMessage('답장 내용을 입력해 주세요.');
      return;
    }

    setErrorMessage('');

    try {
      setPreviewHtml(await previewReply(thread.id, content));
    } catch (error) {
      setErrorMessage(getApiErrorMessage(error, '미리보기를 만들지 못했습니다.'));
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSending || lastMessageId === undefined) return;

    if (isMailHtmlEmpty(content)) {
      setErrorMessage('답장 내용을 입력해 주세요.');
      return;
    }

    const isConfirmed = await confirm();
    if (!isConfirmed) return;

    setIsSending(true);
    setErrorMessage('');

    try {
      onReplied(await replyThread(thread.id, { lastMessageId, content }));
      setResetKey((key) => key + 1);
    } catch (error) {
      const nextErrorMessage = getApiErrorMessage(error, '답장을 보내지 못했습니다.');
      if (isApiErrorCode(error, API_ERROR_CODES.MAIL_THREAD_STALE)) {
        setErrorMessage('');
        await onStale(nextErrorMessage);
      } else {
        setErrorMessage(nextErrorMessage);
      }
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit} noValidate>
      <ConfirmModal />
      {previewHtml !== null && (
        <MailPreviewModal
          title="미리보기"
          recipient={thread.counterpartEmail}
          subject={getReplySubject(thread.subject)}
          html={previewHtml}
          onClose={() => setPreviewHtml(null)}
        />
      )}
      <Label>답장</Label>
      <LazyMailEditor height={160} placeholder="답장을 입력해 주세요" resetKey={resetKey} onChange={setContent} />
      {errorMessage && <ErrorText role="alert">{errorMessage}</ErrorText>}
      <ButtonRow>
        {thread.status !== 'RESOLVED' && (
          <NewCommonButton type="button" size="xs" color="blue_gray" disabled={isChanging || isSending} onClick={onResolve}>
            답장 없이 완료
          </NewCommonButton>
        )}
        <NewCommonButton type="button" size="xs" color="blue_gray" disabled={isSending} onClick={handlePreview}>
          미리보기
        </NewCommonButton>
        <NewCommonButton type="submit" size="xs" disabled={isSending}>
          {getSendButtonText(isSending)}
        </NewCommonButton>
      </ButtonRow>
    </Form>
  );
}

export default MailReplyForm;
