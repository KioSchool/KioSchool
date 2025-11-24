import { ChangeEvent, useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import styled from '@emotion/styled';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { useAtomValue, useSetAtom } from 'jotai';
import { adminCategoriesAtom, externalSidebarAtom } from 'src/jotai/admin/atoms';
import { ProductActionType, ProductEdit as ProductEditType, ProductStateType, RIGHT_SIDEBAR_ACTION } from '@@types/index';
import useAdminProducts from '@hooks/admin/useAdminProducts';
import { defaultProductEditValue } from '@@types/defaultValues';
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

function reducer(state: ProductEditType, action: ProductActionType) {
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

interface ProductEditProps {
  productId: number;
  onDelete: () => void;
}

function ProductEdit({ productId, onDelete }: ProductEditProps) {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const setExternalSidebar = useSetAtom(externalSidebarAtom);

  const { fetchProduct, fetchCategories, editProduct, fetchProducts } = useAdminProducts(workspaceId);
  const productCategories = useAtomValue(adminCategoriesAtom);

  const [productState, dispatch] = useReducer(reducer, defaultProductEditValue);

  const closeSidebar = () => {
    setExternalSidebar({ action: RIGHT_SIDEBAR_ACTION.CLOSE });
  };

  useEffect(() => {
    fetchCategories();
    (async () => {
      if (!productId) return;
      const data = await fetchProduct(productId);

      dispatch({ type: 'PRODUCT_NAME_INPUT', payload: data.name });
      dispatch({ type: 'PRODUCT_DESCRIPTION_INPUT', payload: data.description });
      dispatch({ type: 'PRODUCT_PRICE_INPUT', payload: data.price });
      dispatch({ type: 'PRODUCT_CATEGORY_INPUT', payload: data.productCategory });
      dispatch({ type: 'PRODUCT_IMAGE_INPUT', payload: { url: data.imageUrl, file: null } });
      dispatch({ type: 'PRODUCT_ID_INPUT', payload: data.id });
    })();
  }, [productId]);

  const handleEditProduct = async () => {
    if (!productState.name || !productState.description) {
      alert('상품 이름 및 설명을 입력해주세요');
      return;
    }

    if (productState.price < 0) {
      alert('가격은 음수가 될 수 없습니다.');
      return;
    }

    if (!productState.image.url && !productState.image.file) {
      alert('이미지를 확인해주세요');
      return;
    }

    if (productState.name.length > 12) {
      alert('상품 이름은 12자 이하로 입력해주세요');
      return;
    }

    if (productState.description.length > 30) {
      alert('상품 설명은 30자 이하로 입력해주세요');
      return;
    }

    const body: ProductStateType = {
      productId: productState.id,
      name: productState.name,
      description: productState.description,
      price: productState.price,
      workspaceId: workspaceId,
      productCategoryId: productState.productCategory?.id,
    };

    try {
      await editProduct(body, productState.image.file);
      await fetchProducts();
      alert('상품 정보가 수정되었습니다.');
      closeSidebar();
    } catch (e) {
      console.error(e);
      alert('상품 수정에 실패했습니다.');
    }
  };

  const onImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.length) return;

    const newFile = event.target.files[0];
    if (newFile.size > 1024 * 1024 * 5) {
      alert('상품 이미지는 5MB 이하로 업로드 가능합니다.');
      return;
    }

    const newFileURL = URL.createObjectURL(newFile);
    dispatch({ type: 'PRODUCT_IMAGE_INPUT', payload: { url: newFileURL, file: newFile } });
  };

  return (
    <Container>
      <InputContainer>
        <InputColContainer>
          <InputLabel>카테고리</InputLabel>
          <SelectWithOptions
            options={productCategories}
            value={productState.productCategory?.id || ''}
            onChange={(event: ChangeEvent<HTMLSelectElement>) => {
              dispatch({ type: 'PRODUCT_CATEGORY_INPUT', payload: event.target.value });
            }}
            width={'100%'}
            isUseDefaultOption={false}
          />
        </InputColContainer>

        <InputColContainer>
          <InputLabel>상품명</InputLabel>
          <NewAppInput
            placeholder={'최대 12자까지 가능합니다.'}
            value={productState.name}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              dispatch({ type: 'PRODUCT_NAME_INPUT', payload: event.target?.value });
            }}
            width={'100%'}
          />
        </InputColContainer>

        <InputColContainer>
          <InputLabel>상품 가격</InputLabel>
          <NewAppInput
            value={productState.price}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              dispatch({ type: 'PRODUCT_PRICE_INPUT', payload: event.target?.value });
            }}
            width={'100%'}
          />
        </InputColContainer>

        <InputColContainer>
          <AppImageInput
            title={'상품 사진'}
            url={productState.image.url}
            file={productState.image.file}
            onImageChange={onImageChange}
            width={224}
            height={224}
          />
        </InputColContainer>

        <InputColContainer>
          <InputLabel>상품 설명</InputLabel>
          <NewAppInput
            placeholder={'최대 30자까지 입력 가능합니다.'}
            value={productState.description}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              dispatch({ type: 'PRODUCT_DESCRIPTION_INPUT', payload: event.target?.value });
            }}
            width={'100%'}
          />
        </InputColContainer>
      </InputContainer>

      <SubmitContainer>
        <NewCommonButton onClick={onDelete} customSize={{ width: 106, height: 40 }} color="blue_gray">
          삭제
        </NewCommonButton>
        <NewCommonButton onClick={handleEditProduct} customSize={{ width: 106, height: 40 }}>
          변경 완료
        </NewCommonButton>
      </SubmitContainer>
    </Container>
  );
}

export default ProductEdit;
