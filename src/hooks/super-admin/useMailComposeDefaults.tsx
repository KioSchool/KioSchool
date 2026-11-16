import { useEffect, useState } from 'react';
import type { MailSignatureScope } from '@@types/mail';
import { EMPTY_MAIL_COMPOSE_DEFAULTS, getMailComposeDefaults, MailComposeDefaults } from '@utils/mailEditor';
import useSuperAdminMailSettings from './useSuperAdminMailSettings';

function useMailComposeDefaults(scope: MailSignatureScope): MailComposeDefaults | null {
  const { fetchMailSettings } = useSuperAdminMailSettings();
  const [defaults, setDefaults] = useState<MailComposeDefaults | null>(null);

  useEffect(() => {
    let isCancelled = false;

    fetchMailSettings()
      .then((settings) => {
        if (!isCancelled) setDefaults(getMailComposeDefaults(settings, scope));
      })
      .catch(() => {
        if (!isCancelled) setDefaults(EMPTY_MAIL_COMPOSE_DEFAULTS);
      });

    return () => {
      isCancelled = true;
    };
  }, [fetchMailSettings, scope]);

  return defaults;
}

export default useMailComposeDefaults;
