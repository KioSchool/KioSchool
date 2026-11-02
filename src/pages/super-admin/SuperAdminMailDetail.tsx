import { useCallback, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Link, useNavigate, useParams } from 'react-router-dom';
import AppContainer from '@components/common/container/AppContainer';
import NewCommonButton from '@components/common/button/NewCommonButton';
import PageHeader from '@components/common/page/PageHeader';
import MailEnvironmentBanner from '@components/super-admin/mail/MailEnvironmentBanner';
import MailMessageItem from '@components/super-admin/mail/MailMessageItem';
import MailReplyForm from '@components/super-admin/mail/MailReplyForm';
import MailStatusBadge from '@components/super-admin/mail/MailStatusBadge';
import SuperAdminPageContainer from '@components/super-admin/SuperAdminPageContainer';
import { MAIL_NO_SUBJECT, MAIL_NO_WORKSPACE } from '@constants/data/mailData';
import { getSuperAdminWorkspacePath, SUPER_ADMIN_ROUTES } from '@constants/routes';
import useSuperAdminMail from '@hooks/super-admin/useSuperAdminMail';
import useConfirm from '@hooks/useConfirm';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { mobileMediaQuery } from '@styles/globalStyles';
import type { MailThreadDetail } from '@@types/mail';
import { getApiErrorMessage } from '@utils/apiError';

const Content = styled.div`
  width: 100%;
  gap: 20px;
  ${colFlex()}
`;

const DetailCard = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 24px;
  border: 1px solid ${Color.BORDER_GREY};
  border-radius: 10px;
  gap: 20px;
  ${colFlex()}

  ${mobileMediaQuery} {
    padding: 16px;
  }
`;

const HeaderRow = styled.div`
  width: 100%;
  gap: 12px;
  ${rowFlex({ justify: 'space-between', align: 'flex-start' })}
`;

const Title = styled.h2`
  margin: 0;
  color: ${Color.BLACK};
  font-size: 20px;
  overflow-wrap: anywhere;
`;

const InfoList = styled.dl`
  width: 100%;
  margin: 0;
  border-top: 1px solid #f0f0f0;
  ${colFlex()}
`;

const InfoRow = styled.div`
  width: 100%;
  min-width: 0;
  box-sizing: border-box;
  padding: 10px 0;
  border-bottom: 1px solid #f0f0f0;
  gap: 16px;
  ${rowFlex({ justify: 'space-between', align: 'flex-start' })}
`;

const InfoLabel = styled.dt`
  flex-shrink: 0;
  color: ${Color.GREY};
  font-size: 13px;
`;

const InfoValue = styled.dd`
  min-width: 0;
  margin: 0;
  color: ${Color.BLACK};
  font-size: 14px;
  overflow-wrap: anywhere;
  text-align: right;
`;

const WorkspaceLink = styled(Link)`
  color: ${Color.GREY};
  text-decoration: underline;
`;

const Section = styled.section`
  width: 100%;
  gap: 10px;
  ${colFlex()}
`;

const SectionTitle = styled.h3`
  margin: 0;
  color: ${Color.GREY};
  font-size: 13px;
`;

const ActionRow = styled.div`
  width: 100%;
  padding-top: 16px;
  border-top: 1px solid #f0f0f0;
  gap: 10px;
  ${rowFlex({ justify: 'flex-end' })}
`;

const MessageCard = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 40px 20px;
  border: 1px solid ${Color.BORDER_GREY};
  border-radius: 10px;
  color: ${Color.GREY};
  text-align: center;
  gap: 16px;
  ${colFlex({ align: 'center' })}
`;

const ErrorBanner = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 12px 16px;
  border-radius: 8px;
  background: ${Color.LIGHT_RED};
  color: ${Color.RED};
  font-size: 13px;
