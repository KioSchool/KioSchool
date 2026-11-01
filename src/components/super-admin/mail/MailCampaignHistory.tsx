import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import DetailSection from '@components/super-admin/detail/DetailSection';
import { MAIL_CAMPAIGN_STATUS_LABELS } from '@constants/data/mailData';
import { getSuperAdminMailCampaignPath } from '@constants/routes';
import useSuperAdminMail from '@hooks/super-admin/useSuperAdminMail';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import type { MailCampaignSummary } from '@@types/mail';
import { getApiErrorMessage } from '@utils/apiError';
import { formatNullableKoreanDateTime } from '@utils/formatNumber';

const RECENT_CAMPAIGN_COUNT = 10;

const List = styled.div`
  width: 100%;
  border: 1px solid ${Color.BORDER_GREY};
  border-radius: 10px;
  overflow: hidden;
  ${colFlex()}
`;

const CampaignLink = styled(Link)`
  width: 100%;
  box-sizing: border-box;
  padding: 12px 14px;
  border-bottom: 1px solid #f0f0f0;
  color: inherit;
  text-decoration: none;
  gap: 12px;
  ${rowFlex({ justify: 'space-between', align: 'center' })}

  &:last-of-type {
    border-bottom: none;
  }

  &:hover {
    background: #fcfcfc;
  }
`;

const Info = styled.div`
  min-width: 0;
  gap: 2px;
  ${colFlex()}
`;

const Subject = styled.span`
  color: ${Color.BLACK};
  font-size: 14px;
  font-weight: 600;
  overflow-wrap: anywhere;
`;

const Meta = styled.span`
  color: ${Color.GREY};
  font-size: 12px;
`;

const Status = styled.span`
  flex-shrink: 0;
  color: ${Color.GREY};
  font-size: 12px;
  font-weight: 700;
`;

const StateText = styled.span`
  color: ${Color.GREY};
  font-size: 13px;
`;

function MailCampaignHistory() {
  const { fetchCampaigns } = useSuperAdminMail();
  const [campaigns, setCampaigns] = useState<MailCampaignSummary[]>([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchCampaigns(0, RECENT_CAMPAIGN_COUNT)
      .then((page) => setCampaigns(page.content))
      .catch((error: unknown) => setErrorMessage(getApiErrorMessage(error, '지난 발송을 불러오지 못했습니다.')));
  }, [fetchCampaigns]);

  return (
    <DetailSection title="지난 발송">
      {errorMessage && <StateText role="alert">{errorMessage}</StateText>}
      {!errorMessage && campaigns.length === 0 && <StateText>아직 보낸 적이 없어요.</StateText>}
      {campaigns.length > 0 && (
        <List>
          {campaigns.map((campaign) => (
            <CampaignLink key={campaign.id} to={getSuperAdminMailCampaignPath(campaign.id)}>
              <Info>
                <Subject>{campaign.subject}</Subject>
                <Meta>
                  {campaign.createdByName ?? ''} · {formatNullableKoreanDateTime(campaign.createdAt)} · 보냄 {campaign.sentCount} / {campaign.totalCount}곳
                </Meta>
              </Info>
              <Status>{MAIL_CAMPAIGN_STATUS_LABELS[campaign.status]}</Status>
            </CampaignLink>
          ))}
        </List>
      )}
    </DetailSection>
  );
}

export default MailCampaignHistory;
