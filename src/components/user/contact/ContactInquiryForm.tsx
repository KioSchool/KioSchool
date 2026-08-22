import { FormEvent, useState } from 'react';
import NewCommonButton from '@components/common/button/NewCommonButton';
import CustomCheckbox from '@components/common/checkbox/CustomCheckbox';
import NewAppInput from '@components/common/input/NewAppInput';
import NewAppTextarea from '@components/common/input/NewAppTextarea';
import ContactImageUploader from '@components/user/contact/ContactImageUploader';
import { INQUIRY_CONTENT_MAX_LENGTH, INQUIRY_TITLE_MAX_LENGTH } from '@constants/data/inquiryData';
import useInquiry from '@hooks/user/useInquiry';
import type { CreateInquiryResponse } from '@@types/inquiry';
import { getApiErrorMessage } from '@utils/apiError';
import {
  ButtonRow,
  CharacterCount,
  CharacterCountRow,
  ErrorText,
  Field,
  FieldLabel,
  Form,
  PrivacyContainer,
  SuccessCard,
  SuccessDescription,
  SuccessIcon,
  SuccessTitle,
} from './contactInquiryFormStyles';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function ContactInquiryForm() {
  const { createInquiry } = useInquiry();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [replyEmail, setReplyEmail] = useState('');
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [formError, setFormError] = useState('');
  const [imageError, setImageError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [receipt, setReceipt] = useState<CreateInquiryResponse | null>(null);

  const validateForm = () => {
    if (!title.trim()) return '문의 제목을 입력해 주세요.';
    if (!content.trim()) return '문의 내용을 입력해 주세요.';
    if (!replyEmail.trim()) return '답변 받을 이메일을 입력해 주세요.';
    if (!EMAIL_PATTERN.test(replyEmail.trim())) return '올바른 이메일 주소를 입력해 주세요.';
    if (!privacyConsent) return '개인정보 수집 및 이용에 동의해 주세요.';
    return '';
  };

  const resetForm = () => {
    setTitle('');
    setContent('');
    setReplyEmail('');
    setImageFiles([]);
    setPrivacyConsent(false);
    setFormError('');
    setImageError('');
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    const validationError = validateForm();
    if (validationError) {
      setFormError(validationError);
      return;
    }

    setFormError('');
    setIsSubmitting(true);

    try {
      const response = await createInquiry(
        {
          title: title.trim(),
          content: content.trim(),
          replyEmail: replyEmail.trim(),
          privacyConsent: true,
        },
        imageFiles,
      );
      setReceipt(response);
      resetForm();
    } catch (error) {
      setFormError(getApiErrorMessage(error, '문의를 접수하지 못했습니다. 잠시 후 다시 시도해 주세요.'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNewInquiry = () => {
    setReceipt(null);
  };

  if (receipt) {
    return (
      <SuccessCard role="status">
        <SuccessIcon size={52} />
        <SuccessTitle>문의가 접수되었습니다</SuccessTitle>
        <SuccessDescription>
          접수 번호는 #{receipt.id}입니다.
          <br />
          입력하신 이메일로 답변을 보내드릴게요.
        </SuccessDescription>
        <NewCommonButton type="button" size="sm" color="blue_gray" onClick={handleNewInquiry}>
          새 문의 작성하기
        </NewCommonButton>
      </SuccessCard>
    );
  }

  return (
    <Form onSubmit={handleSubmit} noValidate>
      <Field>
        <FieldLabel htmlFor="inquiry-title">제목</FieldLabel>
        <NewAppInput
          id="inquiry-title"
          width="100%"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          maxLength={INQUIRY_TITLE_MAX_LENGTH}
          placeholder="문의 제목을 입력해 주세요"
          required
        />
        <CharacterCountRow>
          <CharacterCount>
            {title.length}/{INQUIRY_TITLE_MAX_LENGTH}
          </CharacterCount>
        </CharacterCountRow>
      </Field>
      <Field>
        <FieldLabel htmlFor="inquiry-content">문의 내용</FieldLabel>
        <NewAppTextarea
          id="inquiry-content"
          width="100%"
          value={content}
          onChange={(event) => setContent(event.target.value)}
          maxLength={INQUIRY_CONTENT_MAX_LENGTH}
          placeholder="발생한 상황과 확인이 필요한 내용을 자세히 적어 주세요"
          required
        />
        <CharacterCountRow>
          <CharacterCount>
            {content.length}/{INQUIRY_CONTENT_MAX_LENGTH}
          </CharacterCount>
        </CharacterCountRow>
      </Field>
      <Field>
        <FieldLabel htmlFor="inquiry-reply-email">답변 받을 이메일</FieldLabel>
        <NewAppInput
          id="inquiry-reply-email"
          width="100%"
          type="email"
          value={replyEmail}
          onChange={(event) => setReplyEmail(event.target.value)}
          placeholder="example@email.com"
          autoComplete="email"
          required
        />
      </Field>
      <ContactImageUploader files={imageFiles} onFilesChange={setImageFiles} onValidationError={setImageError} />
      {imageError && <ErrorText role="alert">{imageError}</ErrorText>}
      <PrivacyContainer>
        <CustomCheckbox
          checked={privacyConsent}
          onChange={setPrivacyConsent}
          label={`문의 처리를 위한 이메일과 첨부파일 수집·이용에 동의합니다.\n수집한 정보는 문의 답변 완료 후 90일간 보관한 뒤 삭제합니다.`}
        />
      </PrivacyContainer>
      {formError && <ErrorText role="alert">{formError}</ErrorText>}
      <ButtonRow>
        <NewCommonButton type="submit" disabled={isSubmitting}>
          {isSubmitting ? '접수 중...' : '문의 접수하기'}
        </NewCommonButton>
      </ButtonRow>
    </Form>
  );
}

export default ContactInquiryForm;
