export interface AdminNavItem {
  name: string;
  path: string;
  defaultQuery?: Record<string, string>;
}

export interface AdminNavCategory {
  category: '주문' | '실시간' | '상품' | '주점' | '홈';
  items: AdminNavItem[];
}

export const adminNavData: AdminNavCategory[] = [
  {
    category: '홈',
    items: [
      {
        name: '주점 대시보드',
        path: '',
      },
    ],
  },
  {
    category: '실시간',
    items: [
      {
        name: '실시간 주문 조회',
        path: '/order/realtime',
      },
      {
        name: '실시간 테이블 관리',
        path: '/table/realtime',
        defaultQuery: { tableNo: '1' },
      },
    ],
  },
  {
    category: '주문',
    items: [
      // TODO: 나중에 필요하면 다시 살리기
      // {
      //   name: '테이블 주문 조회',
      //   path: '/table-order',
      // },
      {
        name: '전체 주문 조회',
        path: '/total-order',
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
    ],
  },
];
