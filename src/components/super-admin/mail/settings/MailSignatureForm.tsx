import styled from '@emotion/styled';
import NewAppInput from '@components/common/input/NewAppInput';
import ToggleButton from '@components/common/toggle/ToggleButton';
import LazyMailEditor from '@components/super-admin/mail/editor/LazyMailEditor';
import { MAIL_SIGNATURE_SLOGAN_MAX_LENGTH, MAIL_SIGNATURE_TEXT_MAX_LENGTH } from '@constants/data/mailData';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import type { MailSignatureScope, MailSignatureSetting } from '@@types/mail';
import MailSignatureContactList from './MailSignatureContactList';

const GREETING_EDITOR_HEIGHT = 96;
const EMPTY_PLACEHOLDER = '비워 두면 메일에 안 나와요';

const Form = styled.div`
  width: 100%;
  gap: 14px;
  ${colFlex()}
`;

const Field = styled.div`
  width: 100%;
  min-width: 0;
  gap: 6px;
  ${colFlex()}
`;

const FieldLabel = styled.label`
  color: ${Color.GREY};
  font-size: 13px;
  font-weight: 600;
`;

const SectionTitle = styled.h2`
  margin: 12px 0 0;
  color: ${Color.BLACK};
  font-size: 16px;
  font-weight: 700;
`;

const TwoColumns = styled.div`
  width: 100%;
  gap: 14px;
  ${rowFlex()}
`;

const ToggleWrap = styled.div`
  width: 250px;
`;

interface MailSignatureFormProps {
  scope: MailSignatureScope;
  setting: MailSignatureSetting;
  onChange: (setting: MailSignatureSetting) => void;
}

function MailSignatureForm({ scope, setting, onChange }: MailSignatureFormProps) {
  const update = (next: Partial<MailSignatureSetting>) => onChange({ ...setting, ...next });

  return (
    <Form>
      <Field>
        <FieldLabel as="span">인사말</FieldLabel>
        <LazyMailEditor
          key={scope}
          height={GREETING_EDITOR_HEIGHT}
          placeholder="인사말을 입력해 주세요"
          initialContent={setting.greetingHtml}
          onChange={(greetingHtml) => update({ greetingHtml })}
        />
      </Field>
      <SectionTitle>서명</SectionTitle>
      <TwoColumns>
        <Field>
          <FieldLabel htmlFor="signature-name">이름</FieldLabel>
          <NewAppInput
            id="signature-name"
            width="100%"
            value={setting.name ?? ''}
            maxLength={MAIL_SIGNATURE_TEXT_MAX_LENGTH}
            placeholder={EMPTY_PLACEHOLDER}
            onChange={(event) => update({ name: event.target.value })}
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="signature-english-name">영문 이름</FieldLabel>
          <NewAppInput
            id="signature-english-name"
            width="100%"
            value={setting.englishName ?? ''}
            maxLength={MAIL_SIGNATURE_TEXT_MAX_LENGTH}
            placeholder={EMPTY_PLACEHOLDER}
            onChange={(event) => update({ englishName: event.target.value })}
          />
        </Field>
      </TwoColumns>
      <TwoColumns>
        <Field>
          <FieldLabel htmlFor="signature-organization">소속</FieldLabel>
          <NewAppInput
            id="signature-organization"
            width="100%"
            value={setting.organization ?? ''}
            maxLength={MAIL_SIGNATURE_TEXT_MAX_LENGTH}
            placeholder={EMPTY_PLACEHOLDER}
            onChange={(event) => update({ organization: event.target.value })}
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="signature-job-title">직함</FieldLabel>
          <NewAppInput
            id="signature-job-title"
            width="100%"
            value={setting.jobTitle ?? ''}
            maxLength={MAIL_SIGNATURE_TEXT_MAX_LENGTH}
            placeholder={EMPTY_PLACEHOLDER}
            onChange={(event) => update({ jobTitle: event.target.value })}
          />
        </Field>
      </TwoColumns>
      <Field>
        <FieldLabel as="span">연락처</FieldLabel>
        <MailSignatureContactList contacts={setting.contacts} onChange={(contacts) => update({ contacts })} />
      </Field>
      <Field>
        <FieldLabel htmlFor="signature-slogan">한 줄 문구</FieldLabel>
        <NewAppInput
          id="signature-slogan"
          width="100%"
          value={setting.slogan ?? ''}
          maxLength={MAIL_SIGNATURE_SLOGAN_MAX_LENGTH}
          placeholder={EMPTY_PLACEHOLDER}
          onChange={(event) => update({ slogan: event.target.value })}
        />
      </Field>
      <Field>
        <FieldLabel as="span">로고</FieldLabel>
        <ToggleWrap>
          <ToggleButton checked={setting.showLogo} onChange={(showLogo) => update({ showLogo })} />
        </ToggleWrap>
      </Field>
    </Form>
  );
}

export default MailSignatureForm;
