import styled from '@emotion/styled';
import { match } from 'ts-pattern';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { PaymentMethod } from '@@types/index';
import { PAY_APP_AMOUNT_BADGE, PAY_METHOD_STYLE } from '@constants/data/payMethods';
import { getLogoBorder, getPayCardBackground, getPayCardBorder } from '@utils/payMethodStyles';
import PayCheck from './PayCheck';

export type PayMethodCardLayout = 'tile' | 'wide';

const getLayoutStyle = (layout: PayMethodCardLayout) =>
  match(layout)
    .with('tile', () => colFlex({ align: 'stretch' }))
    .otherwise(() => rowFlex({ align: 'center' }));

const getLayoutGap = (layout: PayMethodCardLayout) =>
  match(layout)
    .with('tile', () => '10px')
    .otherwise(() => '12px');

const Card = styled.button<{ selected: boolean; color: string; background: string; layout: PayMethodCardLayout }>`
  box-sizing: border-box;
  flex: 1;
  min-width: 0;
  margin: 0;
  padding: 14px;
  border-radius: 14px;
  border: ${({ selected, color }) => getPayCardBorder(selected, color)};
  background: ${({ selected, background }) => getPayCardBackground(selected, background)};
  font: inherit;
  text-align: left;
  cursor: pointer;
  gap: ${({ layout }) => getLayoutGap(layout)};
  ${({ layout }) => getLayoutStyle(layout)}
`;

const Top = styled.div`
  ${rowFlex({ justify: 'space-between', align: 'start' })}
`;

const Logo = styled.img<{ bordered: boolean }>`
  box-sizing: border-box;
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  border-radius: 11px;
  border: ${({ bordered }) => getLogoBorder(bordered)};
`;

const Name = styled.div`
  flex: 1;
  min-width: 0;
  gap: 4px;
  ${colFlex({ align: 'start' })}
`;

const Label = styled.span`
  color: ${Color.TEXT_STRONG};
  font-size: 16px;
  font-weight: 700;
  line-height: 1.45;
`;

const Badge = styled.span`
  padding: 2px 7px;
  border-radius: 9px;
  background: #f0f5f8;
  color: #697278;
  font-size: 11px;
  font-weight: 700;
  line-height: 1.45;
`;

interface PayMethodCardProps {
  method: PaymentMethod.TOSS | PaymentMethod.KAKAOPAY;
  selected: boolean;
  layout: PayMethodCardLayout;
  onSelect: (method: PaymentMethod) => void;
}

function PayMethodCard({ method, selected, layout, onSelect }: PayMethodCardProps) {
  const style = PAY_METHOD_STYLE[method];
  const isTile = layout === 'tile';
  const logo = style.logo && <Logo src={style.logo} alt="" bordered={style.logoBordered} />;
  const check = <PayCheck checked={selected} color={style.checkColor} />;

  return (
    <Card
      type="button"
      role="radio"
      aria-checked={selected}
      selected={selected}
      color={style.color}
      background={style.background}
      layout={layout}
      onClick={() => onSelect(method)}
    >
      {isTile && (
        <Top>
          {logo}
          {check}
        </Top>
      )}
      {!isTile && logo}
      <Name>
        <Label>{style.label}</Label>
        <Badge>{PAY_APP_AMOUNT_BADGE}</Badge>
      </Name>
      {!isTile && check}
    </Card>
  );
}

export default PayMethodCard;
