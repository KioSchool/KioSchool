import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useProducts from '@hooks/useProducts';
import { useRecoilValue } from 'recoil';
import { productsAtom } from '@recoils/atoms';
import useCustomNavigate from '@hooks/useCustomNavigate';
import { DeleteProps } from '@@types/index';

function AdminProduct() {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const { fetchProducts, AddCategories, deleteSelectedProducts } = useProducts(workspaceId);
  const products = useRecoilValue(productsAtom);
  const { appendPath } = useCustomNavigate();
  const [input, setInput] = useState<string>('');
  const [selectedProducts, setSelectedProducts] = useState<DeleteProps[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteChoosenProducts = () => {
    deleteSelectedProducts(selectedProducts);
  };

  const handleCheckboxChange = (deleteProductInfo: DeleteProps) => {
    const isSelected = selectedProducts.some((item) => item.productId === deleteProductInfo.productId && item.workspaceId === deleteProductInfo.workspaceId);
    let updatedProducts = [];

    if (isSelected) {
      updatedProducts = selectedProducts.filter((item) => item.productId !== deleteProductInfo.productId || item.workspaceId !== deleteProductInfo.workspaceId);
    } else {
      updatedProducts = [...selectedProducts, deleteProductInfo];
    }

    setSelectedProducts(updatedProducts);
  };

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
            <input
              type={'checkbox'}
              checked={selectedProducts.some((item) => item.productId === product.id && item.workspaceId === workspaceId)}
              onChange={() => handleCheckboxChange({ productId: product.id, workspaceId: workspaceId })}
            />
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
      <button type={'button'} onClick={deleteChoosenProducts}>
        선택된 상품 삭제
      </button>
    </>
  );
}

export default AdminProduct;
