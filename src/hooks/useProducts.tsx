import useApi from './useApi';
import { useSetRecoilState } from 'recoil';
import { productsAtom } from '../recoils/atoms';
import { Product } from '../types';

function UseProducts(workspaceId: string | undefined) {
  const { adminApi } = useApi();
  const setProducts = useSetRecoilState(productsAtom);

  const fetchProducts = () => {
    adminApi.get<Product[]>(`/products?workspaceId=${workspaceId}`).then((res) => {
      setProducts(res.data);
    });
  };

  return { fetchProducts };
}

export default UseProducts;
