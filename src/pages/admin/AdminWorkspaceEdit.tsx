import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import RoundedAppButton from '@components/common/button/RoundedAppButton';
import AppContainer from '@components/common/container/AppContainer';
import AppLabel from '@components/common/label/AppLabel';
import styled from '@emotion/styled';
import useAdminWorkspace from '@hooks/admin/useAdminWorkspace';
import { adminWorkspaceAtom } from '@recoils/atoms';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { WorkspaceImage } from '@@types/index';
import { extractImageIdsAndFiles, initWorkspaceImages, removeAndPushNull } from '@utils/workspaceEdit';
import WorkspaceImageInput from '@components/admin/workspace/WorkspaceImageInput';

const textAreaStyle = `
  border-radius: 10px;
  border: none;
  background: ${Color.LIGHT_GREY};
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.1) inset;
  padding: 10px;
  resize: none;

  &:focus {
    outline: none;
    border: 1px solid ${Color.KIO_ORANGE};
  }
`;

const ContentContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const TitleContainer = styled.div`
  width: 100%;
  height: 50px;
  border-top: 2px solid ${Color.HEAVY_GREY};
  ${rowFlex({ justify: 'center', align: 'center' })}
`;

const TitleLabelContainer = styled.div`
  width: 15%;
  height: 100%;
  ${rowFlex({ justify: 'center', align: 'center' })}
`;

const TitleInput = styled.input`
  width: 85%;
  height: 65%;
  ${textAreaStyle}
  padding: 0 10px;
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 150px;
  padding: 10px 0;
  border-top: 1px solid ${Color.HEAVY_GREY};
  ${rowFlex({ justify: 'center', align: 'center' })}
`;

const ImageLabelContainer = styled.div`
  width: 15%;
  height: 100%;
  ${colFlex({ justify: 'start', align: 'center' })}
`;

const ImageInputContainer = styled.div`
  width: 85%;
  height: 100%;
  ${rowFlex({ justify: 'space-between', align: 'start' })}
`;

const DescriptionContainer = styled.div`
  width: 100%;
  height: 150px;
  padding: 10px 0;
  border-top: 1px solid ${Color.HEAVY_GREY};
  ${rowFlex({ justify: 'center', align: 'start' })}
`;

const DescriptionLabelContainer = styled.div`
  width: 15%;
  height: 100%;
  ${colFlex({ justify: 'start', align: 'center' })}
`;

const DescriptionInput = styled.textarea`
  width: 833px;
  height: 130px;
  ${textAreaStyle}
`;

const NoticeContainer = styled.div`
  width: 100%;
  height: 150px;
  padding: 10px 0;
  border-top: 1px solid ${Color.HEAVY_GREY};
  border-bottom: 2px solid ${Color.HEAVY_GREY};
  ${rowFlex({ justify: 'center', align: 'start' })}
`;

const NoticeLabelContainer = styled.div`
  width: 15%;
  height: 100%;
  ${colFlex({ justify: 'start', align: 'center' })}
`;

const NoticeInput = styled.textarea`
  width: 833px;
  height: 130px;
  ${textAreaStyle}
`;

const SubmitButtonContainer = styled.div`
  width: 100%;
  height: 50px;
  ${rowFlex({ justify: 'end', align: 'center' })}
`;

function AdminWorkspaceEdit() {
  const navigate = useNavigate();
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const { fetchWorkspace, updateWorkspaceInfoAndImage } = useAdminWorkspace();
  const workspace = useRecoilValue(adminWorkspaceAtom);

  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const noticeRef = useRef<HTMLTextAreaElement>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const [displayImages, setDisplayImages] = useState<(WorkspaceImage | File | null)[]>(() => initWorkspaceImages(workspace.images));

  useEffect(() => {
    fetchWorkspace(workspaceId);
  }, []);

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
          <TitleLabelContainer>
            <AppLabel size={20}>주점명</AppLabel>
          </TitleLabelContainer>
          <TitleInput ref={titleRef} defaultValue={workspace?.name || ''} />
        </TitleContainer>
        <ImageContainer>
          <ImageLabelContainer>
            <AppLabel size={20}>대표 사진</AppLabel>
          </ImageLabelContainer>
          <ImageInputContainer>
            <WorkspaceImageInput images={displayImages} handleImageClick={handleImageClick} ref={fileInputRef} handleAddNewImage={handleAddNewImage} />
          </ImageInputContainer>
        </ImageContainer>
        <DescriptionContainer>
          <DescriptionLabelContainer>
            <AppLabel size={20}>주점 설명</AppLabel>
          </DescriptionLabelContainer>
          <DescriptionInput ref={descriptionRef} defaultValue={workspace?.description || ''} />
        </DescriptionContainer>
        <NoticeContainer>
          <NoticeLabelContainer>
            <AppLabel size={20}>공지 사항</AppLabel>
          </NoticeLabelContainer>
          <NoticeInput ref={noticeRef} defaultValue={workspace?.notice || ''} />
        </NoticeContainer>
        <SubmitButtonContainer>
          <RoundedAppButton onClick={handleSubmit}>수정 완료</RoundedAppButton>
        </SubmitButtonContainer>
      </ContentContainer>
    </AppContainer>
  );
}

export default AdminWorkspaceEdit;
