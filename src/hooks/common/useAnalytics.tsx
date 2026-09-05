import { useEffect, useRef } from 'react';
import { useAtomValue } from 'jotai';
import { useLocation } from 'react-router-dom';
import { adminUserAtom, adminWorkspaceAtom } from '@jotai/admin/atoms';
import { userWorkspaceAtom } from '@jotai/user/atoms';
import { deriveRole } from '@utils/role';
import { normalizePagePath } from '@utils/analyticsPath';
import { setAnalyticsUser, trackPageView } from '@utils/analytics';

function useAnalytics() {
  const { pathname } = useLocation();
  const adminUser = useAtomValue(adminUserAtom);
  const adminWorkspace = useAtomValue(adminWorkspaceAtom);
  const userWorkspace = useAtomValue(userWorkspaceAtom);
  const previousPathnameRef = useRef<string | null>(null);

  useEffect(() => {
    const role = deriveRole(pathname);
    if (role === 'super-admin') return;

    let workspaceId: number | undefined;
    if (role === 'admin') workspaceId = adminWorkspace.id;
    else if (role === 'guest') workspaceId = userWorkspace.id;

    setAnalyticsUser(role === 'admin' && adminUser.id > 0 ? String(adminUser.id) : null, {
      role,
      workspace_id: workspaceId && workspaceId > 0 ? workspaceId : null,
    });
  }, [pathname, adminUser.id, adminWorkspace.id, userWorkspace.id]);

  useEffect(() => {
    if (previousPathnameRef.current === pathname) return;

    previousPathnameRef.current = pathname;

    if (deriveRole(pathname) === 'super-admin') return;

    trackPageView(normalizePagePath(pathname));
  }, [pathname]);
}

export default useAnalytics;
