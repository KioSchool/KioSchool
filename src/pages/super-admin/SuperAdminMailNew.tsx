import { FormEvent, useEffect, useMemo, useState } from 'react';
import styled from '@emotion/styled';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { match } from 'ts-pattern';
import AppContainer from '@components/common/container/AppContainer';
import NewCommonButton from '@components/common/button/NewCommonButton';
import NewAppInput from '@components/common/input/NewAppInput';
import NewAppTextarea from '@components/common/input/NewAppTextarea';
import PageHeader from '@components/common/page/PageHeader';
import MailWorkspacePicker from '@components/super-admin/mail/MailWorkspacePicker';
import SuperAdminPageContainer from '@components/super-admin/SuperAdminPageContainer';
import { MAIL_ADDRESS, MAIL_CONTENT_MAX_LENGTH, MAIL_SUBJECT_MAX_LENGTH, MAIL_TEAM_NAME } from '@constants/data/mailData';
import { SUPER_ADMIN_ROUTES } from '@constants/routes';
import useSuperAdminMail from '@hooks/super-admin/useSuperAdminMail';
import useSuperAdminWorkspace from '@hooks/super-admin/useSuperAdminWorkspace';
import useConfirm from '@hooks/useConfirm';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { mobileMediaQuery } from '@styles/globalStyles';
import type { MailTargetWorkspace } from '@@types/mail';
import { getApiErrorMessage } from '@utils/apiError';
import { createMailPreviewHtml } from '@utils/mailPreview';

const SENT_NOTICE = '보냈어요. 잠시 뒤 목록에 보여요.';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  width: 100%;
  gap: 24px;

  ${mobileMediaQuery} {
    grid-template-columns: minmax(0, 1fr);
  }
`;

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

const CharacterCount = styled.span`
  align-self: flex-end;
  color: ${Color.GREY};
  font-size: 12px;
`;

const Preview = styled.div`
  width: 100%;
  gap: 8px;
  ${colFlex()}
`;

const PreviewInfo = styled.p`
  margin: 0;
  color: ${Color.GREY};
  font-size: 13px;
  line-height: 1.6;
  overflow-wrap: anywhere;
`;

const PreviewSubject = styled.span`
  color: ${Color.BLACK};
  font-size: 14px;
  font-weight: 600;
  overflow-wrap: anywhere;
`;

const PreviewFrame = styled.iframe`
  width: 100%;
  height: 440px;
  box-sizing: border-box;
  border: 1px solid ${Color.BORDER_GREY};
  border-radius: 8px;
  background: #f6f7f9;
`;

const ErrorText = styled.span`
  color: ${Color.RED};
  font-size: 13px;
`;

const ButtonRow = styled.div`
  width: 100%;
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
  const { sendNewMail } = useSuperAdminMail();
  const { fetchWorkspaceDetail } = useSuperAdminWorkspace();
  const [workspace, setWorkspace] = useState<MailTargetWorkspace | null>(null);
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const workspaceIdParam = Number(searchParams.get('workspaceId'));
  const ownerEmail = workspace?.ownerEmail ?? null;
  const previewHtml = useMemo(() => createMailPreviewHtml(content), [content]);
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

    if (!subject.trim() || !content.trim()) {
      setErrorMessage('제목과 내용을 입력해 주세요.');
      return;
    }

    const isConfirmed = await confirm();
    if (!isConfirmed) return;

    setIsSending(true);
    setErrorMessage('');

    try {
      await sendNewMail({ workspaceId: workspace.id, subject: subject.trim(), content: content.trim(), requestId });
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
        <PageHeader
          title="새 메일"
          description={`${MAIL_TEAM_NAME} <${MAIL_ADDRESS}>으로 보내고, 답장은 메일함으로 들어옵니다.`}
          actions={
            <NewCommonButton type="button" size="xs" color="blue_gray" onClick={() => navigate(SUPER_ADMIN_ROUTES.MAIL)}>
              목록으로
            </NewCommonButton>
          }
        />
        <Grid>
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
              <FieldLabel htmlFor="mail-content">내용</FieldLabel>
              <NewAppTextarea
                id="mail-content"
                width="100%"
                height={260}
                value={content}
                maxLength={MAIL_CONTENT_MAX_LENGTH}
                placeholder="전달할 내용을 입력해 주세요"
                onChange={(event) => setContent(event.target.value)}
              />
              <CharacterCount>
                {content.length}/{MAIL_CONTENT_MAX_LENGTH}
              </CharacterCount>
            </Field>
            {errorMessage && <ErrorText role="alert">{errorMessage}</ErrorText>}
            <ButtonRow>
              <NewCommonButton type="submit" size="xs" disabled={isSending || (Boolean(workspace) && !ownerEmail)}>
                {getSendButtonText(isSending)}
              </NewCommonButton>
            </ButtonRow>
          </Form>
          <Preview>
            <FieldLabel as="span">메일 미리보기</FieldLabel>
            <PreviewInfo>
              보낸 사람: {MAIL_TEAM_NAME} &lt;{MAIL_ADDRESS}&gt;
              <br />
              받는 사람: {getRecipientText(workspace, ownerEmail)}
            </PreviewInfo>
            <PreviewSubject>{subject || '메일 제목이 여기에 보여요'}</PreviewSubject>
            <PreviewFrame title="메일 미리보기" sandbox="" srcDoc={previewHtml} />
          </Preview>
        </Grid>
      </SuperAdminPageContainer>
    </AppContainer>
  );
}

export default SuperAdminMailNew;
