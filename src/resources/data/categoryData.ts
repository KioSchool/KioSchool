import { ProductCategory } from '@@types/index';

export const defaultCategoryName = '기본 메뉴';

export const defaultCategoryNotice = '기본 메뉴는 상단 고정 메뉴입니다.';

export const defaultCategory: ProductCategory = {
  id: -1,
  name: defaultCategoryName,
  index: 0,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};
