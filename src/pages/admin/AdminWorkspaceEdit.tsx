import { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useAtomValue } from 'jotai';
import { FocalPoint, WorkspaceImageSlot } from '@@types/index';
import OnboardingStepHint from '@components/admin/workspace/onboarding/OnboardingStepHint';
import { ONBOARDING_STEP } from '@components/admin/workspace/onboarding/onboardingData';
import NewCommonButton from '@components/common/button/NewCommonButton';
import AppContainer from '@components/common/container/AppContainer';
import NewAppInput from '@components/common/input/NewAppInput';
import NewAppTextarea from '@components/common/input/NewAppTextarea';
import WorkspaceImageInput from '@components/admin/workspace/WorkspaceImageInput';
import WorkspaceImagePositionModal from '@components/admin/workspace/WorkspaceImagePositionModal';
import { WORKSPACE_IMAGE_MAX_SIZE_BYTES, WORKSPACE_IMAGE_MAX_SIZE_MB } from '@constants/data/workspaceImageData';
import useAdminWorkspace from '@hooks/admin/useAdminWorkspace';
import useImagePreviewUrls from '@hooks/admin/useImagePreviewUrls';
import useModal from '@hooks/useModal';
import { adminWorkspaceAtom } from '@jotai/admin/atoms';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import {
  validateWorkspaceInfoForm,
  WORKSPACE_DESCRIPTION_MAX_LENGTH,
  WORKSPACE_NAME_MAX_LENGTH,
  WORKSPACE_NOTICE_MAX_LENGTH,
} from '@utils/validateWorkspaceInfoForm';
import { extractImageSlotPayload, initWorkspaceImageSlots, removeAndPushEmpty, setSlotFocalPoint, setSlotImage } from '@utils/workspaceEdit';

const containerStyle = css`
  width: 95%;
  gap: 10px;
  ${colFlex({ justify: 'center', align: 'start' })}
`;

const ContentContainer = styled.div`
  width: 100%;
  height: 100%;
  gap: 10px;
  ${colFlex({ justify: 'center', align: 'center' })}
`;

const Label = styled.label`
  color: #464a4d;
  font-size: 16px;
  font-weight: 700;
`;

const HintText = styled.span`
  font-size: 13px;
  color: ${Color.GREY};
`;

const TitleContainer = styled.div`
  ${containerStyle}
`;

const ImageContainer = styled.div`
  ${containerStyle}
`;

const ImageInputContainer = styled.div`
  width: 100%;
  gap: 10px;
  ${rowFlex({ justify: 'space-between', align: 'start' })}
`;

const DescriptionContainer = styled.div`
  ${containerStyle}
`;

const NoticeContainer = styled.div`
  ${containerStyle}
`;

const ButtonContainer = styled.div`
  width: 95%;
  margin-top: 20px;
  ${rowFlex({ justify: 'center', align: 'center' })}
`;

