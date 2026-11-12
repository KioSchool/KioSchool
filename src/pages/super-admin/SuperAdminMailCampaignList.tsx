import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useNavigate, useSearchParams } from 'react-router-dom';
import AppContainer from '@components/common/container/AppContainer';
import NewCommonButton from '@components/common/button/NewCommonButton';
import Pagination from '@components/common/pagination/Pagination';
import PageHeader from '@components/common/page/PageHeader';
import MailCampaignList from '@components/super-admin/mail/MailCampaignList';
import MailProdWarningBand from '@components/super-admin/mail/MailProdWarningBand';
import SuperAdminPageContainer from '@components/super-admin/SuperAdminPageContainer';
import { SUPER_ADMIN_ROUTES } from '@constants/routes';
import useSuperAdminMail from '@hooks/super-admin/useSuperAdminMail';
import { Color } from '@resources/colors';
import { colFlex } from '@styles/flexStyles';
import type { PaginationResponse } from '@@types/index';
import type { MailCampaignSummary } from '@@types/mail';
import { defaultPaginationValue } from '@@types/defaultValues';
import { getApiErrorMessage } from '@utils/apiError';

const PAGE_SIZE = 20;

const Content = styled.div`
  width: 100%;
  gap: 16px;
  ${colFlex()}
`;

const MessageCard = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 40px 20px;
  border: 1px solid ${Color.BORDER_GREY};
  border-radius: 10px;
  color: ${Color.GREY};
  text-align: center;
`;

function SuperAdminMailCampaignList() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { fetchCampaigns } = useSuperAdminMail();
  const [campaigns, setCampaigns] = useState<PaginationResponse<MailCampaignSummary>>(defaultPaginationValue);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const page = Math.max(Number(searchParams.get('page')) || 0, 0);

  useEffect(() => {
    setIsLoading(true);
    setErrorMessage('');

    fetchCampaigns(page, PAGE_SIZE)
      .then(setCampaigns)
      .catch((error: unknown) => setErrorMessage(getApiErrorMessage(error, '지난 발송을 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.')))
      .finally(() => setIsLoading(false));
  }, [fetchCampaigns, page]);

  const handlePageChange = (nextPage: number) => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.set('page', nextPage.toString());
    setSearchParams(nextParams, { replace: true });
  };

  const isEmpty = !isLoading && !errorMessage && campaigns.content.length === 0;

  return (
    <AppContainer useFlex={colFlex({ align: 'center' })} useTitle={false}>
      <SuperAdminPageContainer>
        <MailProdWarningBand />
        <PageHeader
          title="지난 발송"
          description="여러 곳에 보낸 메일을 확인합니다."
          actions={
            <NewCommonButton size="xs" onClick={() => navigate(SUPER_ADMIN_ROUTES.MAIL_CAMPAIGN_NEW)}>
              여러 곳에 보내기
            </NewCommonButton>
          }
        />
        <Content>
          {errorMessage && <MessageCard role="alert">{errorMessage}</MessageCard>}
          {isEmpty && <MessageCard>아직 보낸 적이 없어요.</MessageCard>}
          {!isLoading && !errorMessage && campaigns.content.length > 0 && <MailCampaignList campaigns={campaigns.content} />}
          <Pagination totalPageCount={campaigns.totalPages} paginateFunction={handlePageChange} />
        </Content>
      </SuperAdminPageContainer>
    </AppContainer>
  );
}

export default SuperAdminMailCampaignList;
