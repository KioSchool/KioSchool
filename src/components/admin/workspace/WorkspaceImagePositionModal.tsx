import { useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import styled from '@emotion/styled';
import { FocalPoint } from '@@types/index';
import NewCommonButton from '@components/common/button/NewCommonButton';
import { ORDER_IMAGE_HEIGHT_PX, POSITION_EDITOR_FRAME_WIDTH_PX } from '@constants/data/workspaceImageData';
import { MODAL_ROOT_KEY } from '@hooks/useModal';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { getCoverOverflow, moveFocalPoint, roundFocalPoint, toObjectPosition } from '@utils/imageFocalPoint';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1002;
`;

const ContentContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 90vw;
  padding: 24px;
  border-radius: 16px;
  background: ${Color.WHITE};
  z-index: 1003;
  gap: 16px;
  ${colFlex({ justify: 'center', align: 'center' })}
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: #464a4d;
`;

const Description = styled.div`
  font-size: 13px;
  color: ${Color.GREY};
`;

const Frame = styled.div`
  position: relative;
  width: ${POSITION_EDITOR_FRAME_WIDTH_PX}px;
  max-width: 100%;
  height: ${ORDER_IMAGE_HEIGHT_PX}px;
  overflow: hidden;
  border-radius: 10px;
  border: 1px solid #e8eef2;
  cursor: grab;
  touch-action: none;
  user-select: none;
`;

const PreviewImage = styled.img<{ objectPosition: string }>`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: ${({ objectPosition }) => objectPosition};
  display: block;
  pointer-events: none;
`;

const ButtonContainer = styled.div`
  width: 100%;
  gap: 10px;
  ${rowFlex({ justify: 'center', align: 'center' })}
`;

interface WorkspaceImagePositionModalProps {
  imageUrl: string;
  focalPoint: FocalPoint;
  onConfirm: (focalPoint: FocalPoint) => void;
  onClose: () => void;
}

function WorkspaceImagePositionModal({ imageUrl, focalPoint, onConfirm, onClose }: WorkspaceImagePositionModalProps) {
  const [draftFocalPoint, setDraftFocalPoint] = useState<FocalPoint>(focalPoint);
  const imageRef = useRef<HTMLImageElement>(null);
  const draggingRef = useRef(false);
  const lastPointRef = useRef({ x: 0, y: 0 });

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    draggingRef.current = true;
    lastPointRef.current = { x: event.clientX, y: event.clientY };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current || !imageRef.current) {
      return;
    }

    const frame = event.currentTarget.getBoundingClientRect();
    const overflow = getCoverOverflow(imageRef.current.naturalWidth, imageRef.current.naturalHeight, frame.width, frame.height);

    const delta = { x: event.clientX - lastPointRef.current.x, y: event.clientY - lastPointRef.current.y };
    lastPointRef.current = { x: event.clientX, y: event.clientY };

    setDraftFocalPoint((previous) => moveFocalPoint(previous, delta, overflow));
  };

  const handlePointerUp = () => {
    draggingRef.current = false;
  };

  const handleConfirm = () => {
    onConfirm(roundFocalPoint(draftFocalPoint));
  };

  return createPortal(
    <>
      <ModalOverlay onClick={onClose} className={'modal-overlay'} />
      <ContentContainer>
        <Title>사진 위치 조정</Title>
        <Description>손님에게 보이는 화면입니다. 사진을 끌어 보여줄 부분을 맞춰주세요.</Description>
        <Frame onPointerDown={handlePointerDown} onPointerMove={handlePointerMove} onPointerUp={handlePointerUp} onPointerCancel={handlePointerUp}>
          <PreviewImage ref={imageRef} src={imageUrl} alt={'대표 사진 미리보기'} objectPosition={toObjectPosition(draftFocalPoint)} />
        </Frame>
        <ButtonContainer>
          <NewCommonButton size={'sm'} onClick={onClose}>
            취소
          </NewCommonButton>
          <NewCommonButton size={'sm'} onClick={handleConfirm}>
            적용
          </NewCommonButton>
        </ButtonContainer>
      </ContentContainer>
    </>,
    document.getElementById(MODAL_ROOT_KEY) as HTMLElement,
  );
}

export default WorkspaceImagePositionModal;
