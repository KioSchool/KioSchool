import styled from '@emotion/styled';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { PaymentMethod } from '@@types/index';
import { PAY_APP_AMOUNT_BADGE, PAY_METHOD_STYLE } from '@constants/data/payMethods';
import PayCheck from './PayCheck';

const Card = styled.button<{ selected: boolean; color: string; background: string; layout: PayMethodCardLayout }>`
  box-sizing: border-box;
  flex: 1;
  min-width: 0;
  margin: 0;
  padding: 14px;
  border-radius: 14px;
  border: ${({ selected, color }) => (selected ? `2px solid ${color}` : '1px solid #e8eef2')};
  background: ${({ selected, background }) => (selected ? background : '#ffffff')};
  font: inherit;
  text-align: left;
  cursor: pointer;
  gap: ${({ layout }) => (layout === 'tile' ? '10px' : '12px')};
  ${({ layout }) => (layout === 'tile' ? colFlex({ align: 'stretch' }) : rowFlex({ align: 'center' }))}
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
  border: ${({ bordered }) => (bordered ? '1px solid #e8eef2' : 'none')};
`;

const Name = styled.div`
  flex: 1;
  min-width: 0;
  gap: 4px;
  ${colFlex({ align: 'start' })}
`;

const Label = styled.span`
  color: #25282b;
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

export type PayMethodCardLayout = 'tile' | 'wide';

interface PayMethodCardProps {
  method: PaymentMethod.TOSS | PaymentMethod.KAKAOPAY;
  selected: boolean;
  // 앱이 두 개면 세로 카드 두 장, 하나면 가로로 긴 카드 한 장
  layout: PayMethodCardLayout;
  onSelect: (method: PaymentMethod) => void;
}

function PayMethodCard({ method, selected, layout, onSelect }: PayMethodCardProps) {
  const style = PAY_METHOD_STYLE[method];
  const logo = style.logo && <Logo src={style.logo} alt="" bordered={style.logoBordered} />;
  const check = <PayCheck checked={selected} color={style.checkColor} />;
  const name = (
    <Name>
      <Label>{style.label}</Label>
      <Badge>{PAY_APP_AMOUNT_BADGE}</Badge>
    </Name>
  );

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
      {layout === 'tile' ? (
        <>
          <Top>
            {logo}
            {check}
          </Top>
          {name}
        </>
      ) : (
        <>
          {logo}
          {name}
          {check}
        </>
      )}
    </Card>
  );
}

export default PayMethodCard;
