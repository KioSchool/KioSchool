import AppContainer from '@components/common/container/AppContainer';
import Pagination from '@components/common/pagination/Pagination';
import SuperAdminSearchBar from '@components/SuperAdmin/workspace/SuperAdminSearchBar';
import styled from '@emotion/styled';
import { emailPaginationResponseAtom } from '@recoils/atoms';
import { useEffect, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import SuperAdminSearchContents from './SuperAdminSearchContents';
import useSuperAdminEmail from '@hooks/SuperAdmin/useSuperAdminEmail';
import { colFlex } from '@styles/flexStyles';
import SuperAdminEmailContent from '@components/SuperAdmin/email/SuperAdminEmailContent';
import { useNavigate } from 'react-router-dom';

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
  const userInputRef = useRef<HTMLInputElement | null>(null);
  const emails = useRecoilValue(emailPaginationResponseAtom);
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
      titleNavBarProps={{ title: '사용자 이메일 관리', onLeftArrowClick: () => navigate('/super-admin/email') }}
    >
      <>
        <SuperAdminSearchBar ref={userInputRef} fetchContents={fetchAllEmails} />
        <ContentContainer justifyCenter={isEmptyEmails} className={'content-container'}>
          <SuperAdminSearchContents contents={emails} target={'이메일'} ContentComponent={SuperAdminEmailContent} />
        </ContentContainer>
        <Pagination
          totalPageCount={emails.totalPages}
          paginateFunction={(page: number) => {
            fetchAllEmails(page, pageSize, userInputRef.current?.value);
          }}
        />
      </>
    </AppContainer>
  );
}

export default SuperAdminEmail;
