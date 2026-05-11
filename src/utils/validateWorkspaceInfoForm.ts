import { match } from 'ts-pattern';

interface WorkspaceInfoValidationResult {
  name: string;
  description: string;
  notice: string;
  errorMessage: string | null;
}

export const WORKSPACE_NAME_MAX_LENGTH = 50;
export const WORKSPACE_DESCRIPTION_MAX_LENGTH = 200;
export const WORKSPACE_NOTICE_MAX_LENGTH = 500;

function normalizeInput(value: string | undefined) {
  return value?.trim() ?? '';
}

export function validateWorkspaceInfoForm(
  rawName: string | undefined,
  rawDescription: string | undefined,
  rawNotice: string | undefined,
): WorkspaceInfoValidationResult {
  const name = normalizeInput(rawName);
  const description = normalizeInput(rawDescription);
  const notice = normalizeInput(rawNotice);

  return {
    name,
    description,
    notice,
    errorMessage: match({ name, description })
      .with({ name: '' }, () => '주점명을 입력해주세요.')
      .with({ description: '' }, () => '주점 설명을 입력해주세요.')
      .otherwise(() => null),
  };
}
