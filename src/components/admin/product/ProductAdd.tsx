import { ChangeEvent, useEffect, useReducer, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from '@emotion/styled';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { useAtomValue, useSetAtom } from 'jotai';
import { adminCategoriesAtom, externalSidebarAtom } from 'src/jotai/admin/atoms';
import { ProductActionType, ProductStateType, RIGHT_SIDEBAR_ACTION } from '@@types/index';
import useAdminProducts from '@hooks/admin/useAdminProducts';
import SelectWithOptions from '@components/common/select/SelectWithOptions';
import AppImageInput from '@components/common/input/AppImageInput';
import NewAppInput from '@components/common/input/NewAppInput';
import NewCommonButton from '@components/common/button/NewCommonButton';

const Container = styled.div`
  height: 100%;
  gap: 24px;
  overflow-y: auto;
  padding-top: 24px;
  padding-bottom: 100px;
  ${colFlex({ justify: 'space-between', align: 'center' })};
`;

const InputContainer = styled.div`
  width: 100%;
  gap: 12px;
  color: #464a4d;
  ${colFlex({ justify: 'center', align: 'start' })};
`;

const InputLabel = styled.div`
  width: 100%;
  font-size: 16px;
  font-weight: 700;
  ${colFlex({ justify: 'center', align: 'start' })};
`;

const InputColContainer = styled.div`
  width: 100%;
  gap: 4px;
  ${colFlex({ justify: 'center', align: 'center' })};
`;

const SubmitContainer = styled.div`
  width: 100%;
  gap: 10px;
  padding-top: 20px;
  ${rowFlex({ justify: 'center', align: 'center' })};
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

function ProductAdd() {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const setExternalSidebar = useSetAtom(externalSidebarAtom);

  const body: ProductStateType = {
    name: '',
    description: '',
    price: 0,
    workspaceId: workspaceId,
    productCategoryId: 'null',
  };

  const { addProduct, fetchCategories, fetchProducts } = useAdminProducts(workspaceId);
  const [file, setFile] = useState<File | null>(null);
  const [state, dispatch] = useReducer(reducer, body);
  const productCategories = useAtomValue(adminCategoriesAtom);

  useEffect(() => {
    fetchCategories();
  }, []);

  const closeSidebar = () => {
    setExternalSidebar({ action: RIGHT_SIDEBAR_ACTION.CLOSE });
  };

  const AddProduct = async () => {
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

    try {
      await addProduct(state, file);
      await fetchProducts();
      alert('상품이 추가되었습니다.');
      closeSidebar();
    } catch (e) {
      console.error(e);
      alert('상품 추가에 실패했습니다.');
    }
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
    <Container>
      <InputContainer>
        <InputColContainer>
          <InputLabel>카테고리</InputLabel>
          <SelectWithOptions
            options={productCategories}
            value={state.productCategoryId}
            onChange={(event: ChangeEvent<HTMLSelectElement>) => {
              dispatch({ type: 'PRODUCT_CATEGORY_INPUT', payload: event.target.value });
            }}
            width={'100%'}
            isUseDefaultOption={true}
          />
        </InputColContainer>

        <InputColContainer>
          <InputLabel>상품명</InputLabel>
          <NewAppInput
            placeholder={'최대 12자까지 가능합니다.'}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              dispatch({ type: 'PRODUCT_NAME_INPUT', payload: event.target?.value });
            }}
            width={'100%'}
          />
        </InputColContainer>

        <InputColContainer>
          <InputLabel>상품 가격</InputLabel>
          <NewAppInput
            placeholder={'가격을 입력해주세요'}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              dispatch({ type: 'PRODUCT_PRICE_INPUT', payload: event.target?.value });
            }}
            width={'100%'}
          />
        </InputColContainer>

        <InputColContainer>
          <AppImageInput title={'상품 사진'} file={file} onImageChange={onImageChange} width={220} height={220} />
        </InputColContainer>

        <InputColContainer>
          <InputLabel>상품 설명</InputLabel>
          <NewAppInput
            placeholder={'최대 30자까지 입력 가능합니다.'}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              dispatch({ type: 'PRODUCT_DESCRIPTION_INPUT', payload: event.target?.value });
            }}
            width={'100%'}
          />
        </InputColContainer>
      </InputContainer>

      <SubmitContainer>
        <NewCommonButton onClick={closeSidebar} customSize={{ width: 106, height: 40 }} color="blue_gray">
          삭제
        </NewCommonButton>
        <NewCommonButton onClick={AddProduct} customSize={{ width: 106, height: 40 }}>
          추가 완료
        </NewCommonButton>
      </SubmitContainer>
    </Container>
  );
}

export default ProductAdd;
