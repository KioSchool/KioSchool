import styled from '@emotion/styled';
import { SuperAdminUser } from '@@types/index';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { formatKoreanDate } from '@utils/formatNumber';
import { getUserAccountState } from '@utils/userAccountFilter';
import { SUPER_ADMIN_ROUTES } from '@constants/routes';
import useUserDetailSidebar from '@hooks/super-admin/useUserDetailSidebar';
import UserAccountBadge from './UserAccountBadge';

const Row = styled.div`
  width: 100%;
  padding: 12px 0;
  border-bottom: 1px solid ${Color.LIGHT_GREY};
  cursor: pointer;
  gap: 12px;
  ${rowFlex({ justify: 'space-between', align: 'center' })}

  &:hover .user-name {
    color: ${Color.KIO_ORANGE};
  }
`;

const Info = styled.div`
  flex: 1;
  min-width: 0;
  gap: 2px;
  ${colFlex()}
`;

const Name = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: ${Color.BLACK};
  transition: color 0.15s;
`;

const Sub = styled.div`
  font-size: 12px;
  color: ${Color.GREY};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const WorkspaceText = styled.div`
  font-size: 12px;
  color: ${Color.HEAVY_GREY};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Side = styled.div`
  flex-shrink: 0;
  gap: 4px;
  ${colFlex({ align: 'flex-end' })}
`;

const DateText = styled.span`
  font-size: 11px;
  color: ${Color.HEAVY_GREY};
`;

const NO_EMAIL_LABEL = '이메일 없음';
const NO_WORKSPACE_LABEL = '소속 주점 없음';

interface SuperAdminUserContentProps {
  user: SuperAdminUser;
}

function SuperAdminUserContent({ user }: SuperAdminUserContentProps) {
  const { toggleUserDetail } = useUserDetailSidebar(SUPER_ADMIN_ROUTES.USER);
  const workspaceNames = user.workspaces.map((workspace) => workspace.name).join(', ');

  return (
    <Row onClick={() => toggleUserDetail(user)}>
      <Info>
        <Name className="user-name">{user.name}</Name>
        <Sub>
          {user.loginId} · {user.email ?? NO_EMAIL_LABEL}
        </Sub>
        <WorkspaceText>{workspaceNames || NO_WORKSPACE_LABEL}</WorkspaceText>
      </Info>
      <Side>
        <UserAccountBadge state={getUserAccountState(user)} />
        <DateText>{formatKoreanDate(user.createdAt)} 가입</DateText>
      </Side>
    </Row>
  );
}

export default SuperAdminUserContent;
