import { useState } from 'react';
import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { colFlex } from '@styles/flexStyles';
import useAdminUser from '@hooks/admin/useAdminUser';
import NewCommonButton from '@components/common/button/NewCommonButton';
import { RiCloseLine } from '@remixicon/react';

const ModalContentContainer = styled.form`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${Color.WHITE};
  border-radius: 16px;
  padding: 20px 0;
  z-index: 1010;
  height: 500px;
  width: 700px;
  gap: 140px;
  flex-wrap: wrap;
  ${colFlex({ justify: 'center', align: 'center' })}
`;

const CloseButton = styled(RiCloseLine)`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 28px;
  height: 28px;
  cursor: pointer;
  color: #b2b2b2;
  transition: color 0.2s ease;

  &:hover {
    color: #464a4d;
  }
`;

const Title = styled.div`
  font-size: 28px;
  font-weight: 700;
  line-height: 1.25;
  color: #464a4d;
  ${colFlex({ justify: 'center', align: 'center' })}
`;

const UnderlineInput = styled.input`
  width: 400px;
  border: none;
  border-bottom: 1px solid #e8eef2;
  padding: 10px 4px;
  font-size: 18px;
  font-weight: 500;
  color: #464a4d;
  background: transparent;
  outline: none;
  text-align: center;
  transition: border-bottom-color 0.2s ease;

  &::placeholder {
    color: #d1d5d8;
  }

  &:focus {
    border-bottom-color: #464a4d;
  }
`;

interface AddWorkspaceModalContentProps {
  closeModal: () => void;
}

function AddWorkspaceModalContent({ closeModal }: AddWorkspaceModalContentProps) {
  const { createWorkspaces } = useAdminUser();
  const [workspaceName, setWorkspaceName] = useState('');
  const isButtonDisabled = workspaceName.length === 0;

  const createHandler = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!workspaceName) return;

    createWorkspaces(workspaceName, '');
    closeModal();
  };

  return (
    <ModalContentContainer>
      <CloseButton onClick={closeModal} />
      <Title>주점명을 입력해주세요.</Title>
      <UnderlineInput value={workspaceName} onChange={(e) => setWorkspaceName(e.target.value)} placeholder="주점 이름 입력" autoFocus />
      <NewCommonButton size="sm" onClick={createHandler} disabled={isButtonDisabled}>
        생성하기
      </NewCommonButton>
    </ModalContentContainer>
  );
}

export default AddWorkspaceModalContent;
