import { useEffect, useMemo, useState } from 'react';
import styled from '@emotion/styled';
import { Link, useSearchParams } from 'react-router-dom';
import AppContainer from '@components/common/container/AppContainer';
import Pagination from '@components/common/pagination/Pagination';
import PageHeader from '@components/common/page/PageHeader';
import SuperAdminPageContainer from '@components/super-admin/SuperAdminPageContainer';
import { INQUIRY_STATUSES, INQUIRY_STATUS_LABELS } from '@constants/data/inquiryData';
import { getSuperAdminInquiryPath } from '@constants/routes';
import useSuperAdminInquiry from '@hooks/super-admin/useSuperAdminInquiry';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { mobileMediaQuery } from '@styles/globalStyles';
import type { PaginationResponse } from '@@types/index';
import type { InquiryListItem, InquiryStatus } from '@@types/inquiry';
import { defaultPaginationValue } from '@@types/defaultValues';
import { getApiErrorMessage } from '@utils/apiError';
import { formatKoreanDateTime } from '@utils/formatNumber';

const PAGE_SIZE = 20;

const Content = styled.div`
  width: 100%;
  gap: 16px;
  ${colFlex()}
`;

const FilterRow = styled.div`
  width: 100%;
  gap: 8px;
  flex-wrap: wrap;
  ${rowFlex({ align: 'center' })}
`;

const FilterButton = styled.button<{ isActive: boolean }>`
  min-height: 32px;
  padding: 0 12px;
  border: 1px solid ${({ isActive }) => (isActive ? Color.KIO_ORANGE : Color.HEAVY_GREY)};
  border-radius: 16px;
  background: ${({ isActive }) => (isActive ? Color.KIO_ORANGE_FAINT : Color.WHITE)};
  color: ${({ isActive }) => (isActive ? Color.KIO_ORANGE_DARK : Color.GREY)};
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;
`;

const List = styled.div`
  width: 100%;
  border: 1px solid #e8eef2;
  border-radius: 10px;
  overflow: hidden;
  ${colFlex()}
`;

const InquiryLink = styled(Link)`
  width: 100%;
  min-width: 0;
  box-sizing: border-box;
  padding: 16px 20px;
  border-bottom: 1px solid #f0f0f0;
  color: inherit;
  text-decoration: none;
  gap: 14px;
  ${rowFlex({ justify: 'space-between', align: 'center' })}

  &:last-of-type {
    border-bottom: none;
  }

  &:hover {
    background: #fcfcfc;
  }

  ${mobileMediaQuery} {
    padding: 14px;
    align-items: flex-start;
  }
`;

const InquiryInfo = styled.div`
  min-width: 0;
  gap: 4px;
  ${colFlex()}
`;

const InquiryTitle = styled.span`
  overflow: hidden;
  color: ${Color.BLACK};
  font-size: 15px;
  font-weight: 700;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const InquiryMeta = styled.span`
  color: ${Color.GREY};
  font-size: 13px;
`;

const InquirySide = styled.div`
  flex-shrink: 0;
  gap: 8px;
  ${rowFlex({ align: 'center' })}

  ${mobileMediaQuery} {
    gap: 4px;
    ${colFlex({ align: 'flex-end' })}
  }
`;

const ImageCount = styled.span`
  color: ${Color.GREY};
  font-size: 12px;
  white-space: nowrap;
`;

const StatusBadge = styled.span<{ status: InquiryStatus }>`
  min-width: 64px;
  padding: 4px 8px;
  border-radius: 12px;
  background: ${({ status }) => {
    if (status === 'PENDING') return '#fff1e6';
    if (status === 'ANSWERED') return '#e8f7ee';
    return '#f1f3f5';
  }};
  color: ${({ status }) => {
    if (status === 'PENDING') return Color.KIO_ORANGE_DARK;
    if (status === 'ANSWERED') return '#20884a';
    return Color.GREY;
  }};
  font-size: 12px;
  font-weight: 700;
  text-align: center;
  white-space: nowrap;
