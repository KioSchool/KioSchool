import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import DetailSection from '@components/super-admin/detail/DetailSection';
import { SUPER_ADMIN_ROUTES } from '@constants/routes';
import useSuperAdminMail from '@hooks/super-admin/useSuperAdminMail';
import { Color } from '@resources/colors';
import type { MailCampaignSummary } from '@@types/mail';
import { getApiErrorMessage } from '@utils/apiError';
import MailCampaignList from './MailCampaignList';

const RECENT_CAMPAIGN_COUNT = 10;

const StateText = styled.span`
  color: ${Color.GREY};
  font-size: 13px;
`;

const AllCampaignsLink = styled(Link)`
  align-self: flex-end;
  color: ${Color.GREY};
  font-size: 13px;
  font-weight: 600;
`;

function MailCampaignHistory() {
  const { fetchCampaigns } = useSuperAdminMail();
  const [campaigns, setCampaigns] = useState<MailCampaignSummary[]>([]);
  const [hasMore, setHasMore] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchCampaigns(0, RECENT_CAMPAIGN_COUNT)
      .then((page) => {
        setCampaigns(page.content);
        setHasMore(page.totalPages > 1);
      })
      .catch((error: unknown) => setErrorMessage(getApiErrorMessage(error, '지난 발송을 불러오지 못했습니다.')));
  }, [fetchCampaigns]);

  return (
    <DetailSection title="지난 발송">
      {errorMessage && <StateText role="alert">{errorMessage}</StateText>}
      {!errorMessage && campaigns.length === 0 && <StateText>아직 보낸 적이 없어요.</StateText>}
      {campaigns.length > 0 && <MailCampaignList campaigns={campaigns} />}
      {hasMore && <AllCampaignsLink to={SUPER_ADMIN_ROUTES.MAIL_CAMPAIGNS}>전체 보기</AllCampaignsLink>}
    </DetailSection>
  );
}

export default MailCampaignHistory;
