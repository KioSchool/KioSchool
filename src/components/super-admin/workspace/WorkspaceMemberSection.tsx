import { useState } from 'react';
import styled from '@emotion/styled';
import { toast } from 'react-toastify';
import { WorkspaceAdminDetail } from '@@types/index';
import useSuperAdminWorkspace from '@hooks/super-admin/useSuperAdminWorkspace';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { getApiErrorMessage } from '@utils/apiError';
import DetailSection from '@components/super-admin/detail/DetailSection';

const MemberList = styled.div`
  width: 100%;
  gap: 6px;
  ${colFlex()}
`;

const MemberRow = styled.div`
  width: 100%;
  gap: 8px;
  font-size: 13px;
  ${rowFlex({ justify: 'space-between', align: 'center' })}
`;

const MemberInfo = styled.div`
  min-width: 0;
  gap: 1px;
  ${colFlex()}
`;

const MemberName = styled.span`
  color: ${Color.BLACK};
`;

const MemberLoginId = styled.span`
  font-size: 11px;
  color: ${Color.GREY};
`;

const OwnerTag = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: ${Color.KIO_ORANGE_DARK};
`;

const SmallButton = styled.button`
  flex-shrink: 0;
  height: 28px;
  padding: 0 10px;
  border: 1px solid ${Color.HEAVY_GREY};
  border-radius: 6px;
  background: ${Color.WHITE};
  font-size: 12px;
  color: ${Color.GREY};
  cursor: pointer;

  &:hover:not(:disabled) {
    color: ${Color.BLACK};
    border-color: ${Color.GREY};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ManualRow = styled.div`
  width: 100%;
  margin-top: 4px;
  gap: 6px;
  ${rowFlex({ align: 'center' })}
`;

const LoginIdInput = styled.input`
  flex: 1;
  min-width: 0;
  height: 28px;
  padding: 0 10px;
  border: 1px solid ${Color.BORDER_GREY};
  border-radius: 6px;
  font-size: 12px;
`;

const Hint = styled.div`
  font-size: 11px;
  color: ${Color.GREY};
`;

interface WorkspaceMemberSectionProps {
  detail: WorkspaceAdminDetail;
  onOwnerChanged: (detail: WorkspaceAdminDetail) => void;
}

function WorkspaceMemberSection({ detail, onOwnerChanged }: WorkspaceMemberSectionProps) {
  const { changeWorkspaceOwner } = useSuperAdminWorkspace();
  const [manualLoginId, setManualLoginId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChangeOwner = (loginId: string) => {
    const target = loginId.trim();
    if (!target || target === detail.ownerLoginId) return;
    if (!window.confirm(`"${detail.name}"의 사장을 ${target} 계정으로 변경할까요?`)) return;

    setIsSubmitting(true);
    changeWorkspaceOwner(detail.id, target)
      .then((next) => {
        toast.success('사장을 변경했어요.');
        setManualLoginId('');
        onOwnerChanged(next);
      })
      .catch((error) => toast.error(getApiErrorMessage(error, '사장을 변경하지 못했어요.')))
      .finally(() => setIsSubmitting(false));
  };

  return (
    <DetailSection title={`멤버 ${detail.members.length}명`}>
      <MemberList>
        {detail.members.map((member) => (
          <MemberRow key={member.id}>
            <MemberInfo>
              <MemberName>{member.name}</MemberName>
              <MemberLoginId>{member.loginId}</MemberLoginId>
            </MemberInfo>
            {member.loginId === detail.ownerLoginId && <OwnerTag>사장</OwnerTag>}
            {member.loginId !== detail.ownerLoginId && (
              <SmallButton type="button" disabled={isSubmitting} onClick={() => handleChangeOwner(member.loginId)}>
                사장으로 변경
              </SmallButton>
            )}
          </MemberRow>
        ))}
      </MemberList>
      <ManualRow>
        <LoginIdInput value={manualLoginId} onChange={(e) => setManualLoginId(e.target.value)} placeholder="멤버가 아닌 계정의 아이디" />
        <SmallButton type="button" disabled={isSubmitting || !manualLoginId.trim()} onClick={() => handleChangeOwner(manualLoginId)}>
          사장으로 변경
        </SmallButton>
      </ManualRow>
      <Hint>멤버가 아닌 계정을 사장으로 지정하면 멤버로도 추가됩니다.</Hint>
    </DetailSection>
  );
}

export default WorkspaceMemberSection;
