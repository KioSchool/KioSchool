import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSetAtom } from 'jotai';
import { externalSidebarAtom } from 'src/jotai/admin/atoms';
import { ProductStateType, RIGHT_SIDEBAR_ACTION } from '@@types/index';
import useAdminProducts from '@hooks/admin/useAdminProducts';
import ProductForm from './ProductForm';

function ProductAdd() {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const setExternalSidebar = useSetAtom(externalSidebarAtom);
  const { addProduct, fetchCategories, fetchProducts } = useAdminProducts(workspaceId);

  useEffect(() => {
    fetchCategories();
  }, []);

  const closeSidebar = () => {
    setExternalSidebar({ action: RIGHT_SIDEBAR_ACTION.CLOSE });
  };

  const handleAddProduct = async (formData: ProductStateType, file: File | null) => {
    if (!file) {
      alert('상품 이미지를 등록해주세요.');
      return;
    }

    try {
      const submitData = { ...formData, workspaceId };
      await addProduct(submitData, file);
      await fetchProducts();

      alert('상품이 추가되었습니다.');
      closeSidebar();
    } catch (e) {
      console.error(e);
      alert('상품 추가에 실패했습니다.');
    }
  };

  return <ProductForm mode="add" workspaceId={workspaceId} onSubmit={handleAddProduct} onCancel={closeSidebar} />;
}

export default ProductAdd;
