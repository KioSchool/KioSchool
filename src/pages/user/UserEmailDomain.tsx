import PaginationSearchBar from '@components/common/pagination/PaginationSearchBar';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { useEffect, useState } from 'react';
import Pagination from '@components/common/pagination/Pagination';
import AppContainer from '@components/common/container/AppContainer';
import PaginationSearchContents from '@components/common/pagination/PaginationSearchContents';
import { EmailDomain, PaginationResponse } from '@@types/index';
import { defaultPaginationValue } from '@@types/defaultValues';
import useEmail from '@hooks/user/useEmail';
import EmailDomainContent from '@components/user/email/EmailDomainContent';
import { useSearchParams } from 'react-router-dom';
import RequestDomainPopup from '@components/user/email/RequestDomainPopup';
import NewCommonButton from '@components/common/button/NewCommonButton';
import styled from '@emotion/styled';

const SearchActionRow = styled.div`
  width: 100%;
  ${rowFlex({ justify: 'flex-end', align: 'center' })};
`;

function UserEmailDomain() {
  const pageSize = 6;
  const [searchParams, setSearchParams] = useSearchParams();
  const [emailDomain, setEmailDomain] = useState<PaginationResponse<EmailDomain>>(defaultPaginationValue);
  const { fetchAllEmailDomain } = useEmail();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const fetchAndSetEmailDomain = async (page: number, size: number, name: string | undefined) => {
    const emailResponse = await fetchAllEmailDomain(page, size, name);
    setEmailDomain(emailResponse);
  };

  useEffect(() => {
    const nowPage = Number(searchParams.get('page'));
    const searchValue = searchParams.get('name') || '';

    fetchAndSetEmailDomain(nowPage, pageSize, searchValue);
  }, [searchParams.toString()]);

  return (
    <AppContainer useFlex={colFlex({ justify: 'center' })} customWidth={'1000px'} customGap={'20px'}>
      <>
        <SearchActionRow>
          <NewCommonButton onClick={() => setIsPopupOpen(true)} size="sm">
            학교 도메인 추가 요청
          </NewCommonButton>
        </SearchActionRow>
        <PaginationSearchBar />
        <PaginationSearchContents
          contents={emailDomain}
          target={'이메일 도메인'}
          ContentComponent={EmailDomainContent}
          emptyAction={
            <NewCommonButton onClick={() => setIsPopupOpen(true)} customSize={{ width: 300, height: 48, font: 15 }}>
              학교 도메인 추가 요청하기
            </NewCommonButton>
          }
        />
        <Pagination
          totalPageCount={emailDomain.totalPages}
          paginateFunction={(page: number) => {
            searchParams.set('page', page.toString());
            setSearchParams(searchParams);
          }}
        />
        {isPopupOpen && <RequestDomainPopup onClose={() => setIsPopupOpen(false)} />}
      </>
    </AppContainer>
  );
}

export default UserEmailDomain;
