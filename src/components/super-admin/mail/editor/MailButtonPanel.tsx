import { useState } from 'react';
import styled from '@emotion/styled';
import { Editor } from '@tiptap/react';
import { match } from 'ts-pattern';
import NewCommonButton from '@components/common/button/NewCommonButton';
import NewAppInput from '@components/common/input/NewAppInput';
import { MAIL_BUTTON_LABEL_MAX_LENGTH, MAIL_BUTTON_URL_MAX_LENGTH } from '@constants/data/mailData';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { isMailLinkValid } from '@utils/mailEditor';
import MailValueMenu from '../MailValueMenu';
import { MailButtonAttributes, MailButtonVariant } from './mailEditorExtensions';

const Container = styled.div`
  width: 100%;
  gap: 8px;
  ${colFlex()}
`;

const Row = styled.div`
  gap: 8px;
  ${rowFlex({ justify: 'space-between', align: 'center' })}
`;

const Variants = styled.div`
  gap: 6px;
  ${rowFlex({ align: 'center' })}
`;

const getVariantBackground = (isActive: boolean) =>
  match(isActive)
    .with(true, () => Color.KIO_ORANGE_FAINT)
    .otherwise(() => Color.WHITE);

const getVariantBorder = (isActive: boolean) =>
  match(isActive)
    .with(true, () => Color.KIO_ORANGE)
    .otherwise(() => Color.HEAVY_GREY);

const VariantButton = styled.button<{ isActive: boolean }>`
  padding: 4px 10px;
  border: 1px solid ${({ isActive }) => getVariantBorder(isActive)};
  border-radius: 14px;
  background: ${({ isActive }) => getVariantBackground(isActive)};
  color: ${Color.GREY};
  cursor: pointer;
  font-size: 12px;
`;

const ErrorText = styled.span`
  color: ${Color.RED};
  font-size: 12px;
`;

const VARIANTS: { value: MailButtonVariant; label: string }[] = [
  { value: 'solid', label: '진한 버튼' },
  { value: 'line', label: '테두리 버튼' },
];

// 칸을 연 뒤 본문을 눌러도 처음 고른 버튼을 고치도록 열 때의 자리를 기억한다
function getSelectedButtonPosition(editor: Editor): number | null {
  if (!editor.isActive('mailButton')) return null;
  return editor.state.selection.from;
}

// 글이 있는 줄에 끼어들지 않게 다음 줄에 넣고, 빈 줄이나 버튼만 있는 줄에는 그 자리에 이어 붙인다
function insertMailButton(editor: Editor, attributes: MailButtonAttributes) {
  const button = { type: 'mailButton', attrs: attributes };
  const { $from } = editor.state.selection;

  if ($from.depth > 0 && $from.parent.textContent === '') {
    editor.chain().focus().insertContent(button).run();
    return;
  }

  const paragraph = { type: 'paragraph', content: [button] };
  if ($from.depth === 0) {
    editor.chain().focus().insertContent(paragraph).run();
    return;
  }
  editor.chain().focus().insertContentAt($from.after(), paragraph).run();
}

function getApplyText(isEditing: boolean): string {
  return match(isEditing)
    .with(true, () => '버튼 바꾸기')
    .otherwise(() => '버튼 넣기');
}

interface MailButtonPanelProps {
  editor: Editor;
  withValues: boolean;
  onClose: () => void;
}

function MailButtonPanel({ editor, withValues, onClose }: MailButtonPanelProps) {
  const [buttonPosition] = useState(() => getSelectedButtonPosition(editor));
  const current = editor.getAttributes('mailButton') as Partial<MailButtonAttributes>;
  const [label, setLabel] = useState(current.label ?? '');
  const [href, setHref] = useState(current.href ?? '');
  const [variant, setVariant] = useState<MailButtonVariant>(current.variant ?? 'solid');
  const [errorMessage, setErrorMessage] = useState('');

  const handleApply = () => {
    if (!label.trim()) {
      setErrorMessage('버튼 문구를 입력해 주세요.');
      return;
    }

    if (!isMailLinkValid(href.trim())) {
      setErrorMessage('https://로 시작하는 주소를 넣어 주세요.');
      return;
    }

    const attributes: MailButtonAttributes = { label: label.trim(), href: href.trim(), variant };
    if (buttonPosition !== null && editor.state.doc.nodeAt(buttonPosition)?.type.name === 'mailButton') {
      editor.chain().focus().setNodeSelection(buttonPosition).updateAttributes('mailButton', attributes).run();
    } else {
      insertMailButton(editor, attributes);
    }
    onClose();
  };

  return (
    <Container>
      <NewAppInput
        width="100%"
        height={40}
        value={label}
        maxLength={MAIL_BUTTON_LABEL_MAX_LENGTH}
        placeholder="버튼 문구 (예: 설문 참여하기)"
        onChange={(event) => setLabel(event.target.value)}
      />
      <NewAppInput
        width="100%"
        height={40}
        value={href}
        maxLength={MAIL_BUTTON_URL_MAX_LENGTH}
        placeholder="누르면 열릴 주소 (https://로 시작)"
        onChange={(event) => setHref(event.target.value)}
      />
      {withValues && <MailValueMenu onSelect={(value) => setHref((previous) => `${previous}${value}`)} />}
      {errorMessage && <ErrorText role="alert">{errorMessage}</ErrorText>}
      <Row>
        <Variants>
          {VARIANTS.map((item) => (
            <VariantButton key={item.value} type="button" isActive={variant === item.value} onClick={() => setVariant(item.value)}>
              {item.label}
            </VariantButton>
          ))}
        </Variants>
        <NewCommonButton type="button" size="xs" onClick={handleApply}>
          {getApplyText(buttonPosition !== null)}
        </NewCommonButton>
      </Row>
    </Container>
  );
}

export default MailButtonPanel;
