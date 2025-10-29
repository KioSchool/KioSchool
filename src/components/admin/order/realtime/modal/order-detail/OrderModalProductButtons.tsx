import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { RiAddLine, RiSubtractLine } from '@remixicon/react';
import { Color } from '@resources/colors';
import { rowFlex } from '@styles/flexStyles';

const ButtonContainer = styled.div`
  gap: 4px;
  ${rowFlex({ justify: 'space-between', align: 'center' })}
`;

const IconWrapper = styled.div<{ disabled: boolean }>`
  width: 28px;
  height: 28px;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  border-radius: 99px;
  background-color: #f0f5f8;
  ${rowFlex({ justify: 'center', align: 'center' })}

  ${(props) =>
    !props.disabled &&
    css`
      &:hover {
        background-color: #d1d5d8;
      }
    `}
`;

const iconStyle = (disabled: boolean) => css`
  width: 18px;
  opacity: ${disabled ? 0.4 : 1};
  color: ${disabled ? Color.GREY : 'inherit'};
`;

const PlusIcon = styled(RiAddLine)<{ disabled: boolean }>`
  ${(props) => iconStyle(props.disabled)}
`;

const MinusIcon = styled(RiSubtractLine)<{ disabled: boolean }>`
  ${(props) => iconStyle(props.disabled)}
`;

const QuantityLabel = styled.div`
  width: 40px;
  font-family: 'LINE Seed Sans KR', sans-serif;
  font-size: 14px;
  font-weight: 700;
  user-select: none;
  ${rowFlex({ justify: 'center' })}
`;

interface OrderModalProductButtonsProps {
  servedCount: number;
  quantity: number;
  isServed: boolean;
  onIncrease: () => void;
  onDecrease: () => void;
}

function OrderModalProductButtons({ servedCount, quantity, isServed, onIncrease, onDecrease }: OrderModalProductButtonsProps) {
  const isDecreaseDisabled = servedCount === 0;
  const isIncreaseDisabled = isServed || servedCount >= quantity;

  return (
    <ButtonContainer>
      <IconWrapper onClick={onDecrease} disabled={isDecreaseDisabled}>
        <MinusIcon disabled={isDecreaseDisabled} />
      </IconWrapper>
      <QuantityLabel>{`${servedCount} / ${quantity}`}</QuantityLabel>
      <IconWrapper onClick={onIncrease} disabled={isIncreaseDisabled}>
        <PlusIcon disabled={isIncreaseDisabled} />
      </IconWrapper>
    </ButtonContainer>
  );
}

export default OrderModalProductButtons;
