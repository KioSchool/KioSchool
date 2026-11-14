import { ChangeEvent } from 'react';
import styled from '@emotion/styled';

import NewAppInput from '@components/common/input/NewAppInput';
import NewAppTextarea from '@components/common/input/NewAppTextarea';
import SelectWithOptions from '@components/common/select/SelectWithOptions';
import { Color } from '@resources/colors';
import { colFlex } from '@styles/flexStyles';
import { ProductCategory } from '@@types/index';

import ProductImageField from './ProductImageField';
import { MAX_PRODUCT_DESCRIPTION_LENGTH, MAX_PRODUCT_NAME_LENGTH, ProductFormState } from './productFormState';

const Section = styled.section`
  width: 100%;
  gap: 28px;
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

const Fields = styled.div`
  width: 100%;
  gap: 16px;
  color: ${Color.TEXT_BODY};
  ${colFlex()}
`;

const Field = styled.label`
  min-width: 0;
  width: 100%;
  gap: 7px;
  ${colFlex()}
`;

const FieldLabel = styled.span`
  width: 100%;
  font-size: 16px;
  font-weight: 700;
  color: ${Color.TEXT_STRONG};
`;

interface ProductBasicFieldsProps {
  value: ProductFormState;
  categories: ProductCategory[];
  onCategoryChange: (categoryId: string) => void;
  onNameChange: (name: string) => void;
  onPriceChange: (price: string) => void;
  onDescriptionChange: (description: string) => void;
  onImageChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

function ProductBasicFields({ value, categories, onCategoryChange, onNameChange, onPriceChange, onDescriptionChange, onImageChange }: ProductBasicFieldsProps) {
  return (
    <Section>
      <SectionHeading>
        <SectionTitle>기본 정보</SectionTitle>
        <SectionDescription>손님 주문 화면에 보일 메뉴 이름과 설명, 가격을 입력해주세요.</SectionDescription>
      </SectionHeading>

      <ProductImageField
        url={value.image.url}
        file={value.image.file}
        description="메뉴를 한눈에 알아볼 수 있는 대표 사진을 등록해주세요. 일반 메뉴는 이미지 등록이 필수입니다."
        onImageChange={onImageChange}
      />

      <Fields>
        <Field>
          <FieldLabel>카테고리</FieldLabel>
          <SelectWithOptions
            options={categories}
            value={value.productCategory.id || ''}
            onChange={(event) => onCategoryChange(event.target.value)}
            width="100%"
          />
        </Field>

        <Field>
          <FieldLabel>상품명</FieldLabel>
          <NewAppInput
            placeholder="최대 12자까지 가능합니다."
            value={value.name}
            maxLength={MAX_PRODUCT_NAME_LENGTH}
            onChange={(event) => onNameChange(event.target.value)}
            width="100%"
          />
        </Field>

        <Field>
          <FieldLabel>상품 가격</FieldLabel>
          <NewAppInput value={value.price} inputMode="numeric" onChange={(event) => onPriceChange(event.target.value)} width="100%" />
        </Field>

        <Field>
          <FieldLabel>상품 설명</FieldLabel>
          <NewAppTextarea
            placeholder="최대 30자까지 가능합니다."
            value={value.description}
            maxLength={MAX_PRODUCT_DESCRIPTION_LENGTH}
            onChange={(event) => onDescriptionChange(event.target.value)}
            width="100%"
          />
        </Field>
      </Fields>
    </Section>
  );
}

export default ProductBasicFields;
