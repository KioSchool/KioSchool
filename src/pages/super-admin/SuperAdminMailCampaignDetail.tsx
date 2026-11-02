import { useCallback, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import AppContainer from '@components/common/container/AppContainer';
import NewCommonButton from '@components/common/button/NewCommonButton';
import Pagination from '@components/common/pagination/Pagination';
import PageHeader from '@components/common/page/PageHeader';
import MailProdWarningBand from '@components/super-admin/mail/MailProdWarningBand';
import MailCampaignStatusTable from '@components/super-admin/mail/MailCampaignStatusTable';
import SuperAdminPageContainer from '@components/super-admin/SuperAdminPageContainer';
import { MAIL_CAMPAIGN_STATUS_LABELS } from '@constants/data/mailData';
import { SUPER_ADMIN_ROUTES } from '@constants/routes';
import useSuperAdminMail from '@hooks/super-admin/useSuperAdminMail';
import useConfirm from '@hooks/useConfirm';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import type { MailCampaignDetail } from '@@types/mail';
import { getApiErrorMessage } from '@utils/apiError';
import { formatNullableKoreanDateTime } from '@utils/formatNumber';

const PAGE_SIZE = 20;
const REFRESH_INTERVAL_MS = 5000;

const Content = styled.div`
  width: 100%;
  gap: 16px;
  ${colFlex()}
`;

const StatGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  width: 100%;
  gap: 12px;
`;

const StatCell = styled.div`
  box-sizing: border-box;
  padding: 12px 14px;
  border-radius: 8px;
  background: ${Color.LIGHT_GREY};
  gap: 2px;
  ${colFlex()}
`;

const StatLabel = styled.span`
  color: ${Color.GREY};
  font-size: 12px;
`;

const StatValue = styled.span`
  color: ${Color.BLACK};
  font-size: 18px;
  font-weight: 700;
`;

const ButtonRow = styled.div`
  width: 100%;
  gap: 10px;
  ${rowFlex({ justify: 'flex-end', align: 'center' })}
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

const ErrorText = styled.span`
  color: ${Color.RED};
  font-size: 13px;
`;

function getScheduleText(detail: MailCampaignDetail): string {
  const { summary, dailyLimit } = detail;
  if (summary.status !== 'SENDING' || summary.pendingCount === 0) return MAIL_CAMPAIGN_STATUS_LABELS[summary.status];
  return `하루 ${dailyLimit}곳씩 보내요. 남은 곳은 다음 날 오전 10시에 이어서 보내요.`;
}

function SuperAdminMailCampaignDetail() {
  const { campaignId } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { fetchCampaign, stopCampaign, retryFailedCampaign } = useSuperAdminMail();
  const [detail, setDetail] = useState<MailCampaignDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isWorking, setIsWorking] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const numericCampaignId = Number(campaignId);
  const page = Math.max(Number(searchParams.get('page')) || 0, 0);
  const { ConfirmModal, confirm } = useConfirm({
    title: '발송을 멈출까요?',
    description: '남은 곳에는 보내지 않고, 다시 시작할 수 없습니다.',
    okText: '멈추기',
    cancelText: '취소',
  });

  const load = useCallback(() => {
    if (!Number.isInteger(numericCampaignId) || numericCampaignId <= 0) {
      setErrorMessage('올바르지 않은 발송 번호입니다.');
      setIsLoading(false);
      return;
    }

    fetchCampaign(numericCampaignId, page, PAGE_SIZE)
      .then((response) => {
        setDetail(response);
        setErrorMessage('');
      })
      .catch((error: unknown) => setErrorMessage(getApiErrorMessage(error, '발송 현황을 불러오지 못했습니다.')))
      .finally(() => setIsLoading(false));
  }, [fetchCampaign, numericCampaignId, page]);

  useEffect(() => {
    load();
  }, [load]);

  const isSending = detail?.summary.status === 'SENDING';

  useEffect(() => {
    if (!isSending) return undefined;

    const timer = setInterval(load, REFRESH_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [isSending, load]);

  const change = async (request: () => Promise<MailCampaignDetail>, fallbackMessage: string) => {
    setIsWorking(true);
    setErrorMessage('');

    try {
      setDetail(await request());
    } catch (error) {
      setErrorMessage(getApiErrorMessage(error, fallbackMessage));
    } finally {
      setIsWorking(false);
    }
  };

  const handleStop = async () => {
    if (await confirm()) await change(() => stopCampaign(numericCampaignId, page, PAGE_SIZE), '발송을 멈추지 못했습니다.');
  };

  const handleRetry = () => change(() => retryFailedCampaign(numericCampaignId, page, PAGE_SIZE), '다시 보내지 못했습니다.');

  const handlePageChange = (nextPage: number) => {
    setSearchParams({ page: nextPage.toString() }, { replace: true });
  };

  if (isLoading) {
    return (
      <AppContainer useFlex={colFlex({ align: 'center' })} useTitle={false}>
        <SuperAdminPageContainer>
          <MailProdWarningBand />
          <MessageCard>발송 현황을 불러오는 중입니다.</MessageCard>
        </SuperAdminPageContainer>
      </AppContainer>
    );
  }

  if (!detail) {
    return (
      <AppContainer useFlex={colFlex({ align: 'center' })} useTitle={false}>
        <SuperAdminPageContainer>
          <MessageCard role="alert">{errorMessage || '발송을 찾을 수 없습니다.'}</MessageCard>
        </SuperAdminPageContainer>
      </AppContainer>
    );
  }

  const { summary, recipients } = detail;

  return (
    <AppContainer useFlex={colFlex({ align: 'center' })} useTitle={false}>
      <SuperAdminPageContainer>
        <ConfirmModal />
        <PageHeader
          title={summary.subject}
          description={`${summary.createdByName ?? ''} · ${formatNullableKoreanDateTime(summary.createdAt)} 시작 · ${getScheduleText(detail)}`}
          actions={
            <NewCommonButton type="button" size="xs" color="blue_gray" onClick={() => navigate(SUPER_ADMIN_ROUTES.MAIL_CAMPAIGN_NEW)}>
              지난 발송 보기
            </NewCommonButton>
          }
        />
        <Content>
          <StatGrid>
            <StatCell>
              <StatLabel>보냄</StatLabel>
              <StatValue>{summary.sentCount}곳</StatValue>
            </StatCell>
            <StatCell>
              <StatLabel>남음</StatLabel>
              <StatValue>{summary.pendingCount}곳</StatValue>
            </StatCell>
            <StatCell>
              <StatLabel>실패</StatLabel>
              <StatValue>{summary.failedCount}곳</StatValue>
            </StatCell>
            <StatCell>
              <StatLabel>제외</StatLabel>
              <StatValue>{summary.excludedCount}곳</StatValue>
            </StatCell>
          </StatGrid>
          {errorMessage && <ErrorText role="alert">{errorMessage}</ErrorText>}
          <MailCampaignStatusTable recipients={recipients.content} />
          <Pagination totalPageCount={recipients.totalPages} paginateFunction={handlePageChange} />
          <ButtonRow>
            {summary.status === 'SENDING' && (
              <NewCommonButton type="button" size="xs" color="blue_gray" disabled={isWorking} onClick={handleStop}>
                발송 멈추기
              </NewCommonButton>
            )}
            {summary.status !== 'STOPPED' && summary.failedCount > 0 && (
              <NewCommonButton type="button" size="xs" disabled={isWorking} onClick={handleRetry}>
                실패한 곳 다시 보내기
              </NewCommonButton>
            )}
          </ButtonRow>
        </Content>
      </SuperAdminPageContainer>
    </AppContainer>
  );
}

export default SuperAdminMailCampaignDetail;
