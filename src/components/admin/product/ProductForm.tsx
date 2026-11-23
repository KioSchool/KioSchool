import { ChangeEvent, FormEvent, useState } from 'react';
import styled from '@emotion/styled';
import { useAtomValue } from 'jotai';

import NewCommonButton from '@components/common/button/NewCommonButton';
import AppImageInput from '@components/common/input/AppImageInput';
import NewAppInput from '@components/common/input/NewAppInput';
import NewAppTextarea from '@components/common/input/NewAppTextarea';
import SelectWithOptions from '@components/common/select/SelectWithOptions';
import { MAX_PRODUCT_IMAGE_SIZE } from '@constants/data/productData';
import { adminCategoriesAtom } from '@jotai/admin/atoms';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { tabletMediaQuery } from '@styles/globalStyles';
import { ProductStateType } from '@@types/index';

import ProductCustomerPreview from './ProductCustomerPreview';

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
  gap: 26px;
  ${colFlex()}
`;

const PreviewArea = styled.div`
  overflow-y: auto;
  padding: 28px 24px;
  border-left: 1px solid ${Color.BORDER_GREY};
  ${rowFlex({ justify: 'center', align: 'flex-start' })}
`;

const Section = styled.section`
  gap: 16px;
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
  line-height: 1.5;
  color: ${Color.TEXT_SUBTLE};
`;

const ImageField = styled.div`
  align-self: flex-start;

  .app-image-input {
    align-items: flex-start;
  }

  .image,
  .upload-image-wrapper {
    border-radius: 16px;
  }

  .image {
    object-fit: cover;
  }
`;

const FieldGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 18px 16px;
`;

const Field = styled.label`
  min-width: 0;
  gap: 7px;
  ${colFlex()}
`;

const WideField = styled(Field)`
  grid-column: 1 / -1;
`;

const FieldLabel = styled.span`
  font-size: 14px;
  font-weight: 700;
  color: ${Color.TEXT_STRONG};
`;

const Footer = styled.footer`
  flex-shrink: 0;
  min-height: 76px;
  padding: 16px 28px;
  border-top: 1px solid ${Color.BORDER_GREY};
  box-sizing: border-box;
  background: ${Color.WHITE};
  ${rowFlex({ justify: 'space-between', align: 'center' })}
`;

const RequiredNotice = styled.span`
  font-size: 12px;
  color: ${Color.TEXT_SUBTLE};
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

const Actions = styled.div`
  gap: 8px;
  margin-left: auto;
  ${rowFlex({ align: 'center' })}
