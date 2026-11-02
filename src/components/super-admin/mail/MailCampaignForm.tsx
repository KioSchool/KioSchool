import { useRef, useState } from 'react';
import styled from '@emotion/styled';
import NewAppInput from '@components/common/input/NewAppInput';
import { MAIL_SUBJECT_MAX_LENGTH } from '@constants/data/mailData';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import LazyMailEditor from './editor/LazyMailEditor';
import MailValueMenu from './MailValueMenu';

const Form = styled.div`
  width: 100%;
  min-width: 0;
  gap: 14px;
  ${colFlex()}
`;

const Field = styled.div`
  width: 100%;
  gap: 6px;
  ${colFlex()}
`;

const LabelRow = styled.div`
  width: 100%;
  gap: 8px;
  ${rowFlex({ justify: 'space-between', align: 'center' })}
`;

const Label = styled.label`
  color: ${Color.GREY};
  font-size: 13px;
  font-weight: 600;
`;

const LinkButton = styled.button`
  padding: 0;
  border: none;
  background: none;
  color: ${Color.KIO_ORANGE_DARK};
  cursor: pointer;
  font-size: 12px;
  font-weight: 600;
`;

export interface MailCampaignFormValues {
  subject: string;
  content: string;
}

interface MailCampaignFormProps {
  values: MailCampaignFormValues;
  onChange: (values: MailCampaignFormValues) => void;
}

function MailCampaignForm({ values, onChange }: MailCampaignFormProps) {
  const subjectRef = useRef<HTMLInputElement>(null);
  const [isValueMenuOpen, setIsValueMenuOpen] = useState(false);

  const handleInsertSubjectValue = (value: string) => {
    const input = subjectRef.current;
    const start = input?.selectionStart ?? values.subject.length;
    const end = input?.selectionEnd ?? values.subject.length;
    const nextCursor = start + value.length;

    onChange({ ...values, subject: `${values.subject.slice(0, start)}${value}${values.subject.slice(end)}` });
    window.setTimeout(() => {
      input?.focus();
      input?.setSelectionRange(nextCursor, nextCursor);
    });
  };

  return (
    <Form>
      <Field>
        <LabelRow>
          <Label htmlFor="campaign-subject">제목</Label>
          <LinkButton type="button" onClick={() => setIsValueMenuOpen((current) => !current)}>
            값 넣기
          </LinkButton>
        </LabelRow>
        <NewAppInput
          ref={subjectRef}
          id="campaign-subject"
          width="100%"
          value={values.subject}
          maxLength={MAIL_SUBJECT_MAX_LENGTH}
          placeholder="메일 제목을 입력해 주세요"
          onChange={(event) => onChange({ ...values, subject: event.target.value })}
        />
        {isValueMenuOpen && <MailValueMenu onSelect={handleInsertSubjectValue} />}
      </Field>
      <Field>
        <Label as="span">내용</Label>
        <LazyMailEditor withValues height={300} placeholder="전달할 내용을 입력해 주세요" onChange={(content) => onChange({ ...values, content })} />
      </Field>
    </Form>
  );
}

export default MailCampaignForm;
