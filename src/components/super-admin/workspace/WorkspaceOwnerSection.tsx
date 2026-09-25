import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { WorkspaceAdminDetail } from '@@types/index';
import { Color } from '@resources/colors';
import { rowFlex } from '@styles/flexStyles';
import { getUserAccountState } from '@utils/userAccountFilter';
import { getSuperAdminUserSearchPath } from '@constants/routes';
import DetailSection from '@components/super-admin/detail/DetailSection';
import DetailInfoRow from '@components/super-admin/detail/DetailInfoRow';
import UserAccountBadge from '@components/super-admin/user/UserAccountBadge';

const LinkButton = styled.button`
  align-self: flex-end;
  padding: 0;
  border: none;
  background: none;
  font-size: 12px;
  color: ${Color.GREY};
  text-decoration: underline;
  cursor: pointer;
  ${rowFlex({ align: 'center' })}

  &:hover {
    color: ${Color.BLACK};
  }
`;

const NO_VALUE = '-';

interface WorkspaceOwnerSectionProps {
  detail: WorkspaceAdminDetail;
  onNavigate: () => void;
}

function WorkspaceOwnerSection({ detail, onNavigate }: WorkspaceOwnerSectionProps) {
  const navigate = useNavigate();
  const { owner } = detail;

  const handleOpenUser = () => {
    navigate(getSuperAdminUserSearchPath({ keyword: detail.ownerLoginId }));
    onNavigate();
  };

  return (
    <DetailSection title="사장">
      <DetailInfoRow label="이름">{owner.name}</DetailInfoRow>
      <DetailInfoRow label="아이디">{detail.ownerLoginId}</DetailInfoRow>
      <DetailInfoRow label="이메일">{owner.email ?? NO_VALUE}</DetailInfoRow>
      <DetailInfoRow label="계좌">
        <UserAccountBadge state={getUserAccountState(owner)} />
      </DetailInfoRow>
      {owner.account && (
        <DetailInfoRow label="은행·예금주">
          {owner.account.bank.name} · {owner.account.accountHolder}
        </DetailInfoRow>
      )}
      <LinkButton type="button" onClick={handleOpenUser}>
        사용자 관리에서 보기
      </LinkButton>
    </DetailSection>
  );
}

export default WorkspaceOwnerSection;
