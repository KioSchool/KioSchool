import MarkdownIt from 'markdown-it';
import { isMailLinkValid, MAIL_VALUE_PATTERN } from '@utils/mailEditor';

const CODE_EDITOR_CLIPBOARD_TYPE = 'vscode-editor-data';
const MARKDOWN_PATTERN = /^(#{1,6} |[-*+] |\d+\. |---\s*$)|\*\*[^*\n]+\*\*|\[[^\]\n]+\]\([^)\n]+\)/m;
const VALUE_SPACE = ' ';
const VALUE_SPACE_PATTERN = / /g;

const markdown = new MarkdownIt({ html: false, breaks: true }).disable(['table', 'code']);
// 주소 속 {주점 번호} 같은 값이 %7B로 바뀌면 보낼 때 채워지지 않는다
markdown.normalizeLink = (url) => url;
markdown.validateLink = isMailLinkValid;

export function markdownToHtml(text: string): string {
  // 괄호 안 주소에 띄어쓰기가 있으면 링크로 읽지 않아서, 값 안의 띄어쓰기를 잠시 다른 글자로 바꾼다
  const protectedText = text.replace(MAIL_VALUE_PATTERN, (value) => value.replace(/ /g, VALUE_SPACE));
  return markdown.render(protectedText).replace(VALUE_SPACE_PATTERN, ' ');
}

// 서식이 함께 복사된 글은 그 서식을 그대로 쓴다. 코드 편집기는 글자색만 담아 보내므로 마크다운으로 읽는다.
export function getPastedMarkdown(event: ClipboardEvent): string | null {
  const data = event.clipboardData;
  if (!data) return null;

  const hasRichFormat = data.types.includes('text/html') && !data.types.includes(CODE_EDITOR_CLIPBOARD_TYPE);
  if (hasRichFormat) return null;

  const text = data.getData('text/plain');
  if (!MARKDOWN_PATTERN.test(text)) return null;
  return text;
}
