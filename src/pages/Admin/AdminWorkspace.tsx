import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useCustomNavigate from '@hooks/useCustomNavigate';
import useAdminWorkspace from '@hooks/admin/useAdminWorkspace';

function AdminWorkspace() {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const { fetchWorkspace } = useAdminWorkspace();
  const { appendPath } = useCustomNavigate();

  useEffect(() => {
    fetchWorkspace(workspaceId);
  }, []);

  return (
    <div>
      <div>workspaceId: {workspaceId}</div>
      <button type={'button'} onClick={() => appendPath('/orders')}>
        실시간 주문 조회
      </button>
      <button type={'button'} onClick={() => appendPath('/orders-history')}>
        전체 주문 조회
      </button>
      <button type={'button'} onClick={() => appendPath('/products')}>
        상품 조회
      </button>
    </div>
  );
}

export default AdminWorkspace;
