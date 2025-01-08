import SuperAdminSearchBar from '@components/super-admin/workspace/SuperAdminSearchBar';
import styled from '@emotion/styled';
import { colFlex } from '@styles/flexStyles';
import { useEffect, useState } from 'react';
import Pagination from '@components/common/pagination/Pagination';
import AppContainer from '@components/common/container/AppContainer';
import useSuperAdminUser from '@hooks/super-admin/useSuperAdminUser';
import SuperAdminUserContent from '@components/super-admin/user/SuperAdminUserContent';
import { useNavigate, useSearchParams } from 'react-router-dom';
import SuperAdminSearchContents from '@components/super-admin/SuperAdminSearchContents';
import { PaginationResponse, User } from '@@types/index';
import { defaultPaginationValue } from '@@types/PaginationType';

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
  const [searchParams, setSearchParams] = useSearchParams();
  const [users, setUsers] = useState<PaginationResponse<User>>(defaultPaginationValue);
  const { fetchAllUsers } = useSuperAdminUser();

  const isEmptyUsers = users.empty;

  const fetchAndSetUsers = async (page: number, size: number, name: string | undefined) => {
    const userResponse = await fetchAllUsers(page, size, name);
    setUsers(userResponse);
  };

  useEffect(() => {
    const nowPage = Number(searchParams.get('page'));
    const searchValue = searchParams.get('name') || '';

    fetchAndSetUsers(nowPage, pageSize, searchValue);
  }, [searchParams]);

  return (
    <AppContainer
      useFlex={colFlex({ justify: 'center' })}
      customWidth={'1000px'}
      customHeight={'100%'}
      customGap={'20px'}
      titleNavBarProps={{ title: '전체 유저 관리', onLeftArrowClick: () => navigate('/super-admin/manage') }}
    >
      <>
        <SuperAdminSearchBar />
        <ContentContainer justifyCenter={isEmptyUsers} className={'content-container'}>
          <SuperAdminSearchContents contents={users} target={'유저'} ContentComponent={SuperAdminUserContent} />
        </ContentContainer>
        <Pagination
          totalPageCount={users.totalPages}
          paginateFunction={(page: number) => {
            searchParams.set('page', page.toString());
            setSearchParams(searchParams);
          }}
        />
      </>
    </AppContainer>
  );
}

export default SuperAdminUser;
