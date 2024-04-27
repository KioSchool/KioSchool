import React, { ChangeEvent, useEffect, useReducer, useState } from 'react';
import { useParams } from 'react-router-dom';
import AppButton from '@components/common/button/AppButton';
import AppInputWithLabel from '@components/common/input/AppInputWithLabel';
import styled from '@emotion/styled';
import useAdminProducts from '@hooks/admin/useAdminProducts';
import { useRecoilValue } from 'recoil';
import { categoriesAtom } from '@recoils/atoms';
import { ProductActionType, ProductStateType } from '@@types/productTypes';
import TitleNavBar from '@components/common/nav/TitleNavBar';
import SelectWithLabel from '@components/common/select/SelectWithLabelProps';
import uploadPreview from '../../resources/image/uploadPreview.png';
import NavBar from '@components/common/nav/NavBar';

const ErrorMessage = styled.div`
  padding: 0 0 5px;
  color: #ff0000;
`;

function reducer(state: ProductStateType, action: ProductActionType) {
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

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: center;
  padding-top: 100px;
  padding-bottom: 100px;
`;

const ImageInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: center;
`;

const ImageLabelContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
`;

const ImageInputButton = styled.label`
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 8px;
  background-color: #eb6d09;
  color: white;
  &:hover {
    background: #ff7b2b;
  }
`;

const ImageInput = styled.input`
  display: none;
`;

const Image = styled.img`
  width: 500px;
  height: 400px;
  border: none;
  border-radius: 15px;
  box-sizing: border-box;
  box-shadow: 1px 1px 5px 0px rgba(0, 0, 0, 0.25) inset;
  object-fit: fill;
`;

function AdminProductAdd() {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const body: ProductStateType = {
    name: '',
    description: '',
    price: 0,
    workspaceId: workspaceId,
    productCategoryId: 'null',
  };

  const { addProduct, fetchCategories } = useAdminProducts(workspaceId);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [state, dispatch] = useReducer(reducer, body);
  const productCategories = useRecoilValue(categoriesAtom);
  const imageInputRef = React.createRef<HTMLInputElement>();

  useEffect(() => {
    fetchCategories();
  }, []);
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
      <NavBar useBackground={true} />
      <Container>
        <TitleNavBar title={'상품 등록'} />
        {errorMessage && <ErrorMessage className="error-message">{errorMessage}</ErrorMessage>}
        <SelectWithLabel
          titleLabel={'카테고리'}
          options={productCategories}
          onInput={(event: React.ChangeEvent<HTMLSelectElement>) => {
            dispatch({ type: 'PRODUCT_CATEGORY_INPUT', payload: event.target.value });
          }}
        />
        <AppInputWithLabel
          titleLabel={'상품명'}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            dispatch({ type: 'PRODUCT_NAME_INPUT', payload: event.target?.value });
          }}
        />
        <ImageInputContainer>
          <ImageLabelContainer>
            <label>상품 사진</label>
            <ImageInputButton htmlFor="img">사진 업로드</ImageInputButton>
            <ImageInput type="file" id="img" accept="image/*" onChange={onImageChange} ref={imageInputRef} />
          </ImageLabelContainer>
          <Image src={file ? URL.createObjectURL(file) : uploadPreview} alt="" />
        </ImageInputContainer>
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
        <AppButton onClick={AddProduct}>추가하기</AppButton>
      </Container>
    </>
  );
}

export default AdminProductAdd;
