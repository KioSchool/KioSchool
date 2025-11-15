import PaginationSearchBar from '@components/common/pagination/PaginationSearchBar';
import styled from '@emotion/styled';
import { colFlex } from '@styles/flexStyles';
import { useEffect } from 'react';
import Pagination from '@components/common/pagination/Pagination';
import AppContainer from '@components/common/container/AppContainer';
import { useSearchParams } from 'react-router-dom';
import PaginationSearchContents from '@components/common/pagination/PaginationSearchContents';
import useSuperAdminBank from '@hooks/super-admin/useSuperAdminBank';
import SuperAdminBankContent from '@components/super-admin/bank/SuperAdminBankContent';
import { superAdminBankPaginationResponseAtom } from 'src/jotai/super-admin/atoms';
import { useAtomValue } from 'jotai';

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
    <AppContainer useFlex={colFlex({ justify: 'center' })} customWidth={'1000px'} customGap={'20px'} useTitle={false}>
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
