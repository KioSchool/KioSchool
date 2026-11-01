import { useCallback } from 'react';
import axios from 'axios';
import type { PaginationResponse } from '@@types/index';
import type { MailThreadDetail, MailThreadListItem, MailThreadStatus, ReplyMailRequest, SendMailRequest } from '@@types/mail';
import useApi from '@hooks/useApi';

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
      await superAdminApi.post('/mail/threads', request);
    },
    [superAdminApi],
  );

  const replyThread = useCallback(
    async (threadId: number, request: ReplyMailRequest): Promise<MailThreadDetail> => {
      const response = await superAdminApi.post<MailThreadDetail>(`/mail/threads/${threadId}/reply`, request);
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
        const response = await superAdminApi.get<Blob>(`/mail/attachments/${attachmentId}/download`, { responseType: 'blob' });
        return response.data;
      } catch (error) {
        await restoreBlobErrorBody(error);
        throw error;
      }
    },
    [superAdminApi],
  );

  return { fetchThreads, fetchThread, sendNewMail, replyThread, resolveThread, markSpam, unmarkSpam, deleteThread, downloadAttachment };
}

export default useSuperAdminMail;
