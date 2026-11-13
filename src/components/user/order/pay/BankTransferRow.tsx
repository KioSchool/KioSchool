import styled from '@emotion/styled';
import { RiBankLine } from '@remixicon/react';
import { rowFlex } from '@styles/flexStyles';
import { PaymentMethod } from '@@types/index';
import { PAY_METHOD_STYLE } from '@constants/data/payMethods';
import PayCheck from './PayCheck';

const Row = styled.button<{ selected: boolean; color: string; background: string }>`
  box-sizing: border-box;
  width: 100%;
  margin: 0;
  padding: 12px 14px;
  gap: 12px;
  border-radius: 14px;
  border: ${({ selected, color }) => (selected ? `2px solid ${color}` : '1px solid #e8eef2')};
  background: ${({ selected, background }) => (selected ? background : '#ffffff')};
  font: inherit;
  text-align: left;
  cursor: pointer;
  ${rowFlex({ align: 'center' })}
`;

const IconBox = styled.span`
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: #f7f7f7;
  ${rowFlex({ justify: 'center', align: 'center' })}
`;

const Label = styled.span`
  flex: 1;
  color: #25282b;
  font-size: 16px;
  font-weight: 700;
  line-height: 1.45;
`;

interface BankTransferRowProps {
  selected: boolean;
  onSelect: (method: PaymentMethod) => void;
}

function BankTransferRow({ selected, onSelect }: BankTransferRowProps) {
  const style = PAY_METHOD_STYLE[PaymentMethod.BANK_TRANSFER];

  return (
    <Row
      type="button"
      role="radio"
      aria-checked={selected}
      selected={selected}
      color={style.color}
      background={style.background}
      onClick={() => onSelect(PaymentMethod.BANK_TRANSFER)}
    >
      <IconBox>
        <RiBankLine size={22} color="#5c5c5c" />
      </IconBox>
      <Label>{style.label}</Label>
      <PayCheck checked={selected} color={style.checkColor} />
    </Row>
  );
}

export default BankTransferRow;
