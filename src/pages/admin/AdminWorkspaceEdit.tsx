import { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useAtomValue } from 'jotai';
import { WorkspaceImage } from '@@types/index';
import OnboardingStepHint from '@components/admin/workspace/onboarding/OnboardingStepHint';
import { ONBOARDING_STEP } from '@components/admin/workspace/onboarding/onboardingData';
import NewCommonButton from '@components/common/button/NewCommonButton';
import AppContainer from '@components/common/container/AppContainer';
import NewAppInput from '@components/common/input/NewAppInput';
import NewAppTextarea from '@components/common/input/NewAppTextarea';
import WorkspaceImageInput from '@components/admin/workspace/WorkspaceImageInput';
import useAdminWorkspace from '@hooks/admin/useAdminWorkspace';
import { adminWorkspaceAtom } from '@jotai/admin/atoms';
import { colFlex, rowFlex } from '@styles/flexStyles';
import {
  validateWorkspaceInfoForm,
  WORKSPACE_DESCRIPTION_MAX_LENGTH,
  WORKSPACE_NAME_MAX_LENGTH,
  WORKSPACE_NOTICE_MAX_LENGTH,
} from '@utils/validateWorkspaceInfoForm';
import { extractImageIdsAndFiles, initWorkspaceImages, removeAndPushNull } from '@utils/workspaceEdit';

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
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const [displayImages, setDisplayImages] = useState<(WorkspaceImage | File | null)[]>(() => initWorkspaceImages(workspace.images));

  const handleImageClick = (index: number) => {
    if (displayImages[index]) {
      if (!window.confirm('정말 삭제하겠습니까?')) {
        return;
      }

      setDisplayImages((prevImages) => removeAndPushNull(prevImages, index));
    } else {
      setSelectedImageIndex(index);
      fileInputRef.current?.click();
    }
  };

  const handleAddNewImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) {
      return;
    }

    const file = e.target.files[0];
    if (file.size > 1024 * 1024 * 2) {
      alert('주점 대표 이미지는 각각 2MB 이하로 업로드 가능합니다.');
      return;
    }

    if (file.type !== 'image/png' && file.type !== 'image/jpeg') {
      alert('주점 대표 이미지는 png 또는 jpeg 형식만 지원합니다.');
      return;
    }

    if (file && selectedImageIndex !== null) {
      setDisplayImages((prevImages) => {
        const updatedImages = [...prevImages];
        updatedImages[selectedImageIndex] = file;
        return updatedImages;
      });
    }
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

    const { imageIds, imageFiles } = extractImageIdsAndFiles(displayImages);
    updateWorkspaceInfoAndImage(Number(workspaceId), name, description, notice, imageIds, imageFiles);
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
          <ImageInputContainer>
            <WorkspaceImageInput images={displayImages} handleImageClick={handleImageClick} ref={fileInputRef} handleAddNewImage={handleAddNewImage} />
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
      </ContentContainer>
    </AppContainer>
  );
}

export default AdminWorkspaceEdit;
