import { FormEvent, useEffect, useMemo, useState } from 'react';
import styled from '@emotion/styled';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { match } from 'ts-pattern';
import AppContainer from '@components/common/container/AppContainer';
import NewCommonButton from '@components/common/button/NewCommonButton';
import NewAppInput from '@components/common/input/NewAppInput';
import PageHeader from '@components/common/page/PageHeader';
import LazyMailEditor from '@components/super-admin/mail/editor/LazyMailEditor';
import MailPreviewModal from '@components/super-admin/mail/MailPreviewModal';
import MailWorkspacePicker from '@components/super-admin/mail/MailWorkspacePicker';
import SuperAdminPageContainer from '@components/super-admin/SuperAdminPageContainer';
import { MAIL_ADDRESS, MAIL_SUBJECT_MAX_LENGTH, MAIL_TEAM_NAME } from '@constants/data/mailData';
import { SUPER_ADMIN_ROUTES } from '@constants/routes';
import useSuperAdminMail from '@hooks/super-admin/useSuperAdminMail';
import useSuperAdminWorkspace from '@hooks/super-admin/useSuperAdminWorkspace';
import useConfirm from '@hooks/useConfirm';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import type { MailTargetWorkspace } from '@@types/mail';
import { getApiErrorMessage } from '@utils/apiError';
import { isMailHtmlEmpty } from '@utils/mailEditor';

const SENT_NOTICE = '보냈어요. 잠시 뒤 목록에 보여요.';

const Form = styled.form`
  width: 100%;
  gap: 14px;
  ${colFlex()}
`;

const Field = styled.div`
  width: 100%;
  gap: 6px;
  ${colFlex()}
`;

const FieldLabel = styled.label`
  color: ${Color.GREY};
  font-size: 13px;
  font-weight: 600;
`;

const ErrorText = styled.span`
  color: ${Color.RED};
  font-size: 13px;
`;

const ButtonRow = styled.div`
  width: 100%;
  gap: 10px;
  ${rowFlex({ justify: 'flex-end' })}
`;

function getSendButtonText(isSending: boolean): string {
  return match(isSending)
    .with(true, () => '보내는 중...')
    .otherwise(() => '보내기');
}

function getRecipientText(workspace: MailTargetWorkspace | null, ownerEmail: string | null): string {
  if (!workspace) return '주점을 골라 주세요';
  return ownerEmail ?? '이메일 없음';
}

function SuperAdminMailNew() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { previewMail, sendNewMail } = useSuperAdminMail();
  const { fetchWorkspaceDetail } = useSuperAdminWorkspace();
  const [workspace, setWorkspace] = useState<MailTargetWorkspace | null>(null);
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [previewHtml, setPreviewHtml] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const workspaceIdParam = Number(searchParams.get('workspaceId'));
  const ownerEmail = workspace?.ownerEmail ?? null;
  // 응답을 못 받아 다시 눌러도 같은 메일이 두 번 나가지 않게 한다. 내용을 고치면 새 메일이다.
  const requestId = useMemo(() => crypto.randomUUID(), [workspace?.id, subject, content]);
  const { ConfirmModal, confirm } = useConfirm({
    title: '메일을 보낼까요?',
    description: `${workspace?.name ?? ''} 사장(${ownerEmail ?? ''})에게 메일을 보냅니다.`,
    okText: '보내기',
    cancelText: '취소',
  });

  useEffect(() => {
    if (!Number.isInteger(workspaceIdParam) || workspaceIdParam <= 0) return;

    fetchWorkspaceDetail(workspaceIdParam).then((detail) => {
      if (!detail) return;
      setWorkspace({ id: detail.id, name: detail.name, ownerName: detail.owner.name, ownerEmail: detail.owner.email ?? null });
    });
  }, [fetchWorkspaceDetail, workspaceIdParam]);

  const handlePreview = async () => {
    if (isMailHtmlEmpty(content)) {
      setErrorMessage('내용을 입력해 주세요.');
      return;
    }

    setErrorMessage('');

    try {
      setPreviewHtml(await previewMail(content));
    } catch (error) {
      setErrorMessage(getApiErrorMessage(error, '미리보기를 만들지 못했습니다.'));
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSending) return;

    if (!workspace) {
      setErrorMessage('받는 주점을 골라 주세요.');
      return;
    }

    if (!ownerEmail) {
      setErrorMessage('이메일이 없어 보낼 수 없어요.');
      return;
    }

    if (!subject.trim() || isMailHtmlEmpty(content)) {
      setErrorMessage('제목과 내용을 입력해 주세요.');
      return;
    }

    const isConfirmed = await confirm();
    if (!isConfirmed) return;

    setIsSending(true);
    setErrorMessage('');

    try {
      await sendNewMail({ workspaceId: workspace.id, subject: subject.trim(), content, requestId });
      navigate(SUPER_ADMIN_ROUTES.MAIL, { state: { sentNotice: SENT_NOTICE } });
    } catch (error) {
      setErrorMessage(getApiErrorMessage(error, '메일을 보내지 못했습니다.'));
    } finally {
      setIsSending(false);
    }
  };

  return (
    <AppContainer useFlex={colFlex({ align: 'center' })} useTitle={false}>
      <SuperAdminPageContainer>
        <ConfirmModal />
        {previewHtml !== null && (
          <MailPreviewModal
            title="미리보기"
            recipient={getRecipientText(workspace, ownerEmail)}
            subject={subject}
            html={previewHtml}
            onClose={() => setPreviewHtml(null)}
          />
        )}
        <PageHeader
          title="새 메일"
          description={`${MAIL_TEAM_NAME} <${MAIL_ADDRESS}>으로 보내고, 답장은 메일함으로 들어옵니다.`}
          actions={
            <NewCommonButton type="button" size="xs" color="blue_gray" onClick={() => navigate(SUPER_ADMIN_ROUTES.MAIL)}>
              목록으로
            </NewCommonButton>
          }
        />
        <Form onSubmit={handleSubmit} noValidate>
          <Field>
            <FieldLabel htmlFor="mail-workspace">받는 주점</FieldLabel>
            <MailWorkspacePicker selected={workspace} onSelect={setWorkspace} />
            {workspace && !ownerEmail && <ErrorText role="alert">이메일이 없어 보낼 수 없어요.</ErrorText>}
          </Field>
          <Field>
            <FieldLabel htmlFor="mail-subject">제목</FieldLabel>
            <NewAppInput
              id="mail-subject"
              width="100%"
              value={subject}
              maxLength={MAIL_SUBJECT_MAX_LENGTH}
              placeholder="메일 제목을 입력해 주세요"
              onChange={(event) => setSubject(event.target.value)}
            />
          </Field>
          <Field>
            <FieldLabel as="span">내용</FieldLabel>
            <LazyMailEditor height={260} placeholder="전달할 내용을 입력해 주세요" onChange={setContent} />
          </Field>
          {errorMessage && <ErrorText role="alert">{errorMessage}</ErrorText>}
          <ButtonRow>
            <NewCommonButton type="button" size="xs" color="blue_gray" disabled={isSending} onClick={handlePreview}>
              미리보기
            </NewCommonButton>
            <NewCommonButton type="submit" size="xs" disabled={isSending || (Boolean(workspace) && !ownerEmail)}>
              {getSendButtonText(isSending)}
            </NewCommonButton>
          </ButtonRow>
        </Form>
      </SuperAdminPageContainer>
    </AppContainer>
  );
}

export default SuperAdminMailNew;
