import { ChangeEvent, useEffect, useReducer } from 'react';
import styled from '@emotion/styled';
import { useAtomValue } from 'jotai';

import NewCommonButton from '@components/common/button/NewCommonButton';
import NewAppInput from '@components/common/input/NewAppInput';
import NewAppTextarea from '@components/common/input/NewAppTextarea';
import SelectWithOptions from '@components/common/select/SelectWithOptions';
import { MAX_PRODUCT_IMAGE_SIZE } from '@constants/data/productData';
import { adminCategoriesAtom } from '@jotai/admin/atoms';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { AdminProduct, ProductStateType } from '@@types/index';

import ProductImageField from './ProductImageField';

const Container = styled.div`
  width: 100%;
  gap: 28px;
  ${colFlex()};
`;

const Fields = styled.div`
  width: 100%;
  gap: 16px;
  color: ${Color.TEXT_BODY};
  ${colFlex()}
`;

const SectionHeading = styled.div`
  gap: 4px;
  ${colFlex()}
`;

const SectionTitle = styled.h3`
  margin: 0;
  font-size: 18px;
  color: ${Color.TEXT_STRONG};
`;

const SectionDescription = styled.p`
  margin: 0;
  font-size: 13px;
  color: ${Color.MUTED_GREY};
`;

const InputLabel = styled.div`
  width: 100%;
  font-size: 16px;
  font-weight: 700;
  ${colFlex({ justify: 'center', align: 'start' })};
`;

const Field = styled.label`
  min-width: 0;
  width: 100%;
  gap: 7px;
  ${colFlex()};
`;

const SubmitContainer = styled.div`
  position: sticky;
  bottom: 0;
  z-index: 5;
  margin: 0 -28px -28px;
  padding: 16px 28px;
  border-top: 1px solid ${Color.BORDER_GREY};
  background: ${Color.WHITE};
  ${rowFlex({ justify: 'space-between', align: 'center' })};
`;

const DeleteButton = styled.button`
  padding: 8px 4px;
  border: none;
  background: transparent;
  font-size: 13px;
  font-weight: 700;
  color: ${Color.RED};
  cursor: pointer;
`;

const SubmitActions = styled.div`
  gap: 8px;
  margin-left: auto;
  ${rowFlex({ align: 'center' })}
`;

const MAX_PRODUCT_NAME_LENGTH = 12;
const MAX_PRODUCT_DESCRIPTION_LENGTH = 30;

interface ProductFormState {
  id?: number;
  name: string;
  description: string;
  price: string | number;
  productCategory: {
    id: string | number;
    name: string;
  };
  image: {
    url: string;
    file: File | null;
  };
}

type ProductFormAction =
  | { type: 'PRODUCT_RESET'; payload: ProductFormState }
  | { type: 'PRODUCT_NAME_INPUT'; payload: string }
  | { type: 'PRODUCT_DESCRIPTION_INPUT'; payload: string }
  | { type: 'PRODUCT_PRICE_INPUT'; payload: string }
  | { type: 'PRODUCT_CATEGORY_INPUT'; payload: string }
  | { type: 'PRODUCT_IMAGE_INPUT'; payload: ProductFormState['image'] };

function createInitialState(initialValues?: AdminProduct): ProductFormState {
  if (!initialValues) {
    return {
      name: '',
      description: '',
      price: 0,
      productCategory: { id: 'null', name: '' },
      image: { url: '', file: null },
    };
  }

  return {
    id: initialValues.id,
    name: initialValues.name,
    description: initialValues.description,
    price: initialValues.price,
    productCategory: {
      id: initialValues.productCategory?.id ?? 'null',
      name: initialValues.productCategory?.name ?? '',
    },
    image: { url: initialValues.imageUrl, file: null },
  };
}

