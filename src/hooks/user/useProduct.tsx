import { Product, ProductCategory } from '@@types/index';
import useApi from '@hooks/useApi';
import { useSetAtom } from 'jotai';
import { userCategoriesAtom, userProductsAtom } from '@jotai/user/atoms';

function useProduct(workspaceId: string | undefined | null) {
  const { userApi } = useApi();

  const setProductCategories = useSetAtom(userCategoriesAtom);
  const setProducts = useSetAtom(userProductsAtom);

  const fetchProducts = () => {
    userApi
      .get<Product[]>('/products', { params: { workspaceId } })
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.error('Failed to fetch products : ', err);
      });
  };

  const fetchCategories = () => {
    userApi
      .get<ProductCategory[]>('/product-categories', { params: { workspaceId } })
      .then((res) => {
        setProductCategories(res.data);
      })
      .catch((error) => {
        console.error('Failed to fetch products categories : ', error);
      });
  };

  return { fetchCategories, fetchProducts };
}

export default useProduct;
