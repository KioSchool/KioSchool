import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAtomValue } from 'jotai';
import AppContainer from '@components/common/container/AppContainer';
import Pagination from '@components/common/pagination/Pagination';
import PaginationSearchBar from '@components/common/pagination/PaginationSearchBar';
import PaginationSearchContents from '@components/common/pagination/PaginationSearchContents';
import PageHeader from '@components/common/page/PageHeader';
import SuperAdminPageContainer from '@components/super-admin/SuperAdminPageContainer';
import SuperAdminBankContent from '@components/super-admin/bank/SuperAdminBankContent';
import NewCommonButton from '@components/common/button/NewCommonButton';
import useSuperAdminBank from '@hooks/super-admin/useSuperAdminBank';
import useInputConfirm from '@hooks/useInputConfirm';
import { superAdminBankPaginationResponseAtom } from '@jotai/super-admin/atoms';
import { colFlex } from '@styles/flexStyles';

const PAGE_SIZE = 6;

function SuperAdminBank() {
  const [searchParams, setSearchParams] = useSearchParams();
  const bank = useAtomValue(superAdminBankPaginationResponseAtom);
  const { fetchAllBank, addBank } = useSuperAdminBank();

  const { InputConfirmModal, confirm } = useInputConfirm({
    title: '은행 추가',
    description: '새로운 은행 정보를 입력해주세요.',
    submitText: '추가하기',
    inputSlots: [
      { label: '은행명', placeholder: '예: 우리은행' },
      { label: '은행코드', placeholder: '예: 020' },
    ],
  });

  useEffect(() => {
    const page = Number(searchParams.get('page'));
    const name = searchParams.get('name') || '';
    fetchAllBank(page, PAGE_SIZE, name);
  }, [searchParams.toString()]);

  const handleAddClick = async () => {
    try {
      const result = await confirm();
      if (result['은행명'] && result['은행코드']) {
        addBank(result['은행명'], result['은행코드']);
      }
    } catch {
      // user cancelled
    }
  };

  const handlePageChange = (page: number) => {
    searchParams.set('page', page.toString());
    setSearchParams(searchParams);
  };

  return (
    <AppContainer
      useFlex={colFlex({ align: 'center' })}
     
      useTitle={false}
    >
      <SuperAdminPageContainer>
        <InputConfirmModal />
        <PageHeader
          title="은행 정보 관리"
          description="결제 계좌에 사용될 은행 목록을 관리합니다."
          actions={
            <NewCommonButton size="xs" onClick={handleAddClick}>
              은행 추가
            </NewCommonButton>
          }
        />
        <PaginationSearchBar />
        <PaginationSearchContents
          contents={bank}
          target="은행"
          ContentComponent={SuperAdminBankContent}
        />
        <Pagination totalPageCount={bank.totalPages} paginateFunction={handlePageChange} />
      </SuperAdminPageContainer>
    </AppContainer>
  );
}

export default SuperAdminBank;