`;

interface ProductFormState {
  id?: number;
  name: string;
  description: string;
  price: string;
  productCategory: {
    id: number | string;
    name: string;
  };
  image: {
    url: string;
    file: File | null;
  };
}

interface ProductFormProps {
  mode: 'ADD' | 'EDIT';
  workspaceId: string | undefined;
  initialValues?: {
    id: number;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    productCategory: { id: number; name: string } | null;
  };
  onSubmit: (formData: ProductStateType, file: File | null) => Promise<void>;
  onCancel: () => void;
  onDelete?: () => void;
}

function createInitialState(initialValues?: ProductFormProps['initialValues']): ProductFormState {
  if (!initialValues) {
    return {
      name: '',
      description: '',
      price: '',
      productCategory: { id: 'null', name: '기본메뉴' },
      image: { url: '', file: null },
    };
  }

  return {
    id: initialValues.id,
    name: initialValues.name,
    description: initialValues.description,
    price: String(initialValues.price),
    productCategory: initialValues.productCategory ?? { id: 'null', name: '기본메뉴' },
    image: { url: initialValues.imageUrl, file: null },
  };
}

function getSubmitButtonText(mode: 'ADD' | 'EDIT', isSubmitting: boolean) {
  if (isSubmitting) return '저장 중...';
  if (mode === 'EDIT') return '변경 완료';
  return '메뉴 추가';
}

function ProductForm({ mode, workspaceId, initialValues, onSubmit, onCancel, onDelete }: ProductFormProps) {
  const productCategories = useAtomValue(adminCategoriesAtom);
  const [value, setValue] = useState<ProductFormState>(() => createInitialState(initialValues));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const selectedCategory = productCategories.find((category) => String(category.id) === String(value.productCategory.id));
  const categoryName = selectedCategory?.name ?? '기본메뉴';
  const price = Number(value.price) || 0;

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (file.size > MAX_PRODUCT_IMAGE_SIZE) {
      alert('상품 이미지는 5MB 이하로 업로드 가능합니다.');
      return;
    }

    setValue((previous) => ({ ...previous, image: { url: URL.createObjectURL(file), file } }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;
    if (!value.name.trim() || !value.description.trim()) {
      alert('상품 이름 및 설명을 입력해주세요.');
      return;
    }
    if (!/^\d+$/.test(value.price.trim())) {
      alert('상품 가격은 숫자만 입력해주세요.');
      return;
    }
    if (!value.image.url && !value.image.file) {
      alert('상품 이미지를 등록해주세요.');
      return;
    }

    const formData: ProductStateType = {
      productId: value.id ? String(value.id) : undefined,
      name: value.name.trim(),
      description: value.description.trim(),
      price,
      workspaceId,
      productCategoryId: value.productCategory.id,
    };

    setIsSubmitting(true);
    try {
      await onSubmit(formData, value.image.file);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Body>
        <Fields>
          <Section>
            <SectionHeading>
              <SectionTitle>메뉴 사진</SectionTitle>
              <SectionDescription>손님이 메뉴를 쉽게 알아볼 수 있는 정사각형 사진을 등록해주세요.</SectionDescription>
            </SectionHeading>
            <ImageField>
              <AppImageInput title="대표 이미지" url={value.image.url} file={value.image.file} onImageChange={handleImageChange} width={176} height={176} />
            </ImageField>
          </Section>

          <Section>
            <SectionHeading>
              <SectionTitle>메뉴 정보</SectionTitle>
              <SectionDescription>주문 화면에 표시할 이름, 카테고리, 가격과 설명을 입력해주세요.</SectionDescription>
            </SectionHeading>
            <FieldGrid>
              <Field>
                <FieldLabel>메뉴명</FieldLabel>
                <NewAppInput
                  value={value.name}
                  maxLength={12}
                  placeholder="최대 12자"
                  width="100%"
                  onChange={(event) => setValue((previous) => ({ ...previous, name: event.target.value }))}
                />
              </Field>
              <Field>
                <FieldLabel>카테고리</FieldLabel>
                <SelectWithOptions
                  options={productCategories}
                  value={value.productCategory.id}
                  width="100%"
                  onChange={(event) => {
                    const category = productCategories.find((item) => String(item.id) === event.target.value);
                    setValue((previous) => ({
                      ...previous,
                      productCategory: { id: event.target.value, name: category?.name ?? '기본메뉴' },
                    }));
                  }}
                />
              </Field>
              <WideField>
                <FieldLabel>판매가</FieldLabel>
                <NewAppInput
                  value={value.price}
                  inputMode="numeric"
                  placeholder="가격을 입력해주세요."
                  width="100%"
                  onChange={(event) => setValue((previous) => ({ ...previous, price: event.target.value.replace(/[^0-9]/g, '') }))}
                />
              </WideField>
              <WideField>
                <FieldLabel>메뉴 설명</FieldLabel>
                <NewAppTextarea
                  value={value.description}
                  maxLength={30}
                  placeholder="최대 30자까지 가능합니다."
                  width="100%"
                  onChange={(event) => setValue((previous) => ({ ...previous, description: event.target.value }))}
                />
              </WideField>
            </FieldGrid>
          </Section>
        </Fields>

        <PreviewArea>
          <ProductCustomerPreview name={value.name} description={value.description} categoryName={categoryName} imageUrl={value.image.url} salePrice={price} />
        </PreviewArea>
      </Body>

      <Footer>
        {mode === 'EDIT' && onDelete ? (
          <DeleteButton type="button" onClick={onDelete}>
            메뉴 삭제
          </DeleteButton>
        ) : (
          <RequiredNotice>* 모든 정보를 입력해야 저장할 수 있어요.</RequiredNotice>
        )}
        <Actions>
          <NewCommonButton type="button" size="sm" color="blue_gray" onClick={onCancel}>
            취소
          </NewCommonButton>
          <NewCommonButton type="submit" size="sm" disabled={isSubmitting}>
            {getSubmitButtonText(mode, isSubmitting)}
          </NewCommonButton>
        </Actions>
      </Footer>
    </Form>
  );
}

export default ProductForm;
