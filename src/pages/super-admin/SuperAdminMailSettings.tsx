import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { match } from 'ts-pattern';
import AppContainer from '@components/common/container/AppContainer';
import NewCommonButton from '@components/common/button/NewCommonButton';
import PageHeader from '@components/common/page/PageHeader';
import MailPreviewModal from '@components/super-admin/mail/MailPreviewModal';
import MailSignatureForm from '@components/super-admin/mail/settings/MailSignatureForm';
import SuperAdminPageContainer from '@components/super-admin/SuperAdminPageContainer';
import {
  MAIL_SIGNATURE_PREVIEW_DESCRIPTIONS,
  MAIL_SIGNATURE_SCOPE_DESCRIPTIONS,
  MAIL_SIGNATURE_SCOPE_LABELS,
  MAIL_SIGNATURE_SCOPES,
} from '@constants/data/mailData';
import { SUPER_ADMIN_ROUTES } from '@constants/routes';
import useSuperAdminMailSettings from '@hooks/super-admin/useSuperAdminMailSettings';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import type { MailSettings, MailSignatureScope, MailSignatureSetting } from '@@types/mail';
import { getApiErrorMessage } from '@utils/apiError';
import { getMailSignatureForms } from '@utils/mailEditor';

const FORM_WIDTH = 720;
const SAVED_NOTICE = '저장했어요.';
const NO_MINE_NOTICE = '아직 내 인사말·서명이 없어서 팀 공용으로 채워지고 있어요. 저장하면 내 것으로 바뀌어요.';

const Content = styled.div`
  width: 100%;
  max-width: ${FORM_WIDTH}px;
  gap: 14px;
  ${colFlex()}
`;

const TabRow = styled.div`
  gap: 8px;
  ${rowFlex({ align: 'center' })}
`;

const getTabBorderColor = (isActive: boolean) =>
  match(isActive)
    .with(true, () => Color.KIO_ORANGE)
    .otherwise(() => Color.HEAVY_GREY);

const getTabBackground = (isActive: boolean) =>
  match(isActive)
    .with(true, () => Color.KIO_ORANGE_FAINT)
    .otherwise(() => Color.WHITE);

const getTabColor = (isActive: boolean) =>
  match(isActive)
    .with(true, () => Color.KIO_ORANGE_DARK)
    .otherwise(() => Color.GREY);

const TabButton = styled.button<{ isActive: boolean }>`
  min-height: 32px;
  padding: 0 12px;
  border: 1px solid ${({ isActive }) => getTabBorderColor(isActive)};
  border-radius: 16px;
  background: ${({ isActive }) => getTabBackground(isActive)};
  color: ${({ isActive }) => getTabColor(isActive)};
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;
`;

const HelperText = styled.p`
  margin: 0;
  color: ${Color.GREY};
  font-size: 13px;
  line-height: 1.6;
`;

const InfoNotice = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 12px 16px;
  border-radius: 8px;
  background: ${Color.KIO_ORANGE_FAINT};
  color: ${Color.KIO_ORANGE_DARK};
  font-size: 13px;
  font-weight: 600;
  line-height: 1.6;
`;

const SavedNotice = styled(InfoNotice)`
  background: ${Color.GREEN_FAINT};
  color: ${Color.GREEN};
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

const StateText = styled.p`
  margin: 0;
  color: ${Color.GREY};
  font-size: 13px;
`;

function getSaveButtonText(isSaving: boolean): string {
  return match(isSaving)
    .with(true, () => '저장하는 중...')
    .otherwise(() => '저장하기');
}

