import styled from '@emotion/styled';
import { RiDeleteBinLine } from '@remixicon/react';

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
  grid-template-columns: minmax(0, 1.35fr) 112px minmax(0, 1.1fr) 32px;
  gap: 12px;
  padding: 12px 14px;
  border-top: 1px solid ${Color.BORDER_GREY};
  background: ${Color.WHITE};
  align-items: center;
`;

const Field = styled.label`
  min-width: 0;
  ${colFlex()}
`;

const ComponentNameInput = styled(NewAppInput)`
  font-size: 13px;
`;

const Actions = styled.div`
  ${rowFlex({ justify: 'center', align: 'center' })}
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
  border: none;

  &:hover:not(:disabled) {
    border-color: ${Color.RED};
    color: ${Color.RED};
  }
`;

interface SetProductComponentRowProps {
  component: SetProductComponentFormValue;
  products: AdminProduct[];
  canDelete: boolean;
  onChange: (component: SetProductComponentFormValue) => void;
  onDelete: () => void;
}

function SetProductComponentRow({ component, products, canDelete, onChange, onDelete }: SetProductComponentRowProps) {
  return (
    <Container>
      <Field>
        <ComponentNameInput
          aria-label="구성품명"
          height={42}
          width="100%"
          value={component.name}
          placeholder="예: 족발 소"
          onChange={(event) => onChange({ ...component, name: event.target.value })}
        />
      </Field>

      <Field>
        <NumberInput
          value={component.quantity}
          maxWidth="116px"
          height={42}
          onChange={(quantity) => onChange({ ...component, quantity: Math.max(quantity, MIN_SET_COMPONENT_QUANTITY) })}
          onIncrement={() => onChange({ ...component, quantity: component.quantity + 1 })}
          onDecrement={() => onChange({ ...component, quantity: Math.max(component.quantity - 1, MIN_SET_COMPONENT_QUANTITY) })}
        />
      </Field>

      <Field>
        <SetProductConditionSelect
          products={products}
          value={component.conditionProductId}
          onChange={(conditionProductId) => onChange({ ...component, conditionProductId })}
        />
      </Field>

      <Actions>
        <DeleteButton type="button" aria-label="구성품 삭제" disabled={!canDelete} onClick={onDelete}>
          <RiDeleteBinLine size={16} />
        </DeleteButton>
      </Actions>
    </Container>
  );
}

export default SetProductComponentRow;
