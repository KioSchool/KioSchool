import SuperAdminSearchBar from '@components/SuperAdmin/workspace/SuperAdminSearchBar';
import styled from '@emotion/styled';
import { userPaginationResponseAtom } from '@recoils/atoms';
import { colFlex } from '@styles/flexStyles';
import { useEffect, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import Pagination from '@components/common/pagination/Pagination';
import AppContainer from '@components/common/container/AppContainer';
import useSuperAdminUser from '@hooks/SuperAdmin/useSuperAdminUser';
import SuperAdminUserContent from '@components/SuperAdmin/user/SuperAdminUserContent';
import { useNavigate } from 'react-router-dom';
import SuperAdminSearchContents from '@components/SuperAdmin/SuperAdminSearchContents';

const ContentContainer = styled.div<{ justifyCenter?: boolean }>`
  height: 550px;
  ${(props) =>
    colFlex({
      justify: props.justifyCenter ? 'center' : 'flex-start',
      align: 'center',
    })}
`;

function SuperAdminUser() {
  const pageSize = 6;
  const navigate = useNavigate();
  const userInputRef = useRef<HTMLInputElement | null>(null);
  const users = useRecoilValue(userPaginationResponseAtom);
  const { fetchAllUsers } = useSuperAdminUser();
  const isEmptyUsers = users.empty;

  useEffect(() => {
    fetchAllUsers(0, pageSize);
  }, []);

  return (
    <AppContainer
      useFlex={colFlex({ justify: 'center' })}
      customWidth={'1000px'}
      customHeight={'100%'}
      customGap={'20px'}
      titleNavBarProps={{ title: '전체 유저 관리', onLeftArrowClick: () => navigate('/super-admin/manage') }}
    >
      <>
        <SuperAdminSearchBar ref={userInputRef} fetchContents={fetchAllUsers} />
        <ContentContainer justifyCenter={isEmptyUsers} className={'content-container'}>
          <SuperAdminSearchContents contents={users} target={'유저'} ContentComponent={SuperAdminUserContent} />
        </ContentContainer>
        <Pagination
          totalPageCount={users.totalPages}
          paginateFunction={(page: number) => {
            fetchAllUsers(page, pageSize, userInputRef.current?.value);
          }}
        />
      </>
    </AppContainer>
  );
}

export default SuperAdminUser;
