import SuperAdminSearchBar from '@components/super-admin/workspace/SuperAdminSearchBar';
import styled from '@emotion/styled';
import { colFlex } from '@styles/flexStyles';
import { useEffect, useRef, useState } from 'react';
import Pagination from '@components/common/pagination/Pagination';
import AppContainer from '@components/common/container/AppContainer';
import { useNavigate } from 'react-router-dom';
import SuperAdminSearchContents from '@components/super-admin/SuperAdminSearchContents';
import { PaginationResponse, EmailDomain } from '@@types/index';
import { defaultPaginationValue } from '@@types/PaginationType';
import useSuperAdminEmail from '@hooks/super-admin/useSuperAdminEmail';
import SuperAdminEmailContent from '@components/super-admin/user/SuperAdminEmailContent';

const ContentContainer = styled.div<{ justifyCenter?: boolean }>`
  height: 550px;
  ${(props) =>
    colFlex({
      justify: props.justifyCenter ? 'center' : 'flex-start',
      align: 'center',
    })}
`;

function SuperAdminEmail() {
  const pageSize = 6;
  const navigate = useNavigate();
  const [emails, setEmails] = useState<PaginationResponse<EmailDomain>>(defaultPaginationValue);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const { fetchAllEmails } = useSuperAdminEmail();

  const isEmptyEmails = emails.empty;

  const fetchAndSetEmails = async (page: number, size: number, name: string | undefined) => {
    const emailResponse = await fetchAllEmails(page, size, name);
    setEmails(emailResponse);
  };

  useEffect(() => {
    fetchAndSetEmails(0, pageSize, '');
  }, []);

  return (
    <AppContainer
      useFlex={colFlex({ justify: 'center' })}
      customWidth={'1000px'}
      customHeight={'100%'}
      customGap={'20px'}
      titleNavBarProps={{ title: '이메일 도메인 관리', onLeftArrowClick: () => navigate('/super-admin/manage') }}
    >
      <>
        <SuperAdminSearchBar ref={emailInputRef} fetchContents={fetchAndSetEmails} />
        <ContentContainer justifyCenter={isEmptyEmails} className={'content-container'}>
          <SuperAdminSearchContents contents={emails} target={'이메일'} ContentComponent={SuperAdminEmailContent} />
        </ContentContainer>
        <Pagination
          totalPageCount={emails.totalPages}
          paginateFunction={(page: number) => {
            fetchAndSetEmails(page, pageSize, emailInputRef.current?.value);
          }}
        />
      </>
    </AppContainer>
  );
}

export default SuperAdminEmail;
