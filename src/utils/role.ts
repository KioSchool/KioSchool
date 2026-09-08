export type Role = 'admin' | 'super-admin' | 'guest';

export function deriveRole(pathname: string): Role {
  if (pathname.startsWith('/super-admin')) return 'super-admin';
  if (pathname.startsWith('/admin')) return 'admin';
  return 'guest';
}
