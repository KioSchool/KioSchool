import styled from '@emotion/styled';

import NewAppInput from '@components/common/input/NewAppInput';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { SetProductFormValue } from '@@types/setProduct';
import { getSetDiscountRate, getSetSalePrice, parseSetPrice } from '@utils/setProduct';

import SetProductDiscountField from './SetProductDiscountField';

const PRICE_INPUT_WIDTH = 320;

const Section = styled.section`
  padding: 28px;
  border: 1px solid ${Color.BORDER_GREY};
  border-radius: 18px;
  background: ${Color.LIGHT_GREY};
  gap: 22px;
  ${colFlex()}
`;

const Heading = styled.div`
  gap: 5px;
  ${colFlex()}
`;

const Title = styled.h4`
  margin: 0;
  font-size: 20px;
  color: ${Color.TEXT_STRONG};
`;

const Description = styled.p`
  margin: 0;
  font-size: 14px;
  color: ${Color.MUTED_GREY};
`;

const OriginalPriceField = styled.label`
  display: grid;
  grid-template-columns: minmax(0, 1fr) ${PRICE_INPUT_WIDTH}px;
  align-items: center;
  gap: 24px;
`;

const FieldInfo = styled.span`
  gap: 5px;
  ${colFlex()}
`;

const FieldLabel = styled.span`
  font-size: 16px;
  font-weight: 700;
  color: ${Color.TEXT_STRONG};
`;

const FieldDescription = styled.span`
  font-size: 13px;
  color: ${Color.MUTED_GREY};
`;

const InputContainer = styled.span`
  position: relative;
  width: 100%;
`;

const PriceInput = styled(NewAppInput)`
  padding-right: 58px;
  font-size: 17px;
  font-weight: 700;
  text-align: right;
  font-variant-numeric: tabular-nums;
`;

const InputUnit = styled.span`
  position: absolute;
  top: 50%;
  right: 28px;
  color: ${Color.MUTED_GREY};
  pointer-events: none;
  transform: translateY(-50%);
`;

const Preview = styled.div`
  padding: 16px 18px;
  border: 1px solid ${Color.KIO_ORANGE_ICON_BG};
  border-radius: 14px;
  background: ${Color.KIO_ORANGE_FAINT};
  gap: 20px;
  ${rowFlex({ justify: 'space-between', align: 'center' })}
`;

const PreviewHeader = styled.div`
  gap: 3px;
  ${colFlex()}
`;

const PreviewTitle = styled.span`
  font-size: 15px;
  font-weight: 700;
  color: ${Color.TEXT_STRONG};
`;

const PreviewDescription = styled.span`
  font-size: 12px;
  color: ${Color.MUTED_GREY};
`;

const PriceSummary = styled.div`
  gap: 12px;
  ${rowFlex({ justify: 'flex-end', align: 'center' })}
`;

const PriceValues = styled.div`
  gap: 10px;
  ${rowFlex({ align: 'baseline' })}
`;

const OriginalPrice = styled.span`
  font-size: 14px;
  color: ${Color.MUTED_GREY};
  text-decoration: line-through;
`;

const SalePrice = styled.strong`
  font-size: 25px;
  line-height: 1;
  color: ${Color.KIO_ORANGE_DARK};
`;

const DiscountBadge = styled.span`
  padding: 6px 10px;
  border-radius: 999px;
  background: ${Color.KIO_ORANGE};
  font-size: 12px;
  font-weight: 700;
  color: ${Color.WHITE};
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
  const discountLabel = discountRate > 0 ? `${discountRate}% 할인` : '할인 없음';
  const originalPriceInput = value.originalPrice ? originalPrice.toLocaleString() : '';

  const handleOriginalPriceChange = (input: string) => {
    onChange({ ...value, originalPrice: input.replace(/[^0-9]/g, '') });
  };

  const handleDiscountPriceChange = (nextDiscountPrice: string) => {
    onChange({ ...value, discountPrice: nextDiscountPrice });
  };

  return (
    <Section>
      <Heading>
        <Title>금액 설정</Title>
        <Description>정가와 할인을 입력하면 판매가가 바로 계산됩니다.</Description>
      </Heading>

      <OriginalPriceField>
        <FieldInfo>
          <FieldLabel>정가</FieldLabel>
          <FieldDescription>할인 전 세트 가격</FieldDescription>
        </FieldInfo>
        <InputContainer>
          <PriceInput
            width="100%"
            value={originalPriceInput}
            inputMode="numeric"
            placeholder="0"
            onChange={(event) => handleOriginalPriceChange(event.target.value)}
          />
          <InputUnit>원</InputUnit>
        </InputContainer>
      </OriginalPriceField>

      <SetProductDiscountField originalPrice={originalPrice} discountPrice={discountPrice} onChange={handleDiscountPriceChange} />

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
    </Section>
  );
}

export default SetProductPriceFields;
