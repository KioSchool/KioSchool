import AppContainer from '@components/common/container/AppContainer';
import AppLabel from '@components/common/label/AppLabel';
import styled from '@emotion/styled';
import useAdminWorkspace from '@hooks/admin/useAdminWorkspace';
import { adminWorkspaceAtom } from '@recoils/atoms';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

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
`;

const NoticeContainer = styled.div``;

function WorkspaceEdit() {
  const navigate = useNavigate();
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const { fetchWorkspace } = useAdminWorkspace();
  const workspace = useRecoilValue(adminWorkspaceAtom);

  useEffect(() => {
    fetchWorkspace(workspaceId);
  }, []);

  return (
    <AppContainer
      useFlex={rowFlex({ justify: 'center' })}
      customWidth={'1000px'}
      titleNavBarProps={{ title: workspace.name, subTitle: '워크스페이스 관리', onLeftArrowClick: () => navigate(-1) }}
    >
      <ContentContainer>
        <TitleContainer>
          <TitleLabelContainer>
            <AppLabel size={20}>주점명</AppLabel>
          </TitleLabelContainer>
          <TitleInput />
        </TitleContainer>
        <ImageContainer>
          <ImageLabelContainer>
            <AppLabel size={20}>대표 사진</AppLabel>
          </ImageLabelContainer>
          <ImageInputContainer>
            <ImageInput />
            <ImageInput />
            <ImageInput />
          </ImageInputContainer>
        </ImageContainer>
        <DescriptionContainer>
          <DescriptionLabelContainer>
            <AppLabel size={20}>주점 설명</AppLabel>
          </DescriptionLabelContainer>
          <DescriptionInput />
        </DescriptionContainer>
        <NoticeContainer></NoticeContainer>
      </ContentContainer>
    </AppContainer>
  );
}

export default WorkspaceEdit;
