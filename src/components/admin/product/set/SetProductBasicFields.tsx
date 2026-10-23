import { ChangeEvent } from 'react';
import styled from '@emotion/styled';

import AppImageInput from '@components/common/input/AppImageInput';
import NewAppInput from '@components/common/input/NewAppInput';
import NewAppTextarea from '@components/common/input/NewAppTextarea';
import SelectWithOptions from '@components/common/select/SelectWithOptions';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { ProductCategory } from '@@types/index';
import { SetProductFormValue } from '@@types/setProduct';
import { getSetDiscountRate, getSetSalePrice, parseSetPrice } from '@utils/setProduct';

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

const ImageField = styled.div`
  align-self: flex-start;
`;

const PricePreview = styled.div`
  grid-column: 1 / -1;
  padding: 18px 20px;
  border: 1px solid ${Color.KIO_ORANGE_ICON_BG};
  border-radius: 14px;
  background: ${Color.KIO_ORANGE_FAINT};
  ${rowFlex({ justify: 'space-between', align: 'center' })}
`;

const PriceCaption = styled.div`
  gap: 3px;
  ${colFlex()}
`;

const PriceCaptionTitle = styled.span`
  font-size: 13px;
  font-weight: 700;
  color: ${Color.TEXT_STRONG};
`;

const PriceCaptionDescription = styled.span`
  font-size: 12px;
  color: ${Color.MUTED_GREY};
`;

const PriceValues = styled.div`
  gap: 9px;
  ${rowFlex({ align: 'center' })}
`;

const OriginalPrice = styled.span`
  font-size: 13px;
  color: ${Color.MUTED_GREY};
  text-decoration: line-through;
`;

const DiscountBadge = styled.span`
  padding: 5px 8px;
  border-radius: 999px;
  background: ${Color.KIO_ORANGE};
  font-size: 12px;
  font-weight: 700;
  color: ${Color.WHITE};
`;

const SalePrice = styled.strong`
  font-size: 24px;
  color: ${Color.KIO_ORANGE_DARK};
`;

interface SetProductBasicFieldsProps {
  value: SetProductFormValue;
  categories: ProductCategory[];
  onChange: (value: SetProductFormValue) => void;
  onImageChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

function SetProductBasicFields({ value, categories, onChange, onImageChange }: SetProductBasicFieldsProps) {
  const originalPrice = parseSetPrice(value.originalPrice) ?? 0;
  const discountPrice = parseSetPrice(value.discountPrice) ?? 0;
  const salePrice = Math.max(getSetSalePrice(originalPrice, discountPrice), 0);
  const discountRate = getSetDiscountRate(originalPrice, discountPrice);
  const discountLabel = discountRate > 0 ? `${discountRate}% · ${discountPrice.toLocaleString()}원 할인` : '할인 없음';

  return (
    <Section>
      <SectionHeading>
        <SectionTitle>기본 정보</SectionTitle>
        <SectionDescription>손님 주문 화면에 보일 이름과 설명, 가격을 입력해주세요.</SectionDescription>
      </SectionHeading>

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
            value={value.name}
            maxLength={12}
            placeholder="최대 12자까지 가능합니다."
            onChange={(event) => onChange({ ...value, name: event.target.value })}
          />
        </WideField>

        <Field>
          <FieldLabel>기존 금액</FieldLabel>
          <NewAppInput
            value={value.originalPrice}
            inputMode="numeric"
            placeholder="예: 28000"
            onChange={(event) => onChange({ ...value, originalPrice: event.target.value.replace(/[^0-9]/g, '') })}
          />
        </Field>

        <Field>
          <FieldLabel>할인 금액</FieldLabel>
          <NewAppInput
            value={value.discountPrice}
            inputMode="numeric"
            placeholder="예: 3000"
            onChange={(event) => onChange({ ...value, discountPrice: event.target.value.replace(/[^0-9]/g, '') })}
          />
        </Field>

        <PricePreview>
          <PriceCaption>
            <PriceCaptionTitle>최종 판매가 미리보기</PriceCaptionTitle>
            <PriceCaptionDescription>저장할 때 서버가 다시 계산합니다.</PriceCaptionDescription>
          </PriceCaption>
          <PriceValues>
            {discountPrice > 0 && <OriginalPrice>{originalPrice.toLocaleString()}원</OriginalPrice>}
            <DiscountBadge>{discountLabel}</DiscountBadge>
            <SalePrice>{salePrice.toLocaleString()}원</SalePrice>
          </PriceValues>
        </PricePreview>

        <ImageField>
          <AppImageInput title="대표 이미지" url={value.image.url} file={value.image.file} onImageChange={onImageChange} width={180} height={180} />
        </ImageField>

        <Field>
          <FieldLabel>세트 설명</FieldLabel>
          <NewAppTextarea
            value={value.description}
            maxLength={30}
            placeholder="손님에게 제공 구성을 알 수 있게 적어주세요."
            onChange={(event) => onChange({ ...value, description: event.target.value })}
            width="100%"
          />
        </Field>
      </FieldGrid>
    </Section>
  );
}

export default SetProductBasicFields;
