import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { USER_ACCOUNT_STATE_LABEL, UserAccountState } from '@utils/userAccountFilter';

const ACCOUNT_STATE_PALETTE: Record<UserAccountState, { bg: string; fg: string }> = {
  TOSS: { bg: Color.BLUE_FAINT, fg: Color.BLUE },
  ACCOUNT: { bg: Color.GREEN_FAINT, fg: Color.GREEN },
  NONE: { bg: Color.KIO_ORANGE_FAINT, fg: Color.KIO_ORANGE_DARK },
};

const Pill = styled.span<{ state: UserAccountState }>`
  padding: 2px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  background: ${({ state }) => ACCOUNT_STATE_PALETTE[state].bg};
  color: ${({ state }) => ACCOUNT_STATE_PALETTE[state].fg};
  white-space: nowrap;
`;

interface UserAccountBadgeProps {
  state: UserAccountState;
}

function UserAccountBadge({ state }: UserAccountBadgeProps) {
  return <Pill state={state}>{USER_ACCOUNT_STATE_LABEL[state]}</Pill>;
}

export default UserAccountBadge;
