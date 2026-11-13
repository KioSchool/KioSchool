import { useCallback } from 'react';
import type { MailSettings, MailSignatureScope, MailSignatureSetting } from '@@types/mail';
import useApi from '@hooks/useApi';

const SCOPE_PATHS: Record<MailSignatureScope, string> = {
  mine: '/mail/settings/me',
  team: '/mail/settings/team',
};

function useSuperAdminMailSettings() {
  const { superAdminApi } = useApi();

  const fetchMailSettings = useCallback(async (): Promise<MailSettings> => {
    const response = await superAdminApi.get<MailSettings>('/mail/settings');
    return response.data;
  }, [superAdminApi]);

  const saveMailSignature = useCallback(
    async (scope: MailSignatureScope, setting: MailSignatureSetting): Promise<MailSettings> => {
      const response = await superAdminApi.put<MailSettings>(SCOPE_PATHS[scope], setting);
      return response.data;
    },
    [superAdminApi],
  );

  const previewMailSignature = useCallback(
    async (setting: MailSignatureSetting): Promise<string> => {
      const response = await superAdminApi.post<{ html: string }>('/mail/settings/preview', setting);
      return response.data.html;
    },
    [superAdminApi],
  );

  return { fetchMailSettings, saveMailSignature, previewMailSignature };
}

export default useSuperAdminMailSettings;
