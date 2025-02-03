import AppContainer from '@components/common/container/AppContainer';
import AppLabel from '@components/common/label/AppLabel';
import styled from '@emotion/styled';
import useAdminWorkspace from '@hooks/admin/useAdminWorkspace';
import { adminWorkspaceAtom } from '@recoils/atoms';
import { Color } from '@resources/colors';
import { rowFlex } from '@styles/flexStyles';
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
  height: 70%;
  border-radius: 10px;
  border: none;
  background: ${Color.LIGHT_GREY};
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.1);
  ${rowFlex({ justify: 'center', align: 'center' })}
`;

const ImageContainer = styled.div``;
const DescriptionContainer = styled.div``;
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

        <ImageContainer></ImageContainer>
        <DescriptionContainer></DescriptionContainer>
        <NoticeContainer></NoticeContainer>
      </ContentContainer>
    </AppContainer>
  );
}

export default WorkspaceEdit;
