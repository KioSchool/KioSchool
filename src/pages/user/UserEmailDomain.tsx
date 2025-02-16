import SuperAdminSearchBar from '@components/super-admin/workspace/SuperAdminSearchBar';
import styled from '@emotion/styled';
import { colFlex } from '@styles/flexStyles';
import { useEffect, useState } from 'react';
import Pagination from '@components/common/pagination/Pagination';
import AppContainer from '@components/common/container/AppContainer';
import SuperAdminSearchContents from '@components/super-admin/SuperAdminSearchContents';
import { EmailDomain, PaginationResponse } from '@@types/index';
import { defaultPaginationValue } from '@@types/defaultValues';
import useEmail from '@hooks/user/useEmail';
import EmailDomainContent from '@components/user/email/EmailDomainContent';
import { useSearchParams } from 'react-router-dom';

const ContentContainer = styled.div<{ justifyCenter?: boolean }>`
  height: 550px;
  ${(props) =>
    colFlex({
      justify: props.justifyCenter ? 'center' : 'flex-start',
      align: 'center',
    })}
`;

function UserEmailDomain() {
  const pageSize = 6;
  const [searchParams, setSearchParams] = useSearchParams();
  const [emailDomain, setEmailDomain] = useState<PaginationResponse<EmailDomain>>(defaultPaginationValue);
  const { fetchAllEmailDomain } = useEmail();

  const isEmptyEmailDomain = emailDomain.empty;

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
    <AppContainer
      useFlex={colFlex({ justify: 'center' })}
      customWidth={'1000px'}
      customHeight={'100%'}
      customGap={'20px'}
      titleNavBarProps={{ title: '이메일 도메인 조회', useBackIcon: false }}
    >
      <>
        <SuperAdminSearchBar />
        <ContentContainer justifyCenter={isEmptyEmailDomain} className={'content-container'}>
          <SuperAdminSearchContents contents={emailDomain} target={'유저'} ContentComponent={EmailDomainContent} />
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

export default UserEmailDomain;
