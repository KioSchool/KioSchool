import { useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AppContainer from '@components/common/container/AppContainer';
import styled from '@emotion/styled';
import useAdminWorkspace from '@hooks/admin/useAdminWorkspace';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { WorkspaceImage } from '@@types/index';
import { extractImageIdsAndFiles, initWorkspaceImages, removeAndPushNull } from '@utils/workspaceEdit';
import WorkspaceImageInput from '@components/admin/workspace/WorkspaceImageInput';
import { adminWorkspaceAtom } from 'src/jotai/admin/atoms';
import { useAtomValue } from 'jotai';
import { css } from '@emotion/react';
import NewCommonButton from '@components/common/button/NewCommonButton';

const inputStyle = `
  box-sizing: border-box;
  border-radius: 15px;
  border: none;
  padding: 12px 20px;
  resize: none;
  border: 1px solid #e8eef2;
  &:focus {
    outline: none;
    border: 1px solid ${Color.KIO_ORANGE};
  }
`;

const containerStyle = css`
  width: 100%;
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

const TitleInput = styled.input`
  width: 100%;
  ${inputStyle}
`;

const ImageContainer = styled.div`
  ${containerStyle}
`;

const ImageInputContainer = styled.div`
  width: 100%;
  ${rowFlex({ justify: 'space-between', align: 'start' })}
`;

const DescriptionContainer = styled.div`
  height: 150px;
  ${containerStyle}
`;

const DescriptionInput = styled.textarea`
  width: 100%;
  height: 130px;
  ${inputStyle}
`;

const NoticeContainer = styled.div`
  height: 150px;
  ${containerStyle}
`;

const NoticeInput = styled.textarea`
  width: 100%;
  height: 130px;
  ${inputStyle}
`;

function AdminWorkspaceEdit() {
  const navigate = useNavigate();
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
    <AppContainer
      useFlex={rowFlex({ justify: 'center' })}
      customWidth={'1000px'}
      titleNavBarProps={{
        title: workspace?.name || '',
        subTitle: '워크스페이스 관리',
        onLeftArrowClick: () => navigate(-1),
      }}
    >
      <ContentContainer>
        <TitleContainer>
          <Label>주점명</Label>
          <TitleInput ref={titleRef} defaultValue={workspace?.name || ''} />
        </TitleContainer>
        <ImageContainer>
          <Label>대표 사진</Label>
          <ImageInputContainer>
            <WorkspaceImageInput images={displayImages} handleImageClick={handleImageClick} ref={fileInputRef} handleAddNewImage={handleAddNewImage} />
          </ImageInputContainer>
        </ImageContainer>
        <DescriptionContainer>
          <Label>주점 설명</Label>
          <DescriptionInput ref={descriptionRef} defaultValue={workspace?.description || ''} />
        </DescriptionContainer>
        <NoticeContainer>
          <Label>공지 사항</Label>
          <NoticeInput ref={noticeRef} defaultValue={workspace?.notice || ''} />
        </NoticeContainer>
        <NewCommonButton size={'sm'} onClick={handleSubmit}>
          편집 완료
        </NewCommonButton>
      </ContentContainer>
    </AppContainer>
  );
}

export default AdminWorkspaceEdit;
