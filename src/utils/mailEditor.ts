export const MAIL_VALUE_PATTERN = /\{[^{}]+\}/g;
const HTTPS_PREFIX = 'https://';

export function isMailHtmlEmpty(html: string): boolean {
  const document = new DOMParser().parseFromString(html, 'text/html');
  const hasButton = document.querySelector('a[data-mail-button]') !== null;
  return !hasButton && (document.body.textContent ?? '').trim() === '';
}

export function isMailLinkValid(url: string): boolean {
  if (!url.startsWith(HTTPS_PREFIX)) return false;

  const withoutValues = url.replace(MAIL_VALUE_PATTERN, '');
  return withoutValues.length > HTTPS_PREFIX.length && !/\s/.test(withoutValues);
}

export function getReplySubject(subject: string | null): string {
  if (!subject) return '';
  if (/^re:/i.test(subject)) return subject;
  return `Re: ${subject}`;
}
