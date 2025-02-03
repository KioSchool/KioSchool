import React, { useEffect, useRef } from 'react';
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

const ImageInput = styled.input`
  width: 260px;
  height: 100%;
  border-radius: 10px;
  border: none;
  background: ${Color.LIGHT_GREY};
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.1) inset;
  ${rowFlex({ justify: 'center', align: 'center' })}

  &:focus {
    outline: none;
    border: 1px solid ${Color.KIO_ORANGE};
  }
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
  const { fetchWorkspace, updateWorkspaceInfo } = useAdminWorkspace();
  const workspace = useRecoilValue(adminWorkspaceAtom);

  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const noticeRef = useRef<HTMLInputElement>(null);
  const imageFileRef1 = useRef<HTMLInputElement>(null);
  const imageFileRef2 = useRef<HTMLInputElement>(null);
  const imageFileRef3 = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchWorkspace(workspaceId);
  }, []);

  const handleSubmit = () => {
    const title = titleRef.current?.value;
    const description = descriptionRef.current?.value;
    const notice = noticeRef.current?.value;

    if (!title || title.trim() === '') {
      alert('주점명을 입력해주세요.');
      return;
    }
    if (!description || description.trim() === '') {
      alert('주점 설명을 입력해주세요.');
      return;
    }

    console.log('제출할 데이터', {
      workspaceId,
      name: title,
      description,
      notice,
    });

    updateWorkspaceInfo(Number(workspaceId), title, description, notice);
    navigate(`/admin/workspace/${workspaceId}`);
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
            <ImageInput type="file" ref={imageFileRef1} />
            <ImageInput type="file" ref={imageFileRef2} />
            <ImageInput type="file" ref={imageFileRef3} />
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

export default WorkspaceEdit;
