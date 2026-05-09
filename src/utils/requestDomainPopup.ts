import { match } from 'ts-pattern';

export type RequestDomainMode = 'domain' | 'email';

export function isEmailLike(value: string): boolean {
  return value.trim().includes('@');
}

const CONTROL_CHARACTER_REGEX = /[\r\n\t]/;
const SCHOOL_NAME_MAX_LENGTH = 50;
const EMAIL_OR_DOMAIN_MAX_LENGTH = 100;

interface RequestDomainPopupValidationResult {
  schoolName: string;
  emailOrDomain: string;
  errorMessage: string | null;
}

function normalizeInput(value: string | undefined) {
  return value?.trim() ?? '';
}

function getValidationError(value: string, emptyMessage: string, controlCharacterMessage: string, maxLengthMessage: string, maxLength: number) {
  return match(value)
    .when(
      (currentValue) => currentValue === '',
      () => emptyMessage,
    )
    .when(
      (currentValue) => CONTROL_CHARACTER_REGEX.test(currentValue),
      () => controlCharacterMessage,
    )
    .when(
      (currentValue) => currentValue.length > maxLength,
      () => maxLengthMessage,
    )
    .otherwise(() => null);
}

export function validateRequestDomainPopupForm(
  mode: RequestDomainMode,
  rawSchoolName: string | undefined,
  rawEmailOrDomain: string | undefined,
): RequestDomainPopupValidationResult {
  const schoolName = normalizeInput(rawSchoolName);
  const emailOrDomain = normalizeInput(rawEmailOrDomain);

  const schoolNameError = getValidationError(
    schoolName,
    '학교 이름을 입력해주세요.',
    '학교 이름에는 줄바꿈이나 탭을 입력할 수 없습니다.',
    `학교 이름은 ${SCHOOL_NAME_MAX_LENGTH}자 이하로 입력해주세요.`,
    SCHOOL_NAME_MAX_LENGTH,
  );

  if (schoolNameError) {
    return { schoolName, emailOrDomain, errorMessage: schoolNameError };
  }

  const emptyMessage = match(mode)
    .with('domain', () => '학교 이메일 도메인을 입력해주세요.')
    .with('email', () => '본인 학교 이메일을 입력해주세요.')
    .exhaustive();

  const controlCharacterMessage = match(mode)
    .with('domain', () => '도메인에는 줄바꿈이나 탭을 입력할 수 없습니다.')
    .with('email', () => '이메일에는 줄바꿈이나 탭을 입력할 수 없습니다.')
    .exhaustive();

  const maxLengthMessage = match(mode)
    .with('domain', () => `도메인은 ${EMAIL_OR_DOMAIN_MAX_LENGTH}자 이하로 입력해주세요.`)
    .with('email', () => `이메일은 ${EMAIL_OR_DOMAIN_MAX_LENGTH}자 이하로 입력해주세요.`)
    .exhaustive();

  const emailOrDomainError = getValidationError(emailOrDomain, emptyMessage, controlCharacterMessage, maxLengthMessage, EMAIL_OR_DOMAIN_MAX_LENGTH);

  if (emailOrDomainError) {
    return { schoolName, emailOrDomain, errorMessage: emailOrDomainError };
  }

  return { schoolName, emailOrDomain, errorMessage: null };
}

export function getRequestDomainPopupResult(mode: RequestDomainMode, schoolName: string, emailOrDomain: string): string {
  return match(mode)
    .with(
      'domain',
      () => `
    ### [도메인 추가 요청]
    - 학교명: ${schoolName}
    - 입력 유형: 학교 이메일 도메인
    - 도메인: ${emailOrDomain}
    `,
    )
    .with(
      'email',
      () => `
    ### [도메인 추가 요청]
    - 학교명: ${schoolName}
    - 입력 유형: 본인 이메일 (도메인 모름 → 회신 필요)
    - 이메일: ${emailOrDomain}
    `,
    )
    .exhaustive();
}
