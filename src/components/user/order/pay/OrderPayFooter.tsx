import styled from '@emotion/styled';
import { match } from 'ts-pattern';
import { Color } from '@resources/colors';
import { colFlex } from '@styles/flexStyles';

// 아이폰 홈 막대에 버튼이 가리지 않게 띄운다
const getPlacement = (fixed: boolean) =>
  match(fixed)
    .with(true, () => 'position: fixed; left: 0; bottom: 0; padding-bottom: max(22px, env(safe-area-inset-bottom));')
    .otherwise(() => '');

const Bar = styled.div<{ fixed: boolean }>`
  box-sizing: border-box;
  width: 100%;
  padding: 14px 20px 22px;
  gap: 8px;
  background: ${Color.WHITE};
  box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.05);
  z-index: 11;
  ${({ fixed }) => getPlacement(fixed)}
  ${colFlex({ align: 'center' })}
`;

const Button = styled.button`
  width: 100%;
  height: 54px;
  border: none;
  border-radius: 14px;
  background: ${Color.KIO_ORANGE};
  color: ${Color.WHITE};
  font: inherit;
  font-size: 17px;
  font-weight: 700;
  cursor: pointer;

  &:disabled {
    background: ${Color.BORDER_GREY};
    color: #d1d5d8;
    cursor: default;
  }
`;

const Caption = styled.span`
  color: #697278;
  font-size: 12px;
  line-height: 1.45;
`;

interface OrderPayFooterProps {
  label: string;
  caption: string | null;
  disabled?: boolean;
  onClick?: () => void;
  fixed?: boolean;
}

function OrderPayFooter({ label, caption, disabled = false, onClick, fixed = true }: OrderPayFooterProps) {
  return (
    <Bar fixed={fixed}>
      <Button
        type="button"
        disabled={disabled}
        onClick={onClick}
        tabIndex={match(fixed)
          .with(true, () => undefined)
          .otherwise(() => -1)}
      >
        {label}
      </Button>
      {caption && <Caption>{caption}</Caption>}
    </Bar>
  );
}

export default OrderPayFooter;
