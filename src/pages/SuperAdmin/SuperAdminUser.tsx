import SuperAdminSearchBar from '@components/SuperAdmin/workspace/SuperAdminSearchBar';
import styled from '@emotion/styled';
import { userPaginationResponseAtom } from '@recoils/atoms';
import { colFlex } from '@styles/flexStyles';
import { useEffect, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import SuperAdminSearchContents from './SuperAdminSearchContents';
import Pagination from '@components/common/pagination/Pagination';
import AppContainer from '@components/common/container/AppContainer';
import useSuperAdminUser from '@hooks/SuperAdmin/useSuperAdminUser';
import SuperAdminUserContent from '@components/SuperAdmin/user/SuperAdminUserContent';

const ContentContainer = styled.div<{ justifyCenter?: boolean }>`
  height: 550px;
  ${(props) =>
    colFlex({
      justify: props.justifyCenter ? 'center' : 'flex-start',
      align: 'center',
    })}
`;

function SuperAdminUser() {
  const userInputRef = useRef<HTMLInputElement | null>(null);
  const users = useRecoilValue(userPaginationResponseAtom);
  const { fetchAllUsers } = useSuperAdminUser();
  const size = 6;
  const emptyUsers = useRecoilValue(userPaginationResponseAtom).numberOfElements === 0;

  useEffect(() => {
    fetchAllUsers(0, size);
  }, []);

  return (
    <AppContainer
      useFlex={colFlex({ justify: 'center' })}
      customWidth={'1000px'}
      customHeight={'100%'}
      customGap={'20px'}
      titleNavBarProps={{ title: '전체 유저 관리' }}
    >
      <>
        <SuperAdminSearchBar ref={userInputRef} fetchContents={fetchAllUsers} />
        <ContentContainer justifyCenter={emptyUsers} className={'content-container'}>
          <SuperAdminSearchContents contents={users} target={'유저'} ContentComponent={SuperAdminUserContent} />
        </ContentContainer>
        <Pagination
          totalPageCount={users.totalPages}
          paginateFunction={(page: number) => {
            fetchAllUsers(page, size, userInputRef.current?.value);
          }}
        />
      </>
    </AppContainer>
  );
}

export default SuperAdminUser;
