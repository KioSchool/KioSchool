import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAtomValue } from 'jotai';
import AppContainer from '@components/common/container/AppContainer';
import Pagination from '@components/common/pagination/Pagination';
import PaginationSearchBar from '@components/common/pagination/PaginationSearchBar';
import PaginationSearchContents from '@components/common/pagination/PaginationSearchContents';
import PageHeader from '@components/common/page/PageHeader';
import SuperAdminPageContainer from '@components/super-admin/SuperAdminPageContainer';
import SuperAdminEmailDomainContent from '@components/super-admin/email/SuperAdminEmailDomainContent';
import NewCommonButton from '@components/common/button/NewCommonButton';
import useSuperAdminEmail from '@hooks/super-admin/useSuperAdminEmail';
import useInputConfirm from '@hooks/useInputConfirm';
import { superAdminEmailDomainPaginationResponseAtom } from '@jotai/super-admin/atoms';
import { colFlex } from '@styles/flexStyles';

const PAGE_SIZE = 6;

function SuperAdminEmailDomainList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const emailDomain = useAtomValue(superAdminEmailDomainPaginationResponseAtom);
  const { fetchAllEmailDomain, addEmailDomain } = useSuperAdminEmail();

  const { InputConfirmModal, confirm } = useInputConfirm({
    title: '이메일 도메인 추가',
    description: '대학별 허용할 이메일 도메인 정보를 입력해주세요.',
    submitText: '추가하기',
    inputSlots: [
      { label: '대학명', placeholder: '예: 서울대학교' },
      { label: '도메인', placeholder: '예: snu.ac.kr' },
    ],
  });

  useEffect(() => {
    const page = Number(searchParams.get('page'));
    const name = searchParams.get('name') || '';
    fetchAllEmailDomain(page, PAGE_SIZE, name);
  }, [searchParams.toString()]);

  const handleAddClick = async () => {
    try {
      const result = await confirm();
      if (result['대학명'] && result['도메인']) {
        addEmailDomain(result['대학명'], result['도메인']);
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
          title="이메일 도메인 관리"
          description="대학별 허용 이메일 도메인을 추가하고 삭제합니다."
          actions={
            <NewCommonButton size="xs" onClick={handleAddClick}>
              도메인 추가
            </NewCommonButton>
          }
        />
        <PaginationSearchBar />
        <PaginationSearchContents
          contents={emailDomain}
          target="이메일 도메인"
          ContentComponent={SuperAdminEmailDomainContent}
        />
        <Pagination totalPageCount={emailDomain.totalPages} paginateFunction={handlePageChange} />
      </SuperAdminPageContainer>
    </AppContainer>
  );
}

export default SuperAdminEmailDomainList;
