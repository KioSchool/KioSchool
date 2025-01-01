import SuperAdminSearchBar from '@components/super-admin/workspace/SuperAdminSearchBar';
import styled from '@emotion/styled';
import { colFlex } from '@styles/flexStyles';
import { useEffect, useRef } from 'react';
import Pagination from '@components/common/pagination/Pagination';
import AppContainer from '@components/common/container/AppContainer';
import { useNavigate } from 'react-router-dom';
import SuperAdminSearchContents from '@components/super-admin/SuperAdminSearchContents';
import useSuperAdminEmail from '@hooks/super-admin/useSuperAdminEmail';
import SuperAdminEmailContent from '@components/super-admin/user/SuperAdminEmailContent';
import SuperAdminEmailTitleNavBarChildren from '@components/super-admin/email/SuperAdminEmailTitleNavBarChildren';
import { useRecoilValue } from 'recoil';
import { emailPaginationResponseAtom } from '@recoils/atoms';

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
  const emails = useRecoilValue(emailPaginationResponseAtom);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const { fetchAllEmails } = useSuperAdminEmail();

  const isEmptyEmails = emails.empty;

  useEffect(() => {
    fetchAllEmails(0, pageSize);
  }, []);

  return (
    <AppContainer
      useFlex={colFlex({ justify: 'center' })}
      customWidth={'1000px'}
      customHeight={'100%'}
      customGap={'20px'}
      titleNavBarProps={{
        title: '이메일 도메인 관리',
        onLeftArrowClick: () => navigate('/super-admin/manage'),
        children: <SuperAdminEmailTitleNavBarChildren />,
      }}
    >
      <>
        <SuperAdminSearchBar ref={emailInputRef} fetchContents={fetchAllEmails} />
        <ContentContainer justifyCenter={isEmptyEmails} className={'content-container'}>
          <SuperAdminSearchContents contents={emails} target={'이메일'} ContentComponent={SuperAdminEmailContent} />
        </ContentContainer>
        <Pagination
          totalPageCount={emails.totalPages}
          paginateFunction={(page: number) => {
            fetchAllEmails(page, pageSize, emailInputRef.current?.value);
          }}
        />
      </>
    </AppContainer>
  );
}

export default SuperAdminEmail;
