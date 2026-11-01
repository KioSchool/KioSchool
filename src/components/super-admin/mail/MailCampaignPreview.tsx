import { useMemo } from 'react';
import styled from '@emotion/styled';
import { MAIL_ADDRESS, MAIL_TEAM_NAME } from '@constants/data/mailData';
import { Color } from '@resources/colors';
import { colFlex } from '@styles/flexStyles';
import type { MailAudienceRow } from '@@types/mail';
import { renderMailTemplatePreview } from '@utils/mailCampaign';
import { createMailPreviewHtml } from '@utils/mailPreview';
import type { MailCampaignFormValues } from './MailCampaignForm';

const PREVIEW_UNSUBSCRIBE_URL = 'https://kio-school.com/mail/unsubscribe';

const Container = styled.div`
  width: 100%;
  gap: 8px;
  ${colFlex()}
`;

const Title = styled.span`
  color: ${Color.GREY};
  font-size: 13px;
  font-weight: 600;
`;

const Info = styled.p`
  margin: 0;
  color: ${Color.GREY};
  font-size: 13px;
  line-height: 1.6;
  overflow-wrap: anywhere;
`;

const Subject = styled.span`
  color: ${Color.BLACK};
  font-size: 14px;
  font-weight: 600;
  overflow-wrap: anywhere;
`;

const Frame = styled.iframe`
  width: 100%;
  height: 440px;
  box-sizing: border-box;
  border: 1px solid ${Color.BORDER_GREY};
  border-radius: 8px;
  background: #f6f7f9;
`;

function getPreviewButton(values: MailCampaignFormValues, row: MailAudienceRow | undefined) {
  const label = values.buttonLabel.trim();
  const url = values.buttonUrl.trim();
  if (!label || !url) return undefined;
  return { label: renderMailTemplatePreview(label, row), url: renderMailTemplatePreview(url, row, encodeURIComponent) };
}

interface MailCampaignPreviewProps {
  values: MailCampaignFormValues;
  row: MailAudienceRow | undefined;
}

function MailCampaignPreview({ values, row }: MailCampaignPreviewProps) {
  const html = useMemo(() => {
    return createMailPreviewHtml(renderMailTemplatePreview(values.content, row), {
      button: getPreviewButton(values, row),
      unsubscribeUrl: PREVIEW_UNSUBSCRIBE_URL,
    });
  }, [row, values.buttonLabel, values.buttonUrl, values.content]);

  return (
    <Container>
      <Title>미리보기{row && `: ${row.workspaceName}`}</Title>
      <Info>
        보낸 사람: {MAIL_TEAM_NAME} &lt;{MAIL_ADDRESS}&gt;
        <br />
        받는 사람: {row?.ownerEmail ?? '받을 주점을 골라 주세요'}
      </Info>
      <Subject>{renderMailTemplatePreview(values.subject, row) || '메일 제목이 여기에 보여요'}</Subject>
      <Frame title="메일 미리보기" sandbox="" srcDoc={html} />
    </Container>
  );
}

export default MailCampaignPreview;
