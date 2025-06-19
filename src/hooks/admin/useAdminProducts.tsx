import useApi from '@hooks/useApi';
import { Product, ProductCategory } from '@@types/index';
import { useNavigate } from 'react-router-dom';
import { categoriesAtom, productsAtom } from 'src/jotai/admin/atoms';
import { useSetAtom } from 'jotai';

function useAdminProducts(workspaceId: string | undefined | null) {
  const { adminApi } = useApi();
  const navigate = useNavigate();
  const setProducts = useSetAtom(productsAtom);
  const setProductCategories = useSetAtom(categoriesAtom);

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

  const createFormData = (parameter: any, file: File | null) => {
    const data = new FormData();
    data.append('body', new Blob([JSON.stringify(parameter)], { type: 'application/json' }));
    if (file) data.append('file', new Blob([file], { type: 'image/jpeg' }));

    return data;
  };

  const addProduct = (product: any, file: File) => {
    const data = createFormData(product, file);

    adminApi
      .post('/product', data)
      .then(() => {
        navigate(`/admin/workspace/${product.workspaceId}/products`);
      })
      .catch((error) => console.error('Failed to add product: ', error));
  };

  const editProduct = (parameter: any, file: File | null) => {
    const data = createFormData(parameter, file);

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

  const addCategory = (name: string) => {
    adminApi
      .post('/product-category', { name, workspaceId })
      .then(() => fetchCategories())
      .catch((error) => {
        console.error('Failed to add products categories : ', error);
      });
  };

  const reorderCategories = (productCategoryIds: number[]) => {
    adminApi
      .post('/product-categories/sort', { workspaceId, productCategoryIds })
      .then(() => {
        navigate(`/admin/workspace/${workspaceId}/products`);
      })
      .catch((error) => {
        console.error('Failed to reorder products categories : ', error);
      });
  };

  const deleteCategory = (productCategoryId: number) => {
    return adminApi.delete(`/product-category`, { params: { workspaceId, productCategoryId } }).then(() => fetchCategories());
  };

  return {
    fetchProducts,
    addProduct,
    fetchCategories,
    addCategory,
    deleteProduct,
    fetchProduct,
    editProduct,
    editProductSellable,
    reorderCategories,
    deleteCategory,
  };
}

export default useAdminProducts;
