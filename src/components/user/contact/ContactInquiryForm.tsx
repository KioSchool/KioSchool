import { FormEvent, useState } from 'react';
import ContactImageUploader from '@components/user/contact/ContactImageUploader';
import { INQUIRY_CATEGORY_OPTIONS, INQUIRY_CONTENT_MAX_LENGTH, INQUIRY_TITLE_MAX_LENGTH } from '@constants/data/inquiryData';
import useInquiry from '@hooks/user/useInquiry';
import type { CreateInquiryResponse, InquiryCategory } from '@@types/inquiry';
import { getApiErrorMessage } from '@utils/apiError';
import {
  CharacterCount,
  Checkbox,
  ErrorText,
  Field,
  FieldHeader,
  FieldLabel,
  Form,
  Input,
  NewInquiryButton,
  PrivacyLabel,
  Select,
  SubmitButton,
  SuccessCard,
  SuccessDescription,
  SuccessIcon,
  SuccessTitle,
  Textarea,
} from './contactInquiryFormStyles';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function ContactInquiryForm() {
  const { createInquiry } = useInquiry();
  const [category, setCategory] = useState<InquiryCategory | ''>('');
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
    if (!category) return '문의 유형을 선택해 주세요.';
    if (!title.trim()) return '문의 제목을 입력해 주세요.';
    if (!content.trim()) return '문의 내용을 입력해 주세요.';
    if (!replyEmail.trim()) return '답변 받을 이메일을 입력해 주세요.';
    if (!EMAIL_PATTERN.test(replyEmail.trim())) return '올바른 이메일 주소를 입력해 주세요.';
    if (!privacyConsent) return '개인정보 수집 및 이용에 동의해 주세요.';
    return '';
  };

  const resetForm = () => {
    setCategory('');
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
          category: category as InquiryCategory,
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
        <NewInquiryButton type="button" onClick={handleNewInquiry}>
          새 문의 작성하기
        </NewInquiryButton>
      </SuccessCard>
    );
  }

  return (
    <Form onSubmit={handleSubmit} noValidate>
      <Field>
        <FieldLabel>문의 유형</FieldLabel>
        <Select value={category} onChange={(event) => setCategory(event.target.value as InquiryCategory)} required>
          <option value="" disabled>
            문의 유형을 선택해 주세요
          </option>
          {INQUIRY_CATEGORY_OPTIONS.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </Select>
      </Field>
      <Field>
        <FieldHeader>
          <FieldLabel>제목</FieldLabel>
          <CharacterCount>
            {title.length}/{INQUIRY_TITLE_MAX_LENGTH}
          </CharacterCount>
        </FieldHeader>
        <Input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          maxLength={INQUIRY_TITLE_MAX_LENGTH}
          placeholder="문의 제목을 입력해 주세요"
          required
        />
      </Field>
      <Field>
        <FieldHeader>
          <FieldLabel>문의 내용</FieldLabel>
          <CharacterCount>
            {content.length}/{INQUIRY_CONTENT_MAX_LENGTH}
          </CharacterCount>
        </FieldHeader>
        <Textarea
          value={content}
          onChange={(event) => setContent(event.target.value)}
          maxLength={INQUIRY_CONTENT_MAX_LENGTH}
          placeholder="발생한 상황과 확인이 필요한 내용을 자세히 적어 주세요"
          required
        />
      </Field>
      <Field>
        <FieldLabel>답변 받을 이메일</FieldLabel>
        <Input
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
      <PrivacyLabel>
        <Checkbox type="checkbox" checked={privacyConsent} onChange={(event) => setPrivacyConsent(event.target.checked)} />
        <span>문의 처리를 위한 이메일과 첨부파일 수집·이용에 동의합니다. 수집한 정보는 문의 답변 완료 후 90일간 보관한 뒤 삭제합니다.</span>
      </PrivacyLabel>
      {formError && <ErrorText role="alert">{formError}</ErrorText>}
      <SubmitButton type="submit" disabled={isSubmitting}>
        {isSubmitting ? '접수 중...' : '문의 접수하기'}
      </SubmitButton>
    </Form>
  );
}

export default ContactInquiryForm;
