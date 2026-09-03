import { useCallback } from 'react';
import type { PaginationResponse } from '@@types/index';
import type { CloseInquiryRequest, InquiryDetail, InquiryListItem, InquiryStatus, ReplyInquiryRequest } from '@@types/inquiry';
import useApi from '@hooks/useApi';

interface FetchInquiriesParams {
  page: number;
  size: number;
  status?: InquiryStatus;
}

function useSuperAdminInquiry() {
  const { superAdminApi } = useApi();

  const fetchInquiries = useCallback(
    async ({ page, size, status }: FetchInquiriesParams): Promise<PaginationResponse<InquiryListItem>> => {
      const response = await superAdminApi.get<PaginationResponse<InquiryListItem>>('/inquiries', {
        params: { page, size, status },
      });
      return response.data;
    },
    [superAdminApi],
  );

  const fetchInquiry = useCallback(
    async (inquiryId: number): Promise<InquiryDetail> => {
      const response = await superAdminApi.get<InquiryDetail>(`/inquiries/${inquiryId}`);
      return response.data;
    },
    [superAdminApi],
  );

  const replyInquiry = useCallback(
    async (inquiryId: number, request: ReplyInquiryRequest): Promise<InquiryDetail> => {
      const response = await superAdminApi.post<InquiryDetail>(`/inquiries/${inquiryId}/reply`, request);
      return response.data;
    },
    [superAdminApi],
  );

  const closeInquiry = useCallback(
    async (inquiryId: number, request: CloseInquiryRequest = {}): Promise<InquiryDetail> => {
      const response = await superAdminApi.post<InquiryDetail>(`/inquiries/${inquiryId}/close`, request);
      return response.data;
    },
    [superAdminApi],
  );

  return { fetchInquiries, fetchInquiry, replyInquiry, closeInquiry };
}

export default useSuperAdminInquiry;
