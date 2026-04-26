import { useEffect } from 'react';
import { useAtomValue } from 'jotai';
import { useLocation } from 'react-router-dom';
import * as Sentry from '@sentry/react';
import { adminUserAtom, adminWorkspaceAtom } from '@jotai/admin/atoms';
import { userWorkspaceAtom } from '@jotai/user/atoms';

type Role = 'admin' | 'super-admin' | 'guest';

function deriveRole(pathname: string): Role {
  if (pathname.startsWith('/super-admin')) return 'super-admin';
  if (pathname.startsWith('/admin')) return 'admin';
  return 'guest';
}

function useSentryContext() {
  const { pathname } = useLocation();
  const adminUser = useAtomValue(adminUserAtom);
  const adminWorkspace = useAtomValue(adminWorkspaceAtom);
  const userWorkspace = useAtomValue(userWorkspaceAtom);

  useEffect(() => {
    const role = deriveRole(pathname);

    if (role === 'admin' && adminUser.id > 0) {
      Sentry.setUser({ id: String(adminUser.id), email: adminUser.email });
    } else {
      Sentry.setUser(null);
    }

    Sentry.setTag('role', role);

    let workspaceId: number | undefined;
    if (role === 'admin') workspaceId = adminWorkspace.id;
    else if (role === 'guest') workspaceId = userWorkspace.id;

    Sentry.setTag('workspaceId', workspaceId && workspaceId > 0 ? String(workspaceId) : 'none');
  }, [pathname, adminUser.id, adminUser.email, adminWorkspace.id, userWorkspace.id]);
}

export default useSentryContext;
