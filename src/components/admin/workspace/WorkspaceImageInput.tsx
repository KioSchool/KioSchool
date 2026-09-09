import { forwardRef } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { RiCameraFill } from '@remixicon/react';
import { WorkspaceImageSlot } from '@@types/index';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { toObjectPosition } from '@utils/imageFocalPoint';

const BaseImageStyle = css`
  width: 320px;
  height: 180px;
  border-radius: 15px;
  border: 1px solid #e8eef2;
  ${rowFlex({ justify: 'center', align: 'center' })}
`;

const SlotContainer = styled.div`
  gap: 8px;
  ${colFlex({ justify: 'start', align: 'center' })}
`;

const ImageContent = styled.img<{ objectPosition: string }>`
  object-fit: cover;
  object-position: ${({ objectPosition }) => objectPosition};
  ${BaseImageStyle}
  cursor: pointer;
`;

const DummyContent = styled.div`
  ${BaseImageStyle}
  cursor: pointer;
`;

const PlusIcon = styled(RiCameraFill)`
  width: 30px;
  height: 30px;
  color: #e8eef2;
`;

const ActionContainer = styled.div`
  gap: 8px;
  ${rowFlex({ justify: 'center', align: 'center' })}
`;

const ActionButton = styled.button`
  padding: 6px 12px;
  font-size: 13px;
  border-radius: 8px;
  border: 1px solid #e8eef2;
  background: transparent;
  color: #464a4d;
  cursor: pointer;
`;

const DeleteButton = styled(ActionButton)`
  color: ${Color.KIO_ORANGE};
`;

const HiddenInput = styled.input`
  display: none;
`;

interface WorkspaceImageInputProps {
  slots: WorkspaceImageSlot[];
  previewUrls: Array<string | null>;
  handleAdjustPosition: (index: number) => void;
  handleDeleteImage: (index: number) => void;
  handleAddImageClick: (index: number) => void;
  handleAddNewImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const WorkspaceImageInput = forwardRef<HTMLInputElement, WorkspaceImageInputProps>(
  ({ slots, previewUrls, handleAdjustPosition, handleDeleteImage, handleAddImageClick, handleAddNewImage }, ref) => {
    // 빈 슬롯 중 어느 박스를 눌러도 항상 "맨 앞 빈 자리"에 채운다. 저장 시 이미지 슬롯을
    // 앞으로 압축해 보내는 서버 계약이 "빈 칸은 항상 뒤로 몰려 있다"를 전제하기 때문에,
    // 클릭한 박스의 인덱스가 아니라 이 인덱스로 업로드해야 중간에 구멍이 생기지 않는다.
    const firstEmptyIndex = slots.findIndex((slot) => !slot.image);

    return (
      <>
        <HiddenInput type="file" accept="image/*" ref={ref} onChange={handleAddNewImage} />
        {slots.map((slot, index) => {
          const previewUrl = previewUrls[index] ?? null;

          if (!slot.image) {
            return (
              <SlotContainer key={`slot-${index}`}>
                <DummyContent onClick={() => handleAddImageClick(firstEmptyIndex)}>
                  <PlusIcon />
                </DummyContent>
              </SlotContainer>
            );
          }

          if (!previewUrl) {
            return <SlotContainer key={`slot-${index}`} />;
          }

          return (
            <SlotContainer key={`slot-${index}`}>
              <ImageContent src={previewUrl} objectPosition={toObjectPosition(slot.focalPoint)} onClick={() => handleAdjustPosition(index)} />
              <ActionContainer>
                <ActionButton type="button" onClick={() => handleAdjustPosition(index)}>
                  위치 조정
                </ActionButton>
                <DeleteButton type="button" onClick={() => handleDeleteImage(index)}>
                  삭제
                </DeleteButton>
              </ActionContainer>
            </SlotContainer>
          );
        })}
      </>
    );
  },
);

export default WorkspaceImageInput;
