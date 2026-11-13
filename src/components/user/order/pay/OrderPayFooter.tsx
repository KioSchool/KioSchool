import styled from '@emotion/styled';
import { colFlex } from '@styles/flexStyles';

const Bar = styled.div<{ fixed: boolean }>`
  box-sizing: border-box;
  width: 100%;
  padding: 14px 20px ${({ fixed }) => (fixed ? 'max(22px, env(safe-area-inset-bottom))' : '22px')};
  gap: 8px;
  background: #ffffff;
  box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.05);
  z-index: 11;
  ${({ fixed }) => (fixed ? 'position: fixed; left: 0; bottom: 0;' : '')}
  ${colFlex({ align: 'center' })}
`;

const Button = styled.button`
  width: 100%;
  height: 54px;
  border: none;
  border-radius: 14px;
  background: #ff9142;
  color: #ffffff;
  font: inherit;
  font-size: 17px;
  font-weight: 700;
  cursor: pointer;

  &:disabled {
    background: #e8eef2;
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
  // 운영진 미리보기 폰 안에서는 화면에 붙이지 않는다
  fixed?: boolean;
}

function OrderPayFooter({ label, caption, disabled = false, onClick, fixed = true }: OrderPayFooterProps) {
  return (
    <Bar fixed={fixed}>
      <Button type="button" disabled={disabled} onClick={onClick} tabIndex={fixed ? undefined : -1}>
        {label}
      </Button>
      {caption && <Caption>{caption}</Caption>}
    </Bar>
  );
}

export default OrderPayFooter;
