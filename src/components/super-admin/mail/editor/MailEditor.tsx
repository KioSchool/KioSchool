import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { EditorContent, useEditor } from '@tiptap/react';
import { Link } from '@tiptap/extension-link';
import { Underline } from '@tiptap/extension-underline';
import { StarterKit } from '@tiptap/starter-kit';
import { Color } from '@resources/colors';
import { colFlex } from '@styles/flexStyles';
import { isMailLinkValid } from '@utils/mailEditor';
import MailValueMenu from '../MailValueMenu';
import { MailButton, MailHeading, MailMarkdown, MailValueHighlight } from './mailEditorExtensions';
import MailButtonPanel from './MailButtonPanel';
import MailEditorToolbar, { MailEditorPanel } from './MailEditorToolbar';
import MailLinkPanel from './MailLinkPanel';

const BUTTON_ORANGE = '#eb6d09';

const Container = styled.div`
  width: 100%;
  overflow: hidden;
  border: 1px solid ${Color.HEAVY_GREY};
  border-radius: 14px;
  background: ${Color.WHITE};
  /* 칸을 열 때 브라우저가 본문 자리를 지키려고 화면을 내리면 도구 모음이 머리글 뒤로 숨는다 */
  overflow-anchor: none;
  ${colFlex()}
`;

const Panel = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 12px;
  border-bottom: 1px solid ${Color.BORDER_GREY};
`;

const Body = styled.div<{ height: number }>`
  position: relative;
  width: 100%;

  .ProseMirror {
    min-height: ${({ height }) => height}px;
    box-sizing: border-box;
    padding: 16px 18px;
    color: ${Color.BLACK};
    font-size: 14px;
    line-height: 1.7;
    outline: none;
    overflow-wrap: anywhere;
  }

  .ProseMirror p {
    margin: 0 0 12px;
  }

  .ProseMirror h2 {
    margin: 0 0 12px;
    font-size: 18px;
    font-weight: 700;
  }

  .ProseMirror h3 {
    margin: 0 0 10px;
    font-size: 16px;
    font-weight: 700;
  }

  .ProseMirror ul,
  .ProseMirror ol {
    margin: 0 0 12px;
    padding-left: 20px;
  }

  .ProseMirror li p {
    margin: 0;
  }

  .ProseMirror a {
    color: ${BUTTON_ORANGE};
  }

  .ProseMirror hr {
    margin: 20px 0;
    border: 0;
    border-top: 1px solid ${Color.BORDER_GREY};
  }

  .ProseMirror a[data-mail-button] {
    display: inline-block;
    padding: 10px 18px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 600;
    text-decoration: none;
  }

  .ProseMirror a[data-mail-button='solid'] {
    background: ${BUTTON_ORANGE};
    color: ${Color.WHITE};
  }

  .ProseMirror a[data-mail-button='line'] {
    border: 1px solid ${BUTTON_ORANGE};
    background: ${Color.WHITE};
    color: ${BUTTON_ORANGE};
  }

  .ProseMirror .ProseMirror-selectednode a[data-mail-button],
  .ProseMirror a[data-mail-button].ProseMirror-selectednode {
    outline: 2px solid ${Color.KIO_ORANGE};
    outline-offset: 2px;
  }

  .ProseMirror .mail-value {
    padding: 1px 4px;
    border-radius: 6px;
    background: ${Color.KIO_ORANGE_FAINT};
    color: ${Color.KIO_ORANGE_DARK};
    font-weight: 600;
  }

  .ProseMirror .mail-value-unknown {
    padding: 1px 4px;
    border-radius: 6px;
    background: ${Color.LIGHT_RED};
    color: ${Color.RED};
    font-weight: 600;
  }
`;

const Placeholder = styled.div`
  position: absolute;
  top: 16px;
  left: 18px;
  color: ${Color.HEAVY_GREY};
  font-size: 14px;
  pointer-events: none;
`;

export interface MailEditorProps {
  placeholder: string;
  height?: number;
  withValues?: boolean;
  resetKey?: number;
  onChange: (html: string) => void;
}

function getExtensions(withValues: boolean) {
  const extensions = [
    StarterKit.configure({ code: false, codeBlock: false, blockquote: false, strike: false, heading: false }),
    MailHeading.configure({ levels: [2, 3] }),
    MailMarkdown,
    Underline,
    Link.configure({ openOnClick: false, autolink: false, isAllowedUri: (url) => isMailLinkValid(url ?? ''), HTMLAttributes: { rel: null, target: null } }),
    MailButton,
  ];
  if (!withValues) return extensions;
  return [...extensions, MailValueHighlight];
}

function MailEditor({ placeholder, height = 220, withValues = false, resetKey = 0, onChange }: MailEditorProps) {
  const [panel, setPanel] = useState<MailEditorPanel | null>(null);
  const editor = useEditor({
    extensions: getExtensions(withValues),
    onUpdate: ({ editor: current }) => {
      if (current.isEmpty) {
        onChange('');
        return;
      }
      onChange(current.getHTML());
    },
  });

  useEffect(() => {
    if (resetKey > 0) editor?.commands.clearContent(true);
  }, [editor, resetKey]);

  if (!editor) return null;

  const handleTogglePanel = (next: MailEditorPanel) => {
    setPanel((current) => {
      if (current === next) return null;
      return next;
    });
  };

  const handleSelectValue = (value: string) => {
    editor.chain().focus().insertContent(value).run();
  };

  return (
    <Container>
      <MailEditorToolbar editor={editor} panel={panel} withValues={withValues} onTogglePanel={handleTogglePanel} />
      {panel === 'link' && (
        <Panel>
          <MailLinkPanel editor={editor} onClose={() => setPanel(null)} />
        </Panel>
      )}
      {panel === 'button' && (
        <Panel>
          <MailButtonPanel editor={editor} withValues={withValues} onClose={() => setPanel(null)} />
        </Panel>
      )}
      {panel === 'value' && (
        <Panel>
          <MailValueMenu onSelect={handleSelectValue} />
        </Panel>
      )}
      <Body height={height}>
        {editor.isEmpty && <Placeholder>{placeholder}</Placeholder>}
        <EditorContent editor={editor} />
      </Body>
    </Container>
  );
}

export default MailEditor;
