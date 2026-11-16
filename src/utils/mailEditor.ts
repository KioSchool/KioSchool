import { match } from 'ts-pattern';
import type { MailSettings, MailSignatureScope, MailSignatureSetting } from '@@types/mail';

export const MAIL_VALUE_PATTERN = /\{[^{}]+\}/g;
const HTTPS_PREFIX = 'https://';
export const MAIL_SIGNATURE_ATTRIBUTE = 'data-mail-signature';
const MAIL_SIGNATURE_SLOT = `<div ${MAIL_SIGNATURE_ATTRIBUTE}=""></div>`;
const EMPTY_PARAGRAPH = '<p></p>';

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

export interface MailComposeDefaults {
  initialContent: string;
  signatureHtml: string | null;
}

export const EMPTY_MAIL_COMPOSE_DEFAULTS: MailComposeDefaults = { initialContent: '', signatureHtml: null };

export function buildMailInitialContent(greetingHtml: string, hasSignature: boolean): string {
  if (!greetingHtml && !hasSignature) return '';
  if (!hasSignature) return `${greetingHtml}${EMPTY_PARAGRAPH}`;
  return `${greetingHtml}${EMPTY_PARAGRAPH}${MAIL_SIGNATURE_SLOT}`;
}

function getComposeSetting(settings: MailSettings, scope: MailSignatureScope): MailSignatureSetting {
  return match(scope)
    .with('team', () => settings.team)
    .otherwise(() => settings.mine ?? settings.team);
}

function getComposeSignatureHtml(settings: MailSettings, scope: MailSignatureScope): string | null {
  return match(scope)
    .with('team', () => settings.teamSignatureHtml)
    .otherwise(() => settings.personalSignatureHtml);
}

export function getMailComposeDefaults(settings: MailSettings, scope: MailSignatureScope): MailComposeDefaults {
  const signatureHtml = getComposeSignatureHtml(settings, scope);
  return {
    initialContent: buildMailInitialContent(getComposeSetting(settings, scope).greetingHtml, Boolean(signatureHtml)),
    signatureHtml,
  };
}

export function getMailSignatureForms(settings: MailSettings): Record<MailSignatureScope, MailSignatureSetting> {
  const mine = settings.mine ?? { ...settings.team, name: settings.myAccountName, englishName: null, organization: null, jobTitle: null };
  return { mine, team: settings.team };
}
