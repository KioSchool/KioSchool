import { useState } from 'react';
import styled from '@emotion/styled';
import { toast } from 'react-toastify';
import useSuperAdminWorkspace from '@hooks/super-admin/useSuperAdminWorkspace';
import { Color } from '@resources/colors';
import { colFlex } from '@styles/flexStyles';
import { getApiErrorMessage } from '@utils/apiError';

const Box = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 14px;
  border: 1px solid ${Color.RED};
  border-radius: 8px;
  background: ${Color.LIGHT_RED};
  gap: 8px;
  ${colFlex()}
`;

const Title = styled.div`
  font-size: 13px;
  font-weight: 700;
  color: ${Color.RED};
`;

const Description = styled.div`
  font-size: 12px;
  color: ${Color.GREY};
  line-height: 1.5;
`;

const NameInput = styled.input`
  height: 34px;
  padding: 0 10px;
  border: 1px solid ${Color.HEAVY_GREY};
  border-radius: 6px;
  background: ${Color.WHITE};
  font-size: 13px;
`;

const DeleteButton = styled.button`
  height: 36px;
  border: none;
  border-radius: 6px;
  background: ${Color.RED};
  color: ${Color.WHITE};
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

interface WorkspaceForceDeleteSectionProps {
  workspaceId: number;
  workspaceName: string;
  onDeleted: () => void;
}

function WorkspaceForceDeleteSection({ workspaceId, workspaceName, onDeleted }: WorkspaceForceDeleteSectionProps) {
  const { forceDeleteWorkspace } = useSuperAdminWorkspace();
  const [typedName, setTypedName] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const isNameMatched = typedName.trim() === workspaceName;

  const handleDelete = () => {
    if (!isNameMatched) return;

    setIsDeleting(true);
    forceDeleteWorkspace(workspaceId)
      .then(() => {
        toast.success(`"${workspaceName}"을(를) 삭제했어요.`);
        onDeleted();
      })
      .catch((error) => {
        toast.error(getApiErrorMessage(error, '워크스페이스를 삭제하지 못했어요.'));
        setIsDeleting(false);
      });
  };

  return (
    <Box>
      <Title>워크스페이스 강제 삭제</Title>
      <Description>주문·테이블·세션·통계·인사이트 카드·상품이 모두 함께 삭제되고 되돌릴 수 없어요. 계속하려면 주점 이름을 그대로 입력하세요.</Description>
      <NameInput value={typedName} onChange={(e) => setTypedName(e.target.value)} placeholder={workspaceName} />
      <DeleteButton type="button" disabled={!isNameMatched || isDeleting} onClick={handleDelete}>
        {isDeleting ? '삭제 중...' : '영구 삭제'}
      </DeleteButton>
    </Box>
  );
}

export default WorkspaceForceDeleteSection;
