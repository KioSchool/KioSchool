import useApi from '@hooks/useApi';
import { Product, ProductCategory, ProductStatus } from '@@types/index';
import { useNavigate } from 'react-router-dom';
import { adminCategoriesAtom, adminProductsAtom } from '@jotai/admin/atoms';
import { useSetAtom } from 'jotai';
import { getAdminProductsPath } from '@constants/routes';
import { notifyActionFailure } from '@utils/actionFailure';

function useAdminProducts(workspaceId: string | undefined | null) {
  const { adminApi } = useApi();
  const navigate = useNavigate();
  const setProducts = useSetAtom(adminProductsAtom);
  const setProductCategories = useSetAtom(adminCategoriesAtom);

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

    return adminApi.post('/product', data).catch((error) => {
      console.error('Failed to add product: ', error);
      throw error;
    });
  };

  const editProduct = (parameter: any, file: File | null) => {
    const data = createFormData(parameter, file);

    return adminApi
      .put('/product', data)
      .then(() => {
        navigate(getAdminProductsPath(parameter.workspaceId));
        return true;
      })
      .catch((error) => {
        notifyActionFailure(error, '상품을 수정하지 못했습니다. 잠시 후 다시 시도해 주세요.');
        return false;
      });
  };

  const editProductStatus = (productId: number, status: ProductStatus) => {
    adminApi
      .put('/product/status', {
        workspaceId,
        productId,
        status,
      })
      .then(() => {
        fetchProducts();
      })
      .catch((error) => {
        notifyActionFailure(error, '상품 판매 상태를 바꾸지 못했습니다. 잠시 후 다시 시도해 주세요.');
      });
  };

  const deleteProduct = (productId: number) =>
    adminApi
      .delete('/product', {
        params: {
          workspaceId: workspaceId,
          productId: productId,
        },
      })
      .then(() => {
        setProducts((prev) => prev.filter((item) => item.id !== productId));
        return true;
      })
      .catch((error) => {
        notifyActionFailure(error, '상품을 삭제하지 못했습니다. 잠시 후 다시 시도해 주세요.');
        return false;
      });

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

  const addCategory = (name: string) =>
    adminApi
      .post('/product-category', { name, workspaceId })
      .then(() => {
        fetchCategories();
        return true;
      })
      .catch((error) => {
        notifyActionFailure(error, '카테고리를 추가하지 못했습니다. 잠시 후 다시 시도해 주세요.');
        return false;
      });

  const reorderCategories = (productCategoryIds: number[]) => {
    return adminApi
      .post<ProductCategory[]>('/product-categories/sort', { workspaceId, productCategoryIds })
      .then((res) => {
        setProductCategories(res.data);
      })
      .catch((error) => {
        notifyActionFailure(error, '카테고리 순서를 저장하지 못했습니다. 잠시 후 다시 시도해 주세요.');
        fetchCategories();
      });
  };

  const reorderProducts = (sorts: { categoryId: number | null; productIds: number[] }[]) => {
    return adminApi
      .put<Product[]>('/products/sort', { workspaceId, sorts })
      .then((res) => {
        setProducts(res.data);
      })
      .catch((error) => {
        notifyActionFailure(error, '상품 순서를 저장하지 못했습니다. 잠시 후 다시 시도해 주세요.');
        fetchProducts();
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
    editProductStatus,
    reorderCategories,
    reorderProducts,
    deleteCategory,
  };
}

export default useAdminProducts;
