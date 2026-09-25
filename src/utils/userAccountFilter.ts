import { SuperAdminUser, UserAccountFilter } from '@@types/index';

export const USER_ACCOUNT_FILTERS: UserAccountFilter[] = ['CONNECTED', 'NOT_CONNECTED', 'TOSS_NOT_CONNECTED'];

export const USER_ACCOUNT_FILTER_LABEL: Record<UserAccountFilter, string> = {
  CONNECTED: '계좌 연동',
  NOT_CONNECTED: '계좌 미연동',
  TOSS_NOT_CONNECTED: '토스 미연동',
};

export type UserAccountState = 'TOSS' | 'ACCOUNT' | 'NONE';

export const USER_ACCOUNT_STATE_LABEL: Record<UserAccountState, string> = {
  TOSS: '토스 연동',
  ACCOUNT: '계좌만 연동',
  NONE: '계좌 미연동',
};

export function parseUserAccountFilter(value: string | null): UserAccountFilter | undefined {
  return USER_ACCOUNT_FILTERS.find((filter) => filter === value);
}

export function getUserAccountState(user: Pick<SuperAdminUser, 'account'>): UserAccountState {
  if (!user.account) return 'NONE';
  if (user.account.tossAccountUrl) return 'TOSS';
  return 'ACCOUNT';
}
