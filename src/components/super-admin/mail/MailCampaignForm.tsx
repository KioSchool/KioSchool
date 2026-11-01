import { RefObject } from 'react';
import styled from '@emotion/styled';
import NewAppInput from '@components/common/input/NewAppInput';
import NewAppTextarea from '@components/common/input/NewAppTextarea';
import {
  MAIL_BUTTON_LABEL_MAX_LENGTH,
  MAIL_BUTTON_URL_MAX_LENGTH,
  MAIL_CONTENT_MAX_LENGTH,
  MAIL_SUBJECT_MAX_LENGTH,
  MAIL_TEMPLATE_VALUES,
} from '@constants/data/mailData';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';

const Form = styled.div`
  width: 100%;
  gap: 14px;
  ${colFlex()}
`;

const Field = styled.div`
  width: 100%;
  gap: 6px;
  ${colFlex()}
`;

const Label = styled.label`
  color: ${Color.GREY};
  font-size: 13px;
  font-weight: 600;
`;

const ChipRow = styled.div`
  gap: 6px;
  flex-wrap: wrap;
  color: ${Color.GREY};
  font-size: 12px;
  ${rowFlex({ align: 'center' })}
`;

const Chip = styled.button`
  padding: 4px 8px;
  border: 1px solid ${Color.HEAVY_GREY};
  border-radius: 12px;
  background: ${Color.WHITE};
  color: ${Color.GREY};
  cursor: pointer;
  font-size: 12px;

  &:hover {
    border-color: ${Color.KIO_ORANGE};
    color: ${Color.KIO_ORANGE_DARK};
  }
`;

export interface MailCampaignFormValues {
  subject: string;
  content: string;
  buttonLabel: string;
  buttonUrl: string;
}

interface MailCampaignFormProps {
  values: MailCampaignFormValues;
  contentRef: RefObject<HTMLTextAreaElement>;
  onChange: (values: MailCampaignFormValues) => void;
}

function MailCampaignForm({ values, contentRef, onChange }: MailCampaignFormProps) {
  const handleInsertValue = (templateValue: string) => {
    const textarea = contentRef.current;
    const start = textarea?.selectionStart ?? values.content.length;
    const end = textarea?.selectionEnd ?? values.content.length;
    const nextCursor = start + templateValue.length;

    onChange({ ...values, content: `${values.content.slice(0, start)}${templateValue}${values.content.slice(end)}` });
    requestAnimationFrame(() => {
      textarea?.focus();
      textarea?.setSelectionRange(nextCursor, nextCursor);
    });
  };

  return (
    <Form>
      <Field>
        <Label htmlFor="campaign-subject">제목</Label>
        <NewAppInput
          id="campaign-subject"
          width="100%"
          value={values.subject}
          maxLength={MAIL_SUBJECT_MAX_LENGTH}
          placeholder="메일 제목을 입력해 주세요"
          onChange={(event) => onChange({ ...values, subject: event.target.value })}
        />
      </Field>
      <Field>
        <Label htmlFor="campaign-content">내용</Label>
        <NewAppTextarea
          ref={contentRef}
          id="campaign-content"
          width="100%"
          height={220}
          value={values.content}
          maxLength={MAIL_CONTENT_MAX_LENGTH}
          placeholder="전달할 내용을 입력해 주세요"
          onChange={(event) => onChange({ ...values, content: event.target.value })}
        />
        <ChipRow>
          넣을 수 있는 값
          {MAIL_TEMPLATE_VALUES.map((templateValue) => (
            <Chip key={templateValue} type="button" onClick={() => handleInsertValue(templateValue)}>
              {templateValue}
            </Chip>
          ))}
        </ChipRow>
      </Field>
      <Field>
        <Label htmlFor="campaign-button-label">버튼 문구 (선택)</Label>
        <NewAppInput
          id="campaign-button-label"
          width="100%"
          value={values.buttonLabel}
          maxLength={MAIL_BUTTON_LABEL_MAX_LENGTH}
          placeholder="설문 참여하기"
          onChange={(event) => onChange({ ...values, buttonLabel: event.target.value })}
        />
      </Field>
      <Field>
        <Label htmlFor="campaign-button-url">버튼 링크</Label>
        <NewAppInput
          id="campaign-button-url"
          width="100%"
          value={values.buttonUrl}
          maxLength={MAIL_BUTTON_URL_MAX_LENGTH}
          placeholder="https://로 시작하는 주소"
          onChange={(event) => onChange({ ...values, buttonUrl: event.target.value })}
        />
      </Field>
    </Form>
  );
}

export default MailCampaignForm;
