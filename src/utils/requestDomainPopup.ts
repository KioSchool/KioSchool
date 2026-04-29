import { match } from 'ts-pattern';

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

export function validateRequestDomainPopupForm(rawSchoolName: string | undefined, rawEmailOrDomain: string | undefined): RequestDomainPopupValidationResult {
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

  const emailOrDomainError = getValidationError(
    emailOrDomain,
    '사용하시는 학교 이메일 또는 도메인을 입력해주세요.',
    '이메일 또는 도메인에는 줄바꿈이나 탭을 입력할 수 없습니다.',
    `이메일 또는 도메인은 ${EMAIL_OR_DOMAIN_MAX_LENGTH}자 이하로 입력해주세요.`,
    EMAIL_OR_DOMAIN_MAX_LENGTH,
  );

  if (emailOrDomainError) {
    return { schoolName, emailOrDomain, errorMessage: emailOrDomainError };
  }

  return { schoolName, emailOrDomain, errorMessage: null };
}

export function getRequestDomainPopupResult(schoolName: string, emailOrDomain: string) {
  return `
    ### [도메인 추가 요청]
    - 학교명: ${schoolName}
    - 도메인/이메일: ${emailOrDomain}
    `;
}
