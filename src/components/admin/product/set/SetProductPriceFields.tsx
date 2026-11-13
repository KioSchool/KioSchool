import styled from '@emotion/styled';

import NewAppInput from '@components/common/input/NewAppInput';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { SetProductFormValue } from '@@types/setProduct';
import { getSetDiscountRate, getSetSalePrice, parseSetPrice } from '@utils/setProduct';

const Section = styled.section`
  padding: 20px;
  border: 2px solid ${Color.KIO_ORANGE_ICON_BG};
  border-radius: 18px;
  background: linear-gradient(135deg, ${Color.KIO_ORANGE_FAINT}, ${Color.WHITE});
  gap: 18px;
  ${colFlex()}
`;

const Heading = styled.div`
  gap: 4px;
  ${colFlex()}
`;

const Title = styled.h4`
  margin: 0;
  font-size: 17px;
  color: ${Color.TEXT_STRONG};
`;

const Description = styled.p`
  margin: 0;
  font-size: 13px;
  color: ${Color.TEXT_BODY};
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(300px, 1.1fr);
  gap: 18px;
`;

const InputFields = styled.div`
  gap: 14px;
  ${colFlex()}
`;

const Field = styled.label`
  gap: 7px;
  ${colFlex()}
`;

const FieldLabel = styled.span`
  font-size: 14px;
  font-weight: 700;
  color: ${Color.TEXT_STRONG};
`;

const Preview = styled.div`
  min-height: 150px;
  padding: 20px;
  border-radius: 16px;
  background: ${Color.KIO_ORANGE};
  color: ${Color.WHITE};
  gap: 14px;
  ${colFlex({ justify: 'space-between' })}
`;

const PreviewHeader = styled.div`
  gap: 3px;
  ${colFlex()}
`;

const PreviewTitle = styled.span`
  font-size: 13px;
  font-weight: 700;
`;

const PreviewDescription = styled.span`
  font-size: 12px;
  opacity: 0.82;
`;

const PriceSummary = styled.div`
  gap: 8px;
  ${colFlex({ align: 'flex-end' })}
`;

const PriceValues = styled.div`
  gap: 10px;
  ${rowFlex({ align: 'baseline' })}
`;

const OriginalPrice = styled.span`
  font-size: 14px;
  opacity: 0.82;
  text-decoration: line-through;
`;

const SalePrice = styled.strong`
  font-size: 32px;
  line-height: 1;
`;

const DiscountBadge = styled.span`
  padding: 6px 10px;
  border-radius: 999px;
  background: ${Color.WHITE};
  font-size: 12px;
  font-weight: 700;
  color: ${Color.KIO_ORANGE_DARK};
`;

interface SetProductPriceFieldsProps {
  value: SetProductFormValue;
  onChange: (value: SetProductFormValue) => void;
}

function SetProductPriceFields({ value, onChange }: SetProductPriceFieldsProps) {
  const originalPrice = parseSetPrice(value.originalPrice) ?? 0;
  const discountPrice = parseSetPrice(value.discountPrice) ?? 0;
  const salePrice = Math.max(getSetSalePrice(originalPrice, discountPrice), 0);
  const discountRate = getSetDiscountRate(originalPrice, discountPrice);
  const discountLabel = discountRate > 0 ? `${discountRate}% · ${discountPrice.toLocaleString()}원 할인` : '할인 없음';

  return (
    <Section>
      <Heading>
        <Title>금액 설정</Title>
        <Description>할인 전 금액과 할인 금액을 입력하면 최종 판매가가 바로 계산됩니다.</Description>
      </Heading>

      <Content>
        <InputFields>
          <Field>
            <FieldLabel>설정 금액 (할인 전)</FieldLabel>
            <NewAppInput
              width="100%"
              value={value.originalPrice}
              inputMode="numeric"
              placeholder="예: 28000"
              onChange={(event) => onChange({ ...value, originalPrice: event.target.value.replace(/[^0-9]/g, '') })}
            />
          </Field>

          <Field>
            <FieldLabel>할인 금액</FieldLabel>
            <NewAppInput
              width="100%"
              value={value.discountPrice}
              inputMode="numeric"
              placeholder="예: 3000"
              onChange={(event) => onChange({ ...value, discountPrice: event.target.value.replace(/[^0-9]/g, '') })}
            />
          </Field>
        </InputFields>

        <Preview>
          <PreviewHeader>
            <PreviewTitle>최종 판매가</PreviewTitle>
            <PreviewDescription>저장할 때 서버가 한 번 더 검증합니다.</PreviewDescription>
          </PreviewHeader>
          <PriceSummary>
            <PriceValues>
              {discountPrice > 0 && <OriginalPrice>{originalPrice.toLocaleString()}원</OriginalPrice>}
              <SalePrice>{salePrice.toLocaleString()}원</SalePrice>
            </PriceValues>
            <DiscountBadge>{discountLabel}</DiscountBadge>
          </PriceSummary>
        </Preview>
      </Content>
    </Section>
  );
}

export default SetProductPriceFields;
