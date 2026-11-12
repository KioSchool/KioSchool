import { useEffect, useMemo, useState } from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import AppContainer from '@components/common/container/AppContainer';
import NewCommonButton from '@components/common/button/NewCommonButton';
import PageHeader from '@components/common/page/PageHeader';
import MailProdWarningBand from '@components/super-admin/mail/MailProdWarningBand';
import MailAudiencePicker from '@components/super-admin/mail/MailAudiencePicker';
import MailCampaignForm, { MailCampaignFormValues } from '@components/super-admin/mail/MailCampaignForm';
import MailCampaignHistory from '@components/super-admin/mail/MailCampaignHistory';
import MailPreviewModal from '@components/super-admin/mail/MailPreviewModal';
import SuperAdminPageContainer from '@components/super-admin/SuperAdminPageContainer';
import { API_ERROR_CODES } from '@constants/errorCodes';
import { getSuperAdminMailCampaignPath, SUPER_ADMIN_ROUTES } from '@constants/routes';
import useSuperAdminMail from '@hooks/super-admin/useSuperAdminMail';
import useConfirm from '@hooks/useConfirm';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import type { MailAudience, MailAudienceFilter, MailCampaignPreview as MailCampaignPreviewResult, MailCampaignRequest } from '@@types/mail';
import { getApiErrorMessage, isApiErrorCode } from '@utils/apiError';
import { getCampaignConfirmDescription, getCampaignRecipientSummary, getDefaultMailAudiencePeriod, getMailAudiencePeriods } from '@utils/mailCampaign';
import { isMailHtmlEmpty } from '@utils/mailEditor';

const PERIOD_DEBOUNCE_MS = 300;
const EMPTY_FORM: MailCampaignFormValues = { subject: '', content: '' };

const Content = styled.div`
  width: 100%;
  gap: 24px;
  ${colFlex()}
`;

const SectionTitle = styled.h2`
  margin: 0;
  color: ${Color.BLACK};
  font-size: 15px;
  font-weight: 700;
`;

const Section = styled.section`
  width: 100%;
  gap: 12px;
  ${colFlex()}
`;

const Warning = styled.p`
  width: 100%;
  box-sizing: border-box;
  margin: 0;
  padding: 12px 16px;
  border-radius: 8px;
  background: ${Color.KIO_ORANGE_FAINT};
  color: ${Color.KIO_ORANGE_DARK};
  font-size: 13px;
`;

const Notice = styled.span`
  color: ${Color.GREEN};
  font-size: 13px;
`;

const ErrorText = styled.span`
  color: ${Color.RED};
  font-size: 13px;
`;

const ButtonRow = styled.div`
  width: 100%;
  gap: 10px;
  ${rowFlex({ justify: 'flex-end', align: 'center' })}
`;

