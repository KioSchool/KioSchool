import React from 'react';
import { useParams } from 'react-router-dom';
import useCustomNavigate from '../../hook/useCustomNavigate';

function AdminWorkspace() {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const { appendPath } = useCustomNavigate();

  return (
    <div>
      <div>workspaceId: {workspaceId}</div>
      <button type={'button'} onClick={() => appendPath('/orders')}>
        주문 조회
      </button>
      <button type={'button'} onClick={() => appendPath('/products')}>
        상품 조회
      </button>
    </div>
  );
}

export default AdminWorkspace;
