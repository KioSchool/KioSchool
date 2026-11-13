import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAtomValue, useSetAtom } from 'jotai';
import { adminWorkspaceAtom } from '@jotai/admin/atoms';
import { externalSidebarAtom } from '@jotai/atoms';
import { ProductStateType, ProductType, RIGHT_SIDEBAR_ACTION, SetProductRequest } from '@@types/index';
import useAdminProducts from '@hooks/admin/useAdminProducts';
import { getAdminWorkspacePath } from '@constants/routes';
import ProductForm from './ProductForm';
import SetProductForm from './set/SetProductForm';

interface ProductAddProps {
  productType?: ProductType;
  onClose?: () => void;
}

function ProductAdd({ productType = ProductType.SINGLE, onClose }: ProductAddProps) {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const setExternalSidebar = useSetAtom(externalSidebarAtom);
  const workspace = useAtomValue(adminWorkspaceAtom);
  const navigate = useNavigate();
  const { addProduct, addSetProduct, fetchCategories, fetchProducts } = useAdminProducts(workspaceId);
  const shouldRedirectToOnboarding = workspace.isOnboarding && Boolean(workspaceId);

  useEffect(() => {
    fetchCategories();
  }, []);

  const closeSidebar = () => {
    if (onClose) {
      onClose();
      return;
    }
    setExternalSidebar({ action: RIGHT_SIDEBAR_ACTION.CLOSE });
  };

  const handleAddProduct = (formData: ProductStateType, file: File | null) => {
    if (!file) {
      alert('상품 이미지를 등록해주세요.');
      return Promise.resolve();
    }

    const submitData = { ...formData, workspaceId };
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

  const handleAddSetProduct = (request: SetProductRequest, file: File | null) => {
    return addSetProduct(request, file)
      .then(() => fetchProducts())
      .then(() => {
        alert('세트 메뉴가 추가되었습니다.');
        closeSidebar();

        if (shouldRedirectToOnboarding) {
          navigate(getAdminWorkspacePath(Number(workspaceId)));
        }
      })
      .catch(() => {
        alert('세트 메뉴 추가에 실패했습니다. 입력 내용을 확인해주세요.');
      });
  };

  if (productType === ProductType.SET && workspaceId) {
    return <SetProductForm mode="ADD" workspaceId={workspaceId} onSubmit={handleAddSetProduct} onCancel={closeSidebar} />;
  }

  return <ProductForm mode="ADD" workspaceId={workspaceId} onSubmit={handleAddProduct} onCancel={closeSidebar} />;
}

export default ProductAdd;
