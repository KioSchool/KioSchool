import PaginationSearchBar from '@components/common/pagination/PaginationSearchBar';
import styled from '@emotion/styled';
import { colFlex } from '@styles/flexStyles';
import { useEffect } from 'react';
import Pagination from '@components/common/pagination/Pagination';
import AppContainer from '@components/common/container/AppContainer';
import { useNavigate, useSearchParams } from 'react-router-dom';
import PaginationSearchContents from '@components/common/pagination/PaginationSearchContents';
import useSuperAdminEmail from '@hooks/super-admin/useSuperAdminEmail';
import SuperAdminEmailDomainContent from '@components/super-admin/email/SuperAdminEmailDomainContent';
import SuperAdminEmailDomainTitleNavBarChildren from '@components/super-admin/email/SuperAdminEmailDomainTitleNavBarChildren';
import { superAdminEmailDomainPaginationResponseAtom } from 'src/jotai/super-admin/atoms';
import { useAtomValue } from 'jotai';
import { SUPER_ADMIN_ROUTES } from '@constants/routes';

const ContentContainer = styled.div<{ justifyCenter?: boolean }>`
  height: 550px;
  ${(props) =>
    colFlex({
      justify: props.justifyCenter ? 'center' : 'flex-start',
      align: 'center',
    })}
`;

function SuperAdminEmailDomainList() {
  const pageSize = 6;
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const emailDomain = useAtomValue(superAdminEmailDomainPaginationResponseAtom);
  const { fetchAllEmailDomain } = useSuperAdminEmail();

  const isEmptyEmailDomain = emailDomain.empty;

  useEffect(() => {
    const nowPage = Number(searchParams.get('page'));
    const searchValue = searchParams.get('name') || '';

    fetchAllEmailDomain(nowPage, pageSize, searchValue);
  }, [searchParams.toString()]);

  return (
    <AppContainer
      useFlex={colFlex({ justify: 'center' })}
      customWidth={'1000px'}
      customHeight={'100%'}
      customGap={'20px'}
      titleNavBarProps={{
        title: '이메일 도메인 관리',
        onLeftArrowClick: () => navigate(SUPER_ADMIN_ROUTES.MANAGE),
        children: <SuperAdminEmailDomainTitleNavBarChildren />,
      }}
    >
      <>
        <PaginationSearchBar />
        <ContentContainer justifyCenter={isEmptyEmailDomain} className={'content-container'}>
          <PaginationSearchContents contents={emailDomain} target={'이메일'} ContentComponent={SuperAdminEmailDomainContent} />
        </ContentContainer>
        <Pagination
          totalPageCount={emailDomain.totalPages}
          paginateFunction={(page: number) => {
            searchParams.set('page', page.toString());
            setSearchParams(searchParams);
          }}
        />
      </>
    </AppContainer>
  );
}

export default SuperAdminEmailDomainList;
