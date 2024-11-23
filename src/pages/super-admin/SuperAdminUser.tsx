import SuperAdminSearchBar from '@components/super-admin/workspace/SuperAdminSearchBar';
import styled from '@emotion/styled';
import { colFlex } from '@styles/flexStyles';
import { useEffect, useRef, useState } from 'react';
import Pagination from '@components/common/pagination/Pagination';
import AppContainer from '@components/common/container/AppContainer';
import useSuperAdminUser from '@hooks/super-admin/useSuperAdminUser';
import SuperAdminUserContent from '@components/super-admin/user/SuperAdminUserContent';
import { useNavigate } from 'react-router-dom';
import SuperAdminSearchContents from '@components/super-admin/SuperAdminSearchContents';
import { PaginationResponse, User } from '@@types/index';

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
  const [users, setUsers] = useState<PaginationResponse<User> | null>(null);
  const userInputRef = useRef<HTMLInputElement | null>(null);
  const { fetchAllUsers } = useSuperAdminUser();

  const isEmptyUsers = users?.empty ?? true;

  useEffect(() => {
    const userResponse = async () => {
      const response = await fetchAllUsers(0, pageSize);
      setUsers(response);
    };

    userResponse();
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
        <SuperAdminSearchBar ref={userInputRef} fetchContents={fetchAllUsers} setContents={setUsers} />
        <ContentContainer justifyCenter={isEmptyUsers} className={'content-container'}>
          <SuperAdminSearchContents contents={users} target={'유저'} ContentComponent={SuperAdminUserContent} />
        </ContentContainer>
        <Pagination
          totalPageCount={users?.totalPages || 0}
          paginateFunction={(page: number) => {
            fetchAllUsers(page, pageSize, userInputRef.current?.value);
          }}
        />
      </>
    </AppContainer>
  );
}

export default SuperAdminUser;
