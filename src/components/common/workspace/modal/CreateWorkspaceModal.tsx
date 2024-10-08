import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { colFlex } from '@styles/flexStyles';
import { FormEventHandler, MouseEventHandler } from 'react';

const ModalOverlay = styled.div`
  cursor: pointer;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1002;
`;
const ModalContent = styled.form`
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
  children: JSX.Element;
  closeModal: MouseEventHandler<HTMLDivElement>;
  createHandler: FormEventHandler<HTMLFormElement>;
}

function CreateWorkspaceModal({ children, closeModal, createHandler }: Props) {
  return (
    <>
      <ModalOverlay onClick={closeModal} className={'modal-overlay'} />
      <ModalContent onSubmit={createHandler} className={'modal-content'}>
        {children}
      </ModalContent>
    </>
  );
}

export default CreateWorkspaceModal;
