import PaginationSearchBar from '@components/common/pagination/PaginationSearchBar';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { useEffect } from 'react';
import Pagination from '@components/common/pagination/Pagination';
import AppContainer from '@components/common/container/AppContainer';
import { useSearchParams } from 'react-router-dom';
import PaginationSearchContents from '@components/common/pagination/PaginationSearchContents';
import useSuperAdminEmail from '@hooks/super-admin/useSuperAdminEmail';
import SuperAdminEmailDomainContent from '@components/super-admin/email/SuperAdminEmailDomainContent';
import { superAdminEmailDomainPaginationResponseAtom } from '@jotai/super-admin/atoms';
import { useAtomValue } from 'jotai';
import styled from '@emotion/styled';
import { RiAddLine } from '@remixicon/react';
import { Color } from '@resources/colors';
import useInputConfirm from '@hooks/useInputConfirm';

const HeaderContainer = styled.div`
  width: 100%;
  gap: 16px;
  ${colFlex()}
`;

const ActionsContainer = styled.div`
  width: 100%;
  gap: 20px;
  ${rowFlex({ justify: 'space-between', align: 'center' })}
`;

const SearchContainer = styled.div`
  flex: 1;
`;

const ActionButton = styled.button`
  background: ${Color.KIO_ORANGE};
  color: ${Color.WHITE};
  border: none;
  border-radius: 8px;
  height: 50px;
  padding: 0 24px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  gap: 8px;
  transition: all 0.2s ease;
  white-space: nowrap;
  ${rowFlex({ justify: 'center', align: 'center' })}

  &:hover {
    background: #f7842e;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(255, 145, 66, 0.3);
  }
`;

function SuperAdminEmailDomainList() {
  const pageSize = 6;
  const [searchParams, setSearchParams] = useSearchParams();
  const emailDomain = useAtomValue(superAdminEmailDomainPaginationResponseAtom);
  const { fetchAllEmailDomain, addEmailDomain } = useSuperAdminEmail();

  const { InputConfirmModal, confirm } = useInputConfirm({
    title: '이메일 도메인 추가',
    description: '대학/학교명과 이메일 도메인을 입력해주세요.',
    submitText: '추가하기',
    inputSlots: [
      { label: '학교/기관명', placeholder: '예: 성신여자대학교' },
      { label: '도메인', placeholder: '예: sungshin.ac.kr' },
    ],
  });

  useEffect(() => {
    const nowPage = Number(searchParams.get('page'));
    const searchValue = searchParams.get('name') || '';

    fetchAllEmailDomain(nowPage, pageSize, searchValue);
  }, [searchParams.toString()]);

  const handleAddClick = async () => {
    try {
      const result = await confirm();
      if (result['학교/기관명'] && result['도메인']) {
        addEmailDomain(result['학교/기관명'], result['도메인']);
      }
    } catch {
      // User cancelled
    }
  };

  return (
    <AppContainer useFlex={colFlex({ justify: 'center' })} customWidth={'1000px'} customGap={'20px'} useTitle={false}>
      <>
        <InputConfirmModal />
        <HeaderContainer>
          <ActionsContainer>
            <SearchContainer>
              <PaginationSearchBar />
            </SearchContainer>
            <ActionButton onClick={handleAddClick}>
              <RiAddLine size={20} />
              도메인 추가
            </ActionButton>
          </ActionsContainer>
        </HeaderContainer>
        <PaginationSearchContents contents={emailDomain} target={'이메일'} ContentComponent={SuperAdminEmailDomainContent} />
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
