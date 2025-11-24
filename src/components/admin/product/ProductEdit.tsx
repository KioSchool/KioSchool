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
    (async () => {
      if (!productId) return;
      const data = await fetchProduct(productId);
      setInitialData(data);
    })();
  }, [productId]);

  const closeSidebar = () => {
    setExternalSidebar({ action: RIGHT_SIDEBAR_ACTION.CLOSE });
  };

  const handleEditProduct = async (formData: ProductStateType, file: File | null) => {
    try {
      const submitData = { ...formData, workspaceId };

      await editProduct(submitData, file);
      await fetchProducts();
      alert('상품 정보가 수정되었습니다.');
      closeSidebar();
    } catch (e) {
      console.error(e);
      alert('상품 수정에 실패했습니다.');
    }
  };

  if (!initialData) return null;

  return (
    <ProductForm mode="edit" workspaceId={workspaceId} initialValues={initialData} onSubmit={handleEditProduct} onDelete={onDelete} onCancel={closeSidebar} />
  );
}

export default ProductEdit;
