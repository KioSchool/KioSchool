import useApi from '@hooks/useApi';
import { useSetRecoilState } from 'recoil';
import { productsAtom } from '@recoils/atoms';
import { Product } from '@@types/index';
import { useNavigate } from 'react-router-dom';

function UseProducts(workspaceId: string | undefined) {
  const { adminApi } = useApi();
  const navigate = useNavigate();
  const setProducts = useSetRecoilState(productsAtom);

  const fetchProducts = () => {
    adminApi.get<Product[]>(`/products?workspaceId=${workspaceId}`).then((res) => {
      setProducts(res.data);
    });
  };

  const addProduct = (product: any, file: File) => {
    const data = new FormData();
    data.append('body', new Blob([JSON.stringify(product)], { type: 'application/json' }));
    data.append('file', new Blob([file], { type: 'image/jpeg' }));

    adminApi
      .post('/product', data)
      .then(() => {
        navigate(`/admin/workspace/${product.workspaceId}/products`);
      })
      .catch((error) => console.error('Failed to add product: ', error));
  };

  return { fetchProducts, addProduct };
}

export default UseProducts;
