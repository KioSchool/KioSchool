import { ChangeEvent, useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { OrderStatus, OrdersFilter } from '@@types/index';
import { ORDER_STATUSES, STATUS_LABELS } from '@constants/data/orderStatus';
import { Color } from '@resources/colors';
import { colFlex, rowFlex } from '@styles/flexStyles';
import { mobileMediaQuery } from '@styles/globalStyles';
import { RiCalendarLine } from '@remixicon/react';
import CustomDatePicker from '@components/common/date-picker/CustomDatePicker';

const WORKSPACE_ID_DEBOUNCE_MS = 400;

const Bar = styled.div`
  width: 100%;
  background: ${Color.WHITE};
  border: 1px solid #f0f0f0;
  border-radius: 8px;
  padding: 12px;
  gap: 10px;
  ${colFlex()}
`;

const Row = styled.div`
  width: 100%;
  gap: 10px;
  flex-wrap: wrap;
  ${rowFlex({ align: 'center' })}
`;

const TextField = styled.input`
  height: 36px;
  padding: 0 12px;
  border: 1px solid ${Color.HEAVY_GREY};
  border-radius: 6px;
  font-size: 13px;
  color: ${Color.BLACK};
  background: ${Color.WHITE};
  width: 200px;
  box-sizing: border-box;

  &::placeholder {
    color: ${Color.HEAVY_GREY};
  }

  &:focus {
    outline: none;
    border-color: ${Color.KIO_ORANGE};
    caret-color: ${Color.KIO_ORANGE};
  }

  ${mobileMediaQuery} {
    width: 100%;
  }
`;

const DateTrigger = styled.button`
  height: 36px;
  padding: 0 12px;
  border: 1px solid ${Color.HEAVY_GREY};
  border-radius: 6px;
  font-size: 13px;
  color: ${Color.BLACK};
  background: ${Color.WHITE};
  cursor: pointer;
  gap: 6px;
  ${rowFlex({ align: 'center' })}

  ${mobileMediaQuery} {
    width: 100%;
    justify-content: flex-start;
  }
`;

const PopoverWrap = styled.div`
  position: relative;

  ${mobileMediaQuery} {
    width: 100%;
  }
`;

const Popover = styled.div`
  position: absolute;
  top: 42px;
  left: 0;
  z-index: 50;
`;

const StatusPill = styled.button<{ active: boolean }>`
  height: 30px;
  padding: 0 12px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  border: 1px solid ${({ active }) => (active ? Color.KIO_ORANGE : Color.HEAVY_GREY)};
  background: ${({ active }) => (active ? Color.KIO_ORANGE_FAINT : Color.WHITE)};
  color: ${({ active }) => (active ? Color.KIO_ORANGE_DARK : Color.GREY)};
  transition: border-color 0.15s, background 0.15s, color 0.15s;
`;

const ResetButton = styled.button`
  height: 30px;
  padding: 0 12px;
  background: transparent;
  color: ${Color.GREY};
  border: none;
  font-size: 12px;
  cursor: pointer;
  margin-left: auto;

  &:hover {
    color: ${Color.BLACK};
  }
`;

const FieldLabel = styled.span`
  font-size: 12px;
  color: ${Color.GREY};
  white-space: nowrap;
`;

interface OrdersFilterBarProps {
  filter: OrdersFilter;
  onChange: (filter: OrdersFilter) => void;
  onReset: () => void;
}

const formatYmd = (date: Date | null): string => {
  if (!date) return '';
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};

const parseYmd = (value: string): Date | null => {
  if (!value) return null;
  const d = new Date(value);
  return isNaN(d.getTime()) ? null : d;
};

function OrdersFilterBar({ filter, onChange, onReset }: OrdersFilterBarProps) {
  const [workspaceIdInput, setWorkspaceIdInput] = useState(filter.workspaceId);
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(parseYmd(filter.startDate));
  const [endDate, setEndDate] = useState<Date | null>(parseYmd(filter.endDate));
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setWorkspaceIdInput(filter.workspaceId);
  }, [filter.workspaceId]);

  useEffect(() => {
    setStartDate(parseYmd(filter.startDate));
    setEndDate(parseYmd(filter.endDate));
  }, [filter.startDate, filter.endDate]);

  useEffect(() => {
    if (workspaceIdInput === filter.workspaceId) return undefined;
    const timer = setTimeout(() => {
      onChange({ ...filter, workspaceId: workspaceIdInput });
    }, WORKSPACE_ID_DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [workspaceIdInput, filter, onChange]);

  useEffect(() => {
    const ymdStart = formatYmd(startDate);
    const ymdEnd = formatYmd(endDate);
    if (ymdStart === filter.startDate && ymdEnd === filter.endDate) return;
    if (startDate && endDate) {
      onChange({ ...filter, startDate: ymdStart, endDate: ymdEnd });
    }
  }, [startDate, endDate, filter, onChange]);

  useEffect(() => {
    if (!datePickerOpen) return undefined;
    const handleClick = (e: MouseEvent | TouchEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setDatePickerOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('touchstart', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('touchstart', handleClick);
    };
  }, [datePickerOpen]);

  const toggleStatus = (status: OrderStatus) => {
    const next = filter.statuses.includes(status)
      ? filter.statuses.filter((s) => s !== status)
      : [...filter.statuses, status];
    onChange({ ...filter, statuses: next });
  };

  const handleWorkspaceId = (e: ChangeEvent<HTMLInputElement>) => {
    const numericOnly = e.target.value.replace(/[^0-9]/g, '');
    setWorkspaceIdInput(numericOnly);
  };

  const dateLabel = (() => {
    if (startDate && endDate) return `${formatYmd(startDate)} ~ ${formatYmd(endDate)}`;
    if (startDate) return `${formatYmd(startDate)} ~ 종료일 선택`;
    return '기간 선택';
  })();

  return (
    <Bar>
      <Row>
        <TextField
          type="text"
          inputMode="numeric"
          placeholder="워크스페이스 ID로 검색"
          value={workspaceIdInput}
          onChange={handleWorkspaceId}
        />
        <PopoverWrap ref={popoverRef}>
          <DateTrigger type="button" onClick={() => setDatePickerOpen((v) => !v)}>
            <RiCalendarLine size={16} color={Color.GREY} />
            {dateLabel}
          </DateTrigger>
          {datePickerOpen && (
            <Popover>
              <CustomDatePicker
                mode="range"
                startDate={startDate}
                endDate={endDate}
                setStartDate={setStartDate}
                setEndDate={setEndDate}
              />
            </Popover>
          )}
        </PopoverWrap>
        <ResetButton type="button" onClick={onReset}>초기화</ResetButton>
      </Row>
      <Row>
        <FieldLabel>상태</FieldLabel>
        {ORDER_STATUSES.map((status) => (
          <StatusPill
            key={status}
            active={filter.statuses.includes(status)}
            onClick={() => toggleStatus(status)}
            type="button"
          >
            {STATUS_LABELS[status]}
          </StatusPill>
        ))}
      </Row>
    </Bar>
  );
}

export default OrdersFilterBar;
