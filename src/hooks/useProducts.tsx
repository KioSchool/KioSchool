import useApi from '@hooks/useApi';
import { useSetRecoilState } from 'recoil';
import { productsAtom, userWorkspaceAtom } from '@recoils/atoms';
import { DeleteProps, Product } from '@@types/index';
import { useNavigate } from 'react-router-dom';

function UseProducts(workspaceId: string | undefined) {
  const { adminApi } = useApi();
  const navigate = useNavigate();
  const setProducts = useSetRecoilState(productsAtom);
  const setWorksapceCategories = useSetRecoilState(userWorkspaceAtom);

  const fetchProducts = () => {
    adminApi
      .get<Product[]>('/products', {
        params: {
          workspaceId: workspaceId,
        },
      })
      .then((res) => {
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

  const deleteSelectedProducts = (selectedProductInfo: DeleteProps) => {
    const parsedWorkspaceId: number = Number(selectedProductInfo.workspaceId);
    console.log(parsedWorkspaceId);
    adminApi
      .delete('/product', {
        data: {
          workspaceId: Number(selectedProductInfo.workspaceId),
          productId: selectedProductInfo.productId,
        },
      })
      .catch((error) => {
        console.error('Failed to delete selected products: ', error);
      });
  };

  const fetchCategories = () => {
    adminApi
      .get('/product-categories', {
        params: {
          workspaceId: workspaceId,
        },
      })
      .then((res: any) => {
        setWorksapceCategories((prev) => ({
          ...prev,
          productCategories: res.data,
        }));
      })
      .catch((error) => {
        console.error('Failed to fetch products categories : ', error);
      });
  };

  const AddCategories = (name: string) => {
    adminApi.post('/product-category', { name, workspaceId }).catch((error) => {
      console.error('Failed to add products categories : ', error);
    });
  };

  return { fetchProducts, addProduct, fetchCategories, AddCategories, deleteSelectedProducts };
}

export default UseProducts;
