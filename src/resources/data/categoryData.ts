import { ProductCategory } from '@@types/index';

export const defaultCategoryName = '기본 메뉴';

export const defaultCategory: ProductCategory = {
  id: -1,
  name: defaultCategoryName,
  index: 0,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};
