import styled from '@emotion/styled';

import NewAppInput from '@components/common/input/NewAppInput';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { SetProductFormValue } from '@@types/setProduct';
import { getSetDiscountRate, getSetSalePrice, parseSetPrice } from '@utils/setProduct';

const Section = styled.section`
  gap: 16px;
  ${colFlex()}
`;

const Heading = styled.div`
  gap: 4px;
  ${colFlex()}
`;

const Title = styled.h3`
  margin: 0;
  font-size: 18px;
  color: ${Color.TEXT_STRONG};
`;

const Description = styled.p`
  margin: 0;
  font-size: 13px;
  line-height: 1.5;
  color: ${Color.TEXT_SUBTLE};
`;

const PriceFields = styled.div`
  border-top: 1px solid ${Color.BORDER_GREY};
  ${colFlex()}
`;

const PriceRow = styled.label`
  min-height: 72px;
  padding: 10px 0;
  border-bottom: 1px solid ${Color.BORDER_GREY};
  box-sizing: border-box;
  gap: 20px;
  ${rowFlex({ justify: 'space-between', align: 'center' })}
`;

const Label = styled.div`
  gap: 3px;
  ${colFlex()}
`;

const LabelTitle = styled.span`
  font-size: 14px;
  font-weight: 700;
  color: ${Color.TEXT_STRONG};
`;

const LabelDescription = styled.span`
  font-size: 12px;
  color: ${Color.TEXT_SUBTLE};
`;

const InputArea = styled.div`
  width: 220px;
  flex-shrink: 0;
`;

const SalePriceRow = styled.div`
  min-height: 72px;
  padding: 14px 18px;
  border: 1px solid ${Color.KIO_ORANGE_ICON_BG};
  border-radius: 14px;
  box-sizing: border-box;
  background: ${Color.KIO_ORANGE_FAINT};
  gap: 20px;
  ${rowFlex({ justify: 'space-between', align: 'center' })}
`;

const SalePriceLabel = styled.div`
  gap: 3px;
  ${colFlex()}
`;

const SalePriceValue = styled.div`
  gap: 8px;
  ${rowFlex({ align: 'baseline' })}
`;

const DiscountRate = styled.span`
  font-size: 12px;
  font-weight: 700;
  color: ${Color.KIO_ORANGE_DARK};
`;

const SalePrice = styled.strong`
  font-size: 22px;
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

  return (
    <Section>
      <Heading>
        <Title>금액 설정</Title>
        <Description>정가와 할인 금액을 입력하면 최종 판매가가 바로 계산됩니다.</Description>
      </Heading>
      <PriceFields>
        <PriceRow>
          <Label>
            <LabelTitle>정가</LabelTitle>
            <LabelDescription>할인 전 세트 가격</LabelDescription>
          </Label>
          <InputArea>
            <NewAppInput
              value={value.originalPrice}
              inputMode="numeric"
              placeholder="0"
              width="100%"
              onChange={(event) => onChange({ ...value, originalPrice: event.target.value.replace(/[^0-9]/g, '') })}
            />
          </InputArea>
        </PriceRow>
        <PriceRow>
          <Label>
            <LabelTitle>할인 금액</LabelTitle>
            <LabelDescription>정가에서 차감할 금액</LabelDescription>
          </Label>
          <InputArea>
            <NewAppInput
              value={value.discountPrice}
              inputMode="numeric"
              placeholder="0"
              width="100%"
              onChange={(event) => onChange({ ...value, discountPrice: event.target.value.replace(/[^0-9]/g, '') })}
            />
          </InputArea>
        </PriceRow>
      </PriceFields>
      <SalePriceRow>
        <SalePriceLabel>
          <LabelTitle>최종 판매가</LabelTitle>
          <LabelDescription>저장할 때 서버가 다시 계산합니다.</LabelDescription>
        </SalePriceLabel>
        <SalePriceValue>
          {discountRate > 0 && <DiscountRate>{discountRate}% 할인</DiscountRate>}
          <SalePrice>{salePrice.toLocaleString()}원</SalePrice>
        </SalePriceValue>
      </SalePriceRow>
    </Section>
  );
}

export default SetProductPriceFields;
