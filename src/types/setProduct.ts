import { AdminProduct } from './index';

export interface SetProductImageValue {
  url: string;
  file: File | null;
}

export interface SetProductComponentFormValue {
  key: string;
  name: string;
  quantity: number;
  conditionProductId: number | null;
}

export interface SetProductFormValue {
  name: string;
  description: string;
  productCategoryId: number | null;
  originalPrice: string;
  discountPrice: string;
  image: SetProductImageValue;
  components: SetProductComponentFormValue[];
}

export type SetProductFormInitialValue = AdminProduct;
