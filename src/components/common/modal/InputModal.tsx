import styled from '@emotion/styled';

const ModalOverlay = styled.div`
  cursor: pointer;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;
const ModalContent = styled.form`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 25px;
  padding: 20px;
  z-index: 1010;
  height: 300px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const InputModal = (props: any) => {
  return (
    <>
      <ModalOverlay onClick={props.onClick} />
      <ModalContent onSubmit={props.onSubmit}>{props.content}</ModalContent>
    </>
  );
};

export default InputModal;
