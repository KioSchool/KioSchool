import { useEffect } from 'react';
import { useAtomValue } from 'jotai';
import { toast } from 'react-toastify';
import { demoStateAtom } from '@jotai/user/demoAtoms';

const NOTICE_AUTO_CLOSE_MS = 2500;

function DemoNoticeToaster() {
  const { notice } = useAtomValue(demoStateAtom);

  useEffect(() => {
    if (!notice) return;
    toast.info(notice.message, { toastId: `demo-notice-${notice.id}`, autoClose: NOTICE_AUTO_CLOSE_MS });
  }, [notice]);

  return null;
}

export default DemoNoticeToaster;
