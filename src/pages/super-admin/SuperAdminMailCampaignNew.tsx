import { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import AppContainer from '@components/common/container/AppContainer';
import NewCommonButton from '@components/common/button/NewCommonButton';
import NewAppInput from '@components/common/input/NewAppInput';
import PageHeader from '@components/common/page/PageHeader';
import MailAudienceList from '@components/super-admin/mail/MailAudienceList';
import MailCampaignForm, { MailCampaignFormValues } from '@components/super-admin/mail/MailCampaignForm';
import MailCampaignHistory from '@components/super-admin/mail/MailCampaignHistory';
import MailCampaignPreview from '@components/super-admin/mail/MailCampaignPreview';
import SuperAdminPageContainer from '@components/super-admin/SuperAdminPageContainer';
import { getSuperAdminMailCampaignPath, SUPER_ADMIN_ROUTES } from '@constants/routes';
import useSuperAdminMail from '@hooks/super-admin/useSuperAdminMail';
import useConfirm from '@hooks/useConfirm';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { mobileMediaQuery } from '@styles/globalStyles';
import type { MailAudiencePreview, MailCampaignRequest } from '@@types/mail';
import { getApiErrorMessage } from '@utils/apiError';
import { getCampaignConfirmDescription } from '@utils/mailCampaign';

const AUDIENCE_PAGE_SIZE = 500;
const SEARCH_DEBOUNCE_MS = 300;
const EMPTY_FORM: MailCampaignFormValues = { subject: '', content: '', buttonLabel: '', buttonUrl: '' };

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

const FilterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  width: 100%;
  gap: 12px;

  ${mobileMediaQuery} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const Field = styled.div`
  min-width: 0;
  gap: 6px;
  ${colFlex()}
`;

const Label = styled.label`
  color: ${Color.GREY};
  font-size: 13px;
  font-weight: 600;
`;

const CountRow = styled.div`
  width: 100%;
  gap: 12px;
  flex-wrap: wrap;
  color: ${Color.GREY};
  font-size: 13px;
  ${rowFlex({ justify: 'space-between', align: 'center' })}
`;

const TargetCount = styled.b`
  color: ${Color.KIO_ORANGE_DARK};
  font-size: 15px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  width: 100%;
  gap: 24px;

  ${mobileMediaQuery} {
    grid-template-columns: minmax(0, 1fr);
  }
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
  const { previewAudience, sendCampaignTest, startCampaign } = useSuperAdminMail();
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [minOrders, setMinOrders] = useState('15');
  const [schoolName, setSchoolName] = useState('');
  const [excludedIds, setExcludedIds] = useState<number[]>([]);
  const [preview, setPreview] = useState<MailAudiencePreview | null>(null);
  const [form, setForm] = useState<MailCampaignFormValues>(EMPTY_FORM);
  const [isWorking, setIsWorking] = useState(false);
  const [notice, setNotice] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const minOrdersNumber = Number(minOrders);
  const hasFilter = Boolean(from && to) && Number.isInteger(minOrdersNumber) && minOrdersNumber >= 1;

  // 체크를 푼 주점은 목록에서 계속 보여 다시 넣을 수 있도록 조회에는 빼지 않고 수만 뺀다
  const rows = preview?.content.content ?? [];
  const targetCount = (preview?.targetCount ?? 0) - excludedIds.length;
  const firstRow = rows.find((row) => !excludedIds.includes(row.workspaceId));
  const dailyLimit = preview?.dailyLimit ?? 0;
  const excludedByReason = preview ? preview.noEmailCount + preview.unsubscribedCount + preview.withdrawnCount : 0;

  useEffect(() => {
    if (!hasFilter) {
      setPreview(null);
      return undefined;
    }

    const timer = setTimeout(() => {
      previewAudience({ from, to, minOrders: minOrdersNumber, schoolName: schoolName.trim() || undefined, excludedWorkspaceIds: [] }, 0, AUDIENCE_PAGE_SIZE)
        .then((response) => {
          setPreview(response);
          setExcludedIds([]);
          setErrorMessage('');
        })
        .catch((error: unknown) => setErrorMessage(getApiErrorMessage(error, '받을 주점을 불러오지 못했습니다.')));
    }, SEARCH_DEBOUNCE_MS);

    return () => clearTimeout(timer);
  }, [from, hasFilter, minOrdersNumber, previewAudience, schoolName, to]);

  const { ConfirmModal, confirm } = useConfirm({
    title: `${targetCount}곳에 메일을 보낼까요?`,
    description: getCampaignConfirmDescription(targetCount, dailyLimit),
    okText: '보내기',
    cancelText: '취소',
  });

  const handleToggle = (workspaceId: number) => {
    setExcludedIds((ids) => (ids.includes(workspaceId) ? ids.filter((id) => id !== workspaceId) : [...ids, workspaceId]));
  };

  const buildRequest = (): MailCampaignRequest => ({
    filter: { from, to, minOrders: minOrdersNumber, schoolName: schoolName.trim() || undefined, excludedWorkspaceIds: excludedIds },
    subject: form.subject.trim(),
    content: form.content.trim(),
    buttonLabel: form.buttonLabel.trim() || undefined,
    buttonUrl: form.buttonUrl.trim() || undefined,
  });

  const validate = (): boolean => {
    if (targetCount === 0) {
      setErrorMessage('받을 주점이 없어요.');
      return false;
    }
    if (!form.subject.trim() || !form.content.trim()) {
      setErrorMessage('제목과 내용을 입력해 주세요.');
      return false;
    }
    return true;
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
      setErrorMessage(getApiErrorMessage(error, '발송을 시작하지 못했습니다.'));
      setIsWorking(false);
    }
  };

  return (
    <AppContainer useFlex={colFlex({ align: 'center' })} useTitle={false}>
      <SuperAdminPageContainer>
        <ConfirmModal />
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
            <FilterGrid>
              <Field>
                <Label htmlFor="campaign-from">운영 기간 시작</Label>
                <NewAppInput id="campaign-from" width="100%" type="date" value={from} onChange={(event) => setFrom(event.target.value)} />
              </Field>
              <Field>
                <Label htmlFor="campaign-to">운영 기간 끝</Label>
                <NewAppInput id="campaign-to" width="100%" type="date" value={to} onChange={(event) => setTo(event.target.value)} />
              </Field>
              <Field>
                <Label htmlFor="campaign-min-orders">주문 수 (이상)</Label>
                <NewAppInput
                  id="campaign-min-orders"
                  width="100%"
                  type="number"
                  min={1}
                  value={minOrders}
                  onChange={(event) => setMinOrders(event.target.value)}
                />
              </Field>
              <Field>
                <Label htmlFor="campaign-school">학교 (선택)</Label>
                <NewAppInput id="campaign-school" width="100%" value={schoolName} placeholder="전체" onChange={(event) => setSchoolName(event.target.value)} />
              </Field>
            </FilterGrid>
            {preview && (
              <CountRow>
                <span>
                  <TargetCount>{targetCount}곳</TargetCount>에 보냅니다
                </span>
                <span>
                  제외 {excludedByReason}곳: 이메일 없음 {preview.noEmailCount}곳, 수신 거부 {preview.unsubscribedCount}곳, 탈퇴 {preview.withdrawnCount}곳
                </span>
              </CountRow>
            )}
            {rows.length > 0 && <MailAudienceList rows={rows} excludedIds={excludedIds} onToggle={handleToggle} />}
          </Section>
          <Section>
            <SectionTitle>내용</SectionTitle>
            <Grid>
              <MailCampaignForm values={form} contentRef={contentRef} onChange={setForm} />
              <MailCampaignPreview values={form} row={firstRow} />
            </Grid>
          </Section>
          <Warning>홍보 내용은 수신 동의를 받은 사람에게만 보낼 수 있어서 이 화면으로 보내면 안 돼요.</Warning>
          {notice && <Notice role="status">{notice}</Notice>}
          {errorMessage && <ErrorText role="alert">{errorMessage}</ErrorText>}
          <ButtonRow>
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
