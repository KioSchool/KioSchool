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
import PlusIconSvg from '@resources/svg/PlusIconSvg';
import { expandButtonStyle } from '@styles/buttonStyles';

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
  border-radius: 10px;
  border: none;
  background: ${Color.LIGHT_GREY};
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.1) inset;
  ${colFlex({ justify: 'start', align: 'center' })}

  &:focus {
    outline: none;
    border: 1px solid ${Color.KIO_ORANGE};
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 200px;
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

const ImageInput = styled.img`
  width: 260px;
  height: 100%;
  border-radius: 10px;
  border: none;
  background: ${Color.LIGHT_GREY};
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.1) inset;
  cursor: pointer;
  ${rowFlex({ justify: 'center', align: 'center' })}
`;

const ImageDummyInput = styled.div`
  width: 260px;
  height: 100%;
  border-radius: 10px;
  border: none;
  background: ${Color.LIGHT_GREY};
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.1) inset;
  ${rowFlex({ justify: 'center', align: 'center' })}
  cursor: pointer;
`;

const PlusIcon = styled(PlusIconSvg)`
  width: 30px;
  height: 30px;
  ${expandButtonStyle}
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

const DescriptionInput = styled.input`
  width: 85%;
  height: 100%;
  border-radius: 10px;
  border: none;
  background: ${Color.LIGHT_GREY};
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.1) inset;

  &:focus {
    outline: none;
    border: 1px solid ${Color.KIO_ORANGE};
  }
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

const NoticeInput = styled.input`
  width: 85%;
  height: 100%;
  border-radius: 10px;
  border: none;
  background: ${Color.LIGHT_GREY};
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.1) inset;

  &:focus {
    outline: none;
    border: 1px solid ${Color.KIO_ORANGE};
  }
`;

const SubmitButtonContainer = styled.div`
  width: 100%;
  height: 50px;
  ${rowFlex({ justify: 'end', align: 'center' })}
`;

function WorkspaceEdit() {
  const navigate = useNavigate();
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const { fetchWorkspace, updateWorkspaceInfo, updateWorkspaceImage } = useAdminWorkspace();
  const workspace = useRecoilValue(adminWorkspaceAtom);

  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const noticeRef = useRef<HTMLInputElement>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const [selectedImages, setSelectedImages] = useState<(File | null)[]>([null, null, null]);
  const [displayImages, setDisplayImages] = useState<(WorkspaceImage | null)[]>(() => {
    const images: Array<WorkspaceImage | null> = [...workspace.images];
    while (images.length < 3) {
      images.push(null);
    }
    return images;
  });

  useEffect(() => {
    fetchWorkspace(workspaceId);
  }, []);

  const handleImageClick = (index: number) => {
    if (displayImages[index]) {
      if (window.confirm('정말 삭제하겠습니까?')) {
        setDisplayImages((prevImages) => {
          const newArray = [...prevImages];
          newArray[index] = null;
          return newArray;
        });

        setSelectedImages((prevImages) => {
          const newArray = [...prevImages];
          newArray[index] = null;
          return newArray;
        });
      }
    } else {
      setSelectedImageIndex(index);
      fileInputRef.current?.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file && selectedImageIndex !== null) {
      const index = selectedImageIndex;

      setSelectedImages((prevImages) => {
        const newArray = [...prevImages];
        newArray[index] = file;
        return newArray;
      });
    }
  };

  const getImageInfo = () => {
    const newImages = [...selectedImages];

    const imageIds: Array<number | null> = [];
    const imageFiles: Array<File | null> = [];

    for (let i = 0; i < 3; i++) {
      const existingImage: WorkspaceImage | null = displayImages?.[i] || null;

      imageIds.push(existingImage ? existingImage.id : null);
      if (newImages[i]) {
        imageFiles.push(newImages[i]);
      }
    }

    return { imageIds, imageFiles };
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

    updateWorkspaceInfo(Number(workspaceId), title, description, notice);

    const { imageIds, imageFiles } = getImageInfo();
    if (!imageFiles.length) {
      updateWorkspaceImage(Number(workspaceId), imageIds);
    } else {
      updateWorkspaceImage(Number(workspaceId), imageIds, imageFiles);
    }
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
            {displayImages.map((img, index) =>
              img ? (
                <ImageInput key={img.id} src={img.url} onClick={() => handleImageClick(index)} />
              ) : (
                <ImageDummyInput key={`${index}-dummy`} onClick={() => handleImageClick(index)}>
                  <PlusIcon />
                </ImageDummyInput>
              ),
            )}
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
        <input type="file" accept="image/*" style={{ display: 'none' }} ref={fileInputRef} onChange={handleFileChange} />
      </ContentContainer>
    </AppContainer>
  );
}

export default WorkspaceEdit;
