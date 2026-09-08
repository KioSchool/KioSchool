import { useEffect, useRef } from 'react';
import { useAtomValue } from 'jotai';
import { useLocation } from 'react-router-dom';
import { adminUserAtom } from '@jotai/admin/atoms';
import { deriveRole } from '@utils/role';
import { extractAdminWorkspaceId, extractGuestWorkspaceId, normalizePagePath } from '@utils/analyticsPath';
import { setAnalyticsUser, trackPageView } from '@utils/analytics';

function useAnalytics() {
  const { pathname, search } = useLocation();
  const adminUser = useAtomValue(adminUserAtom);
  const previousPathnameRef = useRef<string | null>(null);

  useEffect(() => {
    const role = deriveRole(pathname);
    if (role === 'super-admin') return;

    let workspaceId: number | undefined;
    if (role === 'admin') workspaceId = extractAdminWorkspaceId(pathname);
    else if (role === 'guest') workspaceId = extractGuestWorkspaceId(search);

    setAnalyticsUser(role === 'admin' && adminUser.id > 0 ? String(adminUser.id) : null, {
      role,
      workspace_id: workspaceId ?? null,
    });
  }, [pathname, search, adminUser.id]);

  useEffect(() => {
    if (previousPathnameRef.current === pathname) return;

    previousPathnameRef.current = pathname;

    if (deriveRole(pathname) === 'super-admin') return;

    trackPageView(normalizePagePath(pathname));
  }, [pathname]);
}

export default useAnalytics;
