import { ProductCategory } from '@@types/index';
import useApi from '@hooks/useApi';
import { useSetAtom } from 'jotai';
import { categoriesAtom } from 'src/jotai/admin/atoms';

function useProduct(workspaceId: string | undefined | null) {
  const { userApi } = useApi();

  const setProductCategories = useSetAtom(categoriesAtom);

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

  return { fetchCategories };
}

export default useProduct;
