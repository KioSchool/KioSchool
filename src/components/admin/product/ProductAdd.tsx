import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSetAtom } from 'jotai';
import { externalSidebarAtom } from '@jotai/admin/atoms';
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

    const submitData = { ...formData, workspaceId };
    await addProduct(submitData, file);

    await fetchProducts();
    alert('상품이 추가되었습니다.');
    closeSidebar();
  };

  return <ProductForm mode="ADD" workspaceId={workspaceId} onSubmit={handleAddProduct} onCancel={closeSidebar} />;
}

export default ProductAdd;
