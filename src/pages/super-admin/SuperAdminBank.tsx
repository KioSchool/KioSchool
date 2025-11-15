import PaginationSearchBar from '@components/common/pagination/PaginationSearchBar';
import styled from '@emotion/styled';
import { colFlex } from '@styles/flexStyles';
import { useEffect } from 'react';
import Pagination from '@components/common/pagination/Pagination';
import AppContainer from '@components/common/container/AppContainer';
import { useNavigate, useSearchParams } from 'react-router-dom';
import PaginationSearchContents from '@components/common/pagination/PaginationSearchContents';
import useSuperAdminBank from '@hooks/super-admin/useSuperAdminBank';
import SuperAdminBankTitleNavBarChildren from '@components/super-admin/bank/SuperAdminBankTitleNavBarChildren';
import SuperAdminBankContent from '@components/super-admin/bank/SuperAdminBankContent';
import { superAdminBankPaginationResponseAtom } from 'src/jotai/super-admin/atoms';
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

function SuperAdminBank() {
  const pageSize = 6;
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const bank = useAtomValue(superAdminBankPaginationResponseAtom);
  const { fetchAllBank } = useSuperAdminBank();

  const isEmptyBank = bank.empty;

  useEffect(() => {
    const nowPage = Number(searchParams.get('page'));
    const searchValue = searchParams.get('name') || '';

    fetchAllBank(nowPage, pageSize, searchValue);
  }, [searchParams.toString()]);

  return (
    <AppContainer
      useFlex={colFlex({ justify: 'center' })}
      customWidth={'1000px'}
      customGap={'20px'}
      titleNavBarProps={{
        title: '은행 관리',
        onLeftArrowClick: () => navigate(SUPER_ADMIN_ROUTES.MANAGE),
        children: <SuperAdminBankTitleNavBarChildren />,
      }}
      useTitle={false}
    >
      <>
        <PaginationSearchBar />
        <ContentContainer justifyCenter={isEmptyBank} className={'content-container'}>
          <PaginationSearchContents contents={bank} target={'은행'} ContentComponent={SuperAdminBankContent} />
        </ContentContainer>
        <Pagination
          totalPageCount={bank.totalPages}
          paginateFunction={(page: number) => {
            searchParams.set('page', page.toString());
            setSearchParams(searchParams);
          }}
        />
      </>
    </AppContainer>
  );
}

export default SuperAdminBank;
