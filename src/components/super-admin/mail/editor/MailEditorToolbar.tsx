import styled from '@emotion/styled';
import { RiAlignCenter, RiAlignLeft, RiAlignRight } from '@remixicon/react';
import { Editor } from '@tiptap/react';
import { match } from 'ts-pattern';
import { Color } from '@resources/colors';
import { rowFlex } from '@styles/flexStyles';
import { MailAlignment } from './mailEditorExtensions';

export type MailEditorPanel = 'link' | 'button' | 'value';

const Bar = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 8px 10px;
  border-bottom: 1px solid ${Color.BORDER_GREY};
  background: ${Color.LIGHT_GREY};
  gap: 2px;
  flex-wrap: wrap;
  ${rowFlex({ align: 'center' })}
`;

const getToolBackground = (isActive: boolean) =>
  match(isActive)
    .with(true, () => Color.KIO_ORANGE_FAINT)
    .otherwise(() => 'transparent');

const getToolColor = (isActive: boolean) =>
  match(isActive)
    .with(true, () => Color.KIO_ORANGE_DARK)
    .otherwise(() => Color.GREY);

const Tool = styled.button<{ isActive: boolean }>`
  min-width: 28px;
  height: 28px;
  padding: 0 8px;
  border: none;
  border-radius: 6px;
  background: ${({ isActive }) => getToolBackground(isActive)};
  color: ${({ isActive }) => getToolColor(isActive)};
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;

  svg {
    display: block;
    margin: 0 auto;
  }

  &:hover {
    background: ${Color.KIO_ORANGE_FAINT};
  }
`;

function getButtonToolText(isButtonSelected: boolean): string {
  return match(isButtonSelected)
    .with(true, () => '버튼 고치기')
    .otherwise(() => '버튼 넣기');
}

const ALIGN_ICON_SIZE = 16;
const ALIGNMENTS: { label: string; value: MailAlignment | null; Icon: typeof RiAlignLeft }[] = [
  { label: '왼쪽 정렬', value: null, Icon: RiAlignLeft },
  { label: '가운데 정렬', value: 'center', Icon: RiAlignCenter },
  { label: '오른쪽 정렬', value: 'right', Icon: RiAlignRight },
];

function getCurrentAlignment(editor: Editor): MailAlignment | null {
  if (editor.isActive({ align: 'center' })) return 'center';
  if (editor.isActive({ align: 'right' })) return 'right';
  return null;
}

const Separator = styled.span`
  width: 1px;
  height: 18px;
  margin: 0 5px;
  background: ${Color.HEAVY_GREY};
`;

interface MailEditorToolbarProps {
  editor: Editor;
  panel: MailEditorPanel | null;
  withValues: boolean;
  onTogglePanel: (panel: MailEditorPanel) => void;
}

function MailEditorToolbar({ editor, panel, withValues, onTogglePanel }: MailEditorToolbarProps) {
  const tools = [
    { label: '굵게', text: 'B', isActive: editor.isActive('bold'), run: () => editor.chain().focus().toggleBold().run() },
    { label: '기울임', text: 'I', isActive: editor.isActive('italic'), run: () => editor.chain().focus().toggleItalic().run() },
    { label: '밑줄', text: 'U', isActive: editor.isActive('underline'), run: () => editor.chain().focus().toggleUnderline().run() },
  ];
  const blocks = [
    { label: '제목', isActive: editor.isActive('heading', { level: 2 }), run: () => editor.chain().focus().toggleHeading({ level: 2 }).run() },
    { label: '• 목록', isActive: editor.isActive('bulletList'), run: () => editor.chain().focus().toggleBulletList().run() },
    { label: '1. 목록', isActive: editor.isActive('orderedList'), run: () => editor.chain().focus().toggleOrderedList().run() },
    { label: '구분선', isActive: false, run: () => editor.chain().focus().setHorizontalRule().run() },
  ];

  const currentAlignment = getCurrentAlignment(editor);

  const handleAlign = (align: MailAlignment | null) => {
    editor.chain().focus().updateAttributes('paragraph', { align }).updateAttributes('heading', { align }).run();
  };

  return (
    <Bar>
      {tools.map((tool) => (
        <Tool
          key={tool.label}
          type="button"
          aria-label={tool.label}
          isActive={tool.isActive}
          onMouseDown={(event) => event.preventDefault()}
          onClick={tool.run}
        >
          {tool.text}
        </Tool>
      ))}
      <Separator />
      {blocks.map((block) => (
        <Tool key={block.label} type="button" isActive={block.isActive} onMouseDown={(event) => event.preventDefault()} onClick={block.run}>
          {block.label}
        </Tool>
      ))}
      <Separator />
      {ALIGNMENTS.map(({ label, value, Icon }) => (
        <Tool
          key={label}
          type="button"
          aria-label={label}
          isActive={currentAlignment === value}
          onMouseDown={(event) => event.preventDefault()}
          onClick={() => handleAlign(value)}
        >
          <Icon size={ALIGN_ICON_SIZE} />
        </Tool>
      ))}
      <Separator />
      <Tool
        type="button"
        isActive={panel === 'link' || editor.isActive('link')}
        onMouseDown={(event) => event.preventDefault()}
        onClick={() => onTogglePanel('link')}
      >
        링크
      </Tool>
      <Tool
        type="button"
        isActive={panel === 'button' || editor.isActive('mailButton')}
        onMouseDown={(event) => event.preventDefault()}
        onClick={() => onTogglePanel('button')}
      >
        {getButtonToolText(editor.isActive('mailButton'))}
      </Tool>
      {withValues && (
        <Tool type="button" isActive={panel === 'value'} onMouseDown={(event) => event.preventDefault()} onClick={() => onTogglePanel('value')}>
          값 넣기
        </Tool>
      )}
    </Bar>
  );
}

export default MailEditorToolbar;
