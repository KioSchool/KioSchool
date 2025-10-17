export interface AdminNavItem {
  category: string;
  name: string;
  path: string;
}

export const adminNavData: AdminNavItem[] = [
  {
    category: '주문',
    name: '실시간 주문 조회',
    path: '/order/realtime',
  },
  {
    category: '주문',
    name: '실시간 테이블 관리',
    path: '/order/table',
  },
  {
    category: '상품',
    name: '카테고리 관리',
    path: '/products/categories',
  },
  {
    category: '상품',
    name: '상품 관리',
    path: '/products',
  },
  {
    category: '주점',
    name: '주문 통계',
    path: '/order/statistics',
  },
  {
    category: '주점',
    name: '주점 정보 관리',
    path: '/edit',
  },
  {
    category: '주점',
    name: '테이블 관리',
    path: '/order/table/manage',
  },
];
