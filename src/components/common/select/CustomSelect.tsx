import { useState, useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { RiArrowDownSLine } from '@remixicon/react';
import { colFlex, rowFlex } from '@styles/flexStyles';

const SelectContainer = styled.div<{ width?: string; flex?: string }>`
  position: relative;
  font-family: 'LINE Seed Sans KR', sans-serif;
  width: ${({ width }) => width || 'auto'};
  flex: ${({ flex, width }) => flex || (width ? 'none' : 1)};
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
  ${rowFlex({ justify: 'center', align: 'center' })}

  &:hover {
    border-color: ${Color.KIO_ORANGE};
  }

  & > span {
    flex: 1;
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
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
  margin-top: 4px;
  position: absolute;
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

interface CustomSelectPropsBase<T> {
  placeholder?: string;
  width?: string;
  flex?: string;
  value: T;
  highlightOnSelect?: boolean;
}

type SelectOptionsProps<T> = {
  options: { value: T; label: string }[];
  onChange: (value: T) => void;
  children?: never;
  triggerLabel?: string;
};

type SelectChildrenProps = {
  options?: never;
  onChange?: never;
  children: React.ReactNode;
  triggerLabel: string;
};

type CustomSelectProps<T> = CustomSelectPropsBase<T> & (SelectOptionsProps<T> | SelectChildrenProps);

function CustomSelect<T extends string>(props: CustomSelectProps<T>) {
  const { value, onChange, placeholder, width, flex, highlightOnSelect = false } = props;
  const options = props.options ?? [];
  const children = props.children;
  const triggerLabel = props.triggerLabel;

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

  const hasSelection = value !== undefined && value !== '';
  const selectedLabel = children ? triggerLabel : options.find((option) => option.value === value)?.label || placeholder || value;
  const isHighlight = highlightOnSelect && hasSelection;

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
                <SelectOption
                  key={option.value}
                  isSelected={option.value === value}
                  onClick={() => {
                    onChange?.(option.value);
                    setIsOpen(false);
                  }}
                >
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
