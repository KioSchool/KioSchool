import { ChangeEvent } from 'react';
import styled from '@emotion/styled';

import AppImageInput from '@components/common/input/AppImageInput';
import NewAppInput from '@components/common/input/NewAppInput';
import NewAppTextarea from '@components/common/input/NewAppTextarea';
import SelectWithOptions from '@components/common/select/SelectWithOptions';
import { Color } from '@resources/colors';
import { colFlex } from '@styles/flexStyles';
import { mobileMediaQuery } from '@styles/globalStyles';
import { ProductCategory } from '@@types/index';
import { SetProductFormValue } from '@@types/setProduct';

const Container = styled.div`
  ${colFlex()}
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

  .image-label-container > div {
    font-size: 14px;
  }

  .image,
  .upload-image-wrapper {
    border-radius: 16px;
  }

  .image {
    object-fit: cover;
  }
`;

const BasicRow = styled.div`
  display: grid;
  grid-template-columns: 132px minmax(0, 1fr);
  gap: 20px;
  align-items: start;

  ${mobileMediaQuery} {
    grid-template-columns: minmax(0, 1fr);
  }
`;

const FieldGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 10px 16px;

  ${mobileMediaQuery} {
    grid-template-columns: minmax(0, 1fr);
  }
`;

const Field = styled.label`
  min-width: 0;
  gap: 7px;
  ${colFlex()}
`;

const WideField = styled(Field)`
  grid-column: 1 / -1;

  ${mobileMediaQuery} {
    grid-column: auto;
  }
`;

const FieldLabel = styled.span`
  font-size: 14px;
  font-weight: 700;
  color: ${Color.TEXT_STRONG};
`;

const DescriptionInput = styled(NewAppTextarea)`
  padding: 13px 30px;
  border-radius: 25px;
`;

interface SetProductBasicFieldsProps {
  value: SetProductFormValue;
  categories: ProductCategory[];
  onChange: (value: SetProductFormValue) => void;
  onImageChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

function SetProductBasicFields({ value, categories, onChange, onImageChange }: SetProductBasicFieldsProps) {
  return (
    <Container>
      <Section>
        <SectionHeading>
          <SectionTitle>세트 정보</SectionTitle>
          <SectionDescription>주문 화면에 표시할 사진, 이름, 카테고리와 설명을 입력해주세요.</SectionDescription>
        </SectionHeading>
        <BasicRow>
          <ImageField>
            <AppImageInput title="사진" url={value.image.url} file={value.image.file} onImageChange={onImageChange} width={132} height={132} />
          </ImageField>
          <FieldGrid>
            <Field>
              <FieldLabel>세트 이름</FieldLabel>
              <NewAppInput
                value={value.name}
                maxLength={12}
                placeholder="최대 12자"
                width="100%"
                onChange={(event) => onChange({ ...value, name: event.target.value })}
              />
            </Field>
            <Field>
              <FieldLabel>카테고리</FieldLabel>
              <SelectWithOptions
                options={categories}
                value={value.productCategoryId === null ? 'null' : value.productCategoryId}
                width="100%"
                onChange={(event) => {
                  const categoryId = event.target.value === 'null' ? null : Number(event.target.value);
                  onChange({ ...value, productCategoryId: categoryId });
                }}
              />
            </Field>
            <WideField>
              <FieldLabel>세트 설명</FieldLabel>
              <DescriptionInput
                value={value.description}
                maxLength={30}
                placeholder="손님이 제공 구성을 알 수 있게 적어주세요."
                width="100%"
                height={50}
                onChange={(event) => onChange({ ...value, description: event.target.value })}
              />
            </WideField>
          </FieldGrid>
        </BasicRow>
      </Section>
    </Container>
  );
}

export default SetProductBasicFields;
