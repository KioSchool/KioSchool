import { Workspace } from '.';
import { defaultCategoryValue } from './CategoryType';
import { defaultImageValue } from './ImageType';
import { defaultProductValue } from './ProductType';
import { defaultUserValue } from './UserType';

export const defaultWorkspaceValue: Workspace = {
  name: '',
  description: '',
  owner: defaultUserValue,
  products: [defaultProductValue],
  productCategories: [defaultCategoryValue],
  images: [defaultImageValue],
  notice: '',
  tableCount: 0,
  id: 0,
  createdAt: '',
  updatedAt: '',
};
