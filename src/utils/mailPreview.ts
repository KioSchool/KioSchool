import mailMessageTemplate from '@resources/templates/mailMessage.html?raw';

interface MailPreviewOptions {
  button?: { label: string; url: string };
  unsubscribeUrl?: string;
}

function findByAttribute(document: Document, attribute: string, value: string): HTMLElement | undefined {
  return Array.from(document.querySelectorAll<HTMLElement>('*')).find((element) => element.getAttribute(attribute) === value);
}

function fillContent(document: Document, content: string) {
  const element = findByAttribute(document, 'th:utext', '${contentHtml}');
  if (!element) return;

  element.removeAttribute('th:utext');
  element.textContent = '';
  content.split('\n').forEach((line, index) => {
    if (index > 0) element.appendChild(document.createElement('br'));
    element.appendChild(document.createTextNode(line));
  });
}

function fillButton(document: Document, button: MailPreviewOptions['button']) {
  const container = findByAttribute(document, 'th:if', '${button != null}');
  if (!container) return;

  if (!button) {
    container.remove();
    return;
  }

  const link = container.querySelector('a');
  container.removeAttribute('th:if');
  if (!link) return;
  link.removeAttribute('th:href');
  link.removeAttribute('th:text');
  link.setAttribute('href', button.url);
  link.textContent = button.label;
}

function fillUnsubscribe(document: Document, unsubscribeUrl: string | undefined) {
  const container = findByAttribute(document, 'th:if', '${unsubscribeUrl != null}');
  if (!container) return;

  if (!unsubscribeUrl) {
    container.remove();
    return;
  }

  const link = container.querySelector('a');
  container.removeAttribute('th:if');
  if (!link) return;
  link.removeAttribute('th:href');
  link.setAttribute('href', unsubscribeUrl);
}

// 서버 템플릿(KioSchool-API templates/mailMessage.html)과 같은 모양으로 미리 보여준다. sandbox="" iframe에 넣어 쓴다.
export function createMailPreviewHtml(content: string, { button, unsubscribeUrl }: MailPreviewOptions = {}): string {
  const document = new DOMParser().parseFromString(mailMessageTemplate, 'text/html');
  fillContent(document, content.trim());
  fillButton(document, button);
  fillUnsubscribe(document, unsubscribeUrl);
  return `<!DOCTYPE html>${document.documentElement.outerHTML}`;
}
