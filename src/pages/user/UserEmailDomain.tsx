import PaginationSearchBar from '@components/common/pagination/PaginationSearchBar';
import { colFlex } from '@styles/flexStyles';
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

const RequestContainer = styled.div`
  margin-top: 30px;
  gap: 12px;
  ${colFlex({ align: 'center' })};
`;

const RequestText = styled.div`
  color: #888;
  font-size: 14px;
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
        <PaginationSearchBar />
        <PaginationSearchContents contents={emailDomain} target={'이메일 도메인'} ContentComponent={EmailDomainContent} />
        <Pagination
          totalPageCount={emailDomain.totalPages}
          paginateFunction={(page: number) => {
            searchParams.set('page', page.toString());
            setSearchParams(searchParams);
          }}
        />
        <RequestContainer>
          <RequestText>찾으시는 학교나 도메인이 없으신가요?</RequestText>
          <NewCommonButton onClick={() => setIsPopupOpen(true)} customSize={{ width: 220, height: 45, font: 15 }}>
            학교 도메인 추가 요청하기
          </NewCommonButton>
        </RequestContainer>
        {isPopupOpen && <RequestDomainPopup onClose={() => setIsPopupOpen(false)} />}
      </>
    </AppContainer>
  );
}

export default UserEmailDomain;
