import { useState, useEffect, useRef, useMemo } from 'react';
import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { RiArrowDownSLine } from '@remixicon/react';
import { colFlex, rowFlex } from '@styles/flexStyles';

const SelectContainer = styled.div<{ width?: string; flex?: string }>`
  position: relative;
  font-family: 'LINE Seed Sans KR', sans-serif;
  min-width: ${({ width }) => width || 'auto'};
  width: fit-content;
  max-width: 100%;
  flex: ${({ flex }) => flex || 'none'};
`;

const SelectTrigger = styled.div<{ isOpen: boolean; isHighlight?: boolean }>`
  position: relative;
  padding: 0 28px 0 10px;
  height: 24px;
  background: ${({ isHighlight }) => (isHighlight ? Color.KIO_ORANGE : Color.WHITE)};
  border: 1px solid ${({ isOpen, isHighlight }) => (isHighlight || isOpen ? Color.KIO_ORANGE : '#e8eef2')};
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  color: ${({ isHighlight }) => (isHighlight ? Color.WHITE : '#464a4d')};
  line-height: normal;
  user-select: none;
  transition: border-color 0.2s;
  white-space: nowrap;
  ${rowFlex({ justify: 'center', align: 'center' })}

  &:hover {
    border-color: ${Color.KIO_ORANGE};
  }

  & > span {
    flex: 1;
    text-align: left;
    margin-right: 4px;
  }
`;

const ArrowIcon = styled.div`
  position: absolute;
  right: 4px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  ${rowFlex({ justify: 'center', align: 'center' })}
`;

const SelectDropdownContainer = styled.div`
  width: 100%;
  min-width: max-content;
  margin-top: 4px;
  position: absolute;
  left: 0;
  z-index: 10;
  ${colFlex({ justify: 'center', align: 'center' })}
`;

const SelectDropdown = styled.div`
  width: 100%;
  background: ${Color.WHITE};
  border: 1px solid #e8eef2;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  max-height: 200px;
  overflow-y: auto;
`;

const SelectOption = styled.div<{ isSelected: boolean }>`
  padding: 8px 10px;
  font-size: 12px;
  color: ${({ isSelected }) => (isSelected ? Color.KIO_ORANGE : '#464a4d')};
  cursor: pointer;
  background: ${({ isSelected }) => (isSelected ? '#fff5f0' : Color.WHITE)};
  border-bottom: 1px solid #f5f5f5;
  white-space: nowrap;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: #f9f9f9;
    color: ${Color.KIO_ORANGE};
  }
`;

const Label = styled.span<{ isHighlight: boolean }>`
  font-weight: ${({ isHighlight }) => isHighlight && 600};
`;

interface CustomSelectPropsBase {
  placeholder?: string;
  width?: string;
  flex?: string;
  highlightOnSelect?: boolean;
}

interface SelectOptionsBaseProps<T> {
  options: { value: T; label: string }[];
  children?: never;
  triggerLabel?: string;
}

interface SingleSelectProps<T> extends SelectOptionsBaseProps<T> {
  isMulti?: false;
  value: T;
  onChange: (value: T) => void;
}

interface MultiSelectProps<T> extends SelectOptionsBaseProps<T> {
  isMulti: true;
  value: T[];
  onChange: (value: T[]) => void;
}

type SelectChildrenProps = {
  options?: never;
  onChange?: never;
  isMulti?: never;
  value: string;
  children: React.ReactNode;
  triggerLabel: string;
};

type CustomSelectProps<T> = CustomSelectPropsBase & (SingleSelectProps<T> | MultiSelectProps<T> | SelectChildrenProps);

function CustomSelect<T extends string>(props: CustomSelectProps<T>) {
  const { placeholder, width, flex, highlightOnSelect = false, isMulti } = props;
  const options = props.options ?? [];
  const children = props.children;
  const triggerLabel = props.triggerLabel;
  const rawValue = props.value;

  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedLabel = useMemo(() => {
    if (children) return triggerLabel;

    if (isMulti && Array.isArray(rawValue)) {
      const targetValues = rawValue.length === 0 ? options.map((opt) => opt.value) : rawValue;

      const labels = targetValues.map((val) => options.find((opt) => opt.value === val)?.label).filter(Boolean);

      return labels.length > 0 ? labels.join(', ') : placeholder;
    }

    const foundOption = options.find((option) => option.value === rawValue);
    return foundOption?.label || placeholder || rawValue;
  }, [children, triggerLabel, isMulti, rawValue, options, placeholder]);

  const isHighlight = useMemo(() => {
    if (!highlightOnSelect) return false;

    if (isMulti && Array.isArray(rawValue)) {
      const isFullSelection = rawValue.length === options.length;
      const isEmptySelection = rawValue.length === 0;

      return !isEmptySelection && !isFullSelection;
    }

    return rawValue !== undefined && rawValue !== '';
  }, [highlightOnSelect, isMulti, rawValue, options.length]);

  const handleOptionClick = (optionValue: T) => {
    if (!props.onChange) return;

    if (isMulti) {
      const currentValues = (rawValue as T[]) || [];
      const isSelected = currentValues.includes(optionValue);
      let newValues;

      if (isSelected) {
        newValues = currentValues.filter((v) => v !== optionValue);
      } else {
        newValues = [...currentValues, optionValue];
      }

      (props.onChange as (val: T[]) => void)(newValues);
    } else {
      (props.onChange as (val: T) => void)(optionValue);
      setIsOpen(false);
    }
  };

  const isOptionSelected = (optionValue: T) => {
    if (isMulti && Array.isArray(rawValue)) {
      return rawValue.includes(optionValue);
    }
    return rawValue === optionValue;
  };

  return (
    <SelectContainer ref={containerRef} width={width} flex={flex}>
      <SelectTrigger isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} isHighlight={isHighlight}>
        <Label isHighlight={isHighlight}>{selectedLabel}</Label>
        <ArrowIcon>
          <RiArrowDownSLine size={20} color={isHighlight ? Color.WHITE : '#888'} />
        </ArrowIcon>
      </SelectTrigger>
      {isOpen && (
        <SelectDropdownContainer>
          {children ? (
            children
          ) : (
            <SelectDropdown>
              {options.map((option) => (
                <SelectOption key={option.value} isSelected={isOptionSelected(option.value)} onClick={() => handleOptionClick(option.value)}>
                  {option.label}
                </SelectOption>
              ))}
            </SelectDropdown>
          )}
        </SelectDropdownContainer>
      )}
    </SelectContainer>
  );
}

export default CustomSelect;
