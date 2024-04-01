import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useProducts from '@hooks/useProducts';
import { useRecoilValue } from 'recoil';
import { categoriesAtom, productsAtom } from '@recoils/atoms';
import useCustomNavigate from '@hooks/useCustomNavigate';
import TitleNavBar from '@components/common/nav/TitleNavBar';
import NavBar from '@components/common/nav/NavBar';

function AdminProduct() {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const { fetchProducts, addCategories, deleteProducts, fetchCategories } = useProducts(workspaceId);
  const products = useRecoilValue(productsAtom);
  const categories = useRecoilValue(categoriesAtom);

  const { appendPath } = useCustomNavigate();

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  return (
    <>
      <NavBar logoSize={'small'} />
      <TitleNavBar title={'상품 조회'} />
    </>
  );
}

export default AdminProduct;
