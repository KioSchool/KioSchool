import { ProductCategory } from '@@types/index';
import useApi from '@hooks/useApi';
import { categoriesAtom } from '@recoils/atoms';
import { useSetRecoilState } from 'recoil';

function useProduct(workspaceId: string | undefined | null) {
  const { userApi } = useApi();

  const setProductCategories = useSetRecoilState(categoriesAtom);

  const fetchCategories = () => {
    userApi
      .get<ProductCategory[]>('/product-categories', {
        params: {
          workspaceId: workspaceId,
        },
      })
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
