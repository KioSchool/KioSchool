import React from 'react';
import { useSearchParams } from 'react-router-dom';

function Order() {
  const [searchParams] = useSearchParams();
  const workspaceId = searchParams.get('workspaceId');
  const tableNo = searchParams.get('tableNo');

  return (
    <div>
      {workspaceId}-{tableNo} 테이블
    </div>
  );
}

export default Order;
