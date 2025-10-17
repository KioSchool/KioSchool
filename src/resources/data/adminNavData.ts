export interface AdminNavItem {
  name: string;
  path: string;
}

export interface AdminNavCategory {
  category: '주문' | '상품' | '주점';
  items: AdminNavItem[];
}

export const adminNavData: AdminNavCategory[] = [
  {
    category: '주문',
    items: [
      {
        name: '실시간 주문 조회',
        path: '/order/realtime',
      },
      {
        name: '실시간 테이블 관리',
        path: '/order/table',
      },
    ],
  },
  {
    category: '상품',
    items: [
      {
        name: '카테고리 관리',
        path: '/products/categories',
      },
      {
        name: '상품 관리',
        path: '/products',
      },
    ],
  },
  {
    category: '주점',
    items: [
      {
        name: '주문 통계',
        path: '/order/statistics',
      },
      {
        name: '주점 정보 관리',
        path: '/edit',
      },
      {
        name: '테이블 관리',
        path: '/order/table/manage',
      },
    ],
  },
];
