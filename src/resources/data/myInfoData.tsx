import { ReactElement } from 'react';
import { RiLogoutBoxRLine, RiLockFill, RiBankFill, RiDoorOpenFill } from '@remixicon/react';
import { Color } from '@resources/colors';

export interface MyInfoCardData {
  id: string;
  label: string;
  icon: ReactElement;
  action: 'navigate' | 'logout' | 'deleteAccount';
  navigationPath?: string;
  requiresSuperAdmin?: boolean;
}

export const myInfoCardsData: MyInfoCardData[] = [
  {
    id: 'super-admin',
    label: 'Super Admin',
    icon: <RiLockFill size={40} color={Color.KIO_ORANGE} />,
    action: 'navigate',
    navigationPath: '/super-admin',
    requiresSuperAdmin: true,
  },
  {
    id: 'account',
    label: '계좌관리',
    icon: <RiBankFill size={40} color={Color.KIO_ORANGE} />,
    action: 'navigate',
    navigationPath: '/admin/register-account',
  },
  {
    id: 'logout',
    label: '로그아웃',
    icon: <RiLogoutBoxRLine size={40} color={Color.KIO_ORANGE} />,
    action: 'logout',
  },
  {
    id: 'delete-account',
    label: '계정탈퇴',
    icon: <RiDoorOpenFill size={40} color={Color.KIO_ORANGE} />,
    action: 'deleteAccount',
  },
];
