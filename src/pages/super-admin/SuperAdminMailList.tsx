import { useEffect, useMemo, useState } from 'react';
import styled from '@emotion/styled';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { match } from 'ts-pattern';
import AppContainer from '@components/common/container/AppContainer';
import NewCommonButton from '@components/common/button/NewCommonButton';
import Pagination from '@components/common/pagination/Pagination';
import PageHeader from '@components/common/page/PageHeader';
import MailThreadList from '@components/super-admin/mail/MailThreadList';
import SuperAdminPageContainer from '@components/super-admin/SuperAdminPageContainer';
import { MAIL_ADDRESS, MAIL_STATUS_FILTERS, MAIL_STATUS_LABELS } from '@constants/data/mailData';
import { getSuperAdminMailNewPath } from '@constants/routes';
import useSuperAdminMail from '@hooks/super-admin/useSuperAdminMail';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import type { PaginationResponse } from '@@types/index';
import type { MailThreadListItem, MailThreadStatus } from '@@types/mail';
import { defaultPaginationValue } from '@@types/defaultValues';
import { getApiErrorMessage } from '@utils/apiError';

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

const getFilterBorderColor = (isActive: boolean) =>
  match(isActive)
    .with(true, () => Color.KIO_ORANGE)
    .otherwise(() => Color.HEAVY_GREY);

const getFilterBackground = (isActive: boolean) =>
  match(isActive)
    .with(true, () => Color.KIO_ORANGE_FAINT)
    .otherwise(() => Color.WHITE);

const getFilterColor = (isActive: boolean) =>
  match(isActive)
    .with(true, () => Color.KIO_ORANGE_DARK)
    .otherwise(() => Color.GREY);

const FilterButton = styled.button<{ isActive: boolean }>`
  min-height: 32px;
  padding: 0 12px;
  border: 1px solid ${({ isActive }) => getFilterBorderColor(isActive)};
  border-radius: 16px;
  background: ${({ isActive }) => getFilterBackground(isActive)};
  color: ${({ isActive }) => getFilterColor(isActive)};
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;
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

const SentNotice = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 12px 16px;
  border-radius: 8px;
  background: ${Color.GREEN_FAINT};
  color: ${Color.GREEN};
  font-size: 13px;
  font-weight: 600;
`;

function getMailStatus(value: string | null): MailThreadStatus | undefined {
  return MAIL_STATUS_FILTERS.find((status) => status === value);
}

function SuperAdminMailList() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const { fetchThreads } = useSuperAdminMail();
  const [threads, setThreads] = useState<PaginationResponse<MailThreadListItem>>(defaultPaginationValue);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const queryString = searchParams.toString();
  const status = useMemo(() => getMailStatus(searchParams.get('status')), [queryString]);
  const page = useMemo(() => Math.max(Number(searchParams.get('page')) || 0, 0), [queryString]);
  const sentNotice = (location.state as { sentNotice?: string } | null)?.sentNotice;

  useEffect(() => {
    setIsLoading(true);
    setErrorMessage('');

    fetchThreads({ page, size: PAGE_SIZE, status })
      .then(setThreads)
      .catch((error: unknown) => setErrorMessage(getApiErrorMessage(error, '메일함을 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.')))
      .finally(() => setIsLoading(false));
  }, [fetchThreads, page, status]);

  const handleStatusChange = (nextStatus?: MailThreadStatus) => {
    const nextParams = new URLSearchParams();
    if (nextStatus) nextParams.set('status', nextStatus);
    setSearchParams(nextParams, { replace: true });
  };

  const handlePageChange = (nextPage: number) => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.set('page', nextPage.toString());
    setSearchParams(nextParams, { replace: true });
  };

  const isEmpty = !isLoading && !errorMessage && threads.content.length === 0;

  return (
    <AppContainer useFlex={colFlex({ align: 'center' })} useTitle={false}>
      <SuperAdminPageContainer>
        <PageHeader
          title="메일함"
          description={`${MAIL_ADDRESS}으로 주고받은 메일을 확인하고 답장합니다.`}
          actions={
            <NewCommonButton size="xs" onClick={() => navigate(getSuperAdminMailNewPath())}>
              새 메일
            </NewCommonButton>
          }
        />
        <Content>
          {sentNotice && <SentNotice role="status">{sentNotice}</SentNotice>}
          <FilterRow>
            <FilterButton type="button" isActive={!status} onClick={() => handleStatusChange()}>
              전체
            </FilterButton>
            {MAIL_STATUS_FILTERS.map((mailStatus) => (
              <FilterButton key={mailStatus} type="button" isActive={status === mailStatus} onClick={() => handleStatusChange(mailStatus)}>
                {MAIL_STATUS_LABELS[mailStatus]}
              </FilterButton>
            ))}
          </FilterRow>
          {errorMessage && <MessageCard role="alert">{errorMessage}</MessageCard>}
          {isEmpty && <MessageCard>조건에 맞는 메일이 없어요.</MessageCard>}
          {!isLoading && !errorMessage && threads.content.length > 0 && <MailThreadList threads={threads.content} />}
          <Pagination totalPageCount={threads.totalPages} paginateFunction={handlePageChange} />
        </Content>
      </SuperAdminPageContainer>
    </AppContainer>
  );
}

export default SuperAdminMailList;
