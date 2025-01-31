import { useRef } from 'react';
import AppButton from '@components/common/button/AppButton';
import AppInputWithLabel from '@components/common/input/AppInputWithLabel';
import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { colFlex } from '@styles/flexStyles';
import useAdminUser from '@hooks/admin/useAdminUser';

const ModalContentContainer = styled.form`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${Color.WHITE};
  border-radius: 25px;
  padding: 20px;
  z-index: 1010;
  height: 300px;
  flex-wrap: wrap;
  ${colFlex({ justify: 'center', align: 'center' })}
`;

interface Props {
  closeModal: () => void;
}

function AddWorkspaceModalContent({ closeModal }: Props) {
  const { createWorkspaces } = useAdminUser();
  const workspaceNameRef = useRef<HTMLInputElement>(null);
  const workspaceDescriptionRef = useRef<HTMLInputElement>(null);

  const createHandler = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const workspaceName = workspaceNameRef.current?.value;
    if (!workspaceName) {
      alert('주점 이름을 입력해주세요');
      return;
    }

    const workspaceDescription = workspaceDescriptionRef.current?.value;
    if (!workspaceDescription) {
      alert('주점 설명 입력해주세요');
      return;
    }

    createWorkspaces(workspaceName, workspaceDescription);
    closeModal();
  };

  return (
    <ModalContentContainer>
      <AppInputWithLabel titleLabel={'주점 이름'} style={{ marginBottom: '25px' }} type={'text'} id={'workspaceName'} ref={workspaceNameRef} />
      <AppInputWithLabel titleLabel={'주점 설명'} style={{ marginBottom: '20px' }} type={'text'} id={'workspaceDescription'} ref={workspaceDescriptionRef} />
      <AppButton onClick={createHandler} size={'large'} style={{ marginTop: '15px' }} type={'submit'}>
        생성하기
      </AppButton>
    </ModalContentContainer>
  );
}
export default AddWorkspaceModalContent;
