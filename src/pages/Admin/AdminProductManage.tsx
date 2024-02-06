import React, { ChangeEvent, useState, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import AppButton from '@components/common/button/AppButton';
import AppInputWithLabel from '@components/common/input/AppInputWithLabel';
import SelectWithOptions from '@components/common/select/SelectWithOptions';
import useAdminUser from '@hooks/useAdminUser';
import styled from '@emotion/styled';

const ErrorMessage = styled.div`
  padding: 0 0 5px;
  color: #ff0000;
`;

function reducer(state: any, action: any) {
  switch (action.type) {
    case 'PRODUCT_NAME_INPUT':
      return { ...state, name: action.payload };
    case 'PRODUCT_DESCRIPTION_INPUT':
      return { ...state, description: action.payload };
    case 'PRODUCT_PRICE_INPUT':
      return { ...state, price: action.payload };
    case 'PRODUCT_CATEGORY_INPUT':
      return { ...state, productCategoryId: action.payload };
    default:
      throw new Error('Unhandled action');
  }
}

function AdminProductManage() {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const body = {
    name: '',
    description: '',
    price: 0,
    workspaceId: workspaceId,
    productCategoryId: 'null',
  };

  const { addProduct } = useAdminUser();
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [state, dispatch] = useReducer(reducer, body);

  const AddProduct = () => {
    if (!state.name || !state.description) {
      setErrorMessage('상품 이름 및 설명을 입력해주세요');
      return;
    }
    if (state.price < 0) {
      setErrorMessage('가격은 음수가 될 수 없습니다.');
      return;
    }
    if (!file) {
      setErrorMessage('파일을 선택해주세요');
      return;
    }
    setErrorMessage('');
    addProduct(state, file);
  };

  const onImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.length) {
      setFile(null);
      return;
    }

    setFile(event.target.files[0]);
  };

  return (
    <>
      <div>Product manage</div>
      {errorMessage && <ErrorMessage className="error-message">{errorMessage}</ErrorMessage>}
      <AppInputWithLabel
        titleLabel={'상품 이름'}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          dispatch({ type: 'PRODUCT_NAME_INPUT', payload: event.target?.value });
        }}
      />
      <AppInputWithLabel
        titleLabel={'상품 설명'}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          dispatch({ type: 'PRODUCT_DESCRIPTION_INPUT', payload: event.target?.value });
        }}
      />
      <AppInputWithLabel
        type={'number'}
        titleLabel={'상품 가격'}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          dispatch({ type: 'PRODUCT_PRICE_INPUT', payload: event.target?.value });
        }}
      />
      <input type="file" id="img" accept="image/*" onChange={onImageChange} />
      <SelectWithOptions
        options={[
          { name: '기본', val: 'null' },
          { name: '인기', val: 1 },
        ]}
        onInput={(event: React.ChangeEvent<HTMLSelectElement>) => {
          dispatch({ type: 'PRODUCT_CATEGORY_INPUT', payload: event.target.value });
        }}
      />
      <AppButton onClick={AddProduct}>추가하기</AppButton>
    </>
  );
}

export default AdminProductManage;