function SuperAdminMailSettings() {
  const navigate = useNavigate();
  const { fetchMailSettings, saveMailSignature, previewMailSignature } = useSuperAdminMailSettings();
  const [settings, setSettings] = useState<MailSettings | null>(null);
  const [forms, setForms] = useState<Record<MailSignatureScope, MailSignatureSetting> | null>(null);
  const [scope, setScope] = useState<MailSignatureScope>('mine');
  const [previewHtml, setPreviewHtml] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [savedNotice, setSavedNotice] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchMailSettings()
      .then((loaded) => {
        setSettings(loaded);
        setForms(getMailSignatureForms(loaded));
      })
      .catch((error) => setErrorMessage(getApiErrorMessage(error, '인사말·서명을 불러오지 못했습니다.')));
  }, [fetchMailSettings]);

  const handleChangeScope = (next: MailSignatureScope) => {
    setScope(next);
    setSavedNotice('');
    setErrorMessage('');
  };

  const handleChangeForm = (setting: MailSignatureSetting) => {
    setForms((current) => current && { ...current, [scope]: setting });
    setSavedNotice('');
  };

  const handlePreview = async () => {
    if (!forms) return;
    setErrorMessage('');

    try {
      setPreviewHtml(await previewMailSignature(forms[scope]));
    } catch (error) {
      setErrorMessage(getApiErrorMessage(error, '미리보기를 만들지 못했습니다.'));
    }
  };

  const handleSave = async () => {
    if (!forms || isSaving) return;
    setIsSaving(true);
    setErrorMessage('');

    try {
      const saved = await saveMailSignature(scope, forms[scope]);
      setSettings(saved);
      setForms({ ...forms, [scope]: getMailSignatureForms(saved)[scope] });
      setSavedNotice(SAVED_NOTICE);
    } catch (error) {
      setErrorMessage(getApiErrorMessage(error, '저장하지 못했습니다.'));
    } finally {
      setIsSaving(false);
    }
  };

  const isMineMissing = scope === 'mine' && settings !== null && settings.mine === null;

  return (
    <AppContainer useFlex={colFlex({ align: 'center' })} useTitle={false}>
      <SuperAdminPageContainer>
        {previewHtml !== null && (
          <MailPreviewModal title="미리보기" description={MAIL_SIGNATURE_PREVIEW_DESCRIPTIONS[scope]} html={previewHtml} onClose={() => setPreviewHtml(null)} />
        )}
        <PageHeader
          title="인사말·서명"
          description="메일을 쓸 때 편집기에 미리 채워 둘 인사말과 서명을 정해요."
          actions={
            <NewCommonButton type="button" size="xs" color="blue_gray" onClick={() => navigate(SUPER_ADMIN_ROUTES.MAIL)}>
              메일함으로
            </NewCommonButton>
          }
        />
        <Content>
          <TabRow role="tablist">
            {MAIL_SIGNATURE_SCOPES.map((item) => (
              <TabButton key={item} type="button" role="tab" aria-selected={scope === item} isActive={scope === item} onClick={() => handleChangeScope(item)}>
                {MAIL_SIGNATURE_SCOPE_LABELS[item]}
              </TabButton>
            ))}
          </TabRow>
          <HelperText>{MAIL_SIGNATURE_SCOPE_DESCRIPTIONS[scope]}</HelperText>
          {isMineMissing && <InfoNotice>{NO_MINE_NOTICE}</InfoNotice>}
          {savedNotice && <SavedNotice role="status">{savedNotice}</SavedNotice>}
          {forms && <MailSignatureForm scope={scope} setting={forms[scope]} onChange={handleChangeForm} />}
          {!forms && <StateText>불러오는 중...</StateText>}
          {errorMessage && <ErrorText role="alert">{errorMessage}</ErrorText>}
          <ButtonRow>
            <NewCommonButton type="button" size="xs" color="blue_gray" disabled={!forms || isSaving} onClick={handlePreview}>
              미리보기
            </NewCommonButton>
            <NewCommonButton type="button" size="xs" disabled={!forms || isSaving} onClick={handleSave}>
              {getSaveButtonText(isSaving)}
            </NewCommonButton>
          </ButtonRow>
        </Content>
      </SuperAdminPageContainer>
    </AppContainer>
  );
}

export default SuperAdminMailSettings;
