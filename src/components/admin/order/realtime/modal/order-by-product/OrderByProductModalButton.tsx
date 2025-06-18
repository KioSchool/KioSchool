import { colFlex } from '@styles/flexStyles';
import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { expandButtonStyle } from '@styles/buttonStyles';
import { tabletMediaQuery } from '@styles/globalStyles';
import { RiArrowRightSLine } from '@remixicon/react';

const ModalContainer = styled.div`
  ${colFlex({ justify: 'space-evenly', align: 'center' })};
  position: fixed;
  top: calc(50% - 50px);
  right: 20px;
  color: ${Color.WHITE};
  background-color: ${Color.BLACK};
  border-radius: 50%;
  width: 100px;
  height: 100px;
  cursor: pointer;
  z-index: 1998;
  box-sizing: border-box;
  padding: 10px;
  ${expandButtonStyle}

  ${tabletMediaQuery} {
    width: 80px;
    height: 80px;
    right: 20px;
  }
`;

const TextContainer = styled.div`
  ${colFlex({ justify: 'center', align: 'center' })};
  width: 100%;
  height: 30px;
`;

const Text = styled.div`
  font-size: 14px;
  font-weight: bold;
  white-space: pre-wrap;
  text-align: center;
`;

const Icon = styled(RiArrowRightSLine)<{ isModalOpen: boolean }>`
  transform: ${({ isModalOpen }) => (isModalOpen ? 'rotate(0deg)' : 'rotate(180deg)')};
`;

interface OrderByProductModalButtonProps {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

function OrderByProductModal({ isModalOpen, openModal, closeModal }: OrderByProductModalButtonProps) {
  const onClick = () => {
    if (isModalOpen) {
      closeModal();
    } else {
      openModal();
    }
  };
  const text = isModalOpen ? '닫기' : '상품별\n주문 보기';

  return (
    <ModalContainer onClick={onClick}>
      <TextContainer>
        <Text>{text}</Text>
      </TextContainer>
      <Icon isModalOpen={isModalOpen} />
    </ModalContainer>
  );
}

export default OrderByProductModal;
