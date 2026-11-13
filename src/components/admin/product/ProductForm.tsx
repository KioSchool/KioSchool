import { ChangeEvent, useEffect, useReducer } from 'react';
import styled from '@emotion/styled';
import { useAtomValue } from 'jotai';

import NewCommonButton from '@components/common/button/NewCommonButton';
import { MAX_PRODUCT_IMAGE_SIZE } from '@constants/data/productData';
import { adminCategoriesAtom } from '@jotai/admin/atoms';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { AdminProduct, ProductStateType } from '@@types/index';

import ProductBasicFields from './ProductBasicFields';
import { createProductFormState, MAX_PRODUCT_DESCRIPTION_LENGTH, MAX_PRODUCT_NAME_LENGTH, reduceProductForm } from './productFormState';

const Container = styled.div`
  width: 100%;
  gap: 28px;
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

  const [state, dispatch] = useReducer(reduceProductForm, initialValues, createProductFormState);

  useEffect(() => {
    dispatch({ type: 'PRODUCT_RESET', payload: createProductFormState(initialValues) });
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
      <ProductBasicFields
        value={state}
        categories={productCategories}
        onCategoryChange={(categoryId) => dispatch({ type: 'PRODUCT_CATEGORY_INPUT', payload: categoryId })}
        onNameChange={(name) => dispatch({ type: 'PRODUCT_NAME_INPUT', payload: name })}
        onPriceChange={(price) => dispatch({ type: 'PRODUCT_PRICE_INPUT', payload: price })}
        onDescriptionChange={(description) => dispatch({ type: 'PRODUCT_DESCRIPTION_INPUT', payload: description })}
        onImageChange={handleImageChange}
      />

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
