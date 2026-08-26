import styled from '@emotion/styled';
import { css, keyframes } from '@emotion/react';
import { Color } from '@resources/colors';
import { TABLE_STATUS, TableStatus } from '@utils/tableStatus';

export const STATUS_BADGE_LABEL: Record<TableStatus, string> = {
  [TABLE_STATUS.EMPTY]: '미사용',
  [TABLE_STATUS.USING]: '사용중',
  [TABLE_STATUS.WARNING]: '주의',
  [TABLE_STATUS.EXCEEDED]: '초과',
};

const STATUS_BADGE_TEXT_COLOR: Record<TableStatus, string> = {
  [TABLE_STATUS.EMPTY]: Color.GREY,
  [TABLE_STATUS.USING]: Color.GREEN,
  [TABLE_STATUS.WARNING]: Color.KIO_ORANGE_DARK,
  [TABLE_STATUS.EXCEEDED]: Color.RED,
};

const STATUS_BADGE_BACKGROUND: Record<TableStatus, string> = {
  [TABLE_STATUS.EMPTY]: Color.LIGHT_GREY,
  [TABLE_STATUS.USING]: Color.GREEN_FAINT,
  [TABLE_STATUS.WARNING]: Color.KIO_ORANGE_FAINT,
  [TABLE_STATUS.EXCEEDED]: Color.LIGHT_RED,
};

const STATUS_DOT_COLOR: Record<TableStatus, string> = {
  [TABLE_STATUS.EMPTY]: Color.HEAVY_GREY,
  [TABLE_STATUS.USING]: Color.GREEN,
  [TABLE_STATUS.WARNING]: Color.KIO_ORANGE,
  [TABLE_STATUS.EXCEEDED]: Color.RED,
};

const dotPulse = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0.35; }
  100% { opacity: 1; }
`;

const Badge = styled.div<{ status: TableStatus }>`
  width: fit-content;
  padding: 4px 9px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 800;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  color: ${({ status }) => STATUS_BADGE_TEXT_COLOR[status]};
  background-color: ${({ status }) => STATUS_BADGE_BACKGROUND[status]};
`;

const Dot = styled.span<{ status: TableStatus }>`
  width: 7px;
  height: 7px;
  border-radius: 999px;
  flex-shrink: 0;
  background-color: ${({ status }) => STATUS_DOT_COLOR[status]};

  ${({ status }) =>
    status === TABLE_STATUS.EXCEEDED &&
    css`
      animation: ${dotPulse} 1.4s infinite;
    `}
`;

interface StatusBadgeProps {
  status: TableStatus;
}

function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <Badge status={status}>
      <Dot status={status} />
      {STATUS_BADGE_LABEL[status]}
    </Badge>
  );
}

export default StatusBadge;
