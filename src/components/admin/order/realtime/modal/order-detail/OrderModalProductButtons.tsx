import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { RiAddLine, RiSubtractLine } from '@remixicon/react';
import { Color } from '@resources/colors';
import { rowFlex } from '@styles/flexStyles';
import AppLabel from '@components/common/label/AppLabel';

const ButtonContainer = styled.div`
  width: 84px;
  padding-right: 4px;
  ${rowFlex({ justify: 'space-between', align: 'center' })}
`;

const iconStyle = (disabled: boolean) => css`
  width: 18px;
  cursor: ${disabled ? 'not-allowed' : 'pointer'};
  opacity: ${disabled ? 0.4 : 1};
  color: ${disabled ? Color.GREY : 'inherit'};
`;

const PlusIcon = styled(RiAddLine)<{ disabled: boolean }>`
  ${(props) => iconStyle(props.disabled)}
`;

const MinusIcon = styled(RiSubtractLine)<{ disabled: boolean }>`
  ${(props) => iconStyle(props.disabled)}
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
      <MinusIcon disabled={isDecreaseDisabled} onClick={onDecrease} />
      <AppLabel size={12}>{`${servedCount} / ${quantity}`}</AppLabel>
      <PlusIcon disabled={isIncreaseDisabled} onClick={onIncrease} />
    </ButtonContainer>
  );
}

export default OrderModalProductButtons;