`;

const MessageCard = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 40px 20px;
  border: 1px solid #e8eef2;
  border-radius: 10px;
  color: ${Color.GREY};
  text-align: center;
`;

function getInquiryStatus(value: string | null): InquiryStatus | undefined {
  return INQUIRY_STATUSES.find((status) => status === value);
}

function formatInquiryDate(createdAt: string | null): string {
  return createdAt ? formatKoreanDateTime(createdAt) : '-';
}

function SuperAdminInquiryList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { fetchInquiries } = useSuperAdminInquiry();
  const [inquiries, setInquiries] = useState<PaginationResponse<InquiryListItem>>(defaultPaginationValue);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const queryString = searchParams.toString();
  const status = useMemo(() => getInquiryStatus(searchParams.get('status')), [queryString]);
  const page = useMemo(() => Math.max(Number(searchParams.get('page')) || 0, 0), [queryString]);

  useEffect(() => {
    setIsLoading(true);
    setErrorMessage('');

    fetchInquiries({ page, size: PAGE_SIZE, status })
      .then(setInquiries)
      .catch((error: unknown) => setErrorMessage(getApiErrorMessage(error, '문의 목록을 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.')))
      .finally(() => setIsLoading(false));
  }, [fetchInquiries, page, status]);

  const handleStatusChange = (nextStatus?: InquiryStatus) => {
    const nextParams = new URLSearchParams();
    if (nextStatus) nextParams.set('status', nextStatus);
    setSearchParams(nextParams, { replace: true });
  };

  const handlePageChange = (nextPage: number) => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.set('page', nextPage.toString());
    setSearchParams(nextParams, { replace: true });
  };

  const isEmpty = !isLoading && !errorMessage && inquiries.content.length === 0;

  return (
    <AppContainer useFlex={colFlex({ align: 'center' })} useTitle={false}>
      <SuperAdminPageContainer>
        <PageHeader title="문의 관리" description="고객 문의를 확인하고 답변 또는 종결 처리합니다." />
        <Content>
          <FilterRow>
            <FilterButton type="button" isActive={!status} onClick={() => handleStatusChange()}>
              전체
            </FilterButton>
            {INQUIRY_STATUSES.map((inquiryStatus) => (
              <FilterButton key={inquiryStatus} type="button" isActive={status === inquiryStatus} onClick={() => handleStatusChange(inquiryStatus)}>
                {INQUIRY_STATUS_LABELS[inquiryStatus]}
              </FilterButton>
            ))}
          </FilterRow>
          {errorMessage && <MessageCard role="alert">{errorMessage}</MessageCard>}
          {isEmpty && <MessageCard>조건에 맞는 문의가 없습니다.</MessageCard>}
          {!isLoading && !errorMessage && inquiries.content.length > 0 && (
            <List>
              {inquiries.content.map((inquiry) => (
                <InquiryLink key={inquiry.id} to={getSuperAdminInquiryPath(inquiry.id)}>
                  <InquiryInfo>
                    <InquiryTitle>{inquiry.title}</InquiryTitle>
                    <InquiryMeta>
                      {inquiry.replyEmail} · {formatInquiryDate(inquiry.createdAt)}
                    </InquiryMeta>
                  </InquiryInfo>
                  <InquirySide>
                    <ImageCount>첨부 {inquiry.imageCount}장</ImageCount>
                    <StatusBadge status={inquiry.status}>{INQUIRY_STATUS_LABELS[inquiry.status]}</StatusBadge>
                  </InquirySide>
                </InquiryLink>
              ))}
            </List>
          )}
          <Pagination totalPageCount={inquiries.totalPages} paginateFunction={handlePageChange} />
        </Content>
      </SuperAdminPageContainer>
    </AppContainer>
  );
}

export default SuperAdminInquiryList;
