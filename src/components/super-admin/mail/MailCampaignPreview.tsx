import styled from '@emotion/styled';
import { MAIL_ADDRESS, MAIL_TEAM_NAME } from '@constants/data/mailData';
import { Color } from '@resources/colors';
import { colFlex } from '@styles/flexStyles';
import type { MailCampaignPreview as MailCampaignPreviewResult } from '@@types/mail';

const Container = styled.div`
  width: 100%;
  min-width: 0;
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
  height: 520px;
  box-sizing: border-box;
  border: 1px solid ${Color.BORDER_GREY};
  border-radius: 8px;
  background: #f6f7f9;
`;

const ErrorText = styled.span`
  color: ${Color.RED};
  font-size: 13px;
`;

interface MailCampaignPreviewProps {
  preview: MailCampaignPreviewResult | null;
  errorMessage: string;
}

function MailCampaignPreview({ preview, errorMessage }: MailCampaignPreviewProps) {
  return (
    <Container>
      <Title>미리보기{preview?.workspaceName && `: ${preview.workspaceName}`}</Title>
      <Info>
        보낸 사람: {MAIL_TEAM_NAME} &lt;{MAIL_ADDRESS}&gt;
        <br />
        받는 사람: {preview?.ownerEmail ?? '받을 주점을 골라 주세요'}
      </Info>
      <Subject>{preview?.subject || '메일 제목이 여기에 보여요'}</Subject>
      {errorMessage && <ErrorText role="alert">{errorMessage}</ErrorText>}
      <Frame title="메일 미리보기" sandbox="" srcDoc={preview?.html ?? ''} />
    </Container>
  );
}

export default MailCampaignPreview;
