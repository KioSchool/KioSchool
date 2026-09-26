import styled from '@emotion/styled';
import { AcquisitionSurveyResponse } from '@@types/acquisitionSurvey';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { mobileMediaQuery } from '@styles/globalStyles';
import { formatNullableKoreanDateTime } from '@utils/formatNumber';
import { getUserAccountState } from '@utils/userAccountFilter';
import { SUPER_ADMIN_ROUTES } from '@constants/routes';
import useUserDetailSidebar from '@hooks/super-admin/useUserDetailSidebar';
import UserAccountBadge from '@components/super-admin/user/UserAccountBadge';
import SurveyContextTags from './SurveyContextTags';

const Row = styled.div`
  width: 100%;
  padding: 14px 0;
  border-bottom: 1px solid #f7f7f7;
  gap: 8px;
  cursor: pointer;
  &:last-of-type {
    border-bottom: none;
  }
  ${colFlex()}

  &:hover .survey-user-name {
    color: ${Color.KIO_ORANGE};
  }
`;

const Header = styled.div`
  width: 100%;
  gap: 8px;
  flex-wrap: wrap;
  ${rowFlex({ align: 'center' })}
`;

const UserName = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: ${Color.BLACK};
  transition: color 0.15s;
`;

const UserSub = styled.span`
  font-size: 12px;
  color: ${Color.GREY};
  min-width: 0;
  word-break: break-all;
`;

const UserMeta = styled.div`
  width: 100%;
  gap: 8px;
  ${rowFlex({ align: 'center' })}
`;

const WorkspaceText = styled.span`
  min-width: 0;
  font-size: 12px;
  color: ${Color.HEAVY_GREY};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const SchoolName = styled.span`
  font-size: 12px;
  color: ${Color.GREY};
`;

const ChannelChip = styled.span<{ skipped: boolean }>`
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 11px;
  font-weight: 500;
  background: ${({ skipped }) => (skipped ? Color.LIGHT_GREY : Color.KIO_ORANGE_FAINT)};
  color: ${({ skipped }) => (skipped ? Color.GREY : Color.KIO_ORANGE_DARK)};
`;

const ChannelEtc = styled.span`
  font-size: 12px;
  color: ${Color.BLACK};
`;

const AnsweredAt = styled.div`
  font-size: 12px;
  color: ${Color.GREY};
  margin-left: auto;

  ${mobileMediaQuery} {
    margin-left: 0;
    width: 100%;
  }
`;

const SKIPPED_LABEL = '건너뜀';
const NO_EMAIL_LABEL = '이메일 없음';
const NO_WORKSPACE_LABEL = '소속 주점 없음';

interface SurveyResponseItemProps {
  response: AcquisitionSurveyResponse;
}

function SurveyResponseItem({ response }: SurveyResponseItemProps) {
  const { toggleUserDetail } = useUserDetailSidebar(SUPER_ADMIN_ROUTES.ACQUISITION_SURVEY);
  const isSkipped = response.channelLabel === null;
  const workspaceNames = response.user.workspaces.map((workspace) => workspace.name).join(', ');

  return (
    <Row onClick={() => toggleUserDetail(response.user)}>
      <Header>
        <UserName className="survey-user-name">{response.user.name}</UserName>
        <UserSub>
          {response.user.loginId} · {response.userEmail ?? NO_EMAIL_LABEL}
        </UserSub>
        <SchoolName>{response.schoolName}</SchoolName>
        <ChannelChip skipped={isSkipped}>{isSkipped ? SKIPPED_LABEL : response.channelLabel}</ChannelChip>
        {response.channelEtc && <ChannelEtc>{response.channelEtc}</ChannelEtc>}
        <AnsweredAt>{formatNullableKoreanDateTime(response.answeredAt)}</AnsweredAt>
      </Header>
      <UserMeta>
        <UserAccountBadge state={getUserAccountState(response.user)} />
        <WorkspaceText>{workspaceNames || NO_WORKSPACE_LABEL}</WorkspaceText>
      </UserMeta>
      {response.context && <SurveyContextTags context={response.context} />}
    </Row>
  );
}

export default SurveyResponseItem;
