import { ChangeEvent } from 'react';
import styled from '@emotion/styled';

import ProductImageField from '@components/admin/product/ProductImageField';
import NewAppInput from '@components/common/input/NewAppInput';
import NewAppTextarea from '@components/common/input/NewAppTextarea';
import SelectWithOptions from '@components/common/select/SelectWithOptions';
import { Color } from '@resources/colors';
import { colFlex } from '@styles/flexStyles';
import { ProductCategory } from '@@types/index';
import { SetProductFormValue } from '@@types/setProduct';
import { MAX_SET_PRODUCT_DESCRIPTION_LENGTH, MAX_SET_PRODUCT_NAME_LENGTH } from '@utils/setProduct';

import SetProductPriceFields from './SetProductPriceFields';

const Section = styled.section`
  width: 100%;
  gap: 18px;
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
  color: ${Color.MUTED_GREY};
`;

const FieldGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 16px;
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

interface SetProductBasicFieldsProps {
  value: SetProductFormValue;
  categories: ProductCategory[];
  onChange: (value: SetProductFormValue) => void;
  onImageChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

function SetProductBasicFields({ value, categories, onChange, onImageChange }: SetProductBasicFieldsProps) {
  return (
    <Section>
      <SectionHeading>
        <SectionTitle>기본 정보</SectionTitle>
        <SectionDescription>손님 주문 화면에 보일 이름과 설명, 가격을 입력해주세요.</SectionDescription>
      </SectionHeading>

      <ProductImageField
        url={value.image.url}
        file={value.image.file}
        description="세트 구성을 쉽게 떠올릴 수 있는 대표 사진을 등록해주세요. 이미지를 등록하지 않으면 기본 이미지가 표시됩니다."
        onImageChange={onImageChange}
      />

      <FieldGrid>
        <WideField>
          <FieldLabel>카테고리</FieldLabel>
          <SelectWithOptions
            options={categories}
            value={value.productCategoryId === null ? 'null' : value.productCategoryId}
            onChange={(event) => {
              const categoryId = event.target.value === 'null' ? null : Number(event.target.value);
              onChange({ ...value, productCategoryId: categoryId });
            }}
          />
        </WideField>

        <WideField>
          <FieldLabel>세트 이름</FieldLabel>
          <NewAppInput
            width="100%"
            value={value.name}
            maxLength={MAX_SET_PRODUCT_NAME_LENGTH}
            placeholder="최대 12자까지 가능합니다."
            onChange={(event) => onChange({ ...value, name: event.target.value })}
          />
        </WideField>

        <WideField>
          <FieldLabel>세트 설명</FieldLabel>
          <NewAppTextarea
            value={value.description}
            maxLength={MAX_SET_PRODUCT_DESCRIPTION_LENGTH}
            placeholder="손님에게 제공 구성을 알 수 있게 적어주세요."
            onChange={(event) => onChange({ ...value, description: event.target.value })}
            width="100%"
          />
        </WideField>
      </FieldGrid>

      <SetProductPriceFields value={value} onChange={onChange} />
    </Section>
  );
}

export default SetProductBasicFields;
