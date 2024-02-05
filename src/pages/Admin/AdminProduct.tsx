import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useProducts from '@hooks/useProducts';
import { useRecoilValue } from 'recoil';
import { productsAtom } from '@recoils/atoms';
import useCustomNavigate from '@hooks/useCustomNavigate';

function AdminProduct() {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const { fetchProducts } = useProducts(workspaceId);
  const products = useRecoilValue(productsAtom);
  const { appendPath } = useCustomNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <div>상품 조회</div>
      <div>
        {products.map((product) => (
          <div key={product.id}>
            <div>{product.id}번 상품</div>
            <div>{product.name}</div>
            <div>{product.description}</div>
            <div>{product.price.toLocaleString()}원</div>
            <img src={product.imageUrl} style={{ width: '300px', height: '300px' }} />
          </div>
        ))}
      </div>
      <button type={'button'} onClick={() => appendPath('/add-products')}>
        상품 추가
      </button>
    </>
  );
}

export default AdminProduct;
