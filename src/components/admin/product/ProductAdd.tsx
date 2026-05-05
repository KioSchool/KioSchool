import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAtomValue, useSetAtom } from 'jotai';
import { adminWorkspaceAtom, externalSidebarAtom } from '@jotai/admin/atoms';
import { ProductStateType, RIGHT_SIDEBAR_ACTION } from '@@types/index';
import useAdminProducts from '@hooks/admin/useAdminProducts';
import { getAdminWorkspacePath } from '@constants/routes';
import ProductForm from './ProductForm';

function ProductAdd() {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const setExternalSidebar = useSetAtom(externalSidebarAtom);
  const workspace = useAtomValue(adminWorkspaceAtom);
  const navigate = useNavigate();
  const { addProduct, fetchCategories, fetchProducts } = useAdminProducts(workspaceId);

  useEffect(() => {
    fetchCategories();
  }, []);

  const closeSidebar = () => {
    setExternalSidebar({ action: RIGHT_SIDEBAR_ACTION.CLOSE });
  };

  const handleAddProduct = (formData: ProductStateType, file: File | null) => {
    if (!file) {
      alert('상품 이미지를 등록해주세요.');
      return Promise.resolve();
    }

    const submitData = { ...formData, workspaceId };
    const shouldRedirectToOnboarding = workspace.isOnboarding && Boolean(workspaceId);

    return addProduct(submitData, file)
      .then(() => fetchProducts())
      .then(() => {
        alert('상품이 추가되었습니다.');
        closeSidebar();

        if (shouldRedirectToOnboarding) {
          navigate(getAdminWorkspacePath(Number(workspaceId)));
        }
      })
      .catch(() => {
        alert('상품 추가에 실패했습니다. 다시 시도해주세요.');
      });
  };

  return <ProductForm mode="ADD" workspaceId={workspaceId} onSubmit={handleAddProduct} onCancel={closeSidebar} />;
}

export default ProductAdd;
