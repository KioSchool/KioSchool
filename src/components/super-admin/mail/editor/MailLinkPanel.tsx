import { useState } from 'react';
import styled from '@emotion/styled';
import { Editor } from '@tiptap/react';
import NewCommonButton from '@components/common/button/NewCommonButton';
import NewAppInput from '@components/common/input/NewAppInput';
import { MAIL_BUTTON_URL_MAX_LENGTH } from '@constants/data/mailData';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { isMailLinkValid } from '@utils/mailEditor';

const Container = styled.div`
  width: 100%;
  gap: 8px;
  ${colFlex()}
`;

const ButtonRow = styled.div`
  gap: 8px;
  ${rowFlex({ justify: 'flex-end', align: 'center' })}
`;

const ErrorText = styled.span`
  color: ${Color.RED};
  font-size: 12px;
`;

interface MailLinkPanelProps {
  editor: Editor;
  onClose: () => void;
}

function MailLinkPanel({ editor, onClose }: MailLinkPanelProps) {
  const [url, setUrl] = useState<string>(editor.getAttributes('link').href ?? '');
  const [hasError, setHasError] = useState(false);

  const handleApply = () => {
    const trimmedUrl = url.trim();
    if (!isMailLinkValid(trimmedUrl)) {
      setHasError(true);
      return;
    }

    if (editor.state.selection.empty && !editor.isActive('link')) {
      editor
        .chain()
        .focus()
        .insertContent({ type: 'text', text: trimmedUrl, marks: [{ type: 'link', attrs: { href: trimmedUrl } }] })
        .run();
    } else {
      editor.chain().focus().extendMarkRange('link').setLink({ href: trimmedUrl }).run();
    }
    onClose();
  };

  const handleRemove = () => {
    editor.chain().focus().extendMarkRange('link').unsetLink().run();
    onClose();
  };

  return (
    <Container>
      <NewAppInput
        width="100%"
        height={40}
        value={url}
        maxLength={MAIL_BUTTON_URL_MAX_LENGTH}
        placeholder="https://로 시작하는 주소"
        onChange={(event) => {
          setUrl(event.target.value);
          setHasError(false);
        }}
      />
      {hasError && <ErrorText role="alert">https://로 시작하는 주소를 넣어 주세요.</ErrorText>}
      <ButtonRow>
        {editor.isActive('link') && (
          <NewCommonButton type="button" size="xs" color="blue_gray" onClick={handleRemove}>
            링크 지우기
          </NewCommonButton>
        )}
        <NewCommonButton type="button" size="xs" onClick={handleApply}>
          링크 넣기
        </NewCommonButton>
      </ButtonRow>
    </Container>
  );
}

export default MailLinkPanel;
