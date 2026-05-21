import { SUPER_ADMIN_ROUTES } from '@constants/routes';
import { SideNavCategory } from '@@types/sideNav';

const stripPrefix = (route: string) => route.replace('/super-admin', '');

export const superAdminNavData: SideNavCategory[] = [
  {
    category: '운영',
    items: [
      { name: '전체 주문 모니터링', path: stripPrefix(SUPER_ADMIN_ROUTES.ORDERS) },
      { name: '워크스페이스 관리', path: stripPrefix(SUPER_ADMIN_ROUTES.WORKSPACE) },
      { name: '서비스 현황 대시보드', path: stripPrefix(SUPER_ADMIN_ROUTES.DASHBOARD) },
      { name: '계좌 연동 현황', path: stripPrefix(SUPER_ADMIN_ROUTES.ACCOUNT_STATUS) },
      { name: '축제 달력', path: stripPrefix(SUPER_ADMIN_ROUTES.FESTIVAL_CALENDAR) },
    ],
  },
  {
    category: '관리',
    items: [
      { name: '사용자 관리', path: stripPrefix(SUPER_ADMIN_ROUTES.USER) },
      { name: '은행 정보 관리', path: stripPrefix(SUPER_ADMIN_ROUTES.BANK) },
      { name: '이메일 도메인 관리', path: stripPrefix(SUPER_ADMIN_ROUTES.EMAIL) },
      { name: 'Redis 캐시 관리', path: stripPrefix(SUPER_ADMIN_ROUTES.CACHE) },
    ],
  },
];