function reducer(state: ProductFormState, action: ProductFormAction): ProductFormState {
  switch (action.type) {
    case 'PRODUCT_RESET':
      return action.payload;
    case 'PRODUCT_NAME_INPUT':
      return { ...state, name: action.payload };
    case 'PRODUCT_DESCRIPTION_INPUT':
      return { ...state, description: action.payload };
    case 'PRODUCT_PRICE_INPUT':
      return { ...state, price: action.payload };
    case 'PRODUCT_CATEGORY_INPUT':
      return { ...state, productCategory: { ...state.productCategory, id: action.payload } };
    case 'PRODUCT_IMAGE_INPUT':
      return { ...state, image: action.payload };
    default:
      throw new Error('Unhandled action');
  }
}

interface ProductFormProps {
  mode: 'ADD' | 'EDIT';
  workspaceId: string | undefined;
  initialValues?: AdminProduct;
  onSubmit: (formData: ProductStateType, file: File | null) => Promise<void>;
  onCancel: () => void;
  onDelete?: () => void;
}

function ProductForm({ mode, workspaceId, initialValues, onSubmit, onCancel, onDelete }: ProductFormProps) {
  const productCategories = useAtomValue(adminCategoriesAtom);

  const [state, dispatch] = useReducer(reducer, initialValues, createInitialState);

  useEffect(() => {
    dispatch({ type: 'PRODUCT_RESET', payload: createInitialState(initialValues) });
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

    const price = Number(state.price);
    if (price < 0) {
      alert('가격은 음수가 될 수 없습니다.');
      return;
    }

    if (!state.image?.url && !state.image?.file) {
      alert('이미지를 확인해주세요');
      return;
    }

    if (state.name.length > MAX_PRODUCT_NAME_LENGTH) {
      alert('상품 이름은 12자 이하로 입력해주세요');
      return;
    }

    if (state.description.length > MAX_PRODUCT_DESCRIPTION_LENGTH) {
      alert('상품 설명은 30자 이하로 입력해주세요');
      return;
    }

    const formData: ProductStateType = {
      productId: state.id ? String(state.id) : undefined,
      name: state.name,
      description: state.description,
      price,
      workspaceId,
      productCategoryId: state.productCategory.id,
    };

    await onSubmit(formData, state.image.file);
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
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

      <ProductImageField
        url={state.image.url}
        file={state.image.file}
        description="메뉴를 한눈에 알아볼 수 있는 대표 사진을 등록해주세요. 일반 메뉴는 이미지 등록이 필수입니다."
        onImageChange={handleImageChange}
      />

      <Fields>
        <Field>
          <InputLabel>카테고리</InputLabel>
          <SelectWithOptions
            options={productCategories}
            value={state.productCategory.id || ''}
            onChange={(event: ChangeEvent<HTMLSelectElement>) => {
              dispatch({ type: 'PRODUCT_CATEGORY_INPUT', payload: event.target.value });
            }}
            width="100%"
          />
        </Field>

        <Field>
          <InputLabel>상품명</InputLabel>
          <NewAppInput
            placeholder={'최대 12자까지 가능합니다.'}
            value={state.name}
            maxLength={MAX_PRODUCT_NAME_LENGTH}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              dispatch({ type: 'PRODUCT_NAME_INPUT', payload: event.target?.value });
            }}
            width="100%"
          />
        </Field>

        <Field>
          <InputLabel>상품 가격</InputLabel>
          <NewAppInput
            value={state.price}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              dispatch({ type: 'PRODUCT_PRICE_INPUT', payload: event.target?.value });
            }}
            width="100%"
          />
        </Field>

        <Field>
          <InputLabel>상품 설명</InputLabel>
          <NewAppTextarea
            placeholder={'최대 30자까지 가능합니다.'}
            value={state.description}
            maxLength={MAX_PRODUCT_DESCRIPTION_LENGTH}
            onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
              dispatch({ type: 'PRODUCT_DESCRIPTION_INPUT', payload: event.target?.value });
            }}
            width="100%"
          />
        </Field>
      </Fields>

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
