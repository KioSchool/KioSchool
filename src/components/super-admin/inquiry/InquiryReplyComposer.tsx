import { FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import NewCommonButton from '@components/common/button/NewCommonButton';
import NewAppInput from '@components/common/input/NewAppInput';
import NewAppTextarea from '@components/common/input/NewAppTextarea';
import { INQUIRY_REPLY_CONTENT_MAX_LENGTH, INQUIRY_REPLY_SUBJECT_MAX_LENGTH } from '@constants/data/inquiryData';
import { API_ERROR_CODES } from '@constants/errorCodes';
import { URLS } from '@constants/urls';
import useSuperAdminInquiry from '@hooks/super-admin/useSuperAdminInquiry';
import useConfirm from '@hooks/useConfirm';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import type { InquiryDetail } from '@@types/inquiry';
import { getApiErrorMessage, isApiErrorCode } from '@utils/apiError';

const TEMPLATE_PATH = '/templates/inquiryReplyEmail.html';

const Container = styled.section`
  width: 100%;
  gap: 14px;
  ${colFlex()}
`;

const Form = styled.form`
  width: 100%;
  gap: 12px;
  ${colFlex()}
`;

const Field = styled.div`
  width: 100%;
  gap: 6px;
  ${colFlex()}
`;

const FieldLabel = styled.label`
  color: ${Color.GREY};
  font-size: 13px;
  font-weight: 600;
`;

const CharacterCount = styled.span`
  align-self: flex-end;
  color: ${Color.GREY};
  font-size: 12px;
`;

const PreviewContainer = styled.div`
  width: 100%;
  gap: 8px;
  ${colFlex()}
`;

const PreviewTitle = styled.span`
  color: ${Color.GREY};
  font-size: 13px;
  font-weight: 600;
`;

const PreviewSubject = styled.span`
  color: ${Color.BLACK};
  font-size: 14px;
  font-weight: 600;
`;

const PreviewFrame = styled.iframe`
  width: 100%;
  height: 440px;
  box-sizing: border-box;
  border: 1px solid #e8eef2;
  border-radius: 8px;
  background: #f6f7f9;
`;

const ErrorText = styled.span`
  color: #d32f2f;
  font-size: 13px;
`;

const ButtonRow = styled.div`
  width: 100%;
  ${rowFlex({ justify: 'flex-end' })}
`;

interface InquiryReplyComposerProps {
  inquiry: InquiryDetail;
  onReplyComplete: (inquiry: InquiryDetail) => void;
  onConflict: () => void | Promise<void>;
}

function updatePreviewDocument(document: Document, content: string) {
  const contentElement = Array.from(document.querySelectorAll('*')).find((element) => element.getAttribute('th:text') === '${content}');
  const linkElement = Array.from(document.querySelectorAll('a')).find((element) => element.getAttribute('th:href') === '${baseUrl}');

  if (contentElement) {
    contentElement.textContent = content;
  }

  if (linkElement) {
    linkElement.href = URLS.EXTERNAL.KIO_SCHOOL;
  }
}

function InquiryReplyComposer({ inquiry, onReplyComplete, onConflict }: InquiryReplyComposerProps) {
  const { replyInquiry } = useSuperAdminInquiry();
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const previewFrameRef = useRef<HTMLIFrameElement>(null);
  const { ConfirmModal, confirm } = useConfirm({
    title: '답변을 발송할까요?',
    description: `${inquiry.replyEmail} 주소로 답변 이메일을 발송합니다.`,
    okText: '발송하기',
    cancelText: '취소',
  });

  const updatePreview = useCallback(() => {
    const previewDocument = previewFrameRef.current?.contentDocument;
    if (!previewDocument) return;
    updatePreviewDocument(previewDocument, content);
  }, [content]);

  useEffect(() => {
    updatePreview();
  }, [updatePreview]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    if (!subject.trim()) {
      setErrorMessage('답변 제목을 입력해 주세요.');
      return;
    }

    if (!content.trim()) {
      setErrorMessage('답변 내용을 입력해 주세요.');
      return;
    }

    const isConfirmed = await confirm();
    if (!isConfirmed) return;

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const response = await replyInquiry(inquiry.id, { subject: subject.trim(), content: content.trim() });
      onReplyComplete(response);
    } catch (error) {
      setErrorMessage(getApiErrorMessage(error, '답변 이메일을 발송하지 못했습니다.'));
      if (isApiErrorCode(error, API_ERROR_CODES.INQUIRY_ALREADY_ANSWERED, API_ERROR_CODES.INQUIRY_ALREADY_CLOSED)) {
        onConflict();
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container>
      <ConfirmModal />
      <Form onSubmit={handleSubmit} noValidate>
        <Field>
          <FieldLabel htmlFor="inquiry-reply-subject">답변 제목</FieldLabel>
          <NewAppInput
            id="inquiry-reply-subject"
            width="100%"
            value={subject}
            maxLength={INQUIRY_REPLY_SUBJECT_MAX_LENGTH}
            placeholder="답변 이메일 제목을 입력해 주세요"
            onChange={(event) => setSubject(event.target.value)}
            required
          />
          <CharacterCount>
            {subject.length}/{INQUIRY_REPLY_SUBJECT_MAX_LENGTH}
          </CharacterCount>
        </Field>
        <Field>
          <FieldLabel htmlFor="inquiry-reply-content">답변 내용</FieldLabel>
          <NewAppTextarea
            id="inquiry-reply-content"
            width="100%"
            height={180}
            value={content}
            maxLength={INQUIRY_REPLY_CONTENT_MAX_LENGTH}
            placeholder="고객에게 전달할 답변을 입력해 주세요"
            onChange={(event) => setContent(event.target.value)}
            required
          />
          <CharacterCount>
            {content.length}/{INQUIRY_REPLY_CONTENT_MAX_LENGTH}
          </CharacterCount>
        </Field>
        <PreviewContainer>
          <PreviewTitle>이메일 미리보기</PreviewTitle>
          <PreviewSubject>메일 제목 : {subject || '제목을 입력해 주세요.'}</PreviewSubject>
          <PreviewFrame ref={previewFrameRef} title="문의 답변 이메일 미리보기" sandbox="allow-same-origin" src={TEMPLATE_PATH} onLoad={updatePreview} />
        </PreviewContainer>
        {errorMessage && <ErrorText role="alert">{errorMessage}</ErrorText>}
        <ButtonRow>
          <NewCommonButton type="submit" size="xs" disabled={isSubmitting}>
            {isSubmitting ? '발송 중...' : '답변 이메일 발송'}
          </NewCommonButton>
        </ButtonRow>
      </Form>
    </Container>
  );
}

export default InquiryReplyComposer;
