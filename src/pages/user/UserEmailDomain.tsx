import SuperAdminSearchBar from '@components/super-admin/workspace/SuperAdminSearchBar';
import styled from '@emotion/styled';
import { colFlex } from '@styles/flexStyles';
import { useEffect, useRef, useState } from 'react';
import Pagination from '@components/common/pagination/Pagination';
import AppContainer from '@components/common/container/AppContainer';
import SuperAdminSearchContents from '@components/super-admin/SuperAdminSearchContents';
import { EmailDomain, PaginationResponse } from '@@types/index';
import { defaultPaginationValue } from '@@types/PaginationType';
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
  const [searchParams] = useSearchParams();
  const [emailDomain, setEmailDomain] = useState<PaginationResponse<EmailDomain>>(defaultPaginationValue);
  const userInputRef = useRef<HTMLInputElement>(null);
  const { fetchAllEmailDomain } = useEmail();

  const isEmptyEmailDomain = emailDomain.empty;

  const fetchAndSetEmailDomain = async (page: number, size: number, name: string | undefined, replace?: boolean) => {
    const emailResponse = await fetchAllEmailDomain(page, size, name, replace ?? false);
    setEmailDomain(emailResponse);
  };

  useEffect(() => {
    const nowPage = Number(searchParams.get('page'));
    const searchValue = userInputRef.current?.value || '';

    fetchAndSetEmailDomain(nowPage, pageSize, searchValue, true);
  }, [searchParams]);

  return (
    <AppContainer
      useFlex={colFlex({ justify: 'center' })}
      customWidth={'1000px'}
      customHeight={'100%'}
      customGap={'20px'}
      titleNavBarProps={{ title: '이메일 도메인 조회', useBackIcon: false }}
    >
      <>
        <SuperAdminSearchBar ref={userInputRef} fetchContents={fetchAndSetEmailDomain} />
        <ContentContainer justifyCenter={isEmptyEmailDomain} className={'content-container'}>
          <SuperAdminSearchContents contents={emailDomain} target={'유저'} ContentComponent={EmailDomainContent} />
        </ContentContainer>
        <Pagination
          totalPageCount={emailDomain.totalPages}
          paginateFunction={(page: number) => {
            fetchAndSetEmailDomain(page, pageSize, userInputRef.current?.value);
          }}
        />
      </>
    </AppContainer>
  );
}

export default UserEmailDomain;
