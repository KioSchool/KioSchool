import { ChangeEvent, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { OrderStatus, OrdersFilter } from '@@types/index';
import { ORDER_STATUSES, STATUS_LABELS } from '@constants/data/orderStatus';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { mobileMediaQuery } from '@styles/globalStyles';

const WORKSPACE_ID_DEBOUNCE_MS = 400;

const Bar = styled.div`
  width: 100%;
  gap: 10px;
  ${colFlex()}
`;

const Row = styled.div`
  width: 100%;
  gap: 8px;
  flex-wrap: wrap;
  ${rowFlex({ align: 'center' })}
`;

const Field = styled.label`
  gap: 6px;
  ${rowFlex({ align: 'center' })}

  ${mobileMediaQuery} {
    width: 100%;
  }
`;

const FieldLabel = styled.span`
  font-size: 12px;
  color: ${Color.GREY};
  white-space: nowrap;
`;

const TextInput = styled.input`
  height: 36px;
  padding: 0 10px;
  border: 1px solid ${Color.HEAVY_GREY};
  border-radius: 8px;
  font-size: 13px;
  color: ${Color.BLACK};
  background: ${Color.WHITE};
  width: 140px;
  box-sizing: border-box;

  &::placeholder {
    color: ${Color.HEAVY_GREY};
  }

  &:focus {
    outline: none;
    border-color: ${Color.GREY};
  }

  ${mobileMediaQuery} {
    width: 100%;
    flex: 1;
  }
`;

const DateInput = styled(TextInput)`
  width: 140px;
`;

const StatusChip = styled.button<{ active: boolean }>`
  height: 30px;
  padding: 0 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  border: 1px solid ${({ active }) => (active ? Color.BLACK : Color.HEAVY_GREY)};
  background: ${({ active }) => (active ? Color.BLACK : Color.WHITE)};
  color: ${({ active }) => (active ? Color.WHITE : Color.GREY)};
  transition: border-color 0.15s, background 0.15s, color 0.15s;
`;

const ResetButton = styled.button`
  height: 30px;
  padding: 0 12px;
  border-radius: 6px;
  background: transparent;
  color: ${Color.GREY};
  border: none;
  font-size: 12px;
  cursor: pointer;
  transition: color 0.15s;

  &:hover {
    color: ${Color.BLACK};
  }
`;

interface OrdersFilterBarProps {
  filter: OrdersFilter;
  onChange: (filter: OrdersFilter) => void;
  onReset: () => void;
}

function OrdersFilterBar({ filter, onChange, onReset }: OrdersFilterBarProps) {
  const [workspaceIdInput, setWorkspaceIdInput] = useState(filter.workspaceId);

  useEffect(() => {
    setWorkspaceIdInput(filter.workspaceId);
  }, [filter.workspaceId]);

  useEffect(() => {
    if (workspaceIdInput === filter.workspaceId) return undefined;
    const timer = setTimeout(() => {
      onChange({ ...filter, workspaceId: workspaceIdInput });
    }, WORKSPACE_ID_DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [workspaceIdInput, filter, onChange]);

  const updateField = <K extends keyof OrdersFilter>(key: K, value: OrdersFilter[K]) => {
    onChange({ ...filter, [key]: value });
  };

  const toggleStatus = (status: OrderStatus) => {
    const next = filter.statuses.includes(status) ? filter.statuses.filter((s) => s !== status) : [...filter.statuses, status];
    updateField('statuses', next);
  };

  const handleWorkspaceId = (e: ChangeEvent<HTMLInputElement>) => setWorkspaceIdInput(e.target.value);
  const handleStartDate = (e: ChangeEvent<HTMLInputElement>) => updateField('startDate', e.target.value);
  const handleEndDate = (e: ChangeEvent<HTMLInputElement>) => updateField('endDate', e.target.value);

  return (
    <Bar>
      <Row>
        <Field>
          <FieldLabel>ID</FieldLabel>
          <TextInput type="number" inputMode="numeric" placeholder="워크스페이스" value={workspaceIdInput} onChange={handleWorkspaceId} />
        </Field>
        <Field>
          <FieldLabel>기간</FieldLabel>
          <DateInput type="date" value={filter.startDate} onChange={handleStartDate} />
          <DateInput type="date" value={filter.endDate} onChange={handleEndDate} />
        </Field>
      </Row>
      <Row>
        {ORDER_STATUSES.map((status) => (
          <StatusChip key={status} active={filter.statuses.includes(status)} onClick={() => toggleStatus(status)} type="button">
            {STATUS_LABELS[status]}
          </StatusChip>
        ))}
        <ResetButton type="button" onClick={onReset}>
          초기화
        </ResetButton>
      </Row>
    </Bar>
  );
}

export default OrdersFilterBar;
