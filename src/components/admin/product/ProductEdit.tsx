import { useEffect, useState } from 'react';
import { useSetAtom } from 'jotai';
import { useParams } from 'react-router-dom';

import useAdminProducts from '@hooks/admin/useAdminProducts';
import { externalSidebarAtom } from '@jotai/atoms';
import { AdminProduct, ProductStateType, ProductType, RIGHT_SIDEBAR_ACTION, SetProductRequest } from '@@types/index';

import ProductForm from './ProductForm';
import SetProductForm from './set/SetProductForm';

interface ProductEditProps {
  productId: number;
  onDelete: () => void;
  onClose?: () => void;
}

function ProductEdit({ productId, onDelete, onClose }: ProductEditProps) {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const setExternalSidebar = useSetAtom(externalSidebarAtom);
  const { fetchProduct, fetchCategories, editProduct, editSetProduct, fetchProducts } = useAdminProducts(workspaceId);

  const [initialData, setInitialData] = useState<AdminProduct | null>(null);

  useEffect(() => {
    fetchCategories();

    const loadProductData = async () => {
      if (!productId) return;
      const data = await fetchProduct(productId);
      setInitialData(data);
    };

    loadProductData();
  }, [productId]);

  const handleCloseEditor = () => {
    if (onClose) {
      onClose();
      return;
    }
    setExternalSidebar({ action: RIGHT_SIDEBAR_ACTION.CLOSE });
  };

  const handleEditProduct = async (formData: ProductStateType, file: File | null) => {
    try {
      const submitData = { ...formData, workspaceId };
      await editProduct(submitData, file);
      await fetchProducts();
      alert('상품 정보가 수정되었습니다.');
      handleCloseEditor();
    } catch {
      alert('상품 정보를 수정하지 못했습니다. 입력 내용을 확인해주세요.');
    }
  };

  const handleEditSetProduct = async (request: SetProductRequest, file: File | null) => {
    try {
      await editSetProduct(request, file);
      await fetchProducts();
      alert('세트 메뉴 정보가 수정되었습니다.');
      handleCloseEditor();
    } catch {
      alert('세트 메뉴 정보를 수정하지 못했습니다. 입력 내용을 확인해주세요.');
    }
  };

  if (!initialData) return null;

  if (initialData.type === ProductType.SET && workspaceId) {
    return (
      <SetProductForm
        mode="EDIT"
        workspaceId={workspaceId}
        initialValues={initialData}
        onSubmit={handleEditSetProduct}
        onDelete={onDelete}
        onCancel={handleCloseEditor}
      />
    );
  }

  return (
    <ProductForm
      mode="EDIT"
      workspaceId={workspaceId}
      initialValues={initialData}
      onSubmit={handleEditProduct}
      onDelete={onDelete}
      onCancel={handleCloseEditor}
    />
  );
}

export default ProductEdit;