function SuperAdminMailCampaignNew() {
  const navigate = useNavigate();
  const { fetchAudience, previewCampaign, sendCampaignTest, startCampaign } = useSuperAdminMail();
  const periods = useMemo(() => getMailAudiencePeriods(), []);
  const defaultPeriod = getDefaultMailAudiencePeriod(periods);
  const [from, setFrom] = useState(defaultPeriod.from);
  const [to, setTo] = useState(defaultPeriod.to);
  const [audience, setAudience] = useState<MailAudience | null>(null);
  const [isAudienceLoading, setIsAudienceLoading] = useState(true);
  const [audienceVersion, setAudienceVersion] = useState(0);
  const [pickedIds, setPickedIds] = useState<Set<number>>(new Set());
  const [form, setForm] = useState<MailCampaignFormValues>(EMPTY_FORM);
  const [mailPreview, setMailPreview] = useState<MailCampaignPreviewResult | null>(null);
  const [isWorking, setIsWorking] = useState(false);
  const [notice, setNotice] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const targetRows = useMemo(() => (audience?.rows ?? []).filter((row) => pickedIds.has(row.workspaceId)), [audience, pickedIds]);
  const targetCount = targetRows.length;
  const dailyLimit = audience?.dailyLimit ?? 0;

  // 새 목록을 받기 전까지 이전 표를 두어 기간을 바꿔도 깜빡이지 않는다. 담은 주점은 기간과 상관없이 그대로 둔다.
  useEffect(() => {
    if (!from || !to) return undefined;

    let cancelled = false;
    setIsAudienceLoading(true);
    const timer = setTimeout(() => {
      fetchAudience(from, to)
        .then((response) => {
          if (cancelled) return;
          const reachableIds = new Set(response.rows.map((row) => row.workspaceId));
          setAudience(response);
          setPickedIds((ids) => new Set([...ids].filter((id) => reachableIds.has(id))));
          setErrorMessage('');
        })
        .catch((error: unknown) => {
          if (!cancelled) setErrorMessage(getApiErrorMessage(error, '받을 주점을 불러오지 못했습니다.'));
        })
        .finally(() => {
          if (!cancelled) setIsAudienceLoading(false);
        });
    }, PERIOD_DEBOUNCE_MS);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [audienceVersion, fetchAudience, from, to]);

  const filter = useMemo<MailAudienceFilter>(() => ({ from, to, workspaceIds: [...pickedIds] }), [from, pickedIds, to]);

  const { ConfirmModal, confirm } = useConfirm({
    title: `${targetCount}곳에 메일을 보낼까요?`,
    description: `${getCampaignRecipientSummary(targetRows)}. ${getCampaignConfirmDescription(targetCount, dailyLimit)}`,
    okText: '보내기',
    cancelText: '취소',
  });

  const handleChangePeriod = (nextFrom: string, nextTo: string) => {
    setFrom(nextFrom);
    setTo(nextTo);
  };

  // 응답을 못 받아 다시 눌러도 발송을 또 만들지 않게 한다. 대상이나 내용을 고치면 새 발송이다.
  const requestId = useMemo(() => crypto.randomUUID(), [audienceVersion, filter, form]);

  const buildRequest = (): MailCampaignRequest => ({
    filter,
    subject: form.subject.trim(),
    content: form.content,
    expectedCount: targetCount,
    requestId,
  });

  const validate = (): boolean => {
    if (targetCount === 0) {
      setErrorMessage('받을 주점을 담아 주세요.');
      return false;
    }
    if (!form.subject.trim() || isMailHtmlEmpty(form.content)) {
      setErrorMessage('제목과 내용을 입력해 주세요.');
      return false;
    }
    return true;
  };

  // 값은 주점 자료로 채워지므로 서버가 실제로 보낼 메일을 받아 보여 준다
  const handlePreview = async () => {
    if (targetCount === 0) {
      setErrorMessage('받을 주점을 담아 주세요.');
      return;
    }
    if (isMailHtmlEmpty(form.content)) {
      setErrorMessage('내용을 입력해 주세요.');
      return;
    }

    setIsWorking(true);
    setErrorMessage('');
    setNotice('');

    try {
      setMailPreview(await previewCampaign({ filter, subject: form.subject, content: form.content }));
    } catch (error) {
      setErrorMessage(getApiErrorMessage(error, '미리보기를 만들지 못했습니다.'));
    } finally {
      setIsWorking(false);
    }
  };

  const handleTest = async () => {
    if (!validate()) return;

    setIsWorking(true);
    setErrorMessage('');
    setNotice('');

    try {
      await sendCampaignTest(buildRequest());
      setNotice('내 이메일로 보냈어요.');
    } catch (error) {
      setErrorMessage(getApiErrorMessage(error, '테스트 메일을 보내지 못했습니다.'));
    } finally {
      setIsWorking(false);
    }
  };

  const handleStart = async () => {
    if (!validate()) return;
    if (!(await confirm())) return;

    setIsWorking(true);
    setErrorMessage('');
    setNotice('');

    try {
      const campaign = await startCampaign(buildRequest());
      navigate(getSuperAdminMailCampaignPath(campaign.id));
    } catch (error) {
      const message = getApiErrorMessage(error, '발송을 시작하지 못했습니다.');
      if (isApiErrorCode(error, API_ERROR_CODES.MAIL_AUDIENCE_CHANGED)) {
        // 다시 불러오면 오류 문구가 지워지므로 안내로 남긴다
        setNotice(message);
        setAudienceVersion((version) => version + 1);
      } else {
        setErrorMessage(message);
      }
      setIsWorking(false);
    }
  };

  return (
    <AppContainer useFlex={colFlex({ align: 'center' })} useTitle={false}>
      <SuperAdminPageContainer>
        <MailProdWarningBand />
        <ConfirmModal />
        {mailPreview && (
          <MailPreviewModal
            title={`미리보기: ${mailPreview.workspaceName ?? ''}`}
            recipient={mailPreview.ownerEmail ?? ''}
            subject={mailPreview.subject}
            html={mailPreview.html}
            onClose={() => setMailPreview(null)}
          />
        )}
        <PageHeader
          title="여러 곳에 보내기"
          description="주점마다 한 통씩 보내고, 답장은 메일함에서 주점별 대화로 이어집니다."
          actions={
            <NewCommonButton type="button" size="xs" color="blue_gray" onClick={() => navigate(SUPER_ADMIN_ROUTES.MAIL)}>
              목록으로
            </NewCommonButton>
          }
        />
        <Content>
          <Section>
            <SectionTitle>받을 주점</SectionTitle>
            <MailAudiencePicker
              audience={audience}
              isLoading={isAudienceLoading}
              periods={periods}
              from={from}
              to={to}
              pickedIds={pickedIds}
              onChangePeriod={handleChangePeriod}
              onChangePicked={setPickedIds}
            />
          </Section>
          <Section>
            <SectionTitle>내용</SectionTitle>
            <MailCampaignForm values={form} onChange={setForm} />
          </Section>
          <Warning>홍보 내용은 수신 동의를 받은 사람에게만 보낼 수 있어서 이 화면으로 보내면 안 돼요.</Warning>
          {notice && <Notice role="status">{notice}</Notice>}
          {errorMessage && <ErrorText role="alert">{errorMessage}</ErrorText>}
          <ButtonRow>
            <NewCommonButton type="button" size="xs" color="blue_gray" disabled={isWorking} onClick={handlePreview}>
              미리보기
            </NewCommonButton>
            <NewCommonButton type="button" size="xs" color="blue_gray" disabled={isWorking} onClick={handleTest}>
              나에게 테스트
            </NewCommonButton>
            <NewCommonButton type="button" size="xs" disabled={isWorking || targetCount === 0} onClick={handleStart}>
              {targetCount}곳에 보내기
            </NewCommonButton>
          </ButtonRow>
          <MailCampaignHistory />
        </Content>
      </SuperAdminPageContainer>
    </AppContainer>
  );
}

export default SuperAdminMailCampaignNew;
