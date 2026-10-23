import { ChangeEvent, useEffect, useReducer } from 'react';
import styled from '@emotion/styled';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { useAtomValue } from 'jotai';
import { adminCategoriesAtom } from '@jotai/admin/atoms';
import { ProductActionType, ProductStateType } from '@@types/index';
import { defaultProductEditValue } from '@@types/defaultValues';
import SelectWithOptions from '@components/common/select/SelectWithOptions';
import AppImageInput from '@components/common/input/AppImageInput';
import NewAppInput from '@components/common/input/NewAppInput';
import NewCommonButton from '@components/common/button/NewCommonButton';
import { MAX_PRODUCT_IMAGE_SIZE } from '@constants/data/productData';
import NewAppTextarea from '@components/common/input/NewAppTextarea';

const Container = styled.div`
  width: 100%;
  gap: 28px;
  ${colFlex()};
`;

const InputContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 16px;
  color: #464a4d;
`;

const SectionHeading = styled.div`
  gap: 4px;
  ${colFlex()}
`;

const SectionTitle = styled.h3`
  margin: 0;
  font-size: 18px;
  color: #25282b;
`;

const SectionDescription = styled.p`
  margin: 0;
  font-size: 13px;
  color: #8d959c;
`;

const InputLabel = styled.div`
  width: 100%;
  font-size: 16px;
  font-weight: 700;
  ${colFlex({ justify: 'center', align: 'start' })};
`;

const InputColContainer = styled.div`
  min-width: 0;
  width: 100%;
  gap: 7px;
  ${colFlex()};
`;

const WideInputContainer = styled(InputColContainer)`
  grid-column: 1 / -1;
`;

const ImageInputContainer = styled.div`
  align-self: flex-start;
`;

const SubmitContainer = styled.div`
  position: sticky;
  bottom: 0;
  z-index: 5;
  margin: 0 -28px -28px;
  padding: 16px 28px;
  border-top: 1px solid #e8eef2;
  background: rgba(255, 255, 255, 0.96);
  backdrop-filter: blur(8px);
  ${rowFlex({ justify: 'space-between', align: 'center' })};
`;

const DeleteButton = styled.button`
  padding: 8px 4px;
  border: none;
  background: transparent;
  font-size: 13px;
  font-weight: 700;
  color: #ff5a5a;
  cursor: pointer;
`;

const SubmitActions = styled.div`
  gap: 8px;
  margin-left: auto;
  ${rowFlex({ align: 'center' })}
