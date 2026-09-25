import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { match } from 'ts-pattern';
import { SuperAdminUser, UserRole } from '@@types/index';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { formatKoreanDate } from '@utils/formatNumber';
import { getUserAccountState } from '@utils/userAccountFilter';
import { getSuperAdminWorkspacePath } from '@constants/routes';
import DetailSection from '@components/super-admin/detail/DetailSection';
import DetailInfoRow from '@components/super-admin/detail/DetailInfoRow';
import UserAccountBadge from './UserAccountBadge';

const Wrap = styled.div`
  width: 100%;
  gap: 20px;
  ${colFlex()}
`;

const HeaderRow = styled.div`
  width: 100%;
  gap: 8px;
  ${rowFlex({ justify: 'space-between', align: 'center' })}
`;

const TitleText = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: ${Color.BLACK};
`;

const InfoList = styled.div`
  width: 100%;
  gap: 6px;
  ${colFlex()}
`;

const EmptyText = styled.div`
  font-size: 12px;
  color: ${Color.HEAVY_GREY};
`;

const WorkspaceButton = styled.button`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid ${Color.BORDER_GREY};
  border-radius: 8px;
  background: ${Color.WHITE};
  font-size: 13px;
  color: ${Color.BLACK};
  cursor: pointer;
  ${rowFlex({ justify: 'space-between', align: 'center' })}

  &:hover {
    border-color: ${Color.KIO_ORANGE};
    color: ${Color.KIO_ORANGE_DARK};
  }
`;

const RoleText = styled.span`
  font-size: 12px;
  color: ${Color.GREY};
`;

const NO_VALUE = '-';

interface UserDetailContentProps {
  user: SuperAdminUser;
  onClose: () => void;
}

function UserDetailContent({ user, onClose }: UserDetailContentProps) {
  const navigate = useNavigate();

  const handleOpenWorkspace = (workspaceName: string) => {
    navigate(getSuperAdminWorkspacePath({ keyword: workspaceName }));
    onClose();
  };

  return (
    <Wrap>
      <HeaderRow>
        <TitleText>{user.name}</TitleText>
        <UserAccountBadge state={getUserAccountState(user)} />
      </HeaderRow>

      <DetailSection title="기본 정보">
        <DetailInfoRow label="아이디">{user.loginId}</DetailInfoRow>
        <DetailInfoRow label="이메일">{user.email ?? NO_VALUE}</DetailInfoRow>
        <DetailInfoRow label="가입일">{formatKoreanDate(user.createdAt)}</DetailInfoRow>
        {user.role === UserRole.SUPER_ADMIN && <DetailInfoRow label="권한">슈퍼어드민</DetailInfoRow>}
      </DetailSection>

      <DetailSection title="계좌">
        {match(user.account)
          .with(null, () => <EmptyText>계좌를 연동하지 않았습니다.</EmptyText>)
          .otherwise((account) => (
            <InfoList>
              <DetailInfoRow label="은행">{account.bank.name}</DetailInfoRow>
              <DetailInfoRow label="예금주">{account.accountHolder}</DetailInfoRow>
              <DetailInfoRow label="계좌번호">{account.accountNumber}</DetailInfoRow>
            </InfoList>
          ))}
      </DetailSection>

      <DetailSection title={`소속 주점 ${user.workspaces.length}곳`}>
        {user.workspaces.length === 0 && <EmptyText>소속된 주점이 없습니다.</EmptyText>}
        {user.workspaces.map((workspace) => (
          <WorkspaceButton key={workspace.id} type="button" onClick={() => handleOpenWorkspace(workspace.name)}>
            {workspace.name}
            <RoleText>{workspace.isOwner ? '사장' : '멤버'}</RoleText>
          </WorkspaceButton>
        ))}
      </DetailSection>
    </Wrap>
  );
}

export default UserDetailContent;
