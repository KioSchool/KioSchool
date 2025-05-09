import React, { ChangeEvent, useEffect, useReducer, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAdminProducts from '@hooks/admin/useAdminProducts';
import { useRecoilValue } from 'recoil';
import { categoriesAtom } from '@recoils/atoms';
import SelectWithLabel from '@components/common/select/SelectWithLabel';
import AppImageInput from '@components/common/input/AppImageInput';
import AppContainer from '@components/common/container/AppContainer';
import { colFlex } from '@styles/flexStyles';
import { ProductActionType, ProductStateType } from '@@types/index';
import NewAppInput from '@components/common/input/NewAppInput';
import NewRoundedButton from '@components/common/button/NewRoundedButton';

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

    if (newFile.type !== 'image/png' && newFile.type !== 'image/jpeg') {
      alert('상품 이미지는 png 또는 jpeg 형식만 지원합니다.');
      setFile(null);
      return;
    }

    setFile(newFile);
  };

  return (
    <AppContainer
      useFlex={colFlex({ justify: 'center', align: 'center' })}
      useNavBackground={true}
      titleNavBarProps={{ title: '상품 등록' }}
      useScroll={true}
      customGap={'12px'}
    >
      <>
        <SelectWithLabel
          titleLabel={'카테고리'}
          options={productCategories}
          onInput={(event: React.ChangeEvent<HTMLSelectElement>) => {
            dispatch({ type: 'PRODUCT_CATEGORY_INPUT', payload: event.target.value });
          }}
        />
        <NewAppInput
          label={'상품명'}
          placeholder={'최대 12자까지 입력 가능합니다.'}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            dispatch({ type: 'PRODUCT_NAME_INPUT', payload: event.target?.value });
          }}
        />
        <AppImageInput title={'상품 사진'} file={file} onImageChange={onImageChange} />
        <NewAppInput
          label={'상품 설명'}
          placeholder={'최대 30자까지 입력 가능합니다.'}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            dispatch({ type: 'PRODUCT_DESCRIPTION_INPUT', payload: event.target?.value });
          }}
        />
        <NewAppInput
          label={'상품 가격'}
          type={'number'}
          placeholder={'가격을 입력해주세요'}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            dispatch({ type: 'PRODUCT_PRICE_INPUT', payload: event.target?.value });
          }}
        />
        <NewRoundedButton size={'md'} onClick={AddProduct} style={{ margin: '38px 0' }}>
          추가하기
        </NewRoundedButton>
      </>
    </AppContainer>
  );
}

export default AdminProductAdd;
