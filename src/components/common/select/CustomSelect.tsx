import { useState, useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import { Color } from '@resources/colors';
import { RiArrowDownSLine } from '@remixicon/react';
import { rowFlex } from '@styles/flexStyles';

const SelectContainer = styled.div<{ width?: string; flex?: string }>`
  position: relative;
  font-family: 'LINE Seed Sans KR', sans-serif;
  width: ${({ width }) => width || '100%'};
  flex: ${({ flex, width }) => flex || (width ? 'none' : 1)};
`;

const SelectTrigger = styled.div<{ isOpen: boolean }>`
  position: relative;
  padding: 0 28px 0 10px;
  height: 24px;
  background: ${Color.WHITE};
  border: 1px solid ${({ isOpen }) => (isOpen ? Color.KIO_ORANGE : '#e8eef2')};
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  color: #464a4d;
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

const SelectDropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 4px;
  background: ${Color.WHITE};
  border: 1px solid #e8eef2;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 10;
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

interface CustomSelectProps {
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
  placeholder?: string;
  width?: string;
  flex?: string;
}

// TODO: 이후 PR에서 확장성을 고려하여 수정될 컴포넌트
function CustomSelect({ value, options, onChange, placeholder, width, flex }: CustomSelectProps) {
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

  const selectedLabel = options.find((option) => option.value === value)?.label || placeholder || value;

  return (
    <SelectContainer ref={containerRef} width={width} flex={flex}>
      <SelectTrigger isOpen={isOpen} onClick={() => setIsOpen(!isOpen)}>
        <span>{selectedLabel}</span>
        <ArrowIcon>
          <RiArrowDownSLine size={20} color="#888" />
        </ArrowIcon>
      </SelectTrigger>
      {isOpen && (
        <SelectDropdown>
          {options.map((option) => (
            <SelectOption
              key={option.value}
              isSelected={option.value === value}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
            >
              {option.label}
            </SelectOption>
          ))}
        </SelectDropdown>
      )}
    </SelectContainer>
  );
}

export default CustomSelect;
