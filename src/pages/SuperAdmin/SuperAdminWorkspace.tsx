import AppContainer from '@components/common/container/AppContainer';
import TitleNavBar from '@components/common/nav/TitleNavBar';
import Pagination from '@components/common/pagination/Pagination';
import SuperAdminSearchBar from '@components/SuperAdmin/workspace/SuperAdminSearchBar';
import SuperAdminWorkspaceContent from '@components/SuperAdmin/workspace/SuperAdminWorkspaceContent';
import styled from '@emotion/styled';
import { userWorkspaceListAtom } from '@recoils/atoms';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';

const HorizontalLine = styled.hr`
  width: 100%;
  border: 0.3px solid #eeecec;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 550px;
`;

function SuperAdminWorkspace() {
  const workspaces = useRecoilValue(userWorkspaceListAtom);
  const [selectedWorkspaceId, setSelectedWorkspaceId] = useState<number>(0);

  const handleSelectWorkspace = (id: number) => {
    setSelectedWorkspaceId((prevId) => (prevId === id ? 0 : id));
  };

  return (
    <AppContainer justifyValue={'center'} customWidth={'1000px'} customHeight={'100%'} customGap={'20px'}>
      <>
        <TitleNavBar title="전체 워크스페이스 관리" />
        <SuperAdminSearchBar />
        <ContentContainer>
          {workspaces.content.map((item, index) => (
            <div key={item.id}>
              <SuperAdminWorkspaceContent {...item} showDescribe={selectedWorkspaceId === item.id} onSelect={handleSelectWorkspace} />
              {index < workspaces.content.length - 1 && <HorizontalLine />}
            </div>
          ))}
        </ContentContainer>
        <Pagination totalPageCount={workspaces.totalPages - 1} />
      </>
    </AppContainer>
  );
}

export default SuperAdminWorkspace;
