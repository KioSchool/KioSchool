import { ReactNode } from 'react';
import { RiBankCardLine, RiDashboard3Line, RiFileListLine, RiLinkM, RiMailSendLine, RiStore3Line, RiUser3Line } from '@remixicon/react';
import { SUPER_ADMIN_ROUTES } from '@constants/routes';

export interface ManageMenuItem {
  title: string;
  description: string;
  icon: ReactNode;
  route: string;
}

export interface ManageMenuGroup {
  title: string;
  items: ManageMenuItem[];
}

const ICON_SIZE = 18;

export const MANAGE_MENU_GROUPS: ManageMenuGroup[] = [
  {
    title: '운영 통계',
    items: [
      {
        title: '서비스 현황 대시보드',
        description: '유저·워크스페이스·매출 통계를 한눈에 보기',
        icon: <RiDashboard3Line size={ICON_SIZE} />,
        route: SUPER_ADMIN_ROUTES.DASHBOARD,
      },
      {
        title: '계정 연동 현황',
        description: '계좌 연동률과 미연동 유저 규모',
        icon: <RiLinkM size={ICON_SIZE} />,
        route: SUPER_ADMIN_ROUTES.ACCOUNT_STATUS,
      },
    ],
  },
  {
    title: '운영 데이터',
    items: [
      {
        title: '워크스페이스 관리',
        description: '주점(워크스페이스) 목록 조회 및 상태 관리',
        icon: <RiStore3Line size={ICON_SIZE} />,
        route: SUPER_ADMIN_ROUTES.WORKSPACE,
      },
      {
        title: '사용자 관리',
        description: '서비스 가입 사용자 목록 조회 및 권한 관리',
        icon: <RiUser3Line size={ICON_SIZE} />,
        route: SUPER_ADMIN_ROUTES.USER,
      },
      {
        title: '전체 주문 모니터링',
        description: '전체 워크스페이스의 주문을 상태·기간·워크스페이스별로 조회',
        icon: <RiFileListLine size={ICON_SIZE} />,
        route: SUPER_ADMIN_ROUTES.ORDERS,
      },
    ],
  },
  {
    title: '운영 설정',
    items: [
      {
        title: '이메일 도메인 관리',
        description: '대학별 허용 이메일 도메인 추가 및 삭제',
        icon: <RiMailSendLine size={ICON_SIZE} />,
        route: SUPER_ADMIN_ROUTES.EMAIL,
      },
      {
        title: '은행 정보 관리',
        description: '결제 계좌에 사용될 은행 목록 관리',
        icon: <RiBankCardLine size={ICON_SIZE} />,
        route: SUPER_ADMIN_ROUTES.BANK,
      },
    ],
  },
];
