import SuperAdminSearchBar from '@components/super-admin/workspace/SuperAdminSearchBar';
import styled from '@emotion/styled';
import { colFlex } from '@styles/flexStyles';
import { useEffect, useRef } from 'react';
import Pagination from '@components/common/pagination/Pagination';
import AppContainer from '@components/common/container/AppContainer';
import { useNavigate } from 'react-router-dom';
import SuperAdminSearchContents from '@components/super-admin/SuperAdminSearchContents';
import useSuperAdminEmail from '@hooks/super-admin/useSuperAdminEmail';
import SuperAdminEmailDomainContent from '@components/super-admin/email/SuperAdminEmailDomainContent';
import SuperAdminEmailDomainTitleNavBarChildren from '@components/super-admin/email/SuperAdminEmailDomainTitleNavBarChildren';
import { useRecoilValue } from 'recoil';
import { emailDomainPaginationResponseAtom } from '@recoils/atoms';

const ContentContainer = styled.div<{ justifyCenter?: boolean }>`
  height: 550px;
  ${(props) =>
    colFlex({
      justify: props.justifyCenter ? 'center' : 'flex-start',
      align: 'center',
    })}
`;

function SuperAdminEmailDomainList() {
  const pageSize = 6;
  const navigate = useNavigate();
  const emailDomain = useRecoilValue(emailDomainPaginationResponseAtom);
  const userInputRef = useRef<HTMLInputElement>(null);
  const { fetchAllEmailDomain } = useSuperAdminEmail();

  const isEmptyEmailDomain = emailDomain.empty;

  useEffect(() => {
    fetchAllEmailDomain(0, pageSize);
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
        children: <SuperAdminEmailDomainTitleNavBarChildren />,
      }}
    >
      <>
        <SuperAdminSearchBar ref={userInputRef} fetchContents={fetchAllEmailDomain} />
        <ContentContainer justifyCenter={isEmptyEmailDomain} className={'content-container'}>
          <SuperAdminSearchContents contents={emailDomain} target={'이메일'} ContentComponent={SuperAdminEmailDomainContent} />
        </ContentContainer>
        <Pagination
          totalPageCount={emailDomain.totalPages}
          paginateFunction={(page: number) => {
            fetchAllEmailDomain(page, pageSize, userInputRef.current?.value);
          }}
        />
      </>
    </AppContainer>
  );
}

export default SuperAdminEmailDomainList;
