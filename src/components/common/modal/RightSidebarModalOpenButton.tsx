import { colFlex } from '@styles/flexStyles';
import styled from '@emotion/styled';
import { expandButtonStyle } from '@styles/buttonStyles';
import { tabletMediaQuery } from '@styles/globalStyles';
import { RiArrowLeftSLine } from '@remixicon/react';

const ModalButtonContainer = styled.div`
  position: fixed;
  top: calc(50% - 25px);
  right: 20px;
  color: #464a4d;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  cursor: pointer;
  z-index: 1009;
  box-sizing: border-box;
  ${colFlex({ justify: 'center', align: 'center' })};
  ${expandButtonStyle}

  ${tabletMediaQuery} {
    width: 44px;
    height: 44px;
    right: 20px;
    top: calc(50% - 22px);
  }
`;

const OpenButton = styled(RiArrowLeftSLine)`
  width: 35px;
  height: 35px;
`;

interface RightSidebarModalOpenButtonProps {
  openModal: () => void;
}

function RightSidebarModalOpenButton({ openModal }: RightSidebarModalOpenButtonProps) {
  return (
    <ModalButtonContainer onClick={openModal}>
      <OpenButton />
    </ModalButtonContainer>
  );
}

export default RightSidebarModalOpenButton;