function AdminWorkspaceEdit() {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const { updateWorkspaceInfoAndImage } = useAdminWorkspace();
  const workspace = useAtomValue(adminWorkspaceAtom);

  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const noticeRef = useRef<HTMLTextAreaElement>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedSlotIndex, setSelectedSlotIndex] = useState<number | null>(null);
  const [editingSlotIndex, setEditingSlotIndex] = useState<number | null>(null);

  const [slots, setSlots] = useState<WorkspaceImageSlot[]>(() => initWorkspaceImageSlots(workspace.images));
  const previewUrls = useImagePreviewUrls(slots);
  const { isModalOpen, openModal, closeModal } = useModal();

  const openPositionModal = (index: number) => {
    setEditingSlotIndex(index);
    openModal();
  };

  const closePositionModal = () => {
    setEditingSlotIndex(null);
    closeModal();
  };

  const handleAddImageClick = (index: number) => {
    setSelectedSlotIndex(index);
    fileInputRef.current?.click();
  };

  const handleDeleteImage = (index: number) => {
    if (!window.confirm('정말 삭제하겠습니까?')) {
      return;
    }

    setSlots((previousSlots) => removeAndPushEmpty(previousSlots, index));
  };

  const handleAddNewImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) {
      return;
    }

    const file = e.target.files[0];
    e.target.value = '';

    if (file.size > WORKSPACE_IMAGE_MAX_SIZE_BYTES) {
      alert(`주점 대표 이미지는 각각 ${WORKSPACE_IMAGE_MAX_SIZE_MB}MB 이하로 업로드 가능합니다.`);
      return;
    }

    if (file.type !== 'image/png' && file.type !== 'image/jpeg') {
      alert('주점 대표 이미지는 png 또는 jpeg 형식만 지원합니다.');
      return;
    }

    if (selectedSlotIndex === null) {
      return;
    }

    const targetIndex = selectedSlotIndex;
    setSlots((previousSlots) => setSlotImage(previousSlots, targetIndex, file));
    // 올린 자리에서 바로 맞추게 해야 기능이 있다는 걸 알고, 나중에 되돌아올 일이 줄어든다.
    openPositionModal(targetIndex);
  };

  const handleConfirmFocalPoint = (focalPoint: FocalPoint) => {
    if (editingSlotIndex === null) {
      return;
    }

    const targetIndex = editingSlotIndex;
    setSlots((previousSlots) => setSlotFocalPoint(previousSlots, targetIndex, focalPoint));
    closePositionModal();
  };

  const handleSubmit = () => {
    const rawTitle = titleRef.current?.value;
    const rawDescription = descriptionRef.current?.value;
    const rawNotice = noticeRef.current?.value;

    const { name, description, notice, errorMessage } = validateWorkspaceInfoForm(rawTitle, rawDescription, rawNotice);

    if (errorMessage) {
      if (!name) {
        titleRef.current?.focus();
      } else {
        descriptionRef.current?.focus();
      }
      alert(errorMessage);
      return;
    }

    const { imageIds, imageFiles, focalPoints } = extractImageSlotPayload(slots);
    updateWorkspaceInfoAndImage(Number(workspaceId), name, description, notice, imageIds, focalPoints, imageFiles);
  };

  return (
    <AppContainer useFlex={colFlex({ justify: 'center' })} customWidth={'1000px'}>
      <ContentContainer>
        <OnboardingStepHint step={ONBOARDING_STEP.INFO} width="95%" />
        <TitleContainer>
          <NewAppInput
            label="주점명"
            ref={titleRef}
            defaultValue={workspace?.name || ''}
            placeholder={`최대 ${WORKSPACE_NAME_MAX_LENGTH}자까지 가능합니다.`}
            maxLength={WORKSPACE_NAME_MAX_LENGTH}
            width="100%"
          />
        </TitleContainer>
        <ImageContainer>
          <Label>대표 사진</Label>
          <HintText>사진 아래 '위치 조정'으로 손님에게 보일 부분을 맞출 수 있어요.</HintText>
          <ImageInputContainer>
            <WorkspaceImageInput
              slots={slots}
              previewUrls={previewUrls}
              handleAdjustPosition={openPositionModal}
              handleDeleteImage={handleDeleteImage}
              handleAddImageClick={handleAddImageClick}
              handleAddNewImage={handleAddNewImage}
              ref={fileInputRef}
            />
          </ImageInputContainer>
        </ImageContainer>
        <DescriptionContainer>
          <NewAppTextarea
            label="주점 설명"
            ref={descriptionRef}
            defaultValue={workspace?.description || ''}
            placeholder={`최대 ${WORKSPACE_DESCRIPTION_MAX_LENGTH}자까지 가능합니다.`}
            maxLength={WORKSPACE_DESCRIPTION_MAX_LENGTH}
            width="100%"
          />
        </DescriptionContainer>
        <NoticeContainer>
          <NewAppTextarea
            label="공지 사항"
            ref={noticeRef}
            defaultValue={workspace?.notice || ''}
            placeholder={`최대 ${WORKSPACE_NOTICE_MAX_LENGTH}자까지 가능합니다.`}
            maxLength={WORKSPACE_NOTICE_MAX_LENGTH}
            width="100%"
          />
        </NoticeContainer>
        <ButtonContainer>
          <NewCommonButton size={'sm'} onClick={handleSubmit}>
            편집 완료
          </NewCommonButton>
        </ButtonContainer>
        {isModalOpen && editingSlotIndex !== null && previewUrls[editingSlotIndex] && (
          <WorkspaceImagePositionModal
            imageUrl={previewUrls[editingSlotIndex] as string}
            focalPoint={slots[editingSlotIndex].focalPoint}
            onConfirm={handleConfirmFocalPoint}
            onClose={closePositionModal}
          />
        )}
      </ContentContainer>
    </AppContainer>
  );
}

export default AdminWorkspaceEdit;
