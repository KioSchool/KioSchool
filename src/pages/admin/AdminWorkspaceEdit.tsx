import { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import AppContainer from '@components/common/container/AppContainer';
import styled from '@emotion/styled';
import useAdminWorkspace from '@hooks/admin/useAdminWorkspace';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { WorkspaceImage } from '@@types/index';
import { extractImageIdsAndFiles, initWorkspaceImages, removeAndPushNull } from '@utils/workspaceEdit';
import WorkspaceImageInput from '@components/admin/workspace/WorkspaceImageInput';
import { adminWorkspaceAtom } from '@jotai/admin/atoms';
import { useAtomValue } from 'jotai';
import { css } from '@emotion/react';
import NewCommonButton from '@components/common/button/NewCommonButton';
import NewAppInput from '@components/common/input/NewAppInput';
import NewAppTextarea from '@components/common/input/NewAppTextarea';

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
    const title = titleRef.current?.value;
    const description = descriptionRef.current?.value;
    const notice = noticeRef.current?.value;

    if (!title || !title.trim()) {
      alert('주점명을 입력해주세요.');
      return;
    }
    if (!description || !description.trim()) {
      alert('주점 설명을 입력해주세요.');
      return;
    }

    const { imageIds, imageFiles } = extractImageIdsAndFiles(displayImages);
    updateWorkspaceInfoAndImage(Number(workspaceId), title, description, notice, imageIds, imageFiles);
  };

  return (
    <AppContainer useFlex={colFlex({ justify: 'center' })} customWidth={'1000px'}>
      <ContentContainer>
        <TitleContainer>
          <NewAppInput label="주점명" ref={titleRef} defaultValue={workspace?.name || ''} width="100%" />
        </TitleContainer>
        <ImageContainer>
          <Label>대표 사진</Label>
          <ImageInputContainer>
            <WorkspaceImageInput images={displayImages} handleImageClick={handleImageClick} ref={fileInputRef} handleAddNewImage={handleAddNewImage} />
          </ImageInputContainer>
        </ImageContainer>
        <DescriptionContainer>
          <NewAppTextarea label="주점 설명" ref={descriptionRef} defaultValue={workspace?.description || ''} width="100%" />
        </DescriptionContainer>
        <NoticeContainer>
          <NewAppTextarea label="공지 사항" ref={noticeRef} defaultValue={workspace?.notice || ''} width="100%" />
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
