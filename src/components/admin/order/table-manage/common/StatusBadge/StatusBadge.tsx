import styled from '@emotion/styled';
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

const Badge = styled.div<{ status: TableStatus }>`
  color: ${({ status }) => STATUS_BADGE_TEXT_COLOR[status]};
  font-size: 12px;
  font-weight: 600;
  padding: 4px 6px;
  border: 1px solid ${({ status }) => STATUS_BADGE_TEXT_COLOR[status]};
  border-radius: 13px;
  background-color: ${({ status }) => STATUS_BADGE_BACKGROUND[status]};
  width: fit-content;
`;

interface StatusBadgeProps {
  status: TableStatus;
}

function StatusBadge({ status }: StatusBadgeProps) {
  return <Badge status={status}>{STATUS_BADGE_LABEL[status]}</Badge>;
}

export default StatusBadge;
