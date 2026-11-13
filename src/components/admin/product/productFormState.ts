import { AdminProduct } from '@@types/index';

export const MAX_PRODUCT_NAME_LENGTH = 12;
export const MAX_PRODUCT_DESCRIPTION_LENGTH = 30;

export interface ProductFormState {
  id?: number;
  name: string;
  description: string;
  price: string | number;
  productCategory: {
    id: string | number;
    name: string;
  };
  image: {
    url: string;
    file: File | null;
  };
}

export type ProductFormAction =
  | { type: 'PRODUCT_RESET'; payload: ProductFormState }
  | { type: 'PRODUCT_NAME_INPUT'; payload: string }
  | { type: 'PRODUCT_DESCRIPTION_INPUT'; payload: string }
  | { type: 'PRODUCT_PRICE_INPUT'; payload: string }
  | { type: 'PRODUCT_CATEGORY_INPUT'; payload: string }
  | { type: 'PRODUCT_IMAGE_INPUT'; payload: ProductFormState['image'] };

export function createProductFormState(initialValues?: AdminProduct): ProductFormState {
  if (!initialValues) {
    return {
      name: '',
      description: '',
      price: 0,
      productCategory: { id: 'null', name: '' },
      image: { url: '', file: null },
    };
  }

  return {
    id: initialValues.id,
    name: initialValues.name,
    description: initialValues.description,
    price: initialValues.price,
    productCategory: {
      id: initialValues.productCategory?.id ?? 'null',
      name: initialValues.productCategory?.name ?? '',
    },
    image: { url: initialValues.imageUrl, file: null },
  };
}

export function reduceProductForm(state: ProductFormState, action: ProductFormAction): ProductFormState {
  switch (action.type) {
    case 'PRODUCT_RESET':
      return action.payload;
    case 'PRODUCT_NAME_INPUT':
      return { ...state, name: action.payload };
    case 'PRODUCT_DESCRIPTION_INPUT':
      return { ...state, description: action.payload };
    case 'PRODUCT_PRICE_INPUT':
      return { ...state, price: action.payload };
    case 'PRODUCT_CATEGORY_INPUT':
      return { ...state, productCategory: { ...state.productCategory, id: action.payload } };
    case 'PRODUCT_IMAGE_INPUT':
      return { ...state, image: action.payload };
    default:
      throw new Error('Unhandled action');
  }
}
