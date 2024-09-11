import React, { ChangeEvent, useEffect, useReducer, useState } from 'react';
import { useParams } from 'react-router-dom';
import AppButton from '@components/common/button/AppButton';
import AppInputWithLabel from '@components/common/input/AppInputWithLabel';
import styled from '@emotion/styled';
import useAdminProducts from '@hooks/admin/useAdminProducts';
import { useRecoilValue } from 'recoil';
import { categoriesAtom } from '@recoils/atoms';
import { ProductActionType, ProductStateType } from '@@types/productTypes';
import SelectWithLabel from '@components/common/select/SelectWithLabelProps';
import AppImageInput from '@components/common/input/AppImageInput';
import AppContainer from '@components/common/container/AppContainer';
import { colFlex } from '@styles/flexStyles';

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
  width: 100%;
  height: 100%;
  padding-bottom: 20px;
  gap: 15px;
  ${colFlex({ align: 'center' })}
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
  const [file, setFile] = useState<File | null>(null);
  const [state, dispatch] = useReducer(reducer, body);
  const productCategories = useRecoilValue(categoriesAtom);

  useEffect(() => {
    fetchCategories();
  }, []);
  const AddProduct = () => {
    if (!state.name || !state.description) {
      alert('상품 이름 및 설명을 입력해주세요');
      return;
    }
    if (state.price < 0) {
      alert('가격은 음수가 될 수 없습니다.');
      return;
    }
    if (!file) {
      alert('파일을 선택해주세요');
      return;
    }

    if (state.name.length > 12) {
      alert('상품 이름은 12자 이하로 입력해주세요');
      return;
    }

    if (state.description.length > 30) {
      alert('상품 설명은 30자 이하로 입력해주세요');
      return;
    }

    addProduct(state, file);
  };

  const onImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.length) {
      setFile(null);
      return;
    }

    const newFile = event.target.files[0];
    if (newFile.size > 1024 * 1024 * 5) {
      alert('상품 이미지는 5MB 이하로 업로드 가능합니다.');
      setFile(null);
      return;
    }

    setFile(newFile);
  };

  return (
    <AppContainer useFlex={colFlex({ justify: 'center' })} useNavBackground={true} titleNavBarProps={{ title: '상품 등록' }} useScroll={true}>
      <Container>
        <SelectWithLabel
          titleLabel={'카테고리'}
          options={productCategories}
          onInput={(event: React.ChangeEvent<HTMLSelectElement>) => {
            dispatch({ type: 'PRODUCT_CATEGORY_INPUT', payload: event.target.value });
          }}
        />
        <AppInputWithLabel
          titleLabel={'상품명'}
          messageLabel={'최대 12자'}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            dispatch({ type: 'PRODUCT_NAME_INPUT', payload: event.target?.value });
          }}
        />
        <AppImageInput title={'상품 사진'} file={file} onImageChange={onImageChange} />
        <AppInputWithLabel
          titleLabel={'상품 설명'}
          messageLabel={'최대 30자'}
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
    </AppContainer>
  );
}

export default AdminProductAdd;
