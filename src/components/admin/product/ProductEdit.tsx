import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSetAtom } from 'jotai';
import { externalSidebarAtom } from 'src/jotai/admin/atoms';
import { ProductStateType, RIGHT_SIDEBAR_ACTION } from '@@types/index';
import useAdminProducts from '@hooks/admin/useAdminProducts';
import ProductForm from './ProductForm';

interface ProductEditProps {
  productId: number;
  onDelete: () => void;
}

function ProductEdit({ productId, onDelete }: ProductEditProps) {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const setExternalSidebar = useSetAtom(externalSidebarAtom);
  const { fetchProduct, fetchCategories, editProduct, fetchProducts } = useAdminProducts(workspaceId);

  const [initialData, setInitialData] = useState<any>(null);

  useEffect(() => {
    fetchCategories();

    const loadProductData = async () => {
      if (!productId) return;
      const data = await fetchProduct(productId);
      setInitialData(data);
    };

    loadProductData();
  }, [productId]);

  const closeSidebar = () => {
    setExternalSidebar({ action: RIGHT_SIDEBAR_ACTION.CLOSE });
  };

  const handleEditProduct = async (formData: ProductStateType, file: File | null) => {
    const submitData = { ...formData, workspaceId };

    await editProduct(submitData, file);

    await fetchProducts();
    alert('상품 정보가 수정되었습니다.');
    closeSidebar();
  };

  if (!initialData) return null;

  return (
    <ProductForm mode="EDIT" workspaceId={workspaceId} initialValues={initialData} onSubmit={handleEditProduct} onDelete={onDelete} onCancel={closeSidebar} />
  );
}

export default ProductEdit;
