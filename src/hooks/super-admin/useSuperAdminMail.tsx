import { useCallback } from 'react';
import axios from 'axios';
import type { PaginationResponse } from '@@types/index';
import type {
  MailAudienceFilter,
  MailAudiencePreview,
  MailCampaignDetail,
  MailCampaignRequest,
  MailCampaignSummary,
  MailThreadDetail,
  MailThreadListItem,
  MailThreadStatus,
  ReplyMailRequest,
  SendMailRequest,
} from '@@types/mail';
import useApi from '@hooks/useApi';

// 서버가 Resend를 두 번 부르는 동안(호출당 최대 15초) 먼저 포기하면, 메일이 나갔는데 실패로 보여 다시 보내게 된다
const MAIL_SEND_TIMEOUT_MS = 35000;
const MAIL_ATTACHMENT_TIMEOUT_MS = 130000;

interface FetchThreadsParams {
  page: number;
  size: number;
  status?: MailThreadStatus;
  workspaceId?: number;
}

// responseType이 blob이면 오류 응답 본문도 Blob으로 오므로, 공통 오류 처리가 code를 읽을 수 있게 JSON으로 되돌린다
async function restoreBlobErrorBody(error: unknown) {
  if (!axios.isAxiosError(error) || !error.response || !(error.response.data instanceof Blob)) return;

  try {
    error.response.data = JSON.parse(await error.response.data.text());
  } catch {
    error.response.data = undefined;
  }
}

function useSuperAdminMail() {
  const { superAdminApi } = useApi();

  const fetchThreads = useCallback(
    async ({ page, size, status, workspaceId }: FetchThreadsParams): Promise<PaginationResponse<MailThreadListItem>> => {
      const response = await superAdminApi.get<PaginationResponse<MailThreadListItem>>('/mail/threads', {
        params: { page, size, status, workspaceId },
      });
      return response.data;
    },
    [superAdminApi],
  );

  const fetchThread = useCallback(
    async (threadId: number): Promise<MailThreadDetail> => {
      const response = await superAdminApi.get<MailThreadDetail>(`/mail/threads/${threadId}`);
      return response.data;
    },
    [superAdminApi],
  );

  const sendNewMail = useCallback(
    async (request: SendMailRequest): Promise<void> => {
      await superAdminApi.post('/mail/threads', request, { timeout: MAIL_SEND_TIMEOUT_MS });
    },
    [superAdminApi],
  );

  const replyThread = useCallback(
    async (threadId: number, request: ReplyMailRequest): Promise<MailThreadDetail> => {
      const response = await superAdminApi.post<MailThreadDetail>(`/mail/threads/${threadId}/reply`, request, { timeout: MAIL_SEND_TIMEOUT_MS });
      return response.data;
    },
    [superAdminApi],
  );

  const resolveThread = useCallback(
    async (threadId: number): Promise<MailThreadDetail> => {
      const response = await superAdminApi.post<MailThreadDetail>(`/mail/threads/${threadId}/resolve`);
      return response.data;
    },
    [superAdminApi],
  );

  const markSpam = useCallback(
    async (threadId: number): Promise<MailThreadDetail> => {
      const response = await superAdminApi.post<MailThreadDetail>(`/mail/threads/${threadId}/spam`);
      return response.data;
    },
    [superAdminApi],
  );

  const unmarkSpam = useCallback(
    async (threadId: number): Promise<MailThreadDetail> => {
      const response = await superAdminApi.delete<MailThreadDetail>(`/mail/threads/${threadId}/spam`);
      return response.data;
    },
    [superAdminApi],
  );

  const deleteThread = useCallback(
    async (threadId: number): Promise<void> => {
      await superAdminApi.delete(`/mail/threads/${threadId}`);
    },
    [superAdminApi],
  );

  const downloadAttachment = useCallback(
    async (attachmentId: number): Promise<Blob> => {
      try {
        const response = await superAdminApi.get<Blob>(`/mail/attachments/${attachmentId}/download`, {
          responseType: 'blob',
          timeout: MAIL_ATTACHMENT_TIMEOUT_MS,
        });
        return response.data;
      } catch (error) {
        await restoreBlobErrorBody(error);
        throw error;
      }
    },
    [superAdminApi],
  );

  const previewAudience = useCallback(
    async (filter: MailAudienceFilter, page: number, size: number): Promise<MailAudiencePreview> => {
      const response = await superAdminApi.post<MailAudiencePreview>('/mail/campaigns/audience', filter, { params: { page, size } });
      return response.data;
    },
    [superAdminApi],
  );

  const sendCampaignTest = useCallback(
    async (request: MailCampaignRequest): Promise<void> => {
      await superAdminApi.post('/mail/campaigns/test', request, { timeout: MAIL_SEND_TIMEOUT_MS });
    },
    [superAdminApi],
  );

  const startCampaign = useCallback(
    async (request: MailCampaignRequest): Promise<MailCampaignSummary> => {
      const response = await superAdminApi.post<MailCampaignSummary>('/mail/campaigns', request, { timeout: MAIL_SEND_TIMEOUT_MS });
      return response.data;
    },
    [superAdminApi],
  );

  const fetchCampaigns = useCallback(
    async (page: number, size: number): Promise<PaginationResponse<MailCampaignSummary>> => {
      const response = await superAdminApi.get<PaginationResponse<MailCampaignSummary>>('/mail/campaigns', { params: { page, size } });
      return response.data;
    },
    [superAdminApi],
  );

  const fetchCampaign = useCallback(
    async (campaignId: number, page: number, size: number): Promise<MailCampaignDetail> => {
      const response = await superAdminApi.get<MailCampaignDetail>(`/mail/campaigns/${campaignId}`, { params: { page, size } });
      return response.data;
    },
    [superAdminApi],
  );

  const stopCampaign = useCallback(
    async (campaignId: number, page: number, size: number): Promise<MailCampaignDetail> => {
      const response = await superAdminApi.post<MailCampaignDetail>(`/mail/campaigns/${campaignId}/stop`, undefined, { params: { page, size } });
      return response.data;
    },
    [superAdminApi],
  );

  const retryFailedCampaign = useCallback(
    async (campaignId: number, page: number, size: number): Promise<MailCampaignDetail> => {
      const response = await superAdminApi.post<MailCampaignDetail>(`/mail/campaigns/${campaignId}/retry-failed`, undefined, { params: { page, size } });
      return response.data;
    },
    [superAdminApi],
  );

  return {
    fetchThreads,
    fetchThread,
    sendNewMail,
    replyThread,
    resolveThread,
    markSpam,
    unmarkSpam,
    deleteThread,
    downloadAttachment,
    previewAudience,
    sendCampaignTest,
    startCampaign,
    fetchCampaigns,
    fetchCampaign,
    stopCampaign,
    retryFailedCampaign,
  };
}

export default useSuperAdminMail;
