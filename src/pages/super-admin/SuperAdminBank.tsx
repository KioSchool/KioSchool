import PaginationSearchBar from '@components/common/pagination/PaginationSearchBar';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { useEffect } from 'react';
import Pagination from '@components/common/pagination/Pagination';
import AppContainer from '@components/common/container/AppContainer';
import { useSearchParams } from 'react-router-dom';
import PaginationSearchContents from '@components/common/pagination/PaginationSearchContents';
import useSuperAdminBank from '@hooks/super-admin/useSuperAdminBank';
import SuperAdminBankContent from '@components/super-admin/bank/SuperAdminBankContent';
import { superAdminBankPaginationResponseAtom } from '@jotai/super-admin/atoms';
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

function SuperAdminBank() {
  const pageSize = 6;
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
    const nowPage = Number(searchParams.get('page'));
    const searchValue = searchParams.get('name') || '';

    fetchAllBank(nowPage, pageSize, searchValue);
  }, [searchParams.toString()]);

  const handleAddClick = async () => {
    try {
      const result = await confirm();
      if (result['은행명'] && result['은행코드']) {
        addBank(result['은행명'], result['은행코드']);
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
              은행 추가
            </ActionButton>
          </ActionsContainer>
        </HeaderContainer>
        <PaginationSearchContents contents={bank} target={'은행'} ContentComponent={SuperAdminBankContent} />
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
