import styled from '@emotion/styled';
import { RiArrowDownSLine, RiArrowUpSLine, RiDeleteBinLine } from '@remixicon/react';

import NewAppInput from '@components/common/input/NewAppInput';
import NumberInput from '@components/common/input/NumberInput';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { AdminProduct } from '@@types/index';
import { SetProductComponentFormValue } from '@@types/setProduct';
import { MIN_SET_COMPONENT_QUANTITY } from '@utils/setProduct';

import SetProductConditionSelect from './SetProductConditionSelect';

const Container = styled.div`
  display: grid;
  grid-template-columns: minmax(180px, 1.1fr) 130px minmax(180px, 1fr) auto;
  gap: 12px;
  padding: 14px;
  border: 1px solid ${Color.BORDER_GREY};
  border-radius: 14px;
  background: ${Color.WHITE};
`;

const Field = styled.label`
  min-width: 0;
  gap: 6px;
  ${colFlex()}
`;

const Label = styled.span`
  font-size: 12px;
  font-weight: 700;
  color: ${Color.MUTED_GREY};
`;

const Actions = styled.div`
  gap: 4px;
  align-self: end;
  padding-bottom: 3px;
  ${rowFlex({ align: 'center' })}
`;

const IconButton = styled.button`
  width: 32px;
  height: 32px;
  padding: 0;
  border: 1px solid ${Color.BORDER_GREY};
  border-radius: 8px;
  background: ${Color.WHITE};
  color: ${Color.GREY};
  cursor: pointer;
  ${rowFlex({ justify: 'center', align: 'center' })}

  &:hover:not(:disabled) {
    border-color: ${Color.KIO_ORANGE};
    color: ${Color.KIO_ORANGE};
  }

  &:disabled {
    color: ${Color.HEAVY_GREY};
    cursor: not-allowed;
  }
`;

const DeleteButton = styled(IconButton)`
  &:hover:not(:disabled) {
    border-color: ${Color.RED};
    color: ${Color.RED};
  }
`;

interface SetProductComponentRowProps {
  component: SetProductComponentFormValue;
  products: AdminProduct[];
  canMoveUp: boolean;
  canMoveDown: boolean;
  canDelete: boolean;
  onChange: (component: SetProductComponentFormValue) => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onDelete: () => void;
}

function SetProductComponentRow({
  component,
  products,
  canMoveUp,
  canMoveDown,
  canDelete,
  onChange,
  onMoveUp,
  onMoveDown,
  onDelete,
}: SetProductComponentRowProps) {
  return (
    <Container>
      <Field>
        <Label>구성품명</Label>
        <NewAppInput
          width="100%"
          height={42}
          value={component.name}
          placeholder="예: 족발 소"
          onChange={(event) => onChange({ ...component, name: event.target.value })}
        />
      </Field>

      <Field>
        <Label>세트 1개당 수량</Label>
        <NumberInput
          value={component.quantity}
          maxWidth="130px"
          onChange={(quantity) => onChange({ ...component, quantity: Math.max(quantity, MIN_SET_COMPONENT_QUANTITY) })}
          onIncrement={() => onChange({ ...component, quantity: component.quantity + 1 })}
          onDecrement={() => onChange({ ...component, quantity: Math.max(component.quantity - 1, MIN_SET_COMPONENT_QUANTITY) })}
        />
      </Field>

      <Field>
        <Label>연결 상품</Label>
        <SetProductConditionSelect
          products={products}
          value={component.conditionProductId}
          onChange={(conditionProductId) => onChange({ ...component, conditionProductId })}
        />
      </Field>

      <Actions>
        <IconButton type="button" aria-label="위로 이동" disabled={!canMoveUp} onClick={onMoveUp}>
          <RiArrowUpSLine size={18} />
        </IconButton>
        <IconButton type="button" aria-label="아래로 이동" disabled={!canMoveDown} onClick={onMoveDown}>
          <RiArrowDownSLine size={18} />
        </IconButton>
        <DeleteButton type="button" aria-label="구성품 삭제" disabled={!canDelete} onClick={onDelete}>
          <RiDeleteBinLine size={16} />
        </DeleteButton>
      </Actions>
    </Container>
  );
}

export default SetProductComponentRow;
