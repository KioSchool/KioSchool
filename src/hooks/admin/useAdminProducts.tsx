import { useSetAtom } from 'jotai';

import useApi from '@hooks/useApi';
import { adminCategoriesAtom, adminProductsAtom } from '@jotai/admin/atoms';
import { AdminProduct, ProductCategory, ProductStateType, ProductStatus, SetProductRequest } from '@@types/index';

function useAdminProducts(workspaceId: string | undefined | null) {
  const { adminApi } = useApi();
  const setProducts = useSetAtom(adminProductsAtom);
  const setProductCategories = useSetAtom(adminCategoriesAtom);

  const fetchProducts = () => {
    return adminApi
      .get<AdminProduct[]>('/products', {
        params: {
          workspaceId: workspaceId,
        },
      })
      .then((res) => {
        setProducts(res.data);
      });
  };

  const fetchProduct = async (productId: number) => {
    const res = await adminApi.get<AdminProduct>('/product', {
      params: {
        productId,
      },
    });

    return res.data;
  };

  const createFormData = (parameter: ProductStateType | SetProductRequest, file: File | null) => {
    const data = new FormData();
    data.append('body', new Blob([JSON.stringify(parameter)], { type: 'application/json' }));
    if (file) data.append('file', new Blob([file], { type: 'image/jpeg' }));

    return data;
  };

  const addProduct = (product: ProductStateType, file: File) => {
    const data = createFormData(product, file);

    return adminApi.post<AdminProduct>('/product', data).catch((error) => {
      console.error('Failed to add product: ', error);
      throw error;
    });
  };

  const editProduct = (parameter: ProductStateType, file: File | null) => {
    const data = createFormData(parameter, file);

    return adminApi.put<AdminProduct>('/product', data);
  };

  const addSetProduct = (parameter: SetProductRequest, file: File | null) => {
    const data = createFormData(parameter, file);

    return adminApi.post<AdminProduct>('/product/set', data);
  };

  const editSetProduct = (parameter: SetProductRequest, file: File | null) => {
    const data = createFormData(parameter, file);

    return adminApi.put<AdminProduct>('/product/set', data);
  };

  const editProductStatus = (productId: number, status: ProductStatus) => {
    return adminApi
      .put<AdminProduct>('/product/status', {
        workspaceId,
        productId,
        status,
      })
      .then((response) => {
        return fetchProducts().then(() => response.data);
      });
  };

  const deleteProduct = (productId: number) => {
    return adminApi
      .delete('/product', {
        params: {
          workspaceId: workspaceId,
          productId: productId,
        },
      })
      .then(() => {
        setProducts((prev) => prev.filter((item) => item.id !== productId));
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
    return adminApi
      .post<ProductCategory[]>('/product-categories/sort', { workspaceId, productCategoryIds })
      .then((res) => {
        setProductCategories(res.data);
      })
      .catch((error) => {
        console.error('Failed to reorder products categories : ', error);
      });
  };

  const reorderProducts = (sorts: { categoryId: number | null; productIds: number[] }[]) => {
    return adminApi
      .put<AdminProduct[]>('/products/sort', { workspaceId, sorts })
      .then((res) => {
        setProducts(res.data);
      })
      .catch((error) => {
        console.error('Failed to reorder products : ', error);
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
    addSetProduct,
    editSetProduct,
    editProductStatus,
    reorderCategories,
    reorderProducts,
    deleteCategory,
  };
}

export default useAdminProducts;
