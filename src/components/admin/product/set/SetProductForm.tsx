import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { useAtomValue } from 'jotai';

import NewCommonButton from '@components/common/button/NewCommonButton';
import ProductCustomerPreview from '@components/admin/product/ProductCustomerPreview';
import { MAX_PRODUCT_IMAGE_SIZE } from '@constants/data/productData';
import { adminCategoriesAtom, adminProductsAtom } from '@jotai/admin/atoms';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { tabletMediaQuery } from '@styles/globalStyles';
import { SetProductRequest } from '@@types/index';
import { SetProductFormInitialValue, SetProductFormValue } from '@@types/setProduct';
import { createEmptySetComponent, parseSetPrice, toSetProductComponentRequests, validateSetProductForm } from '@utils/setProduct';

import SetProductBasicFields from './SetProductBasicFields';
import SetProductComponentsField from './SetProductComponentsField';
import SetProductPriceFields from './SetProductPriceFields';

const Form = styled.form`
  height: 100%;
  min-height: 0;
  ${colFlex()}
`;

const Body = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 360px;
  flex: 1;
  min-height: 0;

  ${tabletMediaQuery} {
    grid-template-columns: minmax(0, 1fr) 330px;
  }
`;

const Fields = styled.div`
  overflow-y: auto;
  padding: 28px 32px 40px;
  gap: 30px;
  ${colFlex()}
`;

const PreviewArea = styled.div`
  overflow-y: auto;
  padding: 28px 24px;
  border-left: 1px solid ${Color.BORDER_GREY};
  ${rowFlex({ justify: 'center', align: 'flex-start' })}
`;

const Footer = styled.div`
  flex-shrink: 0;
  min-height: 76px;
  padding: 16px 28px;
  border-top: 1px solid ${Color.BORDER_GREY};
  box-sizing: border-box;
  background: ${Color.WHITE};
  ${rowFlex({ justify: 'space-between', align: 'center' })}
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

interface SetProductFormProps {
  mode: 'ADD' | 'EDIT';
  workspaceId: string;
  initialValues?: SetProductFormInitialValue;
  onSubmit: (request: SetProductRequest, file: File | null) => Promise<void>;
  onCancel: () => void;
  onDelete?: () => void;
}

function createInitialValue(initialValues?: SetProductFormInitialValue): SetProductFormValue {
  if (!initialValues) {
    return {
      name: '',
      description: '',
      productCategoryId: null,
      originalPrice: '',
      discountPrice: '0',
      image: { url: '', file: null },
      components: [createEmptySetComponent('component-1')],
    };
  }

  return {
    name: initialValues.name,
    description: initialValues.description,
    productCategoryId: initialValues.productCategory?.id ?? null,
    originalPrice: String(initialValues.originalPrice ?? ''),
    discountPrice: String(initialValues.discountPrice ?? 0),
    image: { url: initialValues.imageUrl, file: null },
    components: initialValues.components.map((component, index) => ({
      key: `component-${component.id || index + 1}`,
      name: component.name,
      quantity: component.quantity,
      conditionProductId: component.conditionProduct?.id ?? null,
    })),
  };
}

function getSubmitButtonText(mode: 'ADD' | 'EDIT', isSubmitting: boolean) {
  if (isSubmitting) return '저장 중...';
  if (mode === 'EDIT') return '변경 완료';
  return '세트 추가';
}

function SetProductForm({ mode, workspaceId, initialValues, onSubmit, onCancel, onDelete }: SetProductFormProps) {
  const categories = useAtomValue(adminCategoriesAtom);
  const products = useAtomValue(adminProductsAtom);
  const [value, setValue] = useState<SetProductFormValue>(() => createInitialValue(initialValues));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const componentKeyRef = useRef(value.components.length + 1);
  const selectedCategory = categories.find((category) => category.id === value.productCategoryId);
  const originalPrice = parseSetPrice(value.originalPrice) ?? 0;
  const discountPrice = parseSetPrice(value.discountPrice) ?? 0;
  const salePrice = Math.max(originalPrice - discountPrice, 0);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (file.size > MAX_PRODUCT_IMAGE_SIZE) {
      alert('상품 이미지는 5MB 이하로 업로드 가능합니다.');
      return;
    }

    setValue((previous) => ({ ...previous, image: { url: URL.createObjectURL(file), file } }));
  };

  const handleAddComponent = () => {
    const key = `component-${componentKeyRef.current}`;
    componentKeyRef.current += 1;
    setValue((previous) => ({ ...previous, components: [...previous.components, createEmptySetComponent(key)] }));
  };

  const handleChangeComponent = (index: number, component: SetProductFormValue['components'][number]) => {
    setValue((previous) => ({
      ...previous,
      components: previous.components.map((item, itemIndex) => (itemIndex === index ? component : item)),
    }));
  };

  const handleMoveComponent = (index: number, direction: -1 | 1) => {
    setValue((previous) => {
      const nextComponents = [...previous.components];
      const targetIndex = index + direction;
      if (targetIndex < 0 || targetIndex >= nextComponents.length) return previous;
      [nextComponents[index], nextComponents[targetIndex]] = [nextComponents[targetIndex], nextComponents[index]];
      return { ...previous, components: nextComponents };
    });
  };

  const handleDeleteComponent = (index: number) => {
    setValue((previous) => ({ ...previous, components: previous.components.filter((_, itemIndex) => itemIndex !== index) }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    const errorMessage = validateSetProductForm(value);
    if (errorMessage) {
      alert(errorMessage);
      return;
    }

    const parsedOriginalPrice = parseSetPrice(value.originalPrice);
    const parsedDiscountPrice = parseSetPrice(value.discountPrice);
    if (parsedOriginalPrice === null || parsedDiscountPrice === null) return;

    const request: SetProductRequest = {
      workspaceId: Number(workspaceId),
      productId: mode === 'EDIT' ? initialValues?.id : undefined,
      name: value.name.trim(),
      description: value.description.trim(),
      productCategoryId: value.productCategoryId,
      originalPrice: parsedOriginalPrice,
      discountPrice: parsedDiscountPrice,
      components: toSetProductComponentRequests(value.components),
    };

    setIsSubmitting(true);
    try {
      await onSubmit(request, value.image.file);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Body>
        <Fields>
          <SetProductBasicFields value={value} categories={categories} onChange={setValue} onImageChange={handleImageChange} />
          <SetProductComponentsField
            components={value.components}
            products={products}
            onAdd={handleAddComponent}
            onChange={handleChangeComponent}
            onMove={handleMoveComponent}
            onDelete={handleDeleteComponent}
          />
          <SetProductPriceFields value={value} onChange={setValue} />
        </Fields>

        <PreviewArea>
          <ProductCustomerPreview
            name={value.name}
            description={value.description}
            categoryName={selectedCategory?.name ?? '기본메뉴'}
            imageUrl={value.image.url}
            originalPrice={originalPrice}
            discountPrice={discountPrice}
            salePrice={salePrice}
            components={value.components}
            isSet
          />
        </PreviewArea>
      </Body>

      <Footer>
        {mode === 'EDIT' && onDelete && (
          <DeleteButton type="button" onClick={onDelete}>
            세트 삭제
          </DeleteButton>
        )}
        <SubmitActions>
          <NewCommonButton type="button" size="sm" color="blue_gray" onClick={onCancel}>
            취소
          </NewCommonButton>
          <NewCommonButton type="submit" size="sm" disabled={isSubmitting}>
            {getSubmitButtonText(mode, isSubmitting)}
          </NewCommonButton>
        </SubmitActions>
      </Footer>
    </Form>
  );
}

export default SetProductForm;
