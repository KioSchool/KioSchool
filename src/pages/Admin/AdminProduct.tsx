import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useProducts from '@hooks/useProducts';
import { useRecoilValue } from 'recoil';
import { productsAtom } from '@recoils/atoms';
import useCustomNavigate from '@hooks/useCustomNavigate';

function AdminProduct() {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const { fetchProducts, AddCategories } = useProducts(workspaceId);
  const products = useRecoilValue(productsAtom);
  const { appendPath } = useCustomNavigate();
  const [input, setInput] = useState<string>('');
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <div>상품 조회</div>
      <input
        type={'text'}
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
      />
      <button
        onClick={() => {
          AddCategories(input);
        }}
      >
        카테고리 추가
      </button>
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
      <button type={'button'} onClick={() => appendPath('/add-product')}>
        상품 추가
      </button>
    </>
  );
}

export default AdminProduct;
