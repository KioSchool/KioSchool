import useApi from '@hooks/useApi';
import { useSetRecoilState } from 'recoil';
import { categoriesAtom, productsAtom } from '@recoils/atoms';
import { Product, ProductCategory } from '@@types/index';
import { useNavigate } from 'react-router-dom';

function useAdminProducts(workspaceId: string | undefined) {
  const { adminApi } = useApi();
  const navigate = useNavigate();
  const setProducts = useSetRecoilState(productsAtom);
  const setProductCategories = useSetRecoilState(categoriesAtom);

  const fetchProducts = () => {
    adminApi
      .get<Product[]>('/products', {
        params: {
          workspaceId: workspaceId,
        },
      })
      .then((res) => {
        setProducts(res.data);
      })
      .catch((error) => {
        alert(error.response.data.message);
        navigate(-1);
      });
  };

  const fetchProduct = async (productId: number) => {
    const res = await adminApi.get<Product>('/product', {
      params: {
        productId,
      },
    });

    return res.data;
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

  const editProduct = (parameter: any, file: File | null) => {
    const data = new FormData();
    data.append('body', new Blob([JSON.stringify(parameter)], { type: 'application/json' }));
    if (file) data.append('file', new Blob([file], { type: 'image/jpeg' }));

    adminApi
      .put('/product', data)
      .then(() => {
        navigate(`/admin/workspace/${parameter.workspaceId}/products`);
      })
      .catch((error) => console.error('Failed to add product: ', error));
  };

  const editProductSellable = (productId: number, isSellable: boolean) => {
    adminApi
      .put('/product/sellable', {
        workspaceId,
        productId,
        isSellable,
      })
      .then(() => {
        fetchProducts();
      })
      .catch((error) => {
        console.error('Failed to edit product sellable: ', error);
      });
  };

  const deleteProduct = (productId: number) => {
    adminApi
      .delete('/product', {
        params: {
          workspaceId: workspaceId,
          productId: productId,
        },
      })
      .then(() => {
        setProducts((prev) => prev.filter((item) => item.id !== productId));
      })
      .catch((error) => {
        console.error('Failed to delete selected products: ', error);
      });
  };

  const deleteProducts = (productIds: number[]) => {
    productIds.forEach((id) => {
      deleteProduct(id);
    });
  };

  const fetchCategories = () => {
    adminApi
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

  const addCategories = (name: string) => {
    adminApi.post('/product-category', { name, workspaceId }).catch((error) => {
      console.error('Failed to add products categories : ', error);
    });
  };

  return { fetchProducts, addProduct, fetchCategories, addCategories, deleteProducts, fetchProduct, editProduct, editProductSellable };
}

export default useAdminProducts;
