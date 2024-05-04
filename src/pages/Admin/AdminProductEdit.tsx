import AppButton from '@components/common/button/AppButton';
import AppInputWithLabel from '@components/common/input/AppInputWithLabel';
import styled from '@emotion/styled';
import useAdminProducts from '@hooks/admin/useAdminProducts';
import { categoriesAtom } from '@recoils/atoms';
import React, { ChangeEvent, useEffect, useReducer, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { initState, ProductActionType, ProductEdit, ProductStateType } from '@@types/productTypes';
import NavBar from '@components/common/nav/NavBar';
import SelectWithLabel from '@components/common/select/SelectWithLabelProps';
import ProductImageInput from '@components/admin/product/ProductImageInput';
import TitleNavBar from '@components/common/nav/TitleNavBar';
import useConfirm from '@hooks/useConfirm';

const ErrorMessage = styled.div`
  padding: 0 0 5px;
  color: #ff0000;
`;

function reducer(state: ProductEdit, action: ProductActionType) {
  switch (action.type) {
    case 'PRODUCT_NAME_INPUT':
      return { ...state, name: action.payload };
    case 'PRODUCT_DESCRIPTION_INPUT':
      return { ...state, description: action.payload };
    case 'PRODUCT_PRICE_INPUT':
      return { ...state, price: action.payload };
    case 'PRODUCT_CATEGORY_INPUT':
      const isFirstRendered = typeof action.payload === 'object';

      if (isFirstRendered) return { ...state, productCategory: action.payload };
      return { ...state, productCategory: { ...state.productCategory, id: action.payload } };
    case 'PRODUCT_IMAGE_INPUT':
      return { ...state, image: action.payload };
    case 'PRODUCT_ID_INPUT':
      return { ...state, id: action.payload };
    default:
      throw new Error('Unhandled action');
  }
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: center;
  padding-top: 100px;
  padding-bottom: 100px;
`;

function AdminProductEdit() {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const { fetchProduct, fetchCategories, editProduct, deleteProduct } = useAdminProducts(workspaceId);
  const productCategories = useRecoilValue(categoriesAtom);

  const [errorMessage, setErrorMessage] = useState<string>('');

  const [searchParams] = useSearchParams();
  const productId = Number(searchParams.get('productId'));

  const navigate = useNavigate();
  const [productState, dispatch] = useReducer(reducer, initState);
  const { ConfirmModal, confirm } = useConfirm(`'${productState.name}' 상품을 삭제하시겠습니까?`, '확인 후 되돌릴 수 없습니다.', '삭제하기', '취소');

  useEffect(() => {
    (async () => {
      const data = await fetchProduct(productId);

      dispatch({ type: 'PRODUCT_NAME_INPUT', payload: data.name });
      dispatch({ type: 'PRODUCT_DESCRIPTION_INPUT', payload: data.description });
      dispatch({ type: 'PRODUCT_PRICE_INPUT', payload: data.price });
      dispatch({ type: 'PRODUCT_CATEGORY_INPUT', payload: data.productCategory });
      dispatch({ type: 'PRODUCT_IMAGE_INPUT', payload: { url: data.imageUrl, file: null } });
      dispatch({ type: 'PRODUCT_ID_INPUT', payload: data.id });
    })();
    fetchCategories();
  }, []);

  const submitEditProduct = () => {
    if (!productState.name || !productState.description) {
      setErrorMessage('상품 이름 및 설명을 입력해주세요');
      return;
    }
    if (productState.price < 0) {
      setErrorMessage('가격은 음수가 될 수 없습니다.');
      return;
    }
    if (!productState.image.url) {
      setErrorMessage('파일을 선택해주세요');
      return;
    }
    setErrorMessage('');

    const body: ProductStateType = {
      productId: productState.id,
      name: productState.name,
      description: productState.description,
      price: productState.price,
      workspaceId: workspaceId,
      productCategoryId: productState.productCategory?.id,
    };

    editProduct(body, productState.image.file);
  };

  const onImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.length) {
      dispatch({ type: 'PRODUCT_IMAGE_INPUT', payload: null });
      return;
    }

    const newFileURL = URL.createObjectURL(event.target.files[0]);

    dispatch({ type: 'PRODUCT_IMAGE_INPUT', payload: { url: newFileURL, file: event.target.files[0] } });
  };

  const deleteProductHandler = async () => {
    const userInput = await confirm();
    if (!userInput) return;

    deleteProduct(productId);
    navigate(`/admin/workspace/${workspaceId}/products`);
  };

  return (
    <>
      <NavBar useBackground={true} />
      <Container>
        <TitleNavBar title={'상품 수정'}>
          <AppButton size={160} onClick={deleteProductHandler}>
            상품 삭제
          </AppButton>
        </TitleNavBar>
        {errorMessage && <ErrorMessage className="error-message">{errorMessage}</ErrorMessage>}
        <SelectWithLabel
          titleLabel={'카테고리'}
          options={productCategories}
          value={productState.productCategory ? productState.productCategory.id : 'null'}
          onInput={(event: React.ChangeEvent<HTMLSelectElement>) => {
            dispatch({ type: 'PRODUCT_CATEGORY_INPUT', payload: event.target.value });
          }}
        />
        <AppInputWithLabel
          titleLabel={'상품명'}
          value={productState.name}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            dispatch({ type: 'PRODUCT_NAME_INPUT', payload: event.target?.value });
          }}
        />
        <ProductImageInput url={productState.image.url} file={productState.image.files} onImageChange={onImageChange} />
        <AppInputWithLabel
          titleLabel={'상품 설명'}
          value={productState.description}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            dispatch({ type: 'PRODUCT_DESCRIPTION_INPUT', payload: event.target?.value });
          }}
        />
        <AppInputWithLabel
          type={'number'}
          titleLabel={'상품 가격'}
          value={productState.price}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            dispatch({ type: 'PRODUCT_PRICE_INPUT', payload: event.target?.value });
          }}
        />
        <AppButton onClick={submitEditProduct}>변경하기</AppButton>
        <ConfirmModal />
      </Container>
    </>
  );
}

export default AdminProductEdit;