`;

function reducer(state: any, action: ProductActionType) {
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

interface ProductFormProps {
  mode: 'ADD' | 'EDIT';
  workspaceId: string | undefined;
  initialValues?: ProductStateType | any;
  onSubmit: (formData: ProductStateType, file: File | null) => Promise<void>;
  onCancel: () => void;
  onDelete?: () => void;
}

function ProductForm({ mode, workspaceId, initialValues, onSubmit, onCancel, onDelete }: ProductFormProps) {
  const productCategories = useAtomValue(adminCategoriesAtom);

  const initialState = initialValues || {
    ...defaultProductEditValue,
    productCategory: { id: 'null', name: '' },
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (initialValues) {
      dispatch({ type: 'PRODUCT_NAME_INPUT', payload: initialValues.name });
      dispatch({ type: 'PRODUCT_DESCRIPTION_INPUT', payload: initialValues.description });
      dispatch({ type: 'PRODUCT_PRICE_INPUT', payload: initialValues.price });
      dispatch({ type: 'PRODUCT_CATEGORY_INPUT', payload: initialValues.productCategory });
      dispatch({ type: 'PRODUCT_IMAGE_INPUT', payload: { url: initialValues.imageUrl, file: null } });
      dispatch({ type: 'PRODUCT_ID_INPUT', payload: initialValues.id });
    }
  }, [initialValues]);

  const isPriceNumeric = (price: string | number) => /^\d+$/.test(String(price).trim());

  const handleSubmit = async () => {
    if (!state.name || !state.description) {
      alert('상품 이름 및 설명을 입력해주세요');
      return;
    }

    if (!isPriceNumeric(state.price)) {
      alert('상품 가격은 숫자만 입력해주세요.');
      return;
    }

    if (state.price < 0) {
      alert('가격은 음수가 될 수 없습니다.');
      return;
    }

    if (!state.image?.url && !state.image?.file) {
      alert('이미지를 확인해주세요');
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

    const formData: ProductStateType = {
      productId: state.id ? String(state.id) : undefined,
      name: state.name,
      description: state.description,
      price: state.price,
      workspaceId: workspaceId,
      productCategoryId: state.productCategory?.id,
    };

    await onSubmit(formData, state.image?.file);
  };

  const onImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.length) return;

    const newFile = event.target.files[0];
    if (newFile.size > MAX_PRODUCT_IMAGE_SIZE) {
      alert('상품 이미지는 5MB 이하로 업로드 가능합니다.');
      return;
    }

    const newFileURL = URL.createObjectURL(newFile);
    dispatch({ type: 'PRODUCT_IMAGE_INPUT', payload: { url: newFileURL, file: newFile } });
  };

  const isEditMode = mode === 'EDIT';

  const primaryButtonText = isEditMode ? '변경 완료' : '추가 완료';

  return (
    <Container>
      <SectionHeading>
        <SectionTitle>기본 정보</SectionTitle>
        <SectionDescription>손님 주문 화면에 보일 메뉴 이름과 설명, 가격을 입력해주세요.</SectionDescription>
      </SectionHeading>
      <InputContainer>
        <WideInputContainer>
          <InputLabel>카테고리</InputLabel>
          <SelectWithOptions
            options={productCategories}
            value={state.productCategory?.id || ''}
            onChange={(event: ChangeEvent<HTMLSelectElement>) => {
              dispatch({ type: 'PRODUCT_CATEGORY_INPUT', payload: event.target.value });
            }}
            width={'100%'}
          />
        </WideInputContainer>

        <WideInputContainer>
          <InputLabel>상품명</InputLabel>
          <NewAppInput
            placeholder={'최대 12자까지 가능합니다.'}
            value={state.name}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              dispatch({ type: 'PRODUCT_NAME_INPUT', payload: event.target?.value });
            }}
            width={'100%'}
          />
        </WideInputContainer>

        <WideInputContainer>
          <InputLabel>상품 가격</InputLabel>
          <NewAppInput
            value={state.price}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              dispatch({ type: 'PRODUCT_PRICE_INPUT', payload: event.target?.value });
            }}
            width={'100%'}
          />
        </WideInputContainer>

        <ImageInputContainer>
          <AppImageInput title={'상품 사진'} url={state.image?.url} file={state.image?.file} onImageChange={onImageChange} width={224} height={224} />
        </ImageInputContainer>

        <InputColContainer>
          <InputLabel>상품 설명</InputLabel>
          <NewAppTextarea
            placeholder={'최대 30자까지 가능합니다.'}
            value={state.description}
            onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
              dispatch({ type: 'PRODUCT_DESCRIPTION_INPUT', payload: event.target?.value });
            }}
            width={'100%'}
          />
        </InputColContainer>
      </InputContainer>

      <SubmitContainer>
        {isEditMode && onDelete && (
          <DeleteButton type="button" onClick={onDelete}>
            메뉴 삭제
          </DeleteButton>
        )}
        <SubmitActions>
          <NewCommonButton type="button" size="sm" color="blue_gray" onClick={onCancel}>
            취소
          </NewCommonButton>
          <NewCommonButton type="button" size="sm" onClick={handleSubmit}>
            {primaryButtonText}
          </NewCommonButton>
        </SubmitActions>
      </SubmitContainer>
    </Container>
  );
}

export default ProductForm;
