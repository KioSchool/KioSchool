import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { MAIL_NO_SUBJECT, MAIL_NO_WORKSPACE } from '@constants/data/mailData';
import { getSuperAdminMailPath } from '@constants/routes';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { mobileMediaQuery } from '@styles/globalStyles';
import type { MailThreadListItem } from '@@types/mail';
import { formatNullableKoreanDateTime } from '@utils/formatNumber';
import MailStatusBadge from './MailStatusBadge';

const List = styled.div`
  width: 100%;
  border: 1px solid ${Color.BORDER_GREY};
  border-radius: 10px;
  overflow: hidden;
  ${colFlex()}
`;

const ThreadLink = styled(Link)`
  width: 100%;
  min-width: 0;
  box-sizing: border-box;
  padding: 16px 20px;
  border-bottom: 1px solid #f0f0f0;
  color: inherit;
  text-decoration: none;
  gap: 14px;
  ${rowFlex({ justify: 'space-between', align: 'center' })}

  &:last-of-type {
    border-bottom: none;
  }

  &:hover {
    background: #fcfcfc;
  }

  ${mobileMediaQuery} {
    padding: 14px;
    align-items: flex-start;
  }
`;

const ThreadInfo = styled.div`
  min-width: 0;
  gap: 4px;
  ${colFlex()}
`;

const ThreadSubject = styled.span<{ isUnread: boolean }>`
  overflow: hidden;
  color: ${Color.BLACK};
  font-size: 15px;
  font-weight: ${({ isUnread }) => (isUnread ? 700 : 500)};
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ThreadMeta = styled.span`
  color: ${Color.GREY};
  font-size: 13px;
  overflow-wrap: anywhere;
`;

interface MailThreadListProps {
  threads: MailThreadListItem[];
  hideWorkspace?: boolean;
}

function MailThreadList({ threads, hideWorkspace = false }: MailThreadListProps) {
  return (
    <List>
      {threads.map((thread) => (
        <ThreadLink key={thread.id} to={getSuperAdminMailPath(thread.id)}>
          <ThreadInfo>
            <ThreadSubject isUnread={thread.isUnread}>{thread.subject || MAIL_NO_SUBJECT}</ThreadSubject>
            <ThreadMeta>
              {!hideWorkspace && `${thread.workspaceName ?? MAIL_NO_WORKSPACE} · `}
              {thread.counterpartName ?? thread.counterpartEmail} · {formatNullableKoreanDateTime(thread.lastMessageAt)}
            </ThreadMeta>
          </ThreadInfo>
          <MailStatusBadge status={thread.status} />
        </ThreadLink>
      ))}
    </List>
  );
}

export default MailThreadList;