`;

function SuperAdminMailDetail() {
  const { threadId } = useParams();
  const navigate = useNavigate();
  const { fetchThread, resolveThread, markSpam, unmarkSpam, deleteThread } = useSuperAdminMail();
  const [thread, setThread] = useState<MailThreadDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isChanging, setIsChanging] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { ConfirmModal: SpamConfirmModal, confirm: confirmSpam } = useConfirm({
    title: '스팸으로 표시할까요?',
    description: '메일함 목록에서 빠지고 스팸 필터에서만 보입니다.',
    okText: '스팸 표시',
    cancelText: '취소',
  });
  const { ConfirmModal: DeleteConfirmModal, confirm: confirmDelete } = useConfirm({
    title: '이 대화를 삭제할까요?',
    description: '주고받은 메일을 모두 지우며 되돌릴 수 없습니다.',
    okText: '삭제하기',
    cancelText: '취소',
  });
  const numericThreadId = Number(threadId);

  useEffect(() => {
    if (!Number.isInteger(numericThreadId) || numericThreadId <= 0) {
      setErrorMessage('올바르지 않은 대화 번호입니다.');
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    fetchThread(numericThreadId)
      .then(setThread)
      .catch((error: unknown) => setErrorMessage(getApiErrorMessage(error, '대화를 불러오지 못했습니다.')))
      .finally(() => setIsLoading(false));
  }, [fetchThread, numericThreadId]);

  const reloadAfterStale = useCallback(
    async (message: string) => {
      setErrorMessage(message);

      try {
        setThread(await fetchThread(numericThreadId));
      } catch (error) {
        setErrorMessage(`${message} ${getApiErrorMessage(error, '새로고침 후 다시 확인해 주세요.')}`);
      }
    },
    [fetchThread, numericThreadId],
  );

  const changeThread = async (change: () => Promise<MailThreadDetail>, fallbackMessage: string) => {
    setIsChanging(true);
    setErrorMessage('');

    try {
      setThread(await change());
    } catch (error) {
      setErrorMessage(getApiErrorMessage(error, fallbackMessage));
    } finally {
      setIsChanging(false);
    }
  };

  const handleResolve = () => changeThread(() => resolveThread(numericThreadId), '완료로 표시하지 못했습니다.');

  const handleMarkSpam = async () => {
    if (await confirmSpam()) await changeThread(() => markSpam(numericThreadId), '스팸으로 표시하지 못했습니다.');
  };

  const handleUnmarkSpam = () => changeThread(() => unmarkSpam(numericThreadId), '스팸 표시를 취소하지 못했습니다.');

  const handleDelete = async () => {
    if (!(await confirmDelete())) return;

    setIsChanging(true);
    setErrorMessage('');

    try {
      await deleteThread(numericThreadId);
      navigate(SUPER_ADMIN_ROUTES.MAIL);
    } catch (error) {
      setErrorMessage(getApiErrorMessage(error, '대화를 삭제하지 못했습니다.'));
      setIsChanging(false);
    }
  };

  const handleBackToList = () => {
    navigate(SUPER_ADMIN_ROUTES.MAIL);
  };

  if (isLoading) {
    return (
      <AppContainer useFlex={colFlex({ align: 'center' })} useTitle={false}>
        <SuperAdminPageContainer>
          <MessageCard>대화를 불러오는 중입니다.</MessageCard>
        </SuperAdminPageContainer>
      </AppContainer>
    );
  }

  if (!thread) {
    return (
      <AppContainer useFlex={colFlex({ align: 'center' })} useTitle={false}>
        <SuperAdminPageContainer>
          <MessageCard role="alert">
            {errorMessage || '대화를 찾을 수 없습니다.'}
            <NewCommonButton type="button" size="xs" color="blue_gray" onClick={handleBackToList}>
              목록으로 돌아가기
            </NewCommonButton>
          </MessageCard>
        </SuperAdminPageContainer>
      </AppContainer>
    );
  }

  return (
    <AppContainer useFlex={colFlex({ align: 'center' })} useTitle={false}>
      <SuperAdminPageContainer>
        <SpamConfirmModal />
        <DeleteConfirmModal />
        <PageHeader
          title="대화"
          description="주고받은 메일을 확인하고 답장합니다."
          actions={
            <NewCommonButton type="button" size="xs" color="blue_gray" onClick={handleBackToList}>
              목록으로
            </NewCommonButton>
          }
        />
        <MailEnvironmentBanner />
        <Content>
          {errorMessage && <ErrorBanner role="alert">{errorMessage}</ErrorBanner>}
          <DetailCard>
            <HeaderRow>
              <Title>{thread.subject || MAIL_NO_SUBJECT}</Title>
              <MailStatusBadge status={thread.status} />
            </HeaderRow>
            <InfoList>
              <InfoRow>
                <InfoLabel>주점</InfoLabel>
                <InfoValue>
                  {!thread.workspaceName && MAIL_NO_WORKSPACE}
                  {thread.workspaceName && (
                    <span>
                      {thread.workspaceName}
                      {thread.schoolName && ` · ${thread.schoolName}`} ·{' '}
                      <WorkspaceLink to={getSuperAdminWorkspacePath({ keyword: thread.workspaceName })}>주점 보기</WorkspaceLink>
                    </span>
                  )}
                </InfoValue>
              </InfoRow>
              <InfoRow>
                <InfoLabel>상대방</InfoLabel>
                <InfoValue>
                  {thread.counterpartName && `${thread.counterpartName} · `}
                  {thread.counterpartEmail}
                </InfoValue>
              </InfoRow>
            </InfoList>
            <Section>
              <SectionTitle>주고받은 메일</SectionTitle>
              {thread.messages.map((message) => (
                <MailMessageItem key={message.id} message={message} />
              ))}
            </Section>
            <MailReplyForm thread={thread} onReplied={setThread} onStale={reloadAfterStale} onResolve={handleResolve} isChanging={isChanging} />
            <ActionRow>
              {thread.status === 'SPAM' && (
                <NewCommonButton type="button" size="xs" color="blue_gray" disabled={isChanging} onClick={handleUnmarkSpam}>
                  스팸 표시 취소
                </NewCommonButton>
              )}
              {thread.status !== 'SPAM' && (
                <NewCommonButton type="button" size="xs" color="blue_gray" disabled={isChanging} onClick={handleMarkSpam}>
                  스팸 표시
                </NewCommonButton>
              )}
              <NewCommonButton type="button" size="xs" color="blue_gray" disabled={isChanging} onClick={handleDelete}>
                삭제
              </NewCommonButton>
            </ActionRow>
          </DetailCard>
        </Content>
      </SuperAdminPageContainer>
    </AppContainer>
  );
}

export default SuperAdminMailDetail;
